import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  ArrowRight,
  BriefcaseBusiness,
  Brush,
  Code2,
  Mail,
  MonitorSmartphone,
  Palette,
  PenTool,
  Phone,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { emailJsConfig, getFormattedDateTime } from "../../util/util";

const services = [
  { label: "Mobile App", icon: Smartphone },
  { label: "Website Design", icon: MonitorSmartphone },
  { label: "Branding", icon: Palette },
  { label: "Web Development", icon: Code2 },
  { label: "Illustration", icon: Brush },
  { label: "Logo Design", icon: PenTool },
  { label: "Graphic Design", icon: Sparkles },
  { label: "others", icon: BriefcaseBusiness },
];

const MotionSection = motion.section;

function ContactUs() {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [selectedChips, setSelectedChips] = useState([]);
  const [interestError, setInterestError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otherMessage, setOtherMessage] = useState("");

  const toggleChip = (item) => {
    const isRemovingItem = selectedChips.includes(item);

    setSelectedChips((previous) =>
      previous.includes(item)
        ? previous.filter((chip) => chip !== item)
        : [...previous, item]
    );

    if (item === "others" && isRemovingItem) {
      setOtherMessage("");
    }

    setInterestError("");
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    if (selectedChips.length === 0) {
      setInterestError("Choose at least one service to continue.");
      return;
    }

    setLoading(true);

    emailjs
      .send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        {
          from_name: customerName,
          time: getFormattedDateTime(),
          company_name: companyName,
          interest: selectedChips.join(", "),
          message: `${customerName} from ${companyName} is interested in ${selectedChips.join(
            ", "
          )}. ${otherMessage ? `\n User's note: "${otherMessage}"` : ""
            } \n Please connect with the client on ${customerEmail}`,
          reply_to: "contact@devfarmer.xyz",
        },
        emailJsConfig.publicKey
      )
      .then(() => {
        alert("Thank you for reaching out. We'll get back to you soon!");
        setCustomerName("");
        setCustomerEmail("");
        setCompanyName("");
        setSelectedChips([]);
        setOtherMessage("");
      })
      .catch(() => {
        alert("Oops! Something went wrong. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <MotionSection
      id="contact"
      className="site-container scroll-mt-24 py-12 sm:py-16"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}>
      {/* Original contact-section heading */}
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <h3 className="text-3xl font-bold leading-snug text-brand-white sm:text-4xl md:text-5xl">
          <span className="text-brand-cyan">Say Hi!</span> and tell us about
          your idea
        </h3>

        <p className="mt-3 text-sm text-brand-muted sm:text-base">
          Have a project in mind? We&apos;d love to hear from you!
        </p>
      </div>

      <div className="contact-glass rounded-3xl border theme-card p-5 shadow-[0_16px_60px_rgba(76,29,149,0.08)] sm:p-8 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-14">
          <div className="flex flex-col lg:py-3">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-cyan">
              Get in touch
            </p>

            <h2 className="mt-5 max-w-md text-4xl font-bold leading-tight text-brand-white sm:text-5xl">
              Have a Project <br className="hidden sm:block" /> in Mind?
            </h2>

            <p className="mt-6 max-w-md text-base leading-8 text-brand-muted">
              Tell us what you&apos;re looking to build and what you need.
              Let&apos;s start the conversation.
            </p>

            <div className="mt-10 space-y-6">
              <a
                href="mailto:Devfarmer1@gmail.com"
                className="group flex items-start gap-4 text-brand-muted"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-amethyst/55 text-brand-cyan transition group-hover:bg-brand-cyan group-hover:text-brand-black">
                  <Mail size={20} aria-hidden="true" />
                </span>

                <span>
                  <span className="block text-sm font-semibold text-brand-white">
                    Email Us
                  </span>
                  <span className="mt-1 block text-sm text-brand-muted group-hover:text-brand-cyan">
                    Devfarmer1@gmail.com
                  </span>
                </span>
              </a>

              <a
                href="tel:+919008899542"
                className="group flex items-start gap-4 text-brand-muted">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-amethyst/55 text-brand-cyan transition group-hover:bg-brand-cyan group-hover:text-brand-black">
                  <Phone size={20} aria-hidden="true" />
                </span>

                <span>
                  <span className="block text-sm font-semibold text-brand-white">
                    Call Us
                  </span>
                  <span className="mt-1 block text-sm text-brand-muted group-hover:text-brand-cyan">
                    +91 9008899542
                  </span>
                </span>
              </a>
            </div>
          </div>

          <form
            className="contact-form-glass rounded-2xl border border-brand-amethyst-border/70 bg-surface-deep/75 p-5 sm:p-7"
            onSubmit={onFormSubmit}>
            <fieldset disabled={loading}>
              <legend className="text-base font-semibold text-brand-white">
                What are you looking to build?{" "}
                <span className="text-brand-cyan">*</span>
              </legend>

              {/* Compact service cards */}
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {services.map(({ label, icon }) => {
                  const isSelected = selectedChips.includes(label);
                  const ServiceIcon = icon;

                  return (
                    <button
                      key={label}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => toggleChip(label)}
                      className={`flex min-h-11 items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-center text-xs font-medium transition ${isSelected
                          ? "border-brand-cyan bg-brand-cyan text-brand-black shadow-[0_0_18px_rgb(var(--brand-cyan-rgb)/0.22)]"
                          : "border-brand-amethyst-edge/70 bg-brand-white text-brand-amethyst hover:border-brand-cyan hover:bg-brand-lavender"
                        }`}>
                      <ServiceIcon
                        size={15}
                        aria-hidden="true"
                        className="shrink-0"
                      />
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>

              {interestError && (
                <p className="mt-3 text-sm text-red-300" role="alert">
                  {interestError}
                </p>
              )}

              <label
                htmlFor="companyName"
                className="mt-8 block text-base font-semibold text-brand-white">
                Company Name <span className="text-brand-cyan">*</span>
              </label>

              <input
                id="companyName"
                type="text"
                required
                value={companyName}
                onChange={(event) => setCompanyName(event.target.value)}
                placeholder="Your company or website?"
                className="mt-3 w-full rounded-xl border border-brand-amethyst-border/70 bg-surface-deep px-4 py-3 text-sm text-brand-white outline-none transition placeholder:text-brand-muted-deep focus:border-brand-cyan focus:ring-4 focus:ring-brand-cyan/20"
              />

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-brand-white">
                    Your Name <span className="text-brand-cyan">*</span>
                  </label>

                  <input
                    id="name"
                    type="text"
                    required
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                    placeholder="Enter your full name"
                    className="mt-2 w-full rounded-xl border border-brand-amethyst-border/70 bg-surface-deep px-4 py-3 text-sm text-brand-white outline-none transition placeholder:text-brand-muted-deep focus:border-brand-cyan focus:ring-4 focus:ring-brand-cyan/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-brand-white">
                    Work Email <span className="text-brand-cyan">*</span>
                  </label>

                  <input
                    id="email"
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(event) => setCustomerEmail(event.target.value)}
                    placeholder="Enter your work email"
                    className="mt-2 w-full rounded-xl border border-brand-amethyst-border/70 bg-surface-deep px-4 py-3 text-sm text-brand-white outline-none transition placeholder:text-brand-muted-deep focus:border-brand-cyan focus:ring-4 focus:ring-brand-cyan/20"
                  />
                </div>
              </div>

              <AnimatePresence>
                {selectedChips.includes("others") && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25 }}
                    className="mt-6">
                    <label
                      htmlFor="others"
                      className="block text-sm font-semibold text-brand-white">
                      Tell us more about your idea ✨
                    </label>

                    <textarea
                      id="others"
                      rows={4}
                      value={otherMessage}
                      onChange={(event) => setOtherMessage(event.target.value)}
                      placeholder="Write your idea or requirement here..."
                      className="mt-2 w-full resize-none rounded-xl border border-brand-amethyst-border/70 bg-surface-deep px-4 py-3 text-sm leading-6 text-brand-white outline-none transition placeholder:text-brand-muted-deep focus:border-brand-cyan focus:ring-4 focus:ring-brand-cyan/20"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-brand-cyan px-5 py-3.5 text-sm font-semibold text-brand-black shadow-sm transition hover:bg-brand-cyan-hover focus:outline-none focus:ring-4 focus:ring-brand-cyan/25 disabled:cursor-not-allowed disabled:opacity-60">
                {loading ? "Sending..." : "Start the Conversation"}
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </MotionSection>
  );
}

export default ContactUs;
