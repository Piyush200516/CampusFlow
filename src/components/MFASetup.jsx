import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import API from '../services/api';
import { Shield, CheckCircle, XCircle, Key, Zap } from 'lucide-react';

const MFASetup = ({ userId, isOpen, onClose }) => {
  const [step, setStep] = useState('qr');
  const [secret, setSecret] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [message, setMessage] = useState('');

  const loadMfaStatus = async () => {
    try {
      const response = await API.get(`/api/student/profile/${userId}`);
      const user = response.data.user || response.data;
      setMfaEnabled(user.mfa_enabled || false);
    } catch (err) {
      console.error('Error loading MFA status:', err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadMfaStatus();
      setStep('qr');
    }
  }, [isOpen, userId]);

  const handleSetup = async () => {
    setLoading(true);
    setStep('qr');
    try {
      const response = await API.post('/api/mfa/setup', { userId });
      setSecret(response.data.secret);
      setQrDataUrl(response.data.qr_data_url);
      setMessage(response.data.message);
      setStep('verify');
    } catch (err) {
      setStep('error');
      setMessage(err.response?.data?.error || 'Setup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setMessage('Enter 6-digit OTP');
      return;
    }
    setLoading(true);
    try {
      const response = await API.post('/api/mfa/verify', { userId, token: otp });
      if (response.data.verified) {
        setMessage('OTP verified! Ready to enable MFA.');
        setStep('success');
      } else {
        setMessage('Invalid OTP. Try again.');
      }
    } catch (err) {
      setMessage('Verification failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEnable = async () => {
    try {
      await API.post('/api/mfa/enable', { userId });
      setMfaEnabled(true);
      setMessage('MFA enabled successfully!');
      onClose();
    } catch (err) {
      setMessage('Enable failed. Try again.');
    }
  };

  const handleDisable = async () => {
    try {
      await API.post('/api/mfa/disable', { userId });
      setMfaEnabled(false);
      setMessage('MFA disabled.');
      onClose();
    } catch (err) {
      setMessage('Disable failed.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">2-Factor Authentication</h2>
              <p className="text-sm text-gray-600">Google Authenticator Setup</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {mfaEnabled && !loading && (
            <div className="text-center py-12">
              <Shield className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">MFA Enabled</h3>
              <p className="text-gray-600 mb-8">Your account is protected with 2FA</p>
              <button
                onClick={handleDisable}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all shadow-lg"
              >
                Disable MFA
              </button>
            </div>
          )}

          {!mfaEnabled && step === 'qr' && (
            <div className="text-center space-y-6">
              <Zap className="w-20 h-20 mx-auto text-blue-500" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Setup MFA?</h3>
                <p className="text-gray-600">Generate QR code for Google Authenticator</p>
              </div>
              <button
                onClick={handleSetup}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Generating QR...' : 'Generate & Scan QR Code'}
              </button>
            </div>
          )}

          {step === 'verify' && secret && (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <div className="inline-block p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl shadow-xl border-4 border-dashed border-emerald-200">
                  <QRCode value={qrDataUrl} size={220} />
                </div>
                <div className="bg-yellow-50 p-3 rounded-xl">
                  <p className="text-xs font-mono bg-white px-3 py-1 rounded text-gray-800">{secret}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Verification Code</label>
                <div className="relative">
                  <input
                    type="text"
                    maxLength="6"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="w-full text-2xl font-mono tracking-widest text-center py-5 px-6 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200 transition-all shadow-sm"
                    placeholder="_ _ _ _ _ _"
                  />
                  <Key className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">Code refreshes every 30 seconds</p>
              </div>

              <button
                onClick={handleVerify}
                disabled={loading || otp.length !== 6}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-2xl font-bold shadow-xl hover:from-emerald-700 hover:to-teal-700 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <CheckCircle className="w-6 h-6" />
                <span>{loading ? 'Verifying...' : 'Verify Code'}</span>
              </button>

              <div className="flex space-x-3">
                <button
                  onClick={handleSetup}
                  disabled={loading}
                  className="flex-1 py-3 px-4 border border-gray-300 text-sm font-medium rounded-xl hover:bg-gray-50 transition-all"
                >
                  New QR
                </button>
                <button
                  className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-sm font-medium rounded-xl transition-all"
                  onClick={() => setStep('qr')}
                >
                  Back
                </button>
              </div>

              {message && (
                <div className={`p-3 rounded-xl text-sm ${
                  message.includes('verified') ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                }`}>
                  {message}
                </div>
              )}
            </div>
          )}

          {step === 'success' && (
            <div className="text-center space-y-8 py-12">
              <CheckCircle className="w-24 h-24 mx-auto text-emerald-500" />
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Success!</h3>
                <p className="text-xl text-gray-600 mb-8">Your authenticator app is verified correctly.</p>
              </div>
              <button
                onClick={handleEnable}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-5 rounded-2xl font-bold text-xl shadow-2xl hover:from-emerald-700 hover:to-teal-700 transition-all"
              >
                Enable 2-Factor Authentication
              </button>
              <button
                onClick={() => setStep('verify')}
                className="w-full py-4 px-8 border-2 border-gray-300 text-lg font-semibold rounded-2xl hover:bg-gray-50 transition-all"
              >
                Try Another Code
              </button>
            </div>
          )}

          {step === 'error' && (
            <div className="text-center space-y-6 py-12">
              <XCircle className="w-20 h-20 mx-auto text-red-500" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Setup Error</h3>
                <p className="text-gray-600">{message}</p>
              </div>
              <button
                onClick={handleSetup}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-bold shadow-xl hover:from-indigo-700 hover:to-purple-700 transition-all"
              >
                Try Again
              </button>
            </div>
          )}
        </div>

        <div className="p-6 border-t bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-white hover:bg-gray-100 text-gray-900 font-semibold rounded-2xl shadow-sm border transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MFASetup;

