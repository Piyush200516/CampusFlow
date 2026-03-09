import { useState } from "react";
import { useDarkMode } from "../../context/DarkModeContext";
import { CreditCard, User, Phone, DollarSign, Lock, Check, ArrowRight } from "lucide-react";

export default function FeePayment() {
  const { isDarkMode } = useDarkMode();
  const [form, setForm] = useState({
    name: "",
    father: "",
    scholar: "",
    mobile: "",
    amount: ""
  });

  const [error, setError] = useState("");
  const [showPay, setShowPay] = useState(false);

  const YOUR_UPI = "yourupi@okaxis";

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name" || name === "father") {
      if (!/^[A-Za-z\s]*$/.test(value)) return;
    }

    if (name === "scholar") {
      if (!/^[A-Za-z]{0,4}[0-9]{0,6}$/.test(value)) return;
    }

    if (name === "mobile") {
      if (!/^[0-9]{0,10}$/.test(value)) return;
    }

    if (name === "amount") {
      if (!/^[0-9]*$/.test(value)) return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!/^[A-Za-z]{4}[0-9]{6}$/.test(form.scholar))
      return setError("Scholar format invalid");

    if (!/^[6-9][0-9]{9}$/.test(form.mobile))
      return setError("Invalid mobile");

    if (!/^[1-9][0-9]*$/.test(form.amount))
      return setError("Invalid amount");

    setShowPay(true);
  };

  const payUPI = () => {
    const link =
      `upi://pay?pa=${YOUR_UPI}` +
      `&pn=${form.name}` +
      `&am=${form.amount}` +
      `&cu=INR`;

    window.location.href = link;
  };

  const inputClass = `w-full border p-3.5 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
    isDarkMode 
      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" 
      : "bg-white border-gray-300 text-gray-800"
  }`;

  const Label = ({ icon: Icon, children }) => (
    <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
      {Icon && <Icon size={16} />}
      {children}
    </label>
  );

  return (
    <div className={`min-h-screen p-4 md:p-6 flex justify-center transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className={`rounded-2xl p-6 mb-6 shadow-xl ${
          isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"
        }`}>
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
              isDarkMode ? "bg-blue-900/30" : "bg-blue-100"
            }`}>
              <CreditCard className="text-blue-500" size={28} />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                Acropolis Fee Collection
              </h1>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                Secure payment gateway
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={`rounded-2xl p-6 md:p-8 shadow-xl ${
          isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"
        }`}>
          <h2 className={`text-lg font-semibold mb-5 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            Student Details
          </h2>

          {error && (
            <div className={`p-3 rounded-xl mb-4 text-sm ${isDarkMode ? "bg-red-900/30 text-red-400 border border-red-800" : "bg-red-100 text-red-600 border border-red-200"}`}>
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <Label icon={User}>Student Name</Label>
              <input name="name" onChange={handleChange} required className={inputClass} placeholder="Enter your name" />
            </div>
            <div>
              <Label icon={User}>Father's Name</Label>
              <input name="father" onChange={handleChange} required className={inputClass} placeholder="Enter father's name" />
            </div>
            <div>
              <Label icon={CreditCard}>Scholar Number</Label>
              <input name="scholar" onChange={handleChange} required className={inputClass} placeholder="e.g., ABCD123456" />
            </div>
            <div>
              <Label icon={Phone}>Mobile Number</Label>
              <input name="mobile" onChange={handleChange} required className={inputClass} placeholder="10-digit mobile number" />
            </div>
            <div>
              <Label icon={DollarSign}>Fee Amount</Label>
              <input name="amount" onChange={handleChange} required className={inputClass} placeholder="Enter amount" />
            </div>
          </div>

          {!showPay && (
            <button type="submit" className={`w-full mt-6 flex items-center justify-center gap-2 py-4 rounded-xl text-base font-semibold transition-all duration-300 ${
              isDarkMode 
                ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25" 
                : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/25"
            }`}>
              Proceed to Payment
              <ArrowRight size={20} />
            </button>
          )}
        </form>

        {/* Payment Section */}
        {showPay && (
          <div className={`mt-6 p-6 rounded-2xl shadow-xl text-center ${
            isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"
          }`}>
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
              isDarkMode ? "bg-green-900/30" : "bg-green-100"
            }`}>
              <Check className="text-green-500" size={32} />
            </div>
            <h2 className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
              Pay via UPI
            </h2>
            <p className={`mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              Amount: <span className={`font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>₹ {form.amount}</span>
            </p>
            
            <button onClick={payUPI} className={`flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
              isDarkMode 
                ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg shadow-green-500/25" 
                : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg shadow-green-500/25"
            }`}>
              <DollarSign size={20} />
              Pay Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

