
import { useEffect, useRef, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { ArrowLeft, Pencil, Printer, Download } from "lucide-react";

import useInvoicesStore from "../store/invoicesStore";
import calculateInvoice from "../utils/calculations";
import generatePDF from "../utils/generatePDF";

const InvoiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
const location = useLocation();

  const invoiceRef = useRef(null);

  const markAsPaid = useInvoicesStore(
    (state) => state.markAsPaid
  );

  const invoice = useInvoicesStore((state) =>
    state.invoices.find(
      (invoice) => String(invoice.id) === String(id)
    )
  );
  const [successMessage, setSuccessMessage] = useState(
  location.state?.message || ""
);

useEffect(() => {
  if (!location.state?.message) return;

  navigate(location.pathname, {
    replace: true,
    state: {},
  });

  const timer = setTimeout(() => {
    setSuccessMessage("");
  }, 3000);

  return () => clearTimeout(timer);
}, [location, navigate]);

  if (!invoice) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-xl font-semibold text-[#171717]">
          Invoice not found
        </h1>

        <p className="mt-2 text-sm text-[#737373]">
          The invoice you're looking for doesn't exist.
        </p>

        <Link
          to="/invoices"
          className="mt-5 rounded-lg bg-[#171717] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#2D2D2D]"
        >
          Back to Invoices
        </Link>
      </div>
    );
  }

  const {
    business,
    customer,
    invoiceDetails,
    items,
    notes,
    payment,
  } = invoice;

  const {
    subtotal,
    discount,
    tax,
    total,
  } = calculateInvoice(invoice);

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

  const statusLabel =
    invoiceDetails.status?.charAt(0).toUpperCase() +
      invoiceDetails.status?.slice(1) || "Pending";

  const statusClasses = {
    pending: "bg-yellow-50 text-yellow-700",
    paid: "bg-green-50 text-green-700",
    overdue: "bg-red-50 text-red-700",
  };

  const handleDownloadPDF = () => {
  generatePDF(
    invoice,
    invoiceDetails.number
  );
};
  return (
    <div className="space-y-6">
      {successMessage && (
  <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
    {successMessage}
  </div>
)}
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            to="/invoices"
            className="mb-3 inline-flex items-center gap-2 text-sm text-[#737373] hover:text-[#171717]"
          >
            <ArrowLeft size={16} />
            Back to Invoices
          </Link>

          <h1 className="text-2xl font-semibold tracking-tight text-[#171717]">
            Invoice #{invoiceDetails.number}
          </h1>

          <p className="mt-1 text-sm text-[#737373]">
            View invoice details and payment information.
          </p>
        </div>

        {/* Invoice Actions */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Print */}
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-lg border border-[#E7E5E4] bg-white px-4 py-2.5 text-sm font-medium text-[#171717] transition hover:bg-[#F8F7F4]"
          >
            <Printer size={17} />
            Print
          </button>

          {/* Download PDF */}
          <button
            type="button"
            onClick={handleDownloadPDF}
            className="inline-flex items-center gap-2 rounded-lg border border-[#E7E5E4] bg-white px-4 py-2.5 text-sm font-medium text-[#171717] transition hover:bg-[#F8F7F4]"
          >
            <Download size={17} />
            Download PDF
          </button>

          {/* Mark as Paid */}
          <button
            type="button"
            onClick={() => {
              markAsPaid(id);
            }}
            disabled={invoiceDetails.status === "paid"}
            className="rounded-lg bg-[#171717] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#2D2D2D] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {invoiceDetails.status === "paid"
              ? "Paid"
              : "Mark as Paid"}
          </button>

          {/* Edit */}
          <button
            type="button"
            onClick={() =>
              navigate(`/invoices/${invoice.id}/edit`)
            }
            className="inline-flex items-center gap-2 rounded-lg bg-[#171717] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#2D2D2D]"
          >
            <Pencil size={17} />
            Edit
          </button>
        </div>
      </div>

      {/* Invoice Document */}
      <div
        ref={invoiceRef}
        className="mx-auto max-w-4xl rounded-xl border border-[#E7E5E4] bg-white p-6 sm:p-10"
      >
        {/* Invoice Header */}
        <div className="flex flex-col gap-6 border-b border-[#E7E5E4] pb-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-[#171717]">
              {business.name || "Business Name"}
            </h2>

            <div className="mt-3 space-y-1 text-sm text-[#737373]">
              {business.email && <p>{business.email}</p>}
              {business.phone && <p>{business.phone}</p>}
              {business.address && <p>{business.address}</p>}
            </div>
          </div>

          <div className="sm:text-right">
            <p className="text-3xl font-semibold tracking-tight text-[#171717]">
              INVOICE
            </p>

            <p className="mt-2 text-sm text-[#737373]">
              #{invoiceDetails.number}
            </p>

            <span
              className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                statusClasses[invoiceDetails.status] ||
                "bg-[#F1F1EF] text-[#737373]"
              }`}
            >
              {statusLabel}
            </span>
          </div>
        </div>

        {/* Customer + Invoice Info */}
        <div className="grid grid-cols-1 gap-8 border-b border-[#E7E5E4] py-8 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[#737373]">
              Bill To
            </p>

            <p className="mt-2 text-sm font-semibold text-[#171717]">
              {customer.name || "Customer Name"}
            </p>

            <div className="mt-2 space-y-1 text-sm text-[#737373]">
              {customer.email && <p>{customer.email}</p>}
              {customer.phone && <p>{customer.phone}</p>}
              {customer.address && <p>{customer.address}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 sm:text-right">
            <div>
              <p className="text-xs text-[#737373]">
                Invoice Date
              </p>

              <p className="mt-1 text-sm font-medium text-[#171717]">
                {formatDate(invoiceDetails.issueDate)}
              </p>
            </div>

            <div>
              <p className="text-xs text-[#737373]">
                Due Date
              </p>

              <p className="mt-1 text-sm font-medium text-[#171717]">
                {formatDate(invoiceDetails.dueDate)}
              </p>
            </div>

            <div className="col-span-2">
              <p className="text-xs text-[#737373]">
                Payment Terms
              </p>

              <p className="mt-1 text-sm font-medium text-[#171717]">
                {invoiceDetails.paymentTerms || "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="py-8">
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-[#E7E5E4] pb-3 text-xs font-medium uppercase tracking-wide text-[#737373]">
            <p>Description</p>
            <p className="text-right">Qty</p>
            <p className="w-28 text-right">Amount</p>
          </div>

          <div className="space-y-5 pt-5">
            {items.map((item) => {
              const amount =
                Number(item.quantity || 0) *
                Number(item.unitPrice || 0);

              return (
                <div
                  key={item.id}
                  className="grid grid-cols-[1fr_auto_auto] gap-4 text-sm"
                >
                  <div>
                    <p className="font-medium text-[#171717]">
                      {item.description || "Item description"}
                    </p>

                    <p className="mt-1 text-xs text-[#737373]">
                      {formatCurrency(item.unitPrice)} each
                    </p>
                  </div>

                  <p className="text-right text-[#737373]">
                    {item.quantity}
                  </p>

                  <p className="w-28 text-right font-medium text-[#171717]">
                    {formatCurrency(amount)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary */}
        <div className="border-t border-[#E7E5E4] pt-6">
          <div className="ml-auto max-w-xs space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[#737373]">
                Subtotal
              </span>

              <span className="font-medium text-[#171717]">
                {formatCurrency(subtotal)}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-[#737373]">
                Discount
              </span>

              <span className="font-medium text-[#171717]">
                -{formatCurrency(discount)}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-[#737373]">
                Tax
              </span>

              <span className="font-medium text-[#171717]">
                {formatCurrency(tax)}
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-[#E7E5E4] pt-4">
              <span className="text-base font-semibold text-[#171717]">
                Total
              </span>

              <span className="text-xl font-semibold text-[#171717]">
                {formatCurrency(total)}
              </span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {notes && (
          <div className="mt-8 border-t border-[#E7E5E4] pt-6">
            <p className="text-xs font-medium uppercase tracking-wide text-[#737373]">
              Notes
            </p>

            <p className="mt-2 text-sm leading-6 text-[#737373]">
              {notes}
            </p>
          </div>
        )}

        {/* Payment */}
        {(payment.bankName ||
          payment.accountName ||
          payment.accountNumber) && (
          <div className="mt-8 border-t border-[#E7E5E4] pt-6">
            <p className="text-xs font-medium uppercase tracking-wide text-[#737373]">
              Payment Information
            </p>

            <div className="mt-2 space-y-1 text-sm text-[#737373]">
              {payment.bankName && (
                <p>{payment.bankName}</p>
              )}

              {payment.accountName && (
                <p>
                  Account Name: {payment.accountName}
                </p>
              )}

              {payment.accountNumber && (
                <p>
                  Account Number: {payment.accountNumber}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 border-t border-[#E7E5E4] pt-6 text-center">
          <p className="text-sm text-[#737373]">
            Thank you for choosing{" "}
            {business.name || "us"}.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
