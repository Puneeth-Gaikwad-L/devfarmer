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
  {
    src: "/kisar.webp",
    link: "https://www.kisar.org.in/",
    title: "KISAR",
    tags: ["Healthcare", "Member portal", "Web"],
    bgText: "KISAR • KISAR • KISAR • KISAR • KISAR • KISAR •",
  },
  {
    src: "/project1.webp",
    link: "https://www.cubicksmarks.com/",
    title: "Cubicksmarks",
    tags: ["E-commerce", "Apparel", "Web"],
    bgText: "CUBICKSMARKS • CUBICKSMARKS • CUBICKSMARKS • CUBICKSMARKS •",
  },
  {
    src: "/project2.webp",
    link: "https://tatvacreators.com/",
    title: "Tatva Creators",
    tags: ["E-commerce", "Home decor", "Web"],
    bgText: "TATVA CREATORS • TATVA CREATORS • TATVA CREATORS • TATVA CREATORS •",
  },
  {
    src: "/teztronics.webp",
    link: "https://teztronics.com/",
    title: "Teztronics",
    tags: ["B2B Catalog", "Industrial", "Web"],
    bgText: "TEZTRONICS • TEZTRONICS • TEZTRONICS • TEZTRONICS •",
  },
  {
    src: "/SavarkarPratishtana.webp",
    link: "https://savarkarpratishtana.netlify.app/",
    title: "Savarkar Pratishtana",
    tags: ["Non-profit", "Bilingual", "Web"],
    bgText: "SAVARKAR PRATISHTANA • SAVARKAR PRATISHTANA • SAVARKAR PRATISHTANA •",
  },
];

export const teamMembers = [
  {
    name: "Santhosh",
    position: "Chief Marketing Officer",
    img: "/team-6.webp",
    bgColor: "bg-[#E574BC]",
    imgBg: "bg-[#C52184]",
  },
  {
    name: "Mani Poorna",
    position: "Technical Solutions Architect",
    img: "/team-4.webp",
    bgColor: "bg-[#A882DD]",
    imgBg: "bg-[#49416D]",
  },
  {
    name: "Puneeth Gaikwad L",
    position: "Technical Solutions Architect",
    img: "/team-5.webp",
    bgColor: "bg-[#7D84B2]",
    imgBg: "bg-[#14213D]",
  },
  {
    name: "Prem Darshan",
    position: "Chief Executive Officer",
    img: "/team-3.webp",
    bgColor: "bg-[#D58936]",
    imgBg: "bg-[#A44200]",
  },
];

// To add a review, append an object: { name, role, feedback }.
// Optional: `project` (a project title from the list above) adds a "View project" link.
export const testimonials = [
  {
    name: "Ravi Teja",
    role: "Senior UI/UX Designer",
    feedback:
      "Working with the team has been amazing. They’d look at a design and instantly know how to build it out without compromising the look or the user experience. Super easy to work with.",
  },
  {
    name: "Patil Associates",
    role: "Cubicksmarks",
    project: "Cubicksmarks",
    feedback:
      "They took the time to understand our goals and delivered a design that resonated perfectly with our audience.",
  },
  {
    name: "Sreekant",
    role: "Lead Motion Graphics Designer",
    feedback:
      "Working with the team was effortless. We’d share complex motion ideas, and they’d implement them smoothly on the web while making sure everything worked seamlessly across devices. It made the whole project feel alive.",
  },
  {
    name: "Shivani",
    role: "Tatva Business Owner",
    feedback:
      "The team did a fantastic job bringing our vision to life. The website looks clean, professional, and exactly how we imagined it.",
  },
];

export const services = [
  {
    title: "Basic Website",
    tag: "Front-end only",
    description:
      "A fast, polished site with no backend to run or pay for. Clean design, great on every screen.",
    bestFor: "portfolios, landing pages and brochure sites",
    project: "Savarkar Pratishtana",
  },
  {
    title: "Professional Website",
    tag: "Front-end + Backend",
    description:
      "A custom front-end backed by a dedicated server: logins, databases, admin panels and integrations.",
    bestFor: "member portals, platforms and booking systems",
    project: "KISAR",
  },
  {
    title: "Template Website",
    tag: "Built on Wix",
    description:
      "A professionally customised Wix template, launched quickly and easy for you to manage.",
    bestFor: "online stores and small businesses on a timeline",
    project: "Cubicksmarks",
  },
  {
    title: "Digital Marketing",
    tag: "New service",
    description:
      "SEO, social media and paid campaigns that put your brand in front of the right people.",
    bestFor: "brands ready to grow their reach",
    project: null,
  },
];

export const processSteps = [
  {
    title: "Discovery",
    desc: "We learn your business, your audience and your goals before touching a pixel.",
    deliverable: "a clear scope and goals",
  },
  {
    title: "Planning",
    desc: "We map the pages, features and milestones so nothing is left to chance.",
    deliverable: "a roadmap with milestones",
  },
  {
    title: "Design",
    desc: "We shape the look and feel, and refine it together with you.",
    deliverable: "designs you approve before we build",
  },
  {
    title: "Development",
    desc: "We build it properly: responsive, fast and tested on real devices.",
    deliverable: "a tested, working build",
  },
  {
    title: "Launch",
    desc: "We deploy, check that everything works, and hand it over.",
    deliverable: "a live site and a smooth handover",
  },
];
