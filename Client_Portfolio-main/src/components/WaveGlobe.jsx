import { motion } from "framer-motion";

export default function WaveGlobe({ children }) {
  return (
    <div className="relative w-60 h-60 sm:w-68 sm:h-68 md:w-76 md:h-76 rounded-full bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 shadow-[0_0_70px_20px_rgba(100,200,255,0.5)] flex items-center justify-center group overflow-hidden">
      {/* Wave Animation Layers */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          animate={{
            y: [-20, 20, -20],
            scaleX: [0.9, 1.1, 0.9],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 w-[200%] h-[120%] left-[-50%]"
        >
          <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-cyan-300 to-transparent rounded-[100%_100%_0_0] transform-gpu" />
        </motion.div>
        <motion.div
          animate={{
            y: [0, 40, 0],
            scaleX: [1.1, 0.9, 1.1],
          }}
          transition={{
            repeat: Infinity,
            duration: 7,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute bottom-0 w-[200%] h-[120%] left-[-50%]"
        >
          <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-purple-400 to-transparent rounded-[100%_100%_0_0] transform-gpu" />
        </motion.div>
      </div>{" "}
      {/* Background Glow */}
      <div className="absolute w-full h-full rounded-full bg-cyan-300 blur-3xl opacity-20 animate-pulse" />
      {/* Orbiting Elements */}
      <div className="absolute w-[95%] h-[95%] rounded-full border-2 border-cyan-200/60 group-hover:animate-spin opacity-90" />
      <div className="absolute w-2 h-2 bg-cyan-100 rounded-full top-4 left-10 animate-orbit group-hover:bg-cyan-50" />
      <div className="absolute w-2 h-2 bg-purple-100 rounded-full bottom-4 right-10 animate-orbit-reverse group-hover:bg-purple-50" />
      {/* Comet Effect */}
      <div className="absolute right-5 top-8 w-16 h-2 bg-gradient-to-r from-white/90 to-cyan-300 blur-lg rounded-full rotate-45 animate-comet" />
      {children}
    </div>
  );
}
