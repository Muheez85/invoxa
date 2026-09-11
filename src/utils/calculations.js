const calculateInvoice = (invoice) => {
  const items = invoice?.items || [];

  const subtotal = items.reduce(
    (total, item) =>
      total +
      Number(item.quantity || 0) *
        Number(item.unitPrice || 0),
    0
  );

  const discount = Number(invoice?.discount) || 0;
  const tax = Number(invoice?.tax) || 0;

  const total = subtotal - discount + tax;

  return {
    subtotal,
    discount,
    tax,
    total,
  };
};

export default calculateInvoice;