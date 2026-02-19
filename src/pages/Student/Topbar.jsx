import { useEffect, useState } from "react";
import { Moon } from "lucide-react";

export default function Navbar() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setEmail(storedUser.email);
    }
  }, []);

  return (
    <div className="w-full bg-gray-100 flex justify-between items-center px-6 py-3 shadow-sm">

      {/* Left Logo */}
      <div className="flex items-center gap-3">
        <img
          src="/logo.png"   // apna logo path yaha daalo
          alt="Logo"
          className="h-10"
        />
        <div>
          <h1 className="text-xl font-bold text-blue-900">ACROPOLIS</h1>
          <p className="text-sm text-gray-500">Enlightening Wisdom</p>
        </div>
      </div>

      {/* Right Email */}
      <div className="flex items-center gap-3 bg-gray-200 px-4 py-2 rounded-xl">
        <Moon size={18} />
        <span className="text-sm font-medium">
          {email || "No User Logged In"}
        </span>
      </div>
    </div>
  );
}
