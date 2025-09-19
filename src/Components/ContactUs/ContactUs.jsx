import React, { useState } from 'react'

function ContactUs() {
const [customerName, setCustomerName] = useState("");
const [customerEmail, setCustomerEmail] = useState("");
const [companyName, setCompanyName] = useState("");
const [selectedChips, setSelectedChips] = useState("");

    const onFormSubmit = (e) =>{
        e.preventDefault();
        // Handle form submission logic here
        console.log(customerName, customerEmail, companyName, selectedChips);
    }

    return (
        <section className="max-w-6xl mx-auto px-6 py-12">
            {/* Heading */}
            <h3 className="text-7xl font-bold leading-right text-center w-[60%] m-auto text-indigo-700">
                <span className="text-indigo-400">Say Hi!</span>{" "}
                and tell us about your idea
            </h3>

            {/* Subtext */}
            <p className="mt-3 text-indigo-500 text-center">
                Have a project in mind? We'd love to hear from you!
            </p>

            {/* Form */}
            <form className="mt-8 space-y-6">
                {/* Name + Email side by side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name*
                        </label>
                        <input
                            onChange={(e) => setCustomerName(e.target.value)}
                            required="true"
                            id="name"
                            type="text"
                            placeholder="Hello..."
                            className="mt-2 w-full border-b border-gray-300 focus:border-black focus:outline-none py-2 placeholder-gray-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email*
                        </label>
                        <input
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            required="true"
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
                        required="true"
                        id="companyName"
                        type="text"
                        placeholder="Your company or website?"
                        className="mt-2 w-full border-b border-gray-300 focus:border-black focus:outline-none py-2 placeholder-gray-400"
                    />
                </div>

                {/* Chips */}
                <div>
                    <p className="text-sm font-medium text-gray-700 mb-3">What's in your mind?*</p>
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
                                onClick={() => setSelectedChips(item)}
                                key={item}
                                type="button"
                                className="px-4 py-2 border rounded-full text-sm text-gray-700 border-gray-300 hover:bg-indigo-500 hover:text-white transition"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            </form>
        </section>

    )
}

export default ContactUs