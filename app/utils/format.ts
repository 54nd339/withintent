export const formatINR = (value: number) => `₹${value.toLocaleString("en-IN")}`;

export const whatsappLink = (title: string) =>
  `https://wa.me/919876543210?text=${encodeURIComponent(
    `I am interested in ${title}`
  )}`;
