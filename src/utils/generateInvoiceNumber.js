const generateInvoiceNumber = (invoices = []) => {
  const nextNumber = invoices.length + 1;

  return `INV-${String(nextNumber).padStart(4, "0")}`;
};

export default generateInvoiceNumber;