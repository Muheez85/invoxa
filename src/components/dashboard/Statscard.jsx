const Statscard = () => {
  return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[#E7E5E4] bg-white p-5">
          <p className="text-sm text-[#737373]">Total Invoices</p>
          <p className="mt-2 text-2xl font-semibold text-[#171717]">24</p>
        </div>

        <div className="rounded-xl border border-[#E7E5E4] bg-white p-5">
          <p className="text-sm text-[#737373]">Paid</p>
          <p className="mt-2 text-2xl font-semibold text-[#171717]">18</p>
        </div>

        <div className="rounded-xl border border-[#E7E5E4] bg-white p-5">
          <p className="text-sm text-[#737373]">Pending</p>
          <p className="mt-2 text-2xl font-semibold text-[#171717]">6</p>
        </div>

        <div className="rounded-xl border border-[#E7E5E4] bg-white p-5">
          <p className="text-sm text-[#737373]">Total Revenue</p>
          <p className="mt-2 text-2xl font-semibold text-[#171717]">
            ₦850,000
          </p>
        </div>
      </div>
  )
}

export default Statscard