import { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  HomeIcon,
  CakeIcon,
  ShoppingBagIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  ChevronDownIcon,
  Squares2X2Icon,
  CalendarDaysIcon,
  UserGroupIcon,
  ShoppingCartIcon,
  CircleStackIcon,
  TruckIcon,
  DocumentChartBarIcon,
  CurrencyDollarIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  {
    name: "Dashboard",
    icon: Squares2X2Icon,
    href: "/",
    badge: null,
  },
  {
    name: "Catering",
    icon: CakeIcon,
    children: [
      {
        name: "Menu Planning",
        href: "/catering/menu",
        icon: ClipboardDocumentListIcon,
        description: "Plan and manage weekly meal schedules",
      },

      {
        name: "Meal Schedule",
        href: "/catering/schedule",
        icon: CalendarDaysIcon,
        description: "Daily meal delivery schedule",
      },
    ],
  },
  {
    name: "Subscription Plan",
    icon: CakeIcon,
    children: [
      {
        name: "Subscription Plans",
        href: "/subscriptions/plan",
        icon: UserGroupIcon,
        description: "Manage subscription packages",
        badge: { text: "3", color: "bg-indigo-100 text-indigo-800" },
      },
    ],
  },

  {
    name: "Retail",
    icon: ShoppingBagIcon,
    children: [
      {
        name: "Product Catalog",
        href: "/retail/products",
        icon: ClipboardDocumentListIcon,
        description: "Manage retail products",
      },
      {
        name: "Order History",
        href: "/retail/orders",
        icon: DocumentChartBarIcon,
        description: "View and manage orders",
        badge: { text: "12", color: "bg-yellow-100 text-yellow-800" },
      },
      {
        name: "POS System",
        href: "/retail/pos",
        icon: ShoppingCartIcon,
        description: "Point of sale system",
      },
    ],
  },
  {
    name: "Inventory",
    icon: CircleStackIcon,
    children: [
      {
        name: "Stock Management",
        href: "/inventory/stock",
        icon: ClipboardDocumentListIcon,
        description: "Track and manage inventory",
        badge: { text: "5", color: "bg-red-100 text-red-800" },
      },
      {
        name: "Suppliers",
        href: "/inventory/suppliers",
        icon: TruckIcon,
        description: "Manage supplier relationships",
      },
      {
        name: "Purchase Orders",
        href: "/inventory/purchase-orders",
        icon: ClipboardDocumentCheckIcon,
        description: "Create and track orders",
      },
    ],
  },
  {
    name: "Reports",
    icon: ChartBarIcon,
    children: [
      {
        name: "Inventory Report",
        href: "/reports/inventory",
        icon: ClipboardDocumentListIcon,
        description: "Stock level analysis",
      },
      {
        name: "Sales Report",
        href: "/reports/sales",
        icon: CurrencyDollarIcon,
        description: "Revenue and sales metrics",
      },
      {
        name: "Subscription Report",
        href: "/reports/subscriptions",
        icon: DocumentChartBarIcon,
        description: "Subscription analytics",
      },
    ],
  },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const currentUser = "Ravindrajangir007";
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menuName) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const isCurrentPath = (href) => location.pathname === href;
  const isParentActive = (children) =>
    children?.some((child) => location.pathname === child.href);

  return (
    <>
      {/* Mobile Sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <SidebarContent
                  currentPath={location.pathname}
                  openMenus={openMenus}
                  toggleMenu={toggleMenu}
                  isParentActive={isParentActive}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <SidebarContent
          currentPath={location.pathname}
          openMenus={openMenus}
          toggleMenu={toggleMenu}
          isParentActive={isParentActive}
        />
      </div>
    </>
  );
}

function SidebarContent({
  currentPath,
  openMenus,
  toggleMenu,
  isParentActive,
}) {
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white  pb-4 ">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center border-b px-6 border-gray-200 shadow-sm">
        {/* <img className="h-8 w-auto" src="/logo.png" alt="School Catering" /> */}
        <h1 className="font-bold text-xl">School Catering</h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col px-6">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          {/* Main Navigation */}
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  {!item.children ? (
                    <Link
                      to={item.href}
                      className={`
                        group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6
                        ${
                          currentPath === item.href
                            ? "bg-indigo-50 text-indigo-600"
                            : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                        }
                      `}
                    >
                      <item.icon
                        className={`h-6 w-6 shrink-0 ${
                          currentPath === item.href
                            ? "text-indigo-600"
                            : "text-gray-400 group-hover:text-indigo-600"
                        }`}
                      />
                      {item.name}
                      {item.badge && (
                        <span
                          className={`ml-auto w-5 min-w-fit px-2 py-0.5 text-center text-xs rounded-full ${item.badge.color}`}
                        >
                          {item.badge.text}
                        </span>
                      )}
                    </Link>
                  ) : (
                    <div className="space-y-1">
                      <button
                        onClick={() => toggleMenu(item.name)}
                        className={`
                          group flex w-full items-center justify-between gap-x-3 rounded-md p-2 text-sm font-semibold leading-6
                          ${
                            isParentActive(item.children)
                              ? "text-indigo-600"
                              : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                          }
                        `}
                      >
                        <div className="flex items-center gap-x-3">
                          <item.icon
                            className={`h-6 w-6 shrink-0 ${
                              isParentActive(item.children)
                                ? "text-indigo-600"
                                : "text-gray-400 group-hover:text-indigo-600"
                            }`}
                          />
                          {item.name}
                        </div>
                        <ChevronDownIcon
                          className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 ${
                            openMenus[item.name] ? "transform rotate-180" : ""
                          }`}
                        />
                        {console.log("object", item.name)}
                      </button>
                      <Transition
                        show={openMenus[item.name] || false}
                        enter="transition-all ease-in-out duration-300"
                        enterFrom="transform opacity-0 max-h-0"
                        enterTo="transform opacity-100 max-h-[400px]"
                        leave="transition-all ease-in-out duration-300"
                        leaveFrom="transform opacity-100 max-h-[400px]"
                        leaveTo="transform opacity-0 max-h-0"
                        className="overflow-hidden"
                      >
                        <ul className="mt-1 space-y-1">
                          {item.children.map((child) => (
                            <li key={child.name}>
                              <Link
                                to={child.href}
                                className={`
                                  group flex items-center gap-x-3 rounded-md py-2 pl-11 pr-2 text-sm leading-6
                                  ${
                                    currentPath === child.href
                                      ? "bg-indigo-50 text-indigo-600 font-semibold"
                                      : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                                  }
                                `}
                              >
                                <child.icon
                                  className={`h-5 w-5 shrink-0 ${
                                    currentPath === child.href
                                      ? "text-indigo-600"
                                      : "text-gray-400 group-hover:text-indigo-600"
                                  }`}
                                />
                                <div>
                                  <span className="font-medium">
                                    {child.name}
                                  </span>
                                  <p className="text-xs text-gray-500 group-hover:text-indigo-500">
                                    {child.description}
                                  </p>
                                </div>
                                {child.badge && (
                                  <span
                                    className={`ml-auto w-5 min-w-fit px-2 py-0.5 text-center text-xs rounded-full ${child.badge.color}`}
                                  >
                                    {child.badge.text}
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </Transition>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </li>

          {/* User Profile */}
          <li className="-mx-6 mt-auto">
            <div className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50">
              <img
                className="h-8 w-8 rounded-full bg-gray-50"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true">Ravindrajangir007</span>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
