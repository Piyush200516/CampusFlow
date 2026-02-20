import { useState } from "react";
import { Shield, Key, User, Mail, Smartphone } from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [mfaMethod, setMfaMethod] = useState("email");

  return (
    <div className="p-6">
      {/* Top Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
            activeTab === "profile"
              ? "bg-white shadow font-semibold"
              : "bg-gray-100"
          }`}
        >
          <Shield size={18} /> Profile
        </button>

        <button
          onClick={() => setActiveTab("mfa")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
            activeTab === "mfa"
              ? "bg-white shadow font-semibold"
              : "bg-gray-100"
          }`}
        >
          <User size={18} /> Multi-Factor Auth
        </button>

        <button
          onClick={() => setActiveTab("password")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
            activeTab === "password"
              ? "bg-white shadow font-semibold"
              : "bg-gray-100"
          }`}
        >
          <Key size={18} /> Change Password
        </button>
      </div>

      {/* ================= PROFILE TAB ================= */}
      {activeTab === "profile" && (
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-1">
            Student Profile Information
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Contact your administrator to update this information.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Input label="Full Name" value="Piyush Mishra" />
            <Input label="College Email" value="piyushmishra240613@acropolis.in" />
            <Input label="RGPV Enrollment Number" value="0827RL243D05" />
            <Input label="Institute Enrollment Number" value="0827RL243D05" />
            <Input label="Course" value="B_TECH" />
            <Input label="Branch" value="CSE_RL" />
            <Input label="Batch Year" value="2027" />
            <Input label="Section" value="6" />
          </div>

          <div className="mt-6 bg-gray-100 p-3 rounded-lg text-sm text-gray-600">
            If you need to update any of this information, please contact your
            administrator.
          </div>
        </div>
      )}

      {/* ================= MFA TAB ================= */}
      {activeTab === "mfa" && (
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="bg-gray-100 p-4 rounded-xl mb-6">
            <h3 className="font-semibold">MFA is not enabled</h3>
            <p className="text-sm text-gray-500">
              Set up multi-factor authentication to secure your account.
            </p>
          </div>

          <h2 className="font-semibold mb-4">Setup Multi-Factor Authentication</h2>

          <div className="flex gap-4 mb-6">
            <div
              onClick={() => setMfaMethod("email")}
              className={`flex-1 border p-4 rounded-xl cursor-pointer ${
                mfaMethod === "email"
                  ? "border-black"
                  : "border-gray-200"
              }`}
            >
              <Mail className="mb-2" />
              <h4 className="font-semibold">Email OTP</h4>
              <p className="text-sm text-gray-500">Get codes via email</p>
            </div>

            <div
              onClick={() => setMfaMethod("app")}
              className={`flex-1 border p-4 rounded-xl cursor-pointer ${
                mfaMethod === "app"
                  ? "border-black"
                  : "border-gray-200"
              }`}
            >
              <Smartphone className="mb-2" />
              <h4 className="font-semibold">Authenticator App</h4>
              <p className="text-sm text-gray-500">
                Use Google/Microsoft Authenticator
              </p>
            </div>
          </div>

          <button className="w-full bg-black text-white py-3 rounded-xl">
            Setup {mfaMethod === "email" ? "Email" : "App"} MFA
          </button>
        </div>
      )}

      {/* ================= PASSWORD TAB ================= */}
      {activeTab === "password" && (
        <div className="bg-white p-6 rounded-2xl shadow max-w-2xl">
          <h2 className="text-lg font-semibold mb-1">Change Password</h2>
          <p className="text-gray-500 text-sm mb-6">
            Use a strong password with at least 8 characters.
          </p>

          <div className="space-y-4">
            <PasswordInput label="Current Password" />
            <PasswordInput label="New Password" />
            <PasswordInput label="Confirm New Password" />
          </div>

          <button className="mt-6 w-full bg-black text-white py-3 rounded-xl">
            Change Password
          </button>
        </div>
      )}
    </div>
  );
}

/* ===== Reusable Input Component ===== */
function Input({ label, value }) {
  return (
    <div>
      <label className="block text-sm mb-1 font-medium">{label}</label>
      <input
        type="text"
        value={value}
        readOnly
        className="w-full bg-gray-100 p-3 rounded-lg"
      />
    </div>
  );
}

function PasswordInput({ label }) {
  return (
    <div>
      <label className="block text-sm mb-1 font-medium">{label}</label>
      <input
        type="password"
        placeholder={`Enter ${label.toLowerCase()}`}
        className="w-full bg-gray-100 p-3 rounded-lg"
      />
    </div>
  );
}