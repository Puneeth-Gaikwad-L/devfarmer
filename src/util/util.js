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
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

export const projects = [
  { src: "/project1.png", link: "https://www.cubicksmarks.com/" },
  { src: "/project2.png", link: "https://tatvacreators.com/" },
  { src: "/img3.jpg", link: "https://example.com/gallery/3" },
  { src: "/img4.jpg", link: "https://example.com/gallery/4" },
  { src: "/img5.jpg", link: "https://example.com/gallery/5" },
  { src: "/img6.jpg", link: "https://example.com/gallery/6" },
  { src: "/img7.jpg", link: "https://example.com/gallery/7" },
  { src: "/img8.jpg", link: "https://example.com/gallery/8" },
];

export const teamMembers = [
  {
    name: "Santhosh",
    position: "Cheif Marketing Officer",
    img: "/team-6.png",
    bgColor: "bg-[#E574BC]",
    imgBg: "bg-[#C52184]",
  },
  {
    name: "Mani Poorna",
    position: "Tehnical Solutions Architect",
    img: "/team-4.png",
    bgColor: "bg-[#A882DD]",
    imgBg: "bg-[#49416D]",
  },
  {
    name: "Puneeth Gaikwad L",
    position: "Tehnical Solutions Architect",
    img: "/team-5.png",
    bgColor: "bg-[#7D84B2]",
    imgBg: "bg-[#14213D]",
  },
  {
    name: "Prem Darshan",
    position: "Cheif Executive Officer",
    img: "/team-3.png",
    bgColor: "bg-[#D58936]",
    imgBg: "bg-[#A44200]",
  },
];

export const testimonials = [
  {
    name: "Ravi Teja",
    role: "Senior UI/UX Designer",
    feedback:
      "working with the team has been amazing. They’d look at a design and instantly know how to build it out without compromising the look or the user experience. Super easy to work with.",
    avatar: "/profile.jpg",
  },
  {
    name: "Patil Associates",
    role: "Cubicksmarks",
    feedback:
      "They took the time to understand our goals and delivered a design that resonated perfectly with our audience.",
    avatar: "/profile.jpg",
  },
  {
    name: "Sreekant",
    role: "Lead Motion Graphics Designer",
    feedback:
      "Working with the team was effortless. We’d share complex motion ideas, and they’d implement them smoothly on the web while making sure everything worked seamlessly across devices. It made the whole project feel alive.",
    avatar: "/profile.jpg",
  },
  {
    name: "Shivani",
    role: "Tatva Bussiness Owner",
    feedback:
      "The team did a fantastic job bringing our vision to life. The website looks clean, professional, and exactly how we imagined it.",
    avatar: "/profile.jpg",
  },
];

export const slides = [
  {
    id: "responsive",
    label: "Responsive Experience",
    eyebrow: "Built for every screen",
    title: "Build Once. Perform Everywhere.",
    description:
      "Your users switch between phone, tablet, and laptop all day. We design and build interfaces that stay sharp, smooth, and intuitive on every device.",
    bullets: [
      "Mobile-first layouts tuned for real usage",
      "Fluid components that adapt to any viewport",
      "Consistent brand experience across platforms",
    ],
  },
  {
    id: "performance",
    label: "Performance Engineering",
    eyebrow: "Fast by design",
    title: "Speed That Converts. Architecture That Scales.",
    description:
      "From APIs to frontend rendering, every layer is optimized for speed. Your product feels instant today and stays stable when traffic grows.",
    bullets: [
      "Optimized APIs, queries, and caching",
      "Modern frontend stacks for snappy UI",
      "Built to handle spikes without breaking",
    ],
  },
  {
    id: "security",
    label: "Security & Stability",
    eyebrow: "Protected by default",
    title: "Your Product, Secured. Your Data, Protected.",
    description:
      "We bake in security from day one: safe auth flows, encrypted data, and clean architecture that keeps your users and business assets safe.",
    bullets: [
      "Best-practice auth and authorization",
      "Encrypted data flows and storage",
      "Defensive coding and clear boundaries",
    ],
  },
  {
    id: "growth",
    label: "Scalable Architecture",
    eyebrow: "Future-ready builds",
    title: "Modular. Future-Proof. Ready to Evolve.",
    description:
      "Your business will grow – your product should keep up. Our modular architecture lets you ship new features faster without painful rewrites.",
    bullets: [
      "Modular services and clean boundaries",
      "Easy integrations with tools you already use",
      "Designed to reduce long-term dev costs",
    ],
  },
];