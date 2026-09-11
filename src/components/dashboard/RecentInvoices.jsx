import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const RecentInvoices = () => {
  const invoices = [
    {
      id: "INV-001",
      customer: "John Doe",
      date: "Sep 5, 2026",
      amount: "₦150,000",
      status: "Paid",
    },
    {
      id: "INV-002",
      customer: "Sarah Ltd",
      date: "Sep 4, 2026",
      amount: "₦85,000",
      status: "Pending",
    },
    {
      id: "INV-003",
      customer: "Mike Store",
      date: "Sep 2, 2026",
      amount: "₦220,000",
      status: "Paid",
    },
  ];

  return (
    <section className="rounded-xl border border-[#E7E5E4] bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E7E5E4] px-4 py-4">
        <div>
          <h2 className="text-base font-semibold text-[#171717]">
            Recent Invoices
          </h2>

          <p className="mt-1 text-sm text-[#737373]">
            Your latest invoice activity.
          </p>
        </div>

        <Link
          to="/invoices"
          className="flex items-center gap-1 text-sm font-medium text-[#171717] hover:underline"
        >
          View all
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Invoice List */}
      <div className="divide-y divide-[#E7E5E4]">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="flex items-center justify-between gap-4 px-5 py-4"
          >
            {/* Invoice + Customer */}
            <div className="min-w-0">
              <p className="text-sm font-medium text-[#171717]">
                {invoice.id}
              </p>

              <p className="mt-1 truncate text-sm text-[#737373]">
                {invoice.customer}
              </p>
            </div>

            {/* Date */}
            <p className="hidden text-sm text-[#737373] sm:block">
              {invoice.date}
            </p>

            {/* Amount */}
            <p className="text-sm font-medium text-[#171717]">
              {invoice.amount}
            </p>

            {/* Status */}
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                invoice.status === "Paid"
                  ? "bg-green-50 text-green-700"
                  : "bg-yellow-50 text-yellow-700"
              }`}
            >
              {invoice.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentInvoices;