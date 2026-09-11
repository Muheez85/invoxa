
import { useEffect, useState } from "react";
import { Save } from "lucide-react";

import useInvoicesStore from "../store/invoicesStore";

const Settings = () => {
  const settings = useInvoicesStore((state) => state.settings);
  const updateSettings = useInvoicesStore(
    (state) => state.updateSettings
  );

  const [business, setBusiness] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [payment, setPayment] = useState({
    bankName: "",
    accountName: "",
    accountNumber: "",
  });

  const [invoice, setInvoice] = useState({
    currency: "NGN",
    paymentTerms: "Due on receipt",
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!settings) return;

    setBusiness({
      ...business,
      ...settings.business,
    });

    setPayment({
      ...payment,
      ...settings.payment,
    });

    setInvoice({
      ...invoice,
      ...settings.invoice,
    });
  }, [settings]);

  const handleBusinessChange = (e) => {
    const { name, value } = e.target;

    setBusiness((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSaved(false);
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;

    setPayment((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleInvoiceChange = (e) => {
    const { name, value } = e.target;

    setInvoice((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();

    updateSettings("business", business);
    updateSettings("payment", payment);
    updateSettings("invoice", invoice);

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-[#171717]">
          Settings
        </h1>

        <p className="mt-1 text-sm text-[#737373]">
          Manage your business and invoice preferences.
        </p>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          Settings saved successfully.
        </div>
      )}

      <form
        onSubmit={handleSave}
        className="max-w-3xl space-y-6"
      >
        {/* Business Information */}
        <section className="rounded-xl border border-[#E7E5E4] bg-white p-6">
          <div className="border-b border-[#E7E5E4] pb-4">
            <h2 className="text-base font-semibold text-[#171717]">
              Business Information
            </h2>

            <p className="mt-1 text-sm text-[#737373]">
              Information that appears on your invoices.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-[#171717]">
                Business Name
              </label>

              <input
                type="text"
                name="name"
                value={business.name}
                onChange={handleBusinessChange}
                placeholder="Your business name"
                className="w-full rounded-lg border border-[#E7E5E4] bg-white px-3 py-2.5 text-sm text-[#171717] outline-none placeholder:text-[#A3A3A3] focus:border-[#171717]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#171717]">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={business.email}
                onChange={handleBusinessChange}
                placeholder="business@example.com"
                className="w-full rounded-lg border border-[#E7E5E4] bg-white px-3 py-2.5 text-sm text-[#171717] outline-none placeholder:text-[#A3A3A3] focus:border-[#171717]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#171717]">
                Phone
              </label>

              <input
                type="tel"
                name="phone"
                value={business.phone}
                onChange={handleBusinessChange}
                placeholder="+234 800 000 0000"
                className="w-full rounded-lg border border-[#E7E5E4] bg-white px-3 py-2.5 text-sm text-[#171717] outline-none placeholder:text-[#A3A3A3] focus:border-[#171717]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-[#171717]">
                Address
              </label>

              <textarea
                name="address"
                value={business.address}
                onChange={handleBusinessChange}
                rows={3}
                placeholder="Business address"
                className="w-full resize-none rounded-lg border border-[#E7E5E4] bg-white px-3 py-2.5 text-sm text-[#171717] outline-none placeholder:text-[#A3A3A3] focus:border-[#171717]"
              />
            </div>
          </div>
        </section>

        {/* Payment Information */}
        <section className="rounded-xl border border-[#E7E5E4] bg-white p-6">
          <div className="border-b border-[#E7E5E4] pb-4">
            <h2 className="text-base font-semibold text-[#171717]">
              Default Payment Information
            </h2>

            <p className="mt-1 text-sm text-[#737373]">
              Default bank details for your invoices.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#171717]">
                Bank Name
              </label>

              <input
                type="text"
                name="bankName"
                value={payment.bankName}
                onChange={handlePaymentChange}
                placeholder="Bank name"
                className="w-full rounded-lg border border-[#E7E5E4] bg-white px-3 py-2.5 text-sm text-[#171717] outline-none placeholder:text-[#A3A3A3] focus:border-[#171717]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#171717]">
                Account Name
              </label>

              <input
                type="text"
                name="accountName"
                value={payment.accountName}
                onChange={handlePaymentChange}
                placeholder="Account name"
                className="w-full rounded-lg border border-[#E7E5E4] bg-white px-3 py-2.5 text-sm text-[#171717] outline-none placeholder:text-[#A3A3A3] focus:border-[#171717]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-[#171717]">
                Account Number
              </label>

              <input
                type="text"
                name="accountNumber"
                value={payment.accountNumber}
                onChange={handlePaymentChange}
                placeholder="Account number"
                className="w-full rounded-lg border border-[#E7E5E4] bg-white px-3 py-2.5 text-sm text-[#171717] outline-none placeholder:text-[#A3A3A3] focus:border-[#171717]"
              />
            </div>
          </div>
        </section>

        {/* Invoice Preferences */}
        <section className="rounded-xl border border-[#E7E5E4] bg-white p-6">
          <div className="border-b border-[#E7E5E4] pb-4">
            <h2 className="text-base font-semibold text-[#171717]">
              Invoice Preferences
            </h2>

            <p className="mt-1 text-sm text-[#737373]">
              Set your default invoice preferences.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#171717]">
                Currency
              </label>

              <select
                name="currency"
                value={invoice.currency}
                onChange={handleInvoiceChange}
                className="w-full rounded-lg border border-[#E7E5E4] bg-white px-3 py-2.5 text-sm text-[#171717] outline-none focus:border-[#171717]"
              >
                <option value="NGN">
                  NGN — Nigerian Naira
                </option>
                <option value="USD">
                  USD — US Dollar
                </option>
                <option value="GBP">
                  GBP — British Pound
                </option>
                <option value="EUR">
                  EUR — Euro
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#171717]">
                Default Payment Terms
              </label>

              <select
                name="paymentTerms"
                value={invoice.paymentTerms}
                onChange={handleInvoiceChange}
                className="w-full rounded-lg border border-[#E7E5E4] bg-white px-3 py-2.5 text-sm text-[#171717] outline-none focus:border-[#171717]"
              >
                <option value="Due on receipt">
                  Due on receipt
                </option>
                <option value="Net 7">Net 7</option>
                <option value="Net 14">Net 14</option>
                <option value="Net 30">Net 30</option>
              </select>
            </div>
          </div>
        </section>

        {/* Save */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-[#171717] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#2D2D2D]"
          >
            <Save size={17} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;

