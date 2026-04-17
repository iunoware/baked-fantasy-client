import api from "@/api";
import { LogOut } from "lucide-react";

export function Sidebar({ tabs, activeTab, setActiveTab }) {
  const handleLogout = async () => {
    // sessionStorage.removeItem("token");
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");
    try {
      await api.post("/logout");
    } catch (err) {
      console.error("Logout error:", err);
    }
    window.location.href = "/";
  };

  return (
    <div className="w-full lg:w-[250px] flex-shrink-0 flex flex-col gap-2">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <ul className="space-y-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                    isActive
                      ? "bg-white shadow-md border border-gray-100 font-bold text-gray-900"
                      : "text-gray-500 hover:bg-gray-50 font-medium"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${isActive ? "text-pink-500" : "text-gray-400"}`}
                  />
                  {tab.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <button
        onClick={handleLogout}
        className="mt-2 w-full flex items-center gap-4 px-8 py-4 rounded-xl text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all font-medium border border-transparent shadow-sm bg-white"
      >
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </div>
  );
}
