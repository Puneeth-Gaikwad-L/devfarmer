import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { ArrowRight, Check, Mail, Phone } from "lucide-react";
import SectionHeading from "../Common/SectionHeading/SectionHeading";
import { emailJsConfig, getFormattedDateTime, services } from "../../util/util";
import { SELECT_SERVICE_EVENT, takePendingService } from "../../util/contact";

// The four tiers from the Services section, plus an escape hatch
const OPTIONS = [...services.map((service) => service.title), "Not sure yet"];

const inputClass =
  "mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-brand-white outline-none transition placeholder:text-brand-muted-deep focus:border-brand-cyan focus:bg-white/[0.05] focus:ring-4 focus:ring-brand-cyan/15";

function ContactUs() {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [selected, setSelected] = useState(() => {
    const pending = takePendingService();
    return pending && OPTIONS.includes(pending) ? [pending] : [];
  });
  const [honeypot, setHoneypot] = useState("");
  const [interestError, setInterestError] = useState("");
  const [loading, setLoading] = useState(false);
  // null | "success" | "error"
  const [submitStatus, setSubmitStatus] = useState(null);
  const [sentTo, setSentTo] = useState("");

  // A service card elsewhere on the page can pre-select its tier
  useEffect(() => {
    const onSelect = (event) => {
      if (!OPTIONS.includes(event.detail)) return;
      setSelected((previous) =>
        previous.includes(event.detail) ? previous : [...previous, event.detail]
      );
      setInterestError("");
      setSubmitStatus(null);
    };
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
  }, []);

  const toggleOption = (option) => {
    setSelected((previous) =>
      previous.includes(option) ? previous.filter((item) => item !== option) : [...previous, option]
    );
    setInterestError("");
    setSubmitStatus(null);
  };

  const resetForm = () => {
    setCustomerName("");
    setCustomerEmail("");
    setCompanyName("");
    setProjectDetails("");
    setSelected([]);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    if (selected.length === 0) {
      setInterestError("Choose at least one option to continue.");
      return;
    }

    // Bots fill hidden fields; people never see this one. Pretend it worked.
    if (honeypot) {
      setSentTo(customerEmail);
      setSubmitStatus("success");
      resetForm();
      return;
    }

    setLoading(true);
    setSubmitStatus(null);

    emailjs
      .send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        {
          from_name: customerName,
          time: getFormattedDateTime(),
          company_name: companyName,
          interest: selected.join(", "),
          message: `${customerName} from ${companyName} is interested in ${selected.join(", ")}.${
            projectDetails ? `\n\nAbout the project:\n"${projectDetails}"` : ""
          }\n\nPlease connect with the client on ${customerEmail}`,
          reply_to: "Devfarmer1@gmail.com",
        },
        emailJsConfig.publicKey
      )
      .then(() => {
        setSentTo(customerEmail);
        setSubmitStatus("success");
        resetForm();
      })
      .catch(() => setSubmitStatus("error"))
      .finally(() => setLoading(false));
  };

  return (
    <motion.section
      id="contact"
      className="site-container scroll-mt-24 py-20 md:py-28"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
      <div className="grid gap-12 rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgb(59_10_107/0.28),rgb(10_8_15/0.85)_60%)] p-6 shadow-[0_40px_120px_rgb(0_0_0/0.5)] sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:p-14">
        {/* left: pitch + direct contact */}
        <div className="flex flex-col">
          <SectionHeading eyebrow="Get in touch" title="Have a project" accent="in mind?" />
          <p className="mt-6 max-w-md text-base leading-relaxed text-brand-muted">
            Tell us what you&apos;re looking to build and we&apos;ll start the conversation.
          </p>

          <div className="mt-10 space-y-6">
            <a
              href="mailto:Devfarmer1@gmail.com"
              className="group flex items-start gap-4 text-brand-muted">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-amethyst/55 text-brand-cyan transition group-hover:bg-brand-cyan group-hover:text-brand-black">
                <Mail size={20} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-brand-white">Email us</span>
                <span className="mt-1 block text-sm transition group-hover:text-brand-cyan">
                  Devfarmer1@gmail.com
                </span>
              </span>
            </a>
            <a href="tel:+919008899542" className="group flex items-start gap-4 text-brand-muted">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-amethyst/55 text-brand-cyan transition group-hover:bg-brand-cyan group-hover:text-brand-black">
                <Phone size={20} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-brand-white">Call us</span>
                <span className="mt-1 block text-sm transition group-hover:text-brand-cyan">
                  +91 90088 99542
                </span>
              </span>
            </a>
          </div>
        </div>

        {/* right: the form, or the confirmation once it's sent */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {submitStatus === "success" ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                role="status"
                className="flex h-full min-h-[24rem] flex-col items-start justify-center">
                <span className="grid size-14 place-items-center rounded-full bg-brand-cyan text-brand-black shadow-[0_0_40px_rgb(0_229_255/0.45)]">
                  <Check size={28} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-3xl font-semibold text-brand-white">Message sent</h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-brand-muted">
                  Thanks for reaching out. We&apos;ve got your details
                  {sentTo ? ` and will reply to ${sentTo}` : ""}.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitStatus(null)}
                  className="mt-8 rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold text-brand-white transition-colors hover:border-brand-cyan hover:text-brand-cyan">
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onFormSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}>
                <fieldset disabled={loading} className="min-w-0">
                  <legend className="text-base font-semibold text-brand-white">
                    What are you looking for? <span className="text-brand-cyan">*</span>
                  </legend>

                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {OPTIONS.map((option) => {
                      const isSelected = selected.includes(option);
                      return (
                        <button
                          key={option}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => toggleOption(option)}
                          className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                            isSelected
                              ? "border-brand-cyan bg-brand-cyan text-brand-black"
                              : "border-white/15 bg-white/[0.03] text-brand-text-soft hover:border-brand-cyan/60 hover:text-brand-white"
                          }`}>
                          {isSelected && <Check size={14} aria-hidden="true" />}
                          {option}
                        </button>
                      );
                    })}
                  </div>

                  {interestError && (
                    <p className="mt-3 text-sm text-red-300" role="alert">
                      {interestError}
                    </p>
                  )}

                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-brand-white">
                        Your name <span className="text-brand-cyan">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={customerName}
                        onChange={(event) => setCustomerName(event.target.value)}
                        placeholder="Enter your full name"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-brand-white">
                        Work email <span className="text-brand-cyan">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={customerEmail}
                        onChange={(event) => setCustomerEmail(event.target.value)}
                        placeholder="you@company.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="mt-5">
                    <label
                      htmlFor="companyName"
                      className="block text-sm font-semibold text-brand-white">
                      Company or website <span className="text-brand-cyan">*</span>
                    </label>
                    <input
                      id="companyName"
                      type="text"
                      required
                      autoComplete="organization"
                      value={companyName}
                      onChange={(event) => setCompanyName(event.target.value)}
                      placeholder="Your company or website"
                      className={inputClass}
                    />
                  </div>

                  <div className="mt-5">
                    <label htmlFor="details" className="block text-sm font-semibold text-brand-white">
                      Tell us about your project{" "}
                      <span className="font-normal text-brand-muted-deep">(optional)</span>
                    </label>
                    <textarea
                      id="details"
                      rows={4}
                      value={projectDetails}
                      onChange={(event) => setProjectDetails(event.target.value)}
                      placeholder="What are you building, and what do you need?"
                      className={`${inputClass} resize-none leading-6`}
                    />
                  </div>

                  {/* honeypot: hidden from people, tempting to bots */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="website">Leave this field empty</label>
                    <input
                      id="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(event) => setHoneypot(event.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="group mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-brand-cyan px-7 py-3 text-sm font-semibold text-brand-black shadow-[0_0_0_0_rgb(0_229_255/0.4)] transition-shadow duration-500 hover:shadow-[0_0_40px_6px_rgb(0_229_255/0.35)] disabled:cursor-not-allowed disabled:opacity-60">
                    {loading ? "Sending..." : "Start the conversation"}
                    <ArrowRight
                      size={17}
                      aria-hidden="true"
                      className="transition-transform duration-500 group-hover:translate-x-0.5"
                    />
                  </button>

                  <div aria-live="polite">
                    {submitStatus === "error" && (
                      <p className="mt-4 text-sm text-red-300" role="alert">
                        Something went wrong sending your message. Please try again, or email us at
                        Devfarmer1@gmail.com.
                      </p>
                    )}
                  </div>
                </fieldset>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}

export default ContactUs;
