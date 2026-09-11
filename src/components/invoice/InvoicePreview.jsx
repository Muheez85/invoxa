import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import useInvoicesStore from "../../store/invoicesStore";

const InvoicePreview = () => {
  const invoice = useInvoicesStore(
    (state) => state.currentInvoice
  );

  const {
    business,
    customer,
    invoiceDetails,
    items,
    discount,
    tax,
    notes,
    payment,
  } = invoice;

  // Calculate invoice totals
  const subtotal = items.reduce(
    (total, item) =>
      total +
      Number(item.quantity || 0) *
        Number(item.unitPrice || 0),
    0
  );

  const discountAmount = Number(discount) || 0;
  const taxAmount = Number(tax) || 0;

  const total = subtotal - discountAmount + taxAmount;

  // Format currency
  const formatCurrency = (amount) => {
    return `₦${Number(amount || 0).toLocaleString()}`;
  };

  // Format dates
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

  // Format status
  const statusLabel =
    invoiceDetails.status?.charAt(0).toUpperCase() +
      invoiceDetails.status?.slice(1) || "Pending";

  const statusClasses = {
    pending: "bg-yellow-50 text-yellow-700",
    paid: "bg-green-50 text-green-700",
    overdue: "bg-red-50 text-red-700",
  };

  return (
    <div className="lg:sticky lg:top-6">
      <div className="rounded-xl border border-[#E7E5E4] bg-white p-4 sm:p-6">

        {/* Invoice Document */}
        <div className="border border-[#E7E5E4] bg-white p-5 sm:p-8">

          {/* Header */}
          <div className="flex flex-col gap-6 border-b border-[#E7E5E4] pb-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-[#171717]">
                Invoxa
              </h2>

              <p className="mt-1 text-xs text-[#737373]">
                Invoice management, made simple.
              </p>
            </div>

            <div className="sm:text-right">
              <p className="text-2xl font-semibold tracking-tight text-[#171717]">
                INVOICE
              </p>

              <p className="mt-1 text-sm text-[#737373]">
                #{invoiceDetails.number || "—"}
              </p>
            </div>
          </div>

          {/* Business + Customer */}
          <div className="grid grid-cols-1 gap-6 border-b border-[#E7E5E4] py-6 sm:grid-cols-2">

            {/* From */}
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-[#737373]">
                From
              </p>

              <p className="mt-2 text-sm font-semibold text-[#171717]">
                {business.name || "Business Name"}
              </p>

              <div className="mt-2 space-y-1 text-xs text-[#737373]">

                {business.email && (
                  <p className="flex items-center gap-2">
                    <Mail size={13} />
                    {business.email}
                  </p>
                )}

                {business.phone && (
                  <p className="flex items-center gap-2">
                    <Phone size={13} />
                    {business.phone}
                  </p>
                )}

                {business.address && (
                  <p className="flex items-start gap-2">
                    <MapPin
                      size={13}
                      className="mt-0.5 shrink-0"
                    />
                    {business.address}
                  </p>
                )}

              </div>
            </div>

            {/* Bill To */}
            <div className="sm:text-right">
              <p className="text-xs font-medium uppercase tracking-wide text-[#737373]">
                Bill To
              </p>

              <p className="mt-2 text-sm font-semibold text-[#171717]">
                {customer.name || "Customer Name"}
              </p>

              <div className="mt-2 space-y-1 text-xs text-[#737373]">
                {customer.email && <p>{customer.email}</p>}
                {customer.phone && <p>{customer.phone}</p>}
                {customer.address && <p>{customer.address}</p>}
              </div>
            </div>
          </div>

          {/* Invoice Information */}
          <div className="grid grid-cols-2 gap-4 border-b border-[#E7E5E4] py-6 sm:grid-cols-4">

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

            <div>
              <p className="text-xs text-[#737373]">
                Payment Terms
              </p>

              <p className="mt-1 text-sm font-medium text-[#171717]">
                {invoiceDetails.paymentTerms || "—"}
              </p>
            </div>

            <div>
              <p className="text-xs text-[#737373]">
                Status
              </p>

              <span
                className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                  statusClasses[invoiceDetails.status] ||
                  "bg-[#F1F1EF] text-[#737373]"
                }`}
              >
                {statusLabel}
              </span>
            </div>
          </div>

          {/* Items */}
          <div className="py-6">

            <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-[#E7E5E4] pb-3 text-xs font-medium uppercase tracking-wide text-[#737373]">
              <p>Description</p>
              <p className="text-right">Qty</p>
              <p className="w-24 text-right">Amount</p>
            </div>

            <div className="space-y-4 pt-4">

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

                    <p className="w-24 text-right font-medium text-[#171717]">
                      {formatCurrency(amount)}
                    </p>
                  </div>
                );
              })}

            {items.length === 0 && (
              <p className="py-4 text-center text-xs text-[#737373]">
                No invoice items added yet.
              </p>
            )}

          </div>

          {/* Summary */}
          <div className="border-t border-[#E7E5E4] pt-5">
            <div className="ml-auto w-full max-w-xs space-y-3">

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
                  -{formatCurrency(discountAmount)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-[#737373]">
                  Tax
                </span>

                <span className="font-medium text-[#171717]">
                  {formatCurrency(taxAmount)}
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

              <p className="mt-2 text-xs leading-5 text-[#737373]">
                {notes}
              </p>
            </div>
          )}

          {/* Payment Information */}
          {(payment.bankName ||
            payment.accountName ||
            payment.accountNumber) && (
            <div className="mt-6 border-t border-[#E7E5E4] pt-6">
              <p className="text-xs font-medium uppercase tracking-wide text-[#737373]">
                Payment Information
              </p>

              <div className="mt-2 text-xs leading-5 text-[#737373]">
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
          <div className="mt-8 border-t border-[#E7E5E4] pt-5 text-center">
            <p className="text-xs text-[#737373]">
              Thank you for choosing{" "}
              {business.name || "us"}.
            </p>
          </div>

        </div>
      </div>
    </div>
    </div>
  );
};

export default InvoicePreview;


