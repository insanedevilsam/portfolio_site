import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 bg-[#080818]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a3a] via-[#2a1a5a] to-[#3a1a7a] animate-[gradientShift_15s_ease-in-out_infinite] opacity-95" />

      <div className="text-center z-10">
        <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400 mb-6">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-purple-300 mb-6">
          Page Not Found
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500/80 via-blue-500/80 to-purple-600/80 backdrop-blur-md text-white font-semibold text-lg shadow-[0_0_25px_rgba(100,200,255,0.5)] hover:scale-105 hover:shadow-[0_0_35px_rgba(100,200,255,0.7)] transition-all duration-300"
        >
          Go Home
        </Link>
      </div>

      {/* Abstract decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-40 pointer-events-none">
        <div className="absolute top-[30%] left-[20%] w-36 h-36 rounded-full bg-purple-500/30 blur-2xl" />
        <div className="absolute bottom-[20%] right-[30%] w-48 h-48 rounded-full bg-blue-500/30 blur-3xl" />
        <div className="absolute top-[60%] right-[20%] w-24 h-24 rounded-full bg-cyan-500/30 blur-xl" />
      </div>
    </motion.div>
  );
}

export default NotFoundPage;
