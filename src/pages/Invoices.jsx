import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search } from "lucide-react";

import useInvoicesStore from "../store/invoicesStore";
import calculateInvoice from "../utils/calculations";

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState("");
 const [statusFilter, setStatusFilter] = useState("all");
  const invoices = useInvoicesStore(
    (state) => state.invoices
  );

  const formatCurrency = (amount) =>
    `₦${Number(amount || 0).toLocaleString()}`;

  const formatDate = (date) => {
    if (!date) return "—";

    const formattedDate = new Date(date);

    if (Number.isNaN(formattedDate.getTime())) {
      return date;
    }

    return formattedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Search invoices
const filteredInvoices = invoices.filter((invoice) => {
  const search = searchTerm.toLowerCase().trim();

  const invoiceNumber =
    invoice.invoiceDetails?.number?.toLowerCase() || "";

  const customerName =
    invoice.customer?.name?.toLowerCase() || "";

  const customerEmail =
    invoice.customer?.email?.toLowerCase() || "";

  const matchesSearch =
    !search ||
    invoiceNumber.includes(search) ||
    customerName.includes(search) ||
    customerEmail.includes(search);

  const invoiceStatus =
    invoice.invoiceDetails?.status || "pending";

  const matchesStatus =
    statusFilter === "all" ||
    invoiceStatus === statusFilter;

  return matchesSearch && matchesStatus;
});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#171717]">
            Invoices
          </h1>

          <p className="mt-1 text-sm text-[#737373]">
            Manage and track all your invoices.
          </p>
        </div>

        <Link
          to="/invoices/new"
          className="inline-flex items-center gap-2 rounded-lg bg-[#171717] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#2D2D2D]"
        >
          <Plus size={17} />
          Create Invoice
        </Link>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 rounded-xl border border-[#E7E5E4] bg-white p-4">
        <div className="relative w-full max-w-md pb-4">
         <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-[#E7E5E4] bg-white px-3 mb-4 py-2.5 text-sm text-[#171717] outline-none focus:border-[#171717]"
          >
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search invoices..."
            className="w-full rounded-lg border border-[#E7E5E4] py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#171717]"
          />
        </div>
      </div>

      {/* Invoice count */}
      <div className="text-sm text-[#737373]">
        {filteredInvoices.length}{" "}
        {filteredInvoices.length === 1
          ? "invoice"
          : "invoices"}
      </div>

      {/* No invoices at all */}
      {invoices.length === 0 ? (
        <div className="rounded-xl border border-[#E7E5E4] bg-white px-6 py-16 text-center">
          <h2 className="text-base font-semibold text-[#171717]">
            No invoices yet
          </h2>

          <p className="mx-auto mt-2 max-w-sm text-sm text-[#737373]">
            Create your first invoice to start tracking
            your business payments.
          </p>

          <Link
            to="/invoices/new"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#171717] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#2D2D2D]"
          >
            <Plus size={17} />
            Create Invoice
          </Link>
        </div>
      ) : filteredInvoices.length === 0 ? (
        /* No search results */
        <div className="rounded-xl border border-[#E7E5E4] bg-white px-6 py-16 text-center">
          <h2 className="text-base font-semibold text-[#171717]">
            No matching invoices
          </h2>

          <p className="mx-auto mt-2 max-w-sm text-sm text-[#737373]">
            Try searching with a different invoice number,
            customer name, or email.
          </p>
        </div>
      ) : (
        /* Invoice Table */
        <div className="overflow-hidden rounded-xl border border-[#E7E5E4] bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead className="border-b border-[#E7E5E4] bg-[#F8F7F4]">
                <tr>
                  <th className="px-5 py-4 text-xs font-medium uppercase tracking-wide text-[#737373]">
                    Invoice
                  </th>

                  <th className="px-5 py-4 text-xs font-medium uppercase tracking-wide text-[#737373]">
                    Customer
                  </th>

                  <th className="px-5 py-4 text-xs font-medium uppercase tracking-wide text-[#737373]">
                    Date
                  </th>

                  <th className="px-5 py-4 text-xs font-medium uppercase tracking-wide text-[#737373]">
                    Amount
                  </th>

                  <th className="px-5 py-4 text-xs font-medium uppercase tracking-wide text-[#737373]">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E7E5E4]">
                {filteredInvoices.map((invoice) => {
                  const { total } =
                    calculateInvoice(invoice);

                  const statusClasses = {
                    pending:
                      "bg-yellow-50 text-yellow-700",
                    paid:
                      "bg-green-50 text-green-700",
                    overdue:
                      "bg-red-50 text-red-700",
                  };

                  const status =
                    invoice.invoiceDetails?.status ||
                    "pending";

                  const statusLabel =
                    status.charAt(0).toUpperCase() +
                    status.slice(1);

                  return (
                    <tr
                      key={invoice.id}
                      className="transition hover:bg-[#FAFAF9]"
                    >
                      <td className="px-5 py-4">
                        <Link
                          to={`/invoices/${invoice.id}`}
                          className="font-medium text-[#171717] hover:underline"
                        >
                          #{invoice.invoiceDetails?.number}
                        </Link>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-[#171717]">
                          {invoice.customer?.name ||
                            "Customer Name"}
                        </p>

                        <p className="mt-1 text-xs text-[#737373]">
                          {invoice.customer?.email || "—"}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm text-[#737373]">
                        {formatDate(
                          invoice.invoiceDetails?.issueDate
                        )}
                      </td>

                      <td className="px-5 py-4 text-sm font-medium text-[#171717]">
                        {formatCurrency(total)}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                            statusClasses[status] ||
                            "bg-[#F1F1EF] text-[#737373]"
                          }`}
                        >
                          {statusLabel}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoices;