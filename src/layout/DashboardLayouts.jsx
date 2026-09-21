import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../../components/layouts/Sidebar";
import Navbar from "../../components/layouts/Navbar";

const DashboardLayouts = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8F7F4]">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* Mobile Sidebar */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Overlay */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/30"
              aria-label="Close menu"
            />

            {/* Drawer */}
            <div className="relative h-full w-64 bg-white shadow-xl">
              <Sidebar
                mobile
                onClose={() => setMobileMenuOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayouts;