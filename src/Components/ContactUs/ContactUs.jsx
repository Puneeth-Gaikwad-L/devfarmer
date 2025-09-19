import React, { useState } from "react";
import emailjs from '@emailjs/browser'
import { emailJsConfig, getFormattedDateTime } from "../../util/util";

function ContactUs() {
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [selectedChips, setSelectedChips] = useState([]);
    const [loading, setLoading] = useState(false);

    const onFormSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        const emailTemplate = {
            from_name: customerName,
            time: getFormattedDateTime(),
            message: `${customerName} from ${companyName} is interested in ${selectedChips}. Please connect with the client on ${customerEmail}`,
            reply_to: "sk9008899542@gmail.com",
        };
        console.log(emailTemplate);
        
        setLoading(true);
        emailjs.send(emailJsConfig.serviceId, emailJsConfig.templateId, emailTemplate, emailJsConfig.publicKey)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                alert("Thank you for reaching out. We'll get back to you soon!");
            })
            .then(()=>{
                setCustomerName("");
                setCustomerEmail("");
                setCompanyName("");
                setSelectedChips([]);
                setLoading(false);
            })
            .catch((err) => {
                console.log('FAILED...', err);
                setLoading(false);
                alert("Oops! Something went wrong. Please try again later.");
            });
            
        
    };

    const toggleChip = (item) => {
        setSelectedChips((prev) =>
            prev.includes(item)
                ? prev.filter((chip) => chip !== item)
                : [...prev, item]
        );
    };

    return (
        <section className="max-w-6xl mx-auto px-6 py-12">
            {/* Heading */}
            <h3 className="text-7xl font-bold leading-right text-center w-[60%] m-auto text-indigo-700">
                <span className="text-indigo-400">Say Hi!</span> and tell us about your
                idea
            </h3>

            {/* Subtext */}
            <p className="mt-3 text-indigo-500 text-center">
                Have a project in mind? We'd love to hear from you!
            </p>

            {/* Form */}
            <form className="mt-8 space-y-6" onSubmit={onFormSubmit}>
                {/* Name + Email side by side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name*
                        </label>
                        <input
                            onChange={(e) => setCustomerName(e.target.value)}
                            required={true}
                            disabled={loading}
                            value={customerName}
                            id="name"
                            type="text"
                            placeholder="Hello..."
                            className="mt-2 w-full border-b border-gray-300 focus:border-black focus:outline-none py-2 placeholder-gray-400"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email*
                        </label>
                        <input
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            required={true}
                            disabled={loading}
                            value={customerEmail}
                            id="email"
                            type="email"
                            placeholder="Where can we reply?"
                            className="mt-2 w-full border-b border-gray-300 focus:border-black focus:outline-none py-2 placeholder-gray-400"
                        />
                    </div>
                </div>

                {/* Company */}
                <div>
                    <label
                        htmlFor="companyName"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Company Name*
                    </label>
                    <input
                        onChange={(e) => setCompanyName(e.target.value)}
                        required={true}
                        disabled={loading}
                        value={companyName}
                        id="companyName"
                        type="text"
                        placeholder="Your company or website?"
                        className="mt-2 w-full border-b border-gray-300 focus:border-black focus:outline-none py-2 placeholder-gray-400"
                    />
                </div>

                {/* Chips */}
                <div>
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
                        ].map((item) => (
                            <button
                                onClick={() => toggleChip(item)}
                                disabled={loading}
                                key={item}
                                type="button"
                                className={`px-4 py-2 border rounded-full text-sm transition 
                                            ${selectedChips.includes(item)
                                        ? "bg-indigo-500 text-white border-indigo-500"
                                        : "text-gray-700 border-gray-300 hover:bg-indigo-500 hover:text-white"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
                <button
                    type="submit"
                    className="mt-6 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition"
                >
                    {loading ? "Sending..." : "Submit"}
                </button>
            </form>
        </section>
    );
}

export default ContactUs;
