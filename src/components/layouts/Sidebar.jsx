import {
  LayoutDashboard,
  FileText,
  Settings,
  Plus,
  X,
} from "lucide-react";

import { NavLink, Link } from "react-router-dom";

const Sidebar = ({ mobile = false, onClose }) => {
  const navClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
      isActive
        ? "bg-[#F1F1EF] text-[#171717]"
        : "text-[#737373] hover:bg-[#F8F7F4] hover:text-[#171717]"
    }`;

  const handleNavigation = () => {
    if (mobile && onClose) {
      onClose();
    }
  };

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-[#E7E5E4] bg-white">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#E7E5E4] px-6">
        <h1 className="text-xl font-semibold tracking-tight text-[#171717]">
          Invoxa
        </h1>

        {/* Mobile Close */}
        {mobile && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#737373] hover:bg-[#F8F7F4] hover:text-[#171717]"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          <NavLink
            to="/"
            onClick={handleNavigation}
            className={navClass}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/invoices"
            onClick={handleNavigation}
            className={navClass}
          >
            <FileText size={18} />
            <span>Invoices</span>
          </NavLink>

          <NavLink
            to="/settings"
            onClick={handleNavigation}
            className={navClass}
          >
            <Settings size={18} />
            <span>Settings</span>
          </NavLink>
        </div>
      </nav>

      {/* Create Invoice */}
      <div className="shrink-0 border-t border-[#E7E5E4] p-4">
        <Link
          to="/invoices/new"
          onClick={handleNavigation}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#171717] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#2D2D2D]"
        >
          <Plus size={18} />
          <span>Create Invoice</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;