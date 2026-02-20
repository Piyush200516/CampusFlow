

import { useState } from "react";

export default function FeePayment() {
  const [form, setForm] = useState({
    name: "",
    father: "",
    scholar: "",
    mobile: "",
    amount: ""
  });

  const [error, setError] = useState("");
  const [showPay, setShowPay] = useState(false);

  const YOUR_UPI = "yourupi@okaxis"; // 👈 Apna UPI yaha daalna

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

  // ⭐ UPI Trigger
  const payUPI = () => {
    const link =
      `upi://pay?pa=${YOUR_UPI}` +
      `&pn=${form.name}` +
      `&am=${form.amount}` +
      `&cu=INR`;

    window.location.href = link;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">

      <div className="w-full max-w-3xl">

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h1 className="text-2xl font-semibold">
            Acropolis Fee collection
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow p-6 space-y-5"
        >

          {error && (
            <div className="bg-red-100 text-red-600 p-2 rounded text-sm">
              {error}
            </div>
          )}

          <Input label="Student Name" name="name" onChange={handleChange} />
          <Input label="Father's Name" name="father" onChange={handleChange} />
          <Input label="Scholar Number" name="scholar" onChange={handleChange} />
          <Input label="Mobile Number" name="mobile" onChange={handleChange} />
          <Input label="Fee Amount" name="amount" onChange={handleChange} />

          {!showPay && (
            <button
              type="submit"
              className="w-full bg-cyan-500 text-white py-3 rounded-lg"
            >
              Proceed to Payment
            </button>
          )}
        </form>

        {/* ⭐ Payment Section */}
        {showPay && (
          <div className="bg-white mt-6 p-6 rounded-xl shadow text-center">
            <h2 className="text-xl font-semibold mb-3">
              Pay via UPI
            </h2>

            <p className="text-gray-500 mb-4">
              Amount: ₹ {form.amount}
            </p>

            <button
              onClick={payUPI}
              className="bg-green-600 text-white px-6 py-3 rounded-xl"
            >
              Pay Now
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

function Input({ label, name, onChange }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>

      <input
        name={name}
        onChange={onChange}
        required
        className="w-full border rounded-lg p-2 mt-1"
      />
    </div>
  );
}