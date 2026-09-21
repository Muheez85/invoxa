import { jsPDF } from "jspdf";

const generatePDF = (invoice, filename) => {
  if (!invoice) return;

  const doc = new jsPDF({
    unit: "mm",
    format: "a4",
    orientation: "portrait",
  });

  const pageWidth = 210;
  const pageHeight = 297;

  const margin = 18;
  const contentWidth = pageWidth - margin * 2;

  let y = 20;

  const business = invoice.business || {};
  const customer = invoice.customer || {};
  const invoiceDetails = invoice.invoiceDetails || {};
  const items = invoice.items || [];
  const payment = invoice.payment || {};

  const formatCurrency = (amount) => {
    return `NGN ${Number(amount || 0).toLocaleString()}`;
  };

  const formatDate = (date) => {
    if (!date) return "—";

    const formatted = new Date(date);

    if (Number.isNaN(formatted.getTime())) {
      return date;
    }

    return formatted.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const addPageIfNeeded = (requiredSpace = 20) => {
    if (y + requiredSpace > pageHeight - margin) {
      doc.addPage();
      y = margin;
      return true;
    }

    return false;
  };

  const drawLine = () => {
    doc.setDrawColor(225, 225, 225);
    doc.line(margin, y, pageWidth - margin, y);
  };

  // --------------------------------------------------
  // HEADER
  // --------------------------------------------------

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(23, 23, 23);

  doc.text(
    business.name || "Business Name",
    margin,
    y
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(115, 115, 115);

  let businessY = y + 6;

  if (business.email) {
    doc.text(business.email, margin, businessY);
    businessY += 4.5;
  }

  if (business.phone) {
    doc.text(business.phone, margin, businessY);
    businessY += 4.5;
  }

  if (business.address) {
    const addressLines = doc.splitTextToSize(
      business.address,
      75
    );

    doc.text(addressLines, margin, businessY);
  }

  // Invoice title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(23, 23, 23);

  doc.text(
    "INVOICE",
    pageWidth - margin,
    y,
    { align: "right" }
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(115, 115, 115);

  doc.text(
    `#${invoiceDetails.number || "INV-0000"}`,
    pageWidth - margin,
    y + 7,
    { align: "right" }
  );

  const status =
    invoiceDetails.status
      ? invoiceDetails.status.charAt(0).toUpperCase() +
        invoiceDetails.status.slice(1)
      : "Pending";

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(
    status,
    pageWidth - margin,
    y + 13,
    { align: "right" }
  );

  y = Math.max(businessY + 10, y + 28);

  drawLine();

  y += 12;

  // --------------------------------------------------
  // CUSTOMER + INVOICE DETAILS
  // --------------------------------------------------

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(115, 115, 115);

  doc.text("BILL TO", margin, y);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(23, 23, 23);

  doc.text(
    customer.name || "Customer Name",
    margin,
    y + 6
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(115, 115, 115);

  let customerY = y + 12;

  if (customer.email) {
    doc.text(customer.email, margin, customerY);
    customerY += 4.5;
  }

  if (customer.phone) {
    doc.text(customer.phone, margin, customerY);
    customerY += 4.5;
  }

  if (customer.address) {
    const addressLines = doc.splitTextToSize(
      customer.address,
      75
    );

    doc.text(addressLines, margin, customerY);
  }

  // Invoice metadata
  const rightX = pageWidth - margin;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(115, 115, 115);

  doc.text(
    "Invoice Date",
    rightX - 55,
    y
  );

  doc.text(
    "Due Date",
    rightX - 25,
    y
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(23, 23, 23);

  doc.text(
    formatDate(invoiceDetails.issueDate),
    rightX - 55,
    y + 6
  );

  doc.text(
    formatDate(invoiceDetails.dueDate),
    rightX - 25,
    y + 6
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(115, 115, 115);

  doc.text(
    "Payment Terms",
    rightX - 55,
    y + 15
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(23, 23, 23);

  doc.text(
    invoiceDetails.paymentTerms || "Due on receipt",
    rightX - 55,
    y + 21
  );

  y = Math.max(customerY + 8, y + 32);

  drawLine();

  y += 10;

  // --------------------------------------------------
  // ITEMS TABLE
  // --------------------------------------------------

  const descriptionX = margin;
  const qtyX = 135;
  const amountX = pageWidth - margin;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(115, 115, 115);

  doc.text("DESCRIPTION", descriptionX, y);
  doc.text("QTY", qtyX, y, { align: "right" });
  doc.text("AMOUNT", amountX, y, { align: "right" });

  y += 4;

  drawLine();

  y += 7;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  items.forEach((item) => {
    addPageIfNeeded(20);

    const description =
      item.description || "Item description";

    const descriptionLines = doc.splitTextToSize(
      description,
      100
    );

    const rowHeight = Math.max(
      descriptionLines.length * 4.5,
      8
    );

    doc.setFont("helvetica", "bold");
    doc.setTextColor(23, 23, 23);

    doc.text(
      descriptionLines,
      descriptionX,
      y
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(115, 115, 115);

    doc.text(
      `${formatCurrency(item.unitPrice)} each`,
      descriptionX,
      y + descriptionLines.length * 4.5
    );

    doc.text(
      String(item.quantity || 0),
      qtyX,
      y,
      { align: "right" }
    );

    const amount =
      Number(item.quantity || 0) *
      Number(item.unitPrice || 0);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(23, 23, 23);

    doc.text(
      formatCurrency(amount),
      amountX,
      y,
      { align: "right" }
    );

    y += rowHeight + 8;
  });

  drawLine();

  y += 10;

  // --------------------------------------------------
  // SUMMARY
  // --------------------------------------------------

  const subtotal = items.reduce(
    (total, item) =>
      total +
      Number(item.quantity || 0) *
        Number(item.unitPrice || 0),
    0
  );

  const discount = Number(invoice.discount) || 0;
  const tax = Number(invoice.tax) || 0;

  const total = subtotal - discount + tax;

  const summaryLabelX = 135;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(115, 115, 115);

  doc.text("Subtotal", summaryLabelX, y);
  doc.text(
    formatCurrency(subtotal),
    amountX,
    y,
    { align: "right" }
  );

  y += 6;

  doc.text("Discount", summaryLabelX, y);
  doc.text(
    `- ${formatCurrency(discount)}`,
    amountX,
    y,
    { align: "right" }
  );

  y += 6;

  doc.text("Tax", summaryLabelX, y);
  doc.text(
    formatCurrency(tax),
    amountX,
    y,
    { align: "right" }
  );

  y += 7;

  doc.setDrawColor(225, 225, 225);
  doc.line(
    summaryLabelX,
    y,
    amountX,
    y
  );

  y += 8;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(23, 23, 23);

  doc.text("Total", summaryLabelX, y);

  doc.text(
    formatCurrency(total),
    amountX,
    y,
    { align: "right" }
  );

  y += 15;

  // --------------------------------------------------
  // NOTES
  // --------------------------------------------------

  if (invoice.notes) {
    addPageIfNeeded(30);

    drawLine();

    y += 9;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(115, 115, 115);

    doc.text("NOTES", margin, y);

    y += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(115, 115, 115);

    const noteLines = doc.splitTextToSize(
      invoice.notes,
      contentWidth
    );

    doc.text(noteLines, margin, y);

    y += noteLines.length * 4.5 + 8;
  }

  // --------------------------------------------------
  // PAYMENT INFORMATION
  // --------------------------------------------------

  if (
    payment.bankName ||
    payment.accountName ||
    payment.accountNumber
  ) {
    addPageIfNeeded(35);

    drawLine();

    y += 9;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(115, 115, 115);

    doc.text(
      "PAYMENT INFORMATION",
      margin,
      y
    );

    y += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(115, 115, 115);

    if (payment.bankName) {
      doc.text(payment.bankName, margin, y);
      y += 5;
    }

    if (payment.accountName) {
      doc.text(
        `Account Name: ${payment.accountName}`,
        margin,
        y
      );
      y += 5;
    }

    if (payment.accountNumber) {
      doc.text(
        `Account Number: ${payment.accountNumber}`,
        margin,
        y
      );
      y += 5;
    }

    y += 5;
  }

  // --------------------------------------------------
  // FOOTER
  // --------------------------------------------------

  addPageIfNeeded(20);

  drawLine();

  y += 9;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(115, 115, 115);

  doc.text(
    `Thank you for choosing ${business.name || "us"}.`,
    pageWidth / 2,
    y,
    { align: "center" }
  );

  doc.save(`${filename}.pdf`);
};

export default generatePDF;