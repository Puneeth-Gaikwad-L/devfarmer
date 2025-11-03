import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { emailJsConfig, getFormattedDateTime } from "../../util/util";

function ContactUs() {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [selectedChips, setSelectedChips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [otherMessage, setOtherMessage] = useState("");

  const onFormSubmit = (e) => {
    e.preventDefault();
    const formattedChips = selectedChips.join(", ");
    const emailTemplate = {
      from_name: customerName,
      time: getFormattedDateTime(),
      company_name: companyName,
      interest: formattedChips,
      message: `${customerName} from ${companyName} is interested in ${formattedChips}. ${otherMessage ? `\n User's note: "${otherMessage}"` : ""} \n Please connect with the client on ${customerEmail}`,
      reply_to: "contact@devfarmer.xyz",
    };

    setLoading(true);
    emailjs
      .send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        emailTemplate,
        emailJsConfig.publicKey
      )
      .then((response) => {
        alert("Thank you for reaching out. We'll get back to you soon!");
      })
      .then(() => {
        setCustomerName("");
        setCustomerEmail("");
        setCompanyName("");
        setSelectedChips([]);
        setLoading(false);
      })
      .catch((err) => {
        alert("Oops! Something went wrong. Please try again later.");
        setLoading(false);
      });
  };

  const toggleChip = (item) => {
    setSelectedChips((prev) =>
      prev.includes(item)
        ? prev.filter((chip) => chip !== item)
        : [...prev, item]
    );
  };

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const chipVariants = {
    hover: { scale: 1.1, backgroundColor: "#7e3af2", color: "#fff" },
  };

  const buttonVariants = {
    hover: { scale: 1.05, backgroundColor: "#6b21a8" },
  };

  return (
    <motion.section
      id="contact-us"
      className="max-w-6xl mx-auto px-6 py-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}>
      {/* Heading */}
      <motion.h3
        className="text-3xl sm:text-4xl md:text-7xl font-bold text-center w-[90%] sm:w-[70%] md:w-[60%] m-auto text-purple-700 leading-snug sm:leading-snug md:leading-tight"
        variants={containerVariants}>
        <span className="text-purple-400">Say Hi!</span> and tell us about your
        idea
      </motion.h3>

      {/* Subtext */}
      <motion.p
        className="mt-2 sm:mt-3 text-sm sm:text-base md:text-purple-500 text-center w-[90%] sm:w-[70%] md:w-auto m-auto"
        variants={containerVariants}>
        Have a project in mind? We'd love to hear from you!
      </motion.p>

      {/* Form */}
      <motion.form
        className="mt-8 space-y-6"
        onSubmit={onFormSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}>
        {/* Name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={containerVariants}>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700">
              Name*
            </label>
            <input
              onChange={(e) => setCustomerName(e.target.value)}
              required
              disabled={loading}
              value={customerName}
              id="name"
              type="text"
              placeholder="Hello..."
              className="mt-2 w-full border-b border-gray-300 focus:border-black focus:outline-none py-2 placeholder-gray-400"
            />
          </motion.div>

          <motion.div variants={containerVariants}>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700">
              Email*
            </label>
            <input
              onChange={(e) => setCustomerEmail(e.target.value)}
              required
              disabled={loading}
              value={customerEmail}
              id="email"
              type="email"
              placeholder="Where can we reply?"
              className="mt-2 w-full border-b border-gray-300 focus:border-black focus:outline-none py-2 placeholder-gray-400"
            />
          </motion.div>
        </div>

        {/* Company */}
        <motion.div variants={containerVariants}>
          <label
            htmlFor="companyName"
            className="block text-sm font-medium text-gray-700">
            Company Name*
          </label>
          <input
            onChange={(e) => setCompanyName(e.target.value)}
            required
            disabled={loading}
            value={companyName}
            id="companyName"
            type="text"
            placeholder="Your company or website?"
            className="mt-2 w-full border-b border-gray-300 focus:border-black focus:outline-none py-2 placeholder-gray-400"
          />
        </motion.div>

        {/* Chips */}
        <motion.div variants={containerVariants}>
          <p className="text-sm font-medium text-gray-700 mb-3">
            What's in your mind?*
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              "Mobile App",
              "Website Design",
              "Branding",
              "Web Development",
              "Illustration",
              "Logo Design",
              "Graphic Design",
              "others"
            ].map((item) => (
              <motion.button
                key={item}
                type="button"
                onClick={() => toggleChip(item)}
                disabled={loading}
                variants={chipVariants}
                whileHover="hover"
                className={`px-4 py-2 border rounded-full text-sm transition 
                  ${
                    selectedChips.includes(item)
                      ? "bg-purple-500 text-white border-purple-500 border-2"
                      : "text-gray-700 border-gray-300 hover:bg-purple-500 hover:text-white"
                  }`}>
                {item}
              </motion.button>
            ))}
          </div>
          <AnimatePresence>
            {selectedChips.includes("others") &&
              <motion.div
                key="others-textarea"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4 }}
                className="mt-5">
                <label htmlFor="others" className="block text-sm font-medium text-gray-700 mb-2">Tell us more about your idea ✨</label>
                <textarea
                  id="others"
                  rows={4}
                  value={otherMessage}
                  onChange={(e) => setOtherMessage(e.target.value)}
                  placeholder="Write your idea or requirement here..."
                  className="w-full rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 p-3 text-sm resize-none"
                />
              </motion.div>}
          </AnimatePresence>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          variants={buttonVariants}
          whileHover="hover"
          className="mt-1 px-6 py-3 bg-purple-600 text-white font-medium rounded-lg shadow hover:bg-purple-700 transition">
          {loading ? "Sending..." : "Submit"}
        </motion.button>
      </motion.form>
    </motion.section>
  );
}

export default ContactUs;
