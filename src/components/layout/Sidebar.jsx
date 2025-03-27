import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ClipboardIcon,
  CreditCardIcon,
  CalendarIcon,
  BanknotesIcon,
  ChartPieIcon,
  UserGroupIcon,
  CogIcon,
  LockClosedIcon,
  Bars3BottomLeftIcon,
} from "@heroicons/react/24/outline";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/", icon: HomeIcon },
    { name: "Menu Management", href: "/menu", icon: ClipboardIcon },
    { name: "Subscriptions", href: "/subscriptions", icon: CreditCardIcon },
    { name: "Events", href: "/events", icon: CalendarIcon },
    { name: "Item Management", href: "/items", icon: CalendarIcon },
    { name: "Payments", href: "/payments", icon: BanknotesIcon },
    { name: "Reports", href: "/reports", icon: ChartPieIcon },
    { name: "Users", href: "/users", icon: UserGroupIcon },
    { name: "Settings", href: "/settings", icon: CogIcon },
  ];

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/25 bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white duration-300 ease-in-out lg:translate-x-0 border-r border-gray-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-300">
            <div className="flex items-center space-x-2">
              {/* <img src="/logo.png" alt="Logo" className="h-8 w-8" /> */}
              <span className="text-black text-xl font-bold tracking-wider">
                CateringMS
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <Bars3BottomLeftIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group
                    ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-lg "
                        : "text-black hover:bg-gray-700/50 hover:text-white"
                    }`}
                >
                  <item.icon
                    className={`h-5 w-5 mr-3 transition-transform duration-200 group-hover:scale-110 ${
                      isActive
                        ? "text-white"
                        : "text-black group-hover:text-white"
                    }`}
                  />
                  <span>{item.name}</span>
                  {isActive && (
                    <div className="absolute left-0 w-1 h-8 bg-indigo-400 rounded-r-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="relative border-t border-gray-300">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="w-full p-4 flex items-center space-x-3 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            >
              <div className="relative">
                <img
                  className="h-10 w-10 rounded-full ring-2 ring-indigo-500 object-cover"
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(
                    "Ravindrajangir007"
                  )}&backgroundColor=indigo`}
                  alt="User avatar"
                />
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-gray-800" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-black truncate">
                  {/* Use the current user's login from the environment */}
                  Ravindrajangir007
                </p>
                <p className="text-xs text-gray-400 truncate">Catering Owner</p>
              </div>
            </button>

            {/* Profile Dropdown */}
            {isProfileMenuOpen && (
              <div className="absolute bottom-full left-2 right-2 w-[94%] mb-1 bg-gray-200 rounded-lg  py-2 border border-gray-300 transform origin-bottom transition-all duration-200">
                <a
                  href="/profile"
                  className="flex items-center px-4 py-2 text-sm text-black hover:bg-gray-700/50 hover:text-white"
                >
                  <UserGroupIcon className="h-5 w-5 mr-3" />
                  View Profile
                </a>
                <a
                  href="/settings"
                  className="flex items-center px-4 py-2 text-sm text-black hover:bg-gray-700/50 hover:text-white"
                >
                  <CogIcon className="h-5 w-5 mr-3" />
                  Settings
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 cursor-pointer"
                >
                  <LockClosedIcon className="h-5 w-5 mr-3" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
