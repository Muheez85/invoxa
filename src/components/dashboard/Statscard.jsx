import useInvoicesStore from "../../store/invoicesStore";

const Statscard = () => {
  const invoices = useInvoicesStore((state) => state.invoices);

  const totalInvoices = invoices.length;

  const paidInvoices = invoices.filter(
    (invoice) => invoice.invoiceDetails.status === "paid"
  ).length;

  const pendingInvoices = invoices.filter(
    (invoice) => invoice.invoiceDetails.status === "pending"
  ).length;

  const totalRevenue = invoices
    .filter((invoice) => invoice.invoiceDetails.status === "paid")
    .reduce((total, invoice) => {
      const subtotal = invoice.items.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0
      );

      const discount = Number(invoice.discount) || 0;
      const tax = Number(invoice.tax) || 0;

      const invoiceTotal = subtotal - discount + tax;

      return total + invoiceTotal;
    }, 0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-xl border border-[#E7E5E4] bg-white p-5">
        <p className="text-sm text-[#737373]">Total Invoices</p>
        <p className="mt-2 text-2xl font-semibold text-[#171717]">
          {totalInvoices}
        </p>
      </div>

      <div className="rounded-xl border border-[#E7E5E4] bg-white p-5">
        <p className="text-sm text-[#737373]">Paid</p>
        <p className="mt-2 text-2xl font-semibold text-[#171717]">
          {paidInvoices}
        </p>
      </div>

      <div className="rounded-xl border border-[#E7E5E4] bg-white p-5">
        <p className="text-sm text-[#737373]">Pending</p>
        <p className="mt-2 text-2xl font-semibold text-[#171717]">
          {pendingInvoices}
        </p>
      </div>

      <div className="rounded-xl border border-[#E7E5E4] bg-white p-5">
        <p className="text-sm text-[#737373]">Total Revenue</p>
        <p className="mt-2 text-2xl font-semibold text-[#171717]">
          {formatCurrency(totalRevenue)}
        </p>
      </div>
    </div>
  );
};

export default Statscard;