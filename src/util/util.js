export const getFormattedDateTime = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}`;
};

export const emailJsConfig = {
  serviceId: "service_lkzu9mc",
  templateId: "template_nd9gb8p",
  publicKey: "Qa8uNHT1SJ1TO403N"
};