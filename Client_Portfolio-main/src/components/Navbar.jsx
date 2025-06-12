import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };
  const routes = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
    { name: "Resume", path: "/resume" },
    { name: "Contact", path: "/contact" },
  ];

  // Animation variants for the Navbar
  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Animation variants for mobile menu
  const mobileMenuVariants = {
    closed: { x: "100%", opacity: 0 },
    open: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <motion.nav
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-purple-900/30 px-6 py-3 md:px-12 md:py-4 flex justify-between items-center transition-all duration-500"
      style={{
        boxShadow: "0 0 20px rgba(139, 92, 246, 0.2)",
      }}
    >
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <Link to="/" className="relative group">
          <motion.div
            className="relative w-12 h-12"
            whileHover={{ rotateY: 360, scale: 1.1 }}
            transition={{ duration: 0.8 }}
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="45" fill="url(#grad1)" />
              <path
                d="M30 30 L70 70 M70 30 L30 70"
                stroke="#ffffff"
                strokeWidth="4"
                fill="none"
                className="transition-all duration-500 group-hover:stroke-purple-300"
              />
              <text
                x="50"
                y="65"
                fontSize="36"
                fontWeight="bold"
                fill="#ffffff"
                textAnchor="middle"
                fontFamily="'Inter', sans-serif"
                className="transition-all duration-500 group-hover:fill-purple-200"
              >
                SP
              </text>
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop
                    offset="0%"
                    style={{ stopColor: "#8B5CF6", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#3B82F6", stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>
            </svg>
            {/* Glowing effect on hover */}
            <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-lg group-hover:bg-purple-500/40 transition-all duration-500"></div>
          </motion.div>
        </Link>
        <motion.div
          className="text-xl md:text-2xl font-bold text-white tracking-tight select-none"
          whileHover={{ x: 5, color: "#D1D5DB" }}
          transition={{ duration: 0.3 }}
        >
          Sameer Pandey
        </motion.div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        {routes.map((route) => (
          <Link
            key={route.name}
            to={route.path}
            className="relative group flex items-center justify-center"
          >
            <motion.div
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                isActive(route.path)
                  ? "bg-gradient-to-r from-purple-600 to-blue-600"
                  : "bg-gray-800/50"
              } group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600`}
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <span
                className={`text-sm font-medium transition-all duration-300 ${
                  isActive(route.path) ? "text-white" : "text-gray-200"
                } group-hover:text-white`}
              >
                {route.name.charAt(0)}
              </span>
            </motion.div>
            {/* Tooltip for menu item */}
            <span className="absolute top-16 opacity-0 group-hover:opacity-100 text-gray-200 text-sm font-medium bg-black/80 rounded-md px-2 py-1 transition-opacity duration-300 pointer-events-none">
              {route.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <motion.button
          onClick={toggleMenu}
          className="text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-600 rounded-md p-2 transition-all duration-300"
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
                className="transition-all duration-300"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
                className="transition-all duration-300"
              />
            )}
          </svg>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        variants={mobileMenuVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className="md:hidden fixed top-0 right-0 h-full w-64 bg-black/90 backdrop-blur-md border-l border-purple-900/30 z-50"
      >
        <div className="flex flex-col items-center py-16 space-y-6">
          {routes.map((route) => (
            <Link
              key={route.name}
              to={route.path}
              className="relative group"
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                className={`text-xl font-medium transition-all duration-300 ${
                  isActive(route.path) ? "text-white" : "text-gray-300"
                } group-hover:text-white px-4 py-2 rounded-full ${
                  isActive(route.path)
                    ? "bg-gradient-to-r from-purple-600 to-blue-600"
                    : ""
                }`}
                whileHover={{ scale: 1.05, x: 5 }}
                transition={{ duration: 0.3 }}
              >
                {route.name}
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}

export default Navbar;
