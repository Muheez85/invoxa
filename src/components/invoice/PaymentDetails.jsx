import useInvoicesStore from "../../store/invoicesStore";

const PaymentDetails = () => {
  const payment = useInvoicesStore(
    (state) => state.currentInvoice.payment
  );

  const updateInvoice = useInvoicesStore(
    (state) => state.updateInvoice
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    updateInvoice("payment", {
      [name]: value,
    });
  };

  return (
    <section className="rounded-xl border border-[#E7E5E4] bg-white p-6">
      <h2 className="text-base font-semibold text-[#171717]">
        Payment Information
      </h2>

      <p className="mt-1 text-sm text-[#737373]">
        Add your preferred payment details.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-4">
        {/* Bank Name */}
        <div>
          <label
            htmlFor="bank-name"
            className="mb-2 block text-sm font-medium text-[#171717]"
          >
            Bank Name
          </label>

          <input
            id="bank-name"
            type="text"
            name="bankName"
            value={payment.bankName}
            onChange={handleChange}
            placeholder="e.g. GTBank"
            className="w-full rounded-lg border border-[#E7E5E4] px-3 py-2.5 text-sm outline-none focus:border-[#171717]"
          />
        </div>

        {/* Account Name */}
        <div>
          <label
            htmlFor="account-name"
            className="mb-2 block text-sm font-medium text-[#171717]"
          >
            Account Name
          </label>

          <input
            id="account-name"
            type="text"
            name="accountName"
            value={payment.accountName}
            onChange={handleChange}
            placeholder="e.g. Mill Store"
            className="w-full rounded-lg border border-[#E7E5E4] px-3 py-2.5 text-sm outline-none focus:border-[#171717]"
          />
        </div>

        {/* Account Number */}
        <div className="col-span-2">
          <label
            htmlFor="account-number"
            className="mb-2 block text-sm font-medium text-[#171717]"
          >
            Account Number
          </label>

          <input
            id="account-number"
            type="text"
            name="accountNumber"
            value={payment.accountNumber}
            onChange={handleChange}
            placeholder="e.g. 0123456789"
            className="w-full rounded-lg border border-[#E7E5E4] px-3 py-2.5 text-sm outline-none focus:border-[#171717]"
          />
        </div>
      </div>
    </section>
  );
};

export default PaymentDetails;