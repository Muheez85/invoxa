import { Link } from "react-router-dom";
import useInvoicesStore from "../../store/invoicesStore";

const StatsInfo = () => {
  const businessName = useInvoicesStore(
    (state) => state.settings.business.name
  );

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-[#737373]">
          Welcome back
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#171717] sm:text-3xl">
          Hi, {businessName || "Your Business"}
        </h1>

        <p className="mt-1 text-sm text-[#737373]">
          Here's your invoice overview.
        </p>
      </div>

      <Link
        to="/invoices/new"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#171717] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#2D2D2D] sm:w-auto"
      >
        <span className="text-lg leading-none">+</span>
        Create Invoice
      </Link>
    </div>
  );
};

export default StatsInfo;