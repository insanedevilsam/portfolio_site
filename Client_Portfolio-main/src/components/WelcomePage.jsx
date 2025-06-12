import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { CodeBracketIcon, CpuChipIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

export default function WelcomePage({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);

  // Progress effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress((prev) => Math.min(prev + 1, 100));
      } else {
        setTimeout(() => {
          onLoadingComplete();
        }, 600);
      }
    }, 30);

    return () => clearTimeout(timer);
  }, [progress, onLoadingComplete]);

  // Animation variants
  const orbVariants = {
    initial: { scale: 0.5, opacity: 0 },
    animate: {
      scale: [1, 1.05, 1],
      opacity: 1,
      transition: { duration: 2, repeat: Infinity, repeatType: "loop" },
    },
  };

  const letterVariants = {
    initial: { opacity: 0, y: 30 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1, type: "spring", stiffness: 120 },
    }),
  };

  const iconVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: (i) => ({
      opacity: 1,
      scale: 1,
      rotate: [0, 360],
      transition: { duration: 2, delay: i * 0.3, repeat: Infinity, repeatType: "loop" },
    }),
  };

  const letters = "WELCOME".split("");
  const icons = [
    { Icon: CodeBracketIcon, label: "Code" },
    { Icon: CpuChipIcon, label: "AI" },
    { Icon: GlobeAltIcon, label: "Web" },
  ];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#080818] overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a3a] via-[#2a1a5a] to-[#3a1a7a] animate-[gradientShift_12s_ease-in-out_infinite] opacity-90" />
      <div className="absolute inset-0 bg-[url('/stars.png')] opacity-10 bg-repeat" />

      {/* Central Orb and Content */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Central Orb */}
        <motion.div
          variants={orbVariants}
          initial="initial"
          animate="animate"
          className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 shadow-[0_0_60px_15px_rgba(100,200,255,0.5)] flex items-center justify-center"
        >
          {/* Pulsating Glow */}
          <div className="absolute w-full h-full rounded-full bg-cyan-300 blur-3xl opacity-20 animate-[pulse_2.5s_ease-in-out_infinite]" />
          {/* Orbiting Particles */}
          <div className="absolute w-2 h-2 bg-cyan-100 rounded-full top-2 left-8 animate-[orbit_3s_linear_infinite]" />
          <div className="absolute w-2 h-2 bg-purple-100 rounded-full bottom-2 right-8 animate-[orbit_3s_linear_infinite_reverse]" />
        </motion.div>

        {/* Circular Progress Ring */}
        <svg
          className="absolute w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 -top-4"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="4"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="4"
            strokeDasharray="283"
            strokeDashoffset={283 - (progress / 100) * 283}
            strokeLinecap="round"
            initial={{ strokeDashoffset: 283 }}
            animate={{ strokeDashoffset: 283 - (progress / 100) * 283 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00ddeb" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>

        {/* Welcome Text in Orbiting Path */}
        <div className="absolute w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 flex items-center justify-center">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              custom={index}
              variants={letterVariants}
              initial="initial"
              animate="animate"
              className="absolute text-lg sm:text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400"
              style={{
                transform: `rotate(${(index * 360) / letters.length}deg) translateY(-120px) rotate(-${(index * 360) / letters.length}deg)`,
                fontFamily: "'Inter', 'Arial', sans-serif",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Tech Icons */}
        <div className="absolute w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
          {icons.map(({ Icon, label }, index) => (
            <motion.div
              key={label}
              custom={index}
              variants={iconVariants}
              initial="initial"
              animate="animate"
              className="absolute flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-600/20 backdrop-blur-md shadow-[0_0_15px_rgba(100,200,255,0.3)]"
              style={{
                transform: `rotate(${(index * 360) / icons.length}deg) translateY(-160px) rotate(-${(index * 360) / icons.length}deg)`,
              }}
            >
              <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-200" />
            </motion.div>
          ))}
        </div>

        {/* Progress Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          className="mt-48 sm:mt-56 md:mt-64 text-sm sm:text-base font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400"
        >
          Initializing Experience... {progress}%
        </motion.div>
      </div>
    </motion.div>
  );
}