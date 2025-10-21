

import { useState } from "react";
import { Settings, LogOut, LogIn, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="relative bg-white border-b border-gray-200">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 group cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="relative bg-black p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2L2 7v6c0 5.5 3.8 9.2 8 10 4.2-.8 8-4.5 8-10V7l-8-5z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-gray-900">TaskFlow</span>
          </div>

          {/* Settings Button */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300"
            >
              <Settings className="w-6 h-6" />
            </button>

            {/* Glass Dropdown */}
            {isOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsOpen(false)}
                ></div>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-64 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/50 overflow-hidden">
                    {/* User Info */}
                    <div className="p-4 border-b border-gray-200/50 bg-gradient-to-br from-blue-50/50 to-transparent">
                      <div className="flex items-center space-x-3">
                        <img
                          src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=3b82f6&color=fff`}
                          alt={user?.name || 'User'}
                          className="w-12 h-12 rounded-full ring-2 ring-blue-500/20"
                        />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {user?.name || 'User'}
                          </p>
                          <p className="text-xs text-gray-500">Active now</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      {isAuthenticated ? (
                        <>
                     

                          <button
                            onClick={() => {
                              logout();
                              setIsOpen(false);
                            }}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-red-50/50 rounded-lg transition-all duration-200 group"
                          >
                            <LogOut className="w-5 h-5 text-gray-500 group-hover:text-red-600 transition-colors" />
                            <span className="text-sm font-medium group-hover:text-red-600 transition-colors">
                              Logout
                            </span>
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            navigate("/");
                            setIsOpen(false);
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-green-50/50 rounded-lg transition-all duration-200 group"
                        >
                          <LogIn className="w-5 h-5 text-gray-500 group-hover:text-green-600 transition-colors" />
                          <span className="text-sm font-medium group-hover:text-green-600 transition-colors">
                            Login
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
