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
  publicKey: "Qa8uNHT1SJ1TO403N",
};

export const projects = [
  { src: "/img1.jpg", link: "https://example.com/gallery/1" },
  { src: "/img2.jpg", link: "https://example.com/gallery/2" },
  { src: "/img3.jpg", link: "https://example.com/gallery/3" },
  { src: "/img4.jpg", link: "https://example.com/gallery/4" },
  { src: "/img5.jpg", link: "https://example.com/gallery/5" },
  { src: "/img6.jpg", link: "https://example.com/gallery/6" },
  { src: "/img7.jpg", link: "https://example.com/gallery/7" },
  { src: "/img8.jpg", link: "https://example.com/gallery/8" },
];

export const testimonials = [
  {
    name: "Alice Johnson",
    role: "CEO, Tech Innovators",
    feedback:
      "The team transformed our vision into a stunning reality. Their expertise in 3D modeling and AR technology is unparalleled.",
    avatar: "/avatars/alice.jpg",
  },
  {
    name: "Alice Johnson",
    role: "CEO, Tech Innovators",
    feedback:
      "The team transformed our vision into a stunning reality. Their expertise in 3D modeling and AR technology is unparalleled.",
    avatar: "/avatars/alice.jpg",
  },
  {
    name: "Alice Johnson",
    role: "CEO, Tech Innovators",
    feedback:
      "The team transformed our vision into a stunning reality. Their expertise in 3D modeling and AR technology is unparalleled.",
    avatar: "/avatars/alice.jpg",
  },
   {
    name: "Alice Johnson",
    role: "CEO, Tech Innovators",
    feedback:
      "The team transformed our vision into a stunning reality. Their expertise in 3D modeling and AR technology is unparalleled.",
    avatar: "/avatars/alice.jpg",
  },
   {
    name: "Alice Johnson",
    role: "CEO, Tech Innovators",
    feedback:
      "The team transformed our vision into a stunning reality. Their expertise in 3D modeling and AR technology is unparalleled.",
    avatar: "/avatars/alice.jpg",
  }
];
