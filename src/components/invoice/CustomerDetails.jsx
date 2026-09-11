import useInvoicesStore from "../../store/invoicesStore";

const CustomerDetails = () => {
  const customer = useInvoicesStore(
    (state) => state.currentInvoice.customer
  );

  const updateInvoice = useInvoicesStore(
    (state) => state.updateInvoice
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    updateInvoice("customer", {
      [name]: value,
    });
  };

  return (
    <section className="rounded-xl border border-[#E7E5E4] bg-white p-6">
      {/* Section Header */}
      <h2 className="text-base font-semibold text-[#171717]">
        Customer Details
      </h2>

      <p className="mt-1 text-sm text-[#737373]">
        Information about the customer receiving the invoice.
      </p>

      {/* Form */}
      <div className="mt-5 grid grid-cols-2 gap-4">

        {/* Customer Name */}
        <div className="col-span-2">
          <label
            htmlFor="customer-name"
            className="mb-2 block text-sm font-medium text-[#171717]"
          >
            Customer Name
          </label>

          <input
            id="customer-name"
            type="text"
            name="name"
            value={customer.name}
            onChange={handleChange}
            placeholder="e.g. John Doe"
            className="w-full rounded-lg border border-[#E7E5E4] px-3 py-2.5 text-sm outline-none transition focus:border-[#171717]"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="customer-email"
            className="mb-2 block text-sm font-medium text-[#171717]"
          >
            Email
          </label>

          <input
            id="customer-email"
            type="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            placeholder="customer@example.com"
            className="w-full rounded-lg border border-[#E7E5E4] px-3 py-2.5 text-sm outline-none transition focus:border-[#171717]"
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="customer-phone"
            className="mb-2 block text-sm font-medium text-[#171717]"
          >
            Phone
          </label>

          <input
            id="customer-phone"
            type="tel"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            placeholder="+234..."
            className="w-full rounded-lg border border-[#E7E5E4] px-3 py-2.5 text-sm outline-none transition focus:border-[#171717]"
          />
        </div>

        {/* Address */}
        <div className="col-span-2">
          <label
            htmlFor="customer-address"
            className="mb-2 block text-sm font-medium text-[#171717]"
          >
            Address
          </label>

          <textarea
            id="customer-address"
            name="address"
            value={customer.address}
            onChange={handleChange}
            placeholder="Customer address"
            rows="3"
            className="w-full resize-none rounded-lg border border-[#E7E5E4] px-3 py-2.5 text-sm outline-none transition focus:border-[#171717]"
          />
        </div>

      </div>
    </section>
  );
};

export default CustomerDetails;