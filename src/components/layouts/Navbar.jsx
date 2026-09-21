import { Bell, Menu } from "lucide-react";
import useInvoicesStore from "../../store/invoicesStore";

const Navbar = ({ setMobileMenuOpen }) => {
  const businessName = useInvoicesStore(
    (state) => state.settings.business.name
  );

  const displayName = businessName || "Your Business";

  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#E7E5E4] bg-white px-4 sm:px-6">
      {/* Mobile Menu */}
      <button
        type="button"
        onClick={() => setMobileMenuOpen(true)}
        className="rounded-lg p-2 text-[#737373] transition hover:bg-[#F8F7F4] md:hidden"
        aria-label="Open menu"
      >
        <Menu size={21} />
      </button>

      <div className="hidden md:block" />

      {/* Right Side */}
      <div className="ml-auto flex items-center gap-3">
        {/* Notifications */}
        <button
          type="button"
          className="rounded-lg p-2 text-[#737373] transition hover:bg-[#F8F7F4]"
          aria-label="Notifications"
        >
          <Bell size={19} />
        </button>

        {/* Business Account */}
        <div className="flex items-center gap-3 border-l border-[#E7E5E4] pl-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#171717] text-sm font-medium text-white">
            {initial}
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-medium text-[#171717]">
              {displayName}
            </p>

            <p className="text-xs text-[#737373]">
              Business account
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;