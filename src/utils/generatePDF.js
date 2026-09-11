import html2pdf from "html2pdf.js";

const generatePDF = (element, filename) => {
  if (!element) return;

  // Temporarily remove the page's stylesheets from html2canvas's reach.
  // Tailwind v4 can generate oklch() colors which html2canvas cannot parse.
  const styleSheets = Array.from(
    document.querySelectorAll("style, link[rel='stylesheet']")
  );

  const originalDisplay = styleSheets.map((sheet) => sheet.disabled);

  try {
    styleSheets.forEach((sheet) => {
      sheet.disabled = true;
    });

    const clone = element.cloneNode(true);

    // Apply the invoice's required styles directly to the clone.
    clone.style.backgroundColor = "#FFFFFF";
    clone.style.color = "#171717";
    clone.style.borderColor = "#E7E5E4";

    clone.querySelectorAll("*").forEach((el) => {
      const computed = window.getComputedStyle(el);

      if (computed.color) {
        el.style.color = convertColor(computed.color);
      }

      if (computed.backgroundColor) {
        el.style.backgroundColor =
          convertColor(computed.backgroundColor);
      }

      if (computed.borderColor) {
        el.style.borderColor =
          convertColor(computed.borderColor);
      }
    });

    const options = {
      margin: 0,
      filename: `${filename}.pdf`,
      image: {
        type: "jpeg",
        quality: 0.98,
      },
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: "#FFFFFF",
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    };

    html2pdf()
      .set(options)
      .from(clone)
      .save()
      .finally(() => {
        styleSheets.forEach((sheet, index) => {
          sheet.disabled = originalDisplay[index];
        });
      });
  } catch (error) {
    styleSheets.forEach((sheet, index) => {
      sheet.disabled = originalDisplay[index];
    });

    console.error("PDF generation failed:", error);
  }
};

const convertColor = (color) => {
  if (!color || color.includes("oklch")) {
    return "#171717";
  }

  return color;
};

export default generatePDF;

