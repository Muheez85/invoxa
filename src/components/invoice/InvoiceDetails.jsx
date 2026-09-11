import useInvoicesStore from "../../store/invoicesStore";

const InvoiceDetails = () => {
  const invoiceDetails = useInvoicesStore(
    (state) => state.currentInvoice.invoiceDetails
  );

  const updateInvoice = useInvoicesStore(
    (state) => state.updateInvoice
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    updateInvoice("invoiceDetails", {
      [name]: value,
    });
  };

  return (
    <section className="rounded-xl border border-[#E7E5E4] bg-white p-6">
      {/* Section Header */}
      <h2 className="text-base font-semibold text-[#171717]">
        Invoice Details
      </h2>

      <p className="mt-1 text-sm text-[#737373]">
        Invoice number, dates, payment terms and status.
      </p>

      {/* Form */}
      <div className="mt-5 grid grid-cols-2 gap-4">

        {/* Invoice Number */}
        <div>
          <label
            htmlFor="invoice-number"
            className="mb-2 block text-sm font-medium text-[#171717]"
          >
            Invoice Number
          </label>

          <input
            id="invoice-number"
            type="text"
            name="number"
            value={invoiceDetails.number}
            onChange={handleChange}
            placeholder="e.g. INV-001"
            className="w-full rounded-lg border border-[#E7E5E4] px-3 py-2.5 text-sm outline-none transition focus:border-[#171717]"
          />
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="invoice-status"
            className="mb-2 block text-sm font-medium text-[#171717]"
          >
            Status
          </label>

          <select
            id="invoice-status"
            name="status"
            value={invoiceDetails.status}
            onChange={handleChange}
            className="w-full rounded-lg border border-[#E7E5E4] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#171717]"
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        {/* Issue Date */}
        <div>
          <label
            htmlFor="issue-date"
            className="mb-2 block text-sm font-medium text-[#171717]"
          >
            Issue Date
          </label>

          <input
            id="issue-date"
            type="date"
            name="issueDate"
            value={invoiceDetails.issueDate}
            onChange={handleChange}
            className="w-full rounded-lg border border-[#E7E5E4] px-3 py-2.5 text-sm outline-none transition focus:border-[#171717]"
          />
        </div>

        {/* Due Date */}
        <div>
          <label
            htmlFor="due-date"
            className="mb-2 block text-sm font-medium text-[#171717]"
          >
            Due Date
          </label>

          <input
            id="due-date"
            type="date"
            name="dueDate"
            value={invoiceDetails.dueDate}
            onChange={handleChange}
            className="w-full rounded-lg border border-[#E7E5E4] px-3 py-2.5 text-sm outline-none transition focus:border-[#171717]"
          />
        </div>

        {/* Payment Terms */}
        <div className="col-span-2">
          <label
            htmlFor="payment-terms"
            className="mb-2 block text-sm font-medium text-[#171717]"
          >
            Payment Terms
          </label>

          <select
            id="payment-terms"
            name="paymentTerms"
            value={invoiceDetails.paymentTerms}
            onChange={handleChange}
            className="w-full rounded-lg border border-[#E7E5E4] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#171717]"
          >
            <option value="Due on receipt">Due on receipt</option>
            <option value="7 days">Due within 7 days</option>
            <option value="14 days">Due within 14 days</option>
            <option value="30 days">Due within 30 days</option>
            <option value="60 days">Due within 60 days</option>
          </select>
        </div>

      </div>
    </section>
  );
};

export default InvoiceDetails;