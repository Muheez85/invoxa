
import { create } from "zustand";
import { persist } from "zustand/middleware";
import generateInvoiceNumber from "../utils/generateInvoiceNumber";

const emptyInvoice = {
  business: {
    name: "",
    email: "",
    phone: "",
    address: "",
  },

  customer: {
    name: "",
    email: "",
    phone: "",
    address: "",
  },

  invoiceDetails: {
    number: "",
    issueDate: "",
    dueDate: "",
    status: "pending",
    paymentTerms: "Due on receipt",
  },

  items: [
    {
      id: Date.now(),
      description: "",
      quantity: 1,
      unitPrice: 0,
    },
  ],

  discount: 0,
  tax: 0,

  notes: "",

  payment: {
    bankName: "",
    accountName: "",
    accountNumber: "",
  },
};

const useInvoicesStore = create(
  persist(
    (set, get) => ({
      currentInvoice: emptyInvoice,

      invoices: [],

      settings: {
        business: {
          name: "",
          email: "",
          phone: "",
          address: "",
        },

        payment: {
          bankName: "",
          accountName: "",
          accountNumber: "",
        },

        invoice: {
          currency: "NGN",
          paymentTerms: "Due on receipt",
        },
      },

      updateSettings: (section, data) =>
        set((state) => ({
          settings: {
            ...state.settings,
            [section]: {
              ...state.settings[section],
              ...data,
            },
          },
        })),

      updateInvoice: (section, data) =>
        set((state) => ({
          currentInvoice: {
            ...state.currentInvoice,
            [section]: {
              ...state.currentInvoice[section],
              ...data,
            },
          },
        })),

      updateField: (field, value) =>
        set((state) => ({
          currentInvoice: {
            ...state.currentInvoice,
            [field]: value,
          },
        })),

      addItem: () =>
        set((state) => ({
          currentInvoice: {
            ...state.currentInvoice,
            items: [
              ...state.currentInvoice.items,
              {
                id: Date.now(),
                description: "",
                quantity: 1,
                unitPrice: 0,
              },
            ],
          },
        })),

      removeItem: (id) =>
        set((state) => ({
          currentInvoice: {
            ...state.currentInvoice,
            items: state.currentInvoice.items.filter(
              (item) => item.id !== id
            ),
          },
        })),

      updateItem: (id, data) =>
        set((state) => ({
          currentInvoice: {
            ...state.currentInvoice,
            items: state.currentInvoice.items.map((item) =>
              item.id === id
                ? { ...item, ...data }
                : item
            ),
          },
        })),

      createNewInvoice: () => {
        const invoices = get().invoices;
        const settings = get().settings;

        set(() => ({
          currentInvoice: {
            ...emptyInvoice,

            business: {
              ...emptyInvoice.business,
              ...settings.business,
            },

            payment: {
              ...emptyInvoice.payment,
              ...settings.payment,
            },

            invoiceDetails: {
              ...emptyInvoice.invoiceDetails,
              number: generateInvoiceNumber(invoices),
              paymentTerms:
                settings.invoice.paymentTerms ||
                "Due on receipt",
            },

            items: [
              {
                id: Date.now(),
                description: "",
                quantity: 1,
                unitPrice: 0,
              },
            ],
          },
        }));
      },

      saveInvoice: () => {
        const newInvoice = {
          ...get().currentInvoice,
          id: Date.now(),
        };

        set((state) => ({
          invoices: [...state.invoices, newInvoice],
        }));

        return newInvoice.id;
      },

      loadInvoiceForEdit: (id) => {
        const invoice = get().invoices.find(
          (invoice) =>
            String(invoice.id) === String(id)
        );

        if (!invoice) return false;

        set({
          currentInvoice: {
            ...invoice,
            business: { ...invoice.business },
            customer: { ...invoice.customer },
            invoiceDetails: {
              ...invoice.invoiceDetails,
            },
            items: invoice.items.map((item) => ({
              ...item,
            })),
            payment: { ...invoice.payment },
          },
        });

        return true;
      },

      updateInvoiceById: (id) => {
        const currentInvoice = get().currentInvoice;

        set((state) => ({
          invoices: state.invoices.map((invoice) =>
            String(invoice.id) === String(id)
              ? {
                  ...currentInvoice,
                  id: invoice.id,
                }
              : invoice
          ),
        }));
      },

      markAsPaid: (id) =>
        set((state) => ({
          invoices: state.invoices.map((invoice) =>
            String(invoice.id) === String(id)
              ? {
                  ...invoice,
                  invoiceDetails: {
                    ...invoice.invoiceDetails,
                    status: "paid",
                  },
                }
              : invoice
          ),
        })),
    }),
    {
      name: "invoxa-storage",
    }
  )
);

export default useInvoicesStore;

