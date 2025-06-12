import { useState } from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
    },
  },
};

const buttonVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    boxShadow: "0 0 25px rgba(0, 200, 255, 0.6)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  tap: {
    scale: 0.95,
    boxShadow: "0 0 15px rgba(0, 200, 255, 0.4)",
  },
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null,
  });
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ isSubmitting: true, isSubmitted: false, error: null });

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Success simulation
    setFormStatus({
      isSubmitting: false,
      isSubmitted: true,
      error: null,
    });

    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen relative bg-[#050510] flex items-center justify-center py-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Dark grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNjAgMEgwdjYwaDYwVjB6IiBmaWxsPSJub25lIiBzdHJva2U9IiMxMTExMjUiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9zdmc+')] opacity-60"></div>

        {/* Corner light effects */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-indigo-500/10 to-transparent rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/4 w-1/4 h-1/4 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left side - Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-8">
              <div className="inline-flex items-center justify-center mb-4">
                <span className="h-px w-8 bg-cyan-500 mr-4"></span>
                <span className="text-cyan-500 text-sm uppercase tracking-wider font-semibold">
                  Get In Touch
                </span>
                <span className="h-px w-8 bg-cyan-500 ml-4"></span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Let's Create Something{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">
                  Amazing
                </span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                I'm always open to discussing new projects, creative ideas or
                opportunities to be part of your vision.
              </p>
            </div>

            {/* Contact Info Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-5"
            >
              <motion.div
                variants={itemVariants}
                className="bg-[#0a0a20]/60 backdrop-blur-md border border-gray-800 rounded-lg p-5 transform transition-all hover:scale-105 hover:border-cyan-800/50"
              >
                <div className="flex items-center">
                  <div className="mr-4 bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Phone</h3>
                    <p className="text-gray-400">+91 98765 43210</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-[#0a0a20]/60 backdrop-blur-md border border-gray-800 rounded-lg p-5 transform transition-all hover:scale-105 hover:border-cyan-800/50"
              >
                <div className="flex items-center">
                  <div className="mr-4 bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Email</h3>
                    <p className="text-gray-400">contact@email.com</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-[#0a0a20]/60 backdrop-blur-md border border-gray-800 rounded-lg p-5 transform transition-all hover:scale-105 hover:border-cyan-800/50"
              >
                <div className="flex items-center">
                  <div className="mr-4 bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Location</h3>
                    <p className="text-gray-400">New Delhi, India</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Social Media Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-10"
            >
              <h3 className="text-white text-lg font-medium mb-4">
                Connect With Me
              </h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-[#0a0a20] hover:bg-[#151530] p-3 rounded-full border border-gray-800 hover:border-cyan-800 transition-all"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-[#0a0a20] hover:bg-[#151530] p-3 rounded-full border border-gray-800 hover:border-cyan-800 transition-all"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-[#0a0a20] hover:bg-[#151530] p-3 rounded-full border border-gray-800 hover:border-cyan-800 transition-all"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-[#0a0a20] hover:bg-[#151530] p-3 rounded-full border border-gray-800 hover:border-cyan-800 transition-all"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center"
          >
            <div className="w-full max-w-md mx-auto">
              {formStatus.isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#0a0a20]/60 backdrop-blur-md rounded-2xl border border-green-500/30 p-8 text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Message Sent!
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Thank you for reaching out. I'll get back to you as soon as
                    possible.
                  </p>
                  <motion.button
                    variants={buttonVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() =>
                      setFormStatus({
                        isSubmitting: false,
                        isSubmitted: false,
                        error: null,
                      })
                    }
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium py-3 px-6 rounded-lg"
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  onSubmit={handleSubmit}
                  className="bg-[#0a0a20]/60 backdrop-blur-md rounded-2xl border border-gray-800 p-8 shadow-[0_10px_50px_rgba(8,8,40,0.5)]"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Send Me a Message
                  </h2>

                  {/* Name field */}
                  <motion.div variants={itemVariants} className="mb-6 relative">
                    <label
                      htmlFor="name"
                      className={`absolute left-3 transition-all duration-300 ${
                        focusedField === "name" || formData.name
                          ? "-top-2 text-xs bg-[#0a0a20] px-2 text-cyan-400"
                          : "top-3 text-gray-400"
                      }`}
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full bg-transparent text-white border ${
                        focusedField === "name"
                          ? "border-cyan-500"
                          : "border-gray-700"
                      } rounded-lg py-3 px-4 focus:outline-none transition-colors duration-300`}
                    />
                  </motion.div>

                  {/* Email field */}
                  <motion.div variants={itemVariants} className="mb-6 relative">
                    <label
                      htmlFor="email"
                      className={`absolute left-3 transition-all duration-300 ${
                        focusedField === "email" || formData.email
                          ? "-top-2 text-xs bg-[#0a0a20] px-2 text-cyan-400"
                          : "top-3 text-gray-400"
                      }`}
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full bg-transparent text-white border ${
                        focusedField === "email"
                          ? "border-cyan-500"
                          : "border-gray-700"
                      } rounded-lg py-3 px-4 focus:outline-none transition-colors duration-300`}
                    />
                  </motion.div>

                  {/* Subject field */}
                  <motion.div variants={itemVariants} className="mb-6 relative">
                    <label
                      htmlFor="subject"
                      className={`absolute left-3 transition-all duration-300 ${
                        focusedField === "subject" || formData.subject
                          ? "-top-2 text-xs bg-[#0a0a20] px-2 text-cyan-400"
                          : "top-3 text-gray-400"
                      }`}
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("subject")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full bg-transparent text-white border ${
                        focusedField === "subject"
                          ? "border-cyan-500"
                          : "border-gray-700"
                      } rounded-lg py-3 px-4 focus:outline-none transition-colors duration-300`}
                    />
                  </motion.div>

                  {/* Message field */}
                  <motion.div variants={itemVariants} className="mb-6 relative">
                    <label
                      htmlFor="message"
                      className={`absolute left-3 transition-all duration-300 ${
                        focusedField === "message" || formData.message
                          ? "-top-2 text-xs bg-[#0a0a20] px-2 text-cyan-400"
                          : "top-3 text-gray-400"
                      }`}
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      rows="5"
                      required
                      className={`w-full bg-transparent text-white border ${
                        focusedField === "message"
                          ? "border-cyan-500"
                          : "border-gray-700"
                      } rounded-lg py-3 px-4 focus:outline-none transition-colors duration-300 resize-none`}
                    ></textarea>
                  </motion.div>

                  {/* Submit button */}
                  <motion.div variants={itemVariants} className="text-center">
                    <motion.button
                      variants={buttonVariants}
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                      type="submit"
                      disabled={formStatus.isSubmitting}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium py-3 px-6 rounded-lg disabled:opacity-70 relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {formStatus.isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </div>
                      ) : (
                        "Send Message"
                      )}
                    </motion.button>
                  </motion.div>
                </motion.form>
              )}

              {/* Terminal-inspired element */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="mt-8 bg-[#0a0a20] border border-gray-800 rounded-lg overflow-hidden"
              >
                <div className="bg-gray-800 px-3 py-1.5 flex items-center">
                  <div className="flex space-x-1.5 mr-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-gray-400 text-xs font-mono">
                    response.js
                  </div>
                </div>
                <div className="p-4 font-mono text-sm">
                  <div className="text-gray-400">
                    // I usually respond within
                  </div>
                  <div className="text-cyan-400">
                    const responseTime ={" "}
                    <span className="text-green-400">'24 hours'</span>;
                  </div>
                  <div className="text-gray-400 mt-2">
                    // Looking forward to collaborating
                  </div>
                  <div className="text-cyan-400">
                    const status ={" "}
                    <span className="text-green-400">
                      'Available for projects'
                    </span>
                    ;
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
