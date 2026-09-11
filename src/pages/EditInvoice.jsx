import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import useInvoicesStore from "../store/invoicesStore";

import BusinessDetails from "../components/invoice/BusinessDetails";
import CustomerDetails from "../components/invoice/CustomerDetails";
import InvoiceDetails from "../components/invoice/InvoiceDetails";
import InvoiceItems from "../components/invoice/InvoiceItems";
import InvoiceSummary from "../components/invoice/InvoiceSummary";
import Notes from "../components/invoice/Notes";
import PaymentDetails from "../components/invoice/PaymentDetails";
import InvoicePreview from "../components/invoice/InvoicePreview";

const EditInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
const deleteInvoice = useInvoicesStore(
  (state) => state.deleteInvoice
);
  const [notFound, setNotFound] = useState(false);

  const loadInvoiceForEdit = useInvoicesStore(
    (state) => state.loadInvoiceForEdit
  );

  const updateInvoiceById = useInvoicesStore(
    (state) => state.updateInvoiceById
  );

  useEffect(() => {
    const loaded = loadInvoiceForEdit(id);

    if (!loaded) {
      setNotFound(true);
    }
  }, [id, loadInvoiceForEdit]);

 const handleUpdate = () => {
  updateInvoiceById(id);

  navigate(`/invoices/${id}`, {
    state: {
      message: "Invoice updated successfully.",
    },
  });
};
  if (notFound) {
    return (
      <div className="rounded-xl border border-[#E7E5E4] bg-white px-6 py-16 text-center">
        <h2 className="text-lg font-semibold text-[#171717]">
          Invoice not found
        </h2>

        <p className="mt-2 text-sm text-[#737373]">
          The invoice you're trying to edit doesn't exist.
        </p>

        <Link
          to="/invoices"
          className="mt-5 inline-flex rounded-lg bg-[#171717] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#2D2D2D]"
        >
          Back to Invoices
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#171717]">
            Edit Invoice
          </h1>

          <p className="mt-1 text-sm text-[#737373]">
            Update the details of this invoice.
          </p>
        </div>

        <Link
          to={`/invoices/${id}`}
          className="w-fit rounded-lg border border-[#E7E5E4] bg-white px-4 py-2.5 text-sm font-medium text-[#171717] hover:bg-[#F8F7F4]"
        >
          Cancel
        </Link>
      </div>

      {/* Form + Preview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Form */}
        <div className="space-y-6">
          <BusinessDetails />
          <CustomerDetails />
          <InvoiceDetails />
          <InvoiceItems />
          <InvoiceSummary />
          <Notes />
          <PaymentDetails />

          {/* Save */}
          <div className="flex justify-end gap-3 border-t border-[#E7E5E4] pt-6">
            <Link
              to={`/invoices/${id}`}
              className="rounded-lg border border-[#E7E5E4] bg-white px-4 py-2.5 text-sm font-medium text-[#171717] hover:bg-[#F8F7F4]"
            >
              Cancel
            </Link>

            <button
              type="button"
              onClick={handleUpdate}
              className="rounded-lg bg-[#171717] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#2D2D2D]"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <InvoicePreview />
        </div>
      </div>
       <button
          type="button"
          onClick={() => {
            const confirmed = window.confirm(
              "Are you sure you want to delete this invoice?"
            );

            if (!confirmed) return;

            deleteInvoice(id);
            navigate("/invoices");
          }}
          className="rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-700 transition hover:bg-red-50"
        >
          Delete
        </button>
    </div>
  );
};

export default EditInvoice;