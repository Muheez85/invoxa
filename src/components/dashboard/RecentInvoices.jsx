import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import useInvoicesStore from "../../store/invoicesStore";

const RecentInvoices = () => {
  const invoices = useInvoicesStore((state) => state.invoices);

  const recentInvoices = [...invoices]
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 5);

  const calculateTotal = (invoice) => {
    const subtotal = invoice.items.reduce(
      (total, item) => total + item.quantity * item.unitPrice,
      0
    );

    const discount = Number(invoice.discount) || 0;
    const tax = Number(invoice.tax) || 0;

    return subtotal - discount + tax;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

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
      {recentInvoices.length === 0 ? (
        <div className="px-5 py-10 text-center">
          <p className="text-sm font-medium text-[#171717]">
            No invoices yet
          </p>

          <p className="mt-1 text-sm text-[#737373]">
            Create your first invoice to see it here.
          </p>

          <Link
            to="/invoices/new"
            className="mt-4 inline-flex rounded-lg bg-[#171717] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#2D2D2D]"
          >
            Create Invoice
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-[#E7E5E4]">
          {recentInvoices.map((invoice) => {
            const status = invoice.invoiceDetails.status;

            return (
              <Link
                key={invoice.id}
                to={`/invoices/${invoice.id}`}
                className="flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-[#F8F7F4]"
              >
                {/* Invoice + Customer */}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#171717]">
                    {invoice.invoiceDetails.number || "Invoice"}
                  </p>

                  <p className="mt-1 truncate text-sm text-[#737373]">
                    {invoice.customer.name || "No customer"}
                  </p>
                </div>

                {/* Date */}
                <p className="hidden text-sm text-[#737373] sm:block">
                  {formatDate(invoice.invoiceDetails.issueDate)}
                </p>

                {/* Amount */}
                <p className="text-sm font-medium text-[#171717]">
                  {formatCurrency(calculateTotal(invoice))}
                </p>

                {/* Status */}
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    status === "paid"
                      ? "bg-green-50 text-green-700"
                      : "bg-yellow-50 text-yellow-700"
                  }`}
                >
                  {status === "paid" ? "Paid" : "Pending"}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default RecentInvoices;