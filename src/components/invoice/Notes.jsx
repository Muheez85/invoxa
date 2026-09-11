import useInvoicesStore from "../../store/invoicesStore";

const Notes = () => {
  const notes = useInvoicesStore(
    (state) => state.currentInvoice.notes
  );

  const updateField = useInvoicesStore(
    (state) => state.updateField
  );

  return (
    <section className="rounded-xl border border-[#E7E5E4] bg-white p-6">
      <h2 className="text-base font-semibold text-[#171717]">
        Notes
      </h2>

      <p className="mt-1 text-sm text-[#737373]">
        Add any additional information for your customer.
      </p>

      <div className="mt-5">
        <textarea
          value={notes}
          onChange={(e) =>
            updateField("notes", e.target.value)
          }
          placeholder="e.g. Thank you for your business."
          rows="4"
          className="w-full resize-none rounded-lg border border-[#E7E5E4] px-3 py-2.5 text-sm outline-none focus:border-[#171717]"
        />
      </div>
    </section>
  );
};

export default Notes;