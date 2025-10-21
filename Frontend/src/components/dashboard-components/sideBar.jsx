
import { useState } from "react";
import {
  LayoutDashboard,
  CheckSquare,
  Clock,
  CheckCircle,
  Settings,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "all", label: "All Tasks", icon: CheckSquare },
  { id: "completed", label: "Completed", icon: CheckCircle },
  { id: "pending", label: "Pending", icon: Clock },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ activeTab, onTabChange }) {
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar when clicking outside on mobile
  const handleBackdropClick = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between p-3 sm:p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-black p-1.5 sm:p-2 rounded-lg">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2L2 7v6c0 5.5 3.8 9.2 8 10 4.2-.8 8-4.5 8-10V7l-8-5z" />
            </svg>
          </div>
          <span className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
            TaskFlow
          </span>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 sm:p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle sidebar"
        >
          {isOpen ? (
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800 dark:text-white" />
          ) : (
            <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800 dark:text-white" />
          )}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-56 sm:w-72 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-r border-gray-200 dark:border-gray-800 flex flex-col shadow-xl transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        {/* Header */}
        <div className="hidden md:flex items-center gap-3 p-4 lg:p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="relative bg-black p-2 rounded-lg shadow-md">
            <svg
              className="w-5 h-5 lg:w-6 lg:h-6 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2L2 7v6c0 5.5 3.8 9.2 8 10 4.2-.8 8-4.5 8-10V7l-8-5z" />
            </svg>
          </div>
          <span className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
            TaskFlow
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 sm:p-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map(({ id, label, icon: Icon }) => {
              const isActive = activeTab === id;
              return (
                <li key={id}>
                  <button
                    onClick={() => {
                      onTabChange(id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-gray-800 text-white shadow-md scale-[1.02]"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform flex-shrink-0 ${
                        isActive ? "scale-110" : ""
                      }`}
                    />
                    <span className="truncate text-[1rem] text-bold ">{label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-800 text-center text-xs text-gray-400 dark:text-gray-500">
          © {new Date().getFullYear()} TaskFlow
        </div>
      </aside>

      {/* Main Wrapper - Updated for better responsive behavior */}
      <main className="md:ml-64 lg:ml-64 xl:ml-64 pt-14 sm:pt-16 md:pt-0 transition-all duration-300">
        {/* Content will be rendered by parent component */}
      </main>
    </>
  );
}
