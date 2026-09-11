import useInvoicesStore from "../../store/invoicesStore";

const InvoiceItems = () => {
  const items = useInvoicesStore(
    (state) => state.currentInvoice.items
  );

  const addItem = useInvoicesStore((state) => state.addItem);
  const removeItem = useInvoicesStore((state) => state.removeItem);
  const updateItem = useInvoicesStore((state) => state.updateItem);

  const handleChange = (id, field, value) => {
    updateItem(id, {
      [field]:
        field === "quantity" || field === "unitPrice"
          ? Number(value)
          : value,
    });
  };

  return (
    <section className="rounded-xl border border-[#E7E5E4] bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-[#171717]">
            Invoice Items
          </h2>

          <p className="mt-1 text-sm text-[#737373]">
            Add the products or services being billed.
          </p>
        </div>

        <button
          type="button"
          onClick={addItem}
          className="rounded-lg border border-[#E7E5E4] px-3 py-2 text-sm font-medium text-[#171717] transition hover:bg-[#F8F7F4]"
        >
          + Add Item
        </button>
      </div>

      <div className="mt-5 space-y-4">
        {items.map((item, index) => {
          const amount = item.quantity * item.unitPrice;

          return (
            <div
              key={item.id}
              className="rounded-lg border border-[#E7E5E4] p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-medium text-[#171717]">
                  Item {index + 1}
                </p>

                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-sm font-medium text-[#B91C1C] hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Description */}
                <div className="col-span-2">
                  <label className="mb-2 block text-sm font-medium text-[#171717]">
                    Description
                  </label>

                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) =>
                      handleChange(
                        item.id,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="e.g. Website Design"
                    className="w-full rounded-lg border border-[#E7E5E4] px-3 py-2.5 text-sm outline-none focus:border-[#171717]"
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#171717]">
                    Quantity
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleChange(
                        item.id,
                        "quantity",
                        e.target.value
                      )
                    }
                    className="w-full rounded-lg border border-[#E7E5E4] px-3 py-2.5 text-sm outline-none focus:border-[#171717]"
                  />
                </div>

                {/* Unit Price */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#171717]">
                    Unit Price
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={item.unitPrice}
                    onChange={(e) =>
                      handleChange(
                        item.id,
                        "unitPrice",
                        e.target.value
                      )
                    }
                    placeholder="0"
                    className="w-full rounded-lg border border-[#E7E5E4] px-3 py-2.5 text-sm outline-none focus:border-[#171717]"
                  />
                </div>

                {/* Amount */}
                <div className="col-span-2 flex items-center justify-between border-t border-[#E7E5E4] pt-4">
                  <span className="text-sm text-[#737373]">
                    Amount
                  </span>

                  <span className="text-sm font-semibold text-[#171717]">
                    ₦{amount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default InvoiceItems;