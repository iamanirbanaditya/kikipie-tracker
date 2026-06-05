"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FaTachometerAlt,
  FaUsers,
  FaCalendarCheck,
  FaMapMarkerAlt,
  FaRoute,
  FaChartBar,
  FaClipboardList,
  FaUserClock,
} from "react-icons/fa";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menus = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: FaTachometerAlt,
    },
    {
      name: "Employees",
      href: "/admin/employees",
      icon: FaUsers,
    },
    {
      name: "Attendance",
      href: "/admin/attendance",
      icon: FaCalendarCheck,
    },
    {
      name: "Live Tracking",
      href: "/admin/live",
      icon: FaMapMarkerAlt,
    },
    {
      name: "Route History",
      href: "/admin/routes",
      icon: FaRoute,
    },
    {
      name: "Reports",
      href: "/admin/reports",
      icon: FaChartBar,
    },
    {
      name: "Summary",
      href: "/admin/summary",
      icon: FaClipboardList,
    },
    {
      name: "Live Employees",
      href: "/admin/live",
      icon: FaUserClock,
    },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });

      window.location.href = "/login";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <aside className="w-72 h-screen overflow-y-auto bg-[#8B0D22] text-white shadow-xl">
      <div className="p-6 border-b border-red-800">
        <h1 className="text-3xl font-bold">
          Kikipie
        </h1>

        <p className="text-white mt-1">
          Employee Tracker
        </p>
      </div>

      <nav className="p-4 space-y-2 pb-10">
        {menus.map((menu) => {
          const Icon = menu.icon;

          const active =
            pathname === menu.href;

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-200 ${
                active
                  ? "bg-white text-[#8B0D22] font-semibold shadow"
                  : "hover:bg-red-800"
              }`}
            >
              <Icon size={18} />

              <span>
                {menu.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-10 p-4 space-y-4">

        <button
          onClick={handleLogout}
          className="w-full bg-black hover:bg-gray-900 text-white p-4 rounded-xl font-semibold"
        >
          Logout
        </button>

        <div className="bg-red-900 rounded-xl p-4">
          <p className="text-white font-semibold">
            System Status
          </p>

          <p className="font-bold text-green-400">
            ● Active
          </p>
        </div>

      </div>
    </aside>
  );
}