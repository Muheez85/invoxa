import  useInvoicesStore  from "../../store/invoicesStore";

const BusinessDetails = () => {
  const business = useInvoicesStore(
    (state) => state.currentInvoice.business
  );

  const updateInvoice = useInvoicesStore(
    (state) => state.updateInvoice
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    updateInvoice("business", {
      [name]: value,
    });
  };

  return (
    <section className="rounded-xl border border-[#E7E5E4] bg-white p-6">
      <h2 className="text-base font-semibold text-[#171717]">
        Business Details
      </h2>

      <p className="mt-1 text-sm text-[#737373]">
        Your business information.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-4">

        {/* Business Name */}
        <div className="col-span-2">
          <label className="mb-2 block text-sm font-medium text-[#171717]">
            Business Name
          </label>

          <input
            type="text"
            name="name"
            value={business.name}
            onChange={handleChange}
            placeholder="e.g. Mill Store"
            className="w-full rounded-lg border border-[#E7E5E4] px-3 py-2.5 text-sm outline-none transition focus:border-[#171717]"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#171717]">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={business.email}
            onChange={handleChange}
            placeholder="business@example.com"
            className="w-full rounded-lg border border-[#E7E5E4] px-3 py-2.5 text-sm outline-none transition focus:border-[#171717]"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#171717]">
            Phone
          </label>

          <input
            type="tel"
            name="phone"
            value={business.phone}
            onChange={handleChange}
            placeholder="+234..."
            className="w-full rounded-lg border border-[#E7E5E4] px-3 py-2.5 text-sm outline-none transition focus:border-[#171717]"
          />
        </div>

        {/* Address */}
        <div className="col-span-2">
          <label className="mb-2 block text-sm font-medium text-[#171717]">
            Address
          </label>

          <textarea
            name="address"
            value={business.address}
            onChange={handleChange}
            placeholder="Business address"
            rows="3"
            className="w-full resize-none rounded-lg border border-[#E7E5E4] px-3 py-2.5 text-sm outline-none transition focus:border-[#171717]"
          />
        </div>

      </div>
    </section>
  );
};

export default BusinessDetails;