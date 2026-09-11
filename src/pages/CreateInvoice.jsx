import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useInvoicesStore from "../store/invoicesStore";
import InvoicePreview from "../components/invoice/InvoicePreview";
import BusinessDetails from "../components/invoice/BusinessDetails";
import CustomerDetails from "../components/invoice/CustomerDetails";
import InvoiceDetails from "../components/invoice/InvoiceDetails";
import InvoiceItems from "../components/invoice/InvoiceItems";
import InvoiceSummary from "../components/invoice/InvoiceSummary";
import Notes from "../components/invoice/Notes";
import PaymentDetails from "../components/invoice/PaymentDetails";


const CreateInvoice = () => {
  const createNewInvoice = useInvoicesStore(
  (state) => state.createNewInvoice
);


const navigate = useNavigate();
const currentInvoice = useInvoicesStore(
  (state) => state.currentInvoice
);

const [errors, setErrors] = useState([]);

 const saveInvoice = useInvoicesStore(
    (state) => state.saveInvoice
  );


useEffect(() => {
  createNewInvoice();
}, [createNewInvoice]);


const validateInvoice = () => {
  const validationErrors = [];

  if (!currentInvoice.business.name.trim()) {
    validationErrors.push("Business name is required.");
  }

  if (!currentInvoice.customer.name.trim()) {
    validationErrors.push("Customer name is required.");
  }

  if (!currentInvoice.invoiceDetails.issueDate) {
    validationErrors.push("Invoice date is required.");
  }

  if (!currentInvoice.invoiceDetails.dueDate) {
    validationErrors.push("Due date is required.");
  }

  if (!currentInvoice.items.length) {
    validationErrors.push("Add at least one invoice item.");
  }

  currentInvoice.items.forEach((item, index) => {
    if (!item.description.trim()) {
      validationErrors.push(
        `Item ${index + 1}: description is required.`
      );
    }

    if (Number(item.quantity) <= 0) {
      validationErrors.push(
        `Item ${index + 1}: quantity must be greater than 0.`
      );
    }

    if (Number(item.unitPrice) < 0) {
      validationErrors.push(
        `Item ${index + 1}: price cannot be negative.`
      );
    }
  });

  setErrors(validationErrors);

  return validationErrors.length === 0;
};

const handleSave = () => {
  if (!validateInvoice()) {
    return;
  }

  const invoiceId = saveInvoice();
  navigate(`/invoices/${invoiceId}`);
};
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#171717]">
            Create Invoice
          </h1>

          <p className="mt-1 text-sm text-[#737373]">
            Create and manage a new invoice.
          </p>
          {errors.length > 0 && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm font-medium text-red-800">
                  Please fix the following:
                </p>

                <ul className="mt-2 space-y-1 text-sm text-red-700">
                  {errors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/invoices"
            className="rounded-lg border border-[#E7E5E4] bg-white px-4 py-2.5 text-sm font-medium text-[#171717] transition hover:bg-[#F8F7F4]"
          >
            Cancel
          </Link>

          <button
          type="button"
           onClick={handleSave}
            className="rounded-lg bg-[#171717] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#2D2D2D]"
          >
            Save Invoice
          </button>
        </div>
      </div>

      {/* Form + Preview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">

        {/* Form Area */}
        <div className="space-y-6">
          <BusinessDetails />

          <CustomerDetails />

          <InvoiceDetails />

          <InvoiceItems />

          <InvoiceSummary />

          <Notes />

          <PaymentDetails />
          <div className="flex items-center justify-end gap-3 border-t border-[#E7E5E4] pt-6">
                <Link
                  to="/invoices"
                  className="rounded-lg border border-[#E7E5E4] bg-white px-4 py-2.5 text-sm font-medium text-[#171717] transition hover:bg-[#F8F7F4]"
                >
                  Cancel
                </Link>

                <button
                  type="button"
                   onClick={handleSave}
                  className="rounded-lg bg-[#171717] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#2D2D2D]"
                >
                  Save Invoice
                </button>
            </div>
        </div>

        {/* Invoice Preview */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <InvoicePreview />
        </div>

      </div>
    </div>
  );
};

export default CreateInvoice;