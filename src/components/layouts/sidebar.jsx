import {
  LayoutDashboard,
  FileText,
  Settings,
  Plus,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
   <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col overflow-y-auto border-r border-[#E7E5E4] bg-white">
      
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center border-b border-[#E7E5E4] px-6">
        <h1 className="text-xl font-semibold tracking-tight text-[#171717]">
          Invoxa
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-[#F1F1EF] text-[#171717]"
                  : "text-[#737373] hover:bg-[#F8F7F4] hover:text-[#171717]"
              }`
            }
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/invoices"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-[#F1F1EF] text-[#171717]"
                  : "text-[#737373] hover:bg-[#F8F7F4] hover:text-[#171717]"
              }`
            }
          >
            <FileText size={18} />
            <span>Invoices</span>
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-[#F1F1EF] text-[#171717]"
                  : "text-[#737373] hover:bg-[#F8F7F4] hover:text-[#171717]"
              }`
            }
          >
            <Settings size={18} />
            <span>Settings</span>
          </NavLink>

        </div>
      </nav>

      {/* Create Invoice */}
      <div className="shrink-0 border-t border-[#E7E5E4] p-4">
       <a
          href="/invoices/new"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#171717] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#2D2D2D]"
        >
           <Plus size={18} />
          <span>Create Invoice</span>
      </a>
      </div>

    </aside>
  );
};

export default Sidebar;






// const Sidebar = () => {
//   return (
//     <aside className="w-64 bg-white p-6">
//       <a
//         href="/invoices/new"
//         className="block bg-black p-4 text-center text-white"
//       >
//         TEST CREATE INVOICE
//       </a>
//     </aside>
//   );
// };

// export default Sidebar;


















// import {
//   LayoutDashboard,
//   FileText,
//   Settings,
//   Plus,
// } from "lucide-react";

// const Sidebar = () => {
//   return (
//     <aside className="hidden h-screen w-64 shrink-0 border-r border-[#E7E5E4] bg-white md:flex md:flex-col">
//       {/* Logo */}
//       <div className="flex h-16 items-center border-b border-[#E7E5E4] px-6">
//         <h1 className="text-xl font-semibold tracking-tight text-[#171717]">
//           Invoxa
//         </h1>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 space-y-1 p-4">
//         <a
//           href="#"
//           className="flex items-center gap-3 rounded-lg bg-[#F1F1EF] px-3 py-2.5 text-sm font-medium text-[#171717]"
//         >
//           <LayoutDashboard size={18} />
//           <span>Dashboard</span>
//         </a>

//         <a
//           href="#"
//           className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#737373] hover:bg-[#F8F7F4] hover:text-[#171717]"
//         >
//           <FileText size={18} />
//           <span>Invoices</span>
//         </a>

//         <a
//           href="#"
//           className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#737373] hover:bg-[#F8F7F4] hover:text-[#171717]"
//         >
//           <Settings size={18} />
//           <span>Settings</span>
//         </a>
//       </nav>

//       {/* Create Invoice */}
//       <div className="border-t border-[#E7E5E4] p-4">
//         <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#171717] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#2D2D2D]">
//           <Plus size={18} />
//           <span>Create Invoice</span>
//         </button>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;