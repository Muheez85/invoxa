import useInvoicesStore from "../../store/invoicesStore";
import calculateInvoice from "../../utils/calculations";



const InvoiceSummary = () => {
  const items = useInvoicesStore(
    (state) => state.currentInvoice.items
  );

 


  const updateField = useInvoicesStore(
    (state) => state.updateField
  );

 


  
const invoice = useInvoicesStore(
  (state) => state.currentInvoice
);

const {
  subtotal,
  discount,
  tax,
  total,
} = calculateInvoice(invoice);
  return (
    <section className="rounded-xl border border-[#E7E5E4] bg-white p-6">
      <h2 className="text-base font-semibold text-[#171717]">
        Summary
      </h2>

      <p className="mt-1 text-sm text-[#737373]">
        Subtotal, discount, tax and total.
      </p>

      <div className="mt-5 space-y-4">
        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#737373]">
            Subtotal
          </span>

          <span className="text-sm font-medium text-[#171717]">
            ₦{subtotal.toLocaleString()}
          </span>
        </div>

        {/* Discount */}
        <div className="flex items-center justify-between gap-4">
          <label
            htmlFor="discount"
            className="text-sm text-[#737373]"
          >
            Discount
          </label>

          <input
            id="discount"
            type="number"
            min="0"
            value={discount}
            onChange={(e) =>
              updateField("discount", Number(e.target.value))
            }
            className="w-32 rounded-lg border border-[#E7E5E4] px-3 py-2 text-right text-sm outline-none focus:border-[#171717]"
          />
        </div>

        {/* Tax */}
        <div className="flex items-center justify-between gap-4">
          <label
            htmlFor="tax"
            className="text-sm text-[#737373]"
          >
            Tax
          </label>

          <input
            id="tax"
            type="number"
            min="0"
            value={tax}
            onChange={(e) =>
              updateField("tax", Number(e.target.value))
            }
            className="w-32 rounded-lg border border-[#E7E5E4] px-3 py-2 text-right text-sm outline-none focus:border-[#171717]"
          />
        </div>

        {/* Total */}
        <div className="flex items-center justify-between border-t border-[#E7E5E4] pt-4">
          <span className="font-semibold text-[#171717]">
            Total
          </span>

          <span className="text-xl font-semibold text-[#171717]">
            ₦{total.toLocaleString()}
          </span>
        </div>
      </div>
    </section>
  );
};

export default InvoiceSummary;