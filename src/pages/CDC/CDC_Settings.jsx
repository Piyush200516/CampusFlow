import { useDarkMode } from "../../context/DarkModeContext";

export default function CDCSettings() {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`p-6 rounded-lg shadow-md transition-colors duration-300 ${
      isDarkMode ? "bg-gray-800" : "bg-white"
    }`}>
      <h2 className={`text-2xl font-bold mb-4 ${
        isDarkMode ? "text-white" : "text-gray-800"
      }`}>CDC Settings</h2>
      <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
        Configure CDC department settings here.
      </p>
    </div>
  );
}
