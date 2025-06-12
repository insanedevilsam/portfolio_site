import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
  AnimatePresence,
} from "framer-motion";
import BackgroundAnimation from "./BackgroundAnimation";
import WaveGlobe from "./WaveGlobe";

// Tech stack icons
const techStack = [
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
];

// Service offerings
const services = [
  {
    title: "Web Development",
    description:
      "Building responsive and performant web applications using modern frameworks and technologies.",
    icon: "🌐",
  },
  {
    title: "AI Solutions",
    description:
      "Creating intelligent systems and automating processes with machine learning and AI.",
    icon: "🤖",
  },
  {
    title: "UI/UX Design",
    description:
      "Designing user-friendly interfaces and seamless user experiences.",
    icon: "🎨",
  },
  {
    title: "Consulting",
    description:
      "Providing expert advice and strategies for your technical projects and business needs.",
    icon: "💼",
  },
];

// Achievements
const achievements = [
  {
    title: "Open Source Contributor",
    details:
      "Contributed to various open source projects, enhancing functionality and fixing bugs.",
    icon: "🌟",
  },
  {
    title: "Hackathon Winner",
    details:
      "Won 1st place in XYZ Hackathon 2023 for developing an innovative web solution.",
    icon: "🏆",
  },
  {
    title: "Certified Developer",
    details:
      "Achieved XYZ Certification in Full Stack Development from ABC Institute.",
    icon: "📜",
  },
  {
    title: "Tech Speaker",
    details:
      "Presented talks on web development and AI at several tech conferences.",
    icon: "🎤",
  },
];

// Timeline events for career journey
const timelineEvents = [
  {
    year: "2023",
    title: "Senior Developer",
    company: "TechCorp Inc.",
    description: "Leading web application development with modern tech stacks",
    icon: "💼",
  },
  {
    year: "2022",
    title: "Machine Learning Intern",
    company: "Aican Automate",
    description: "Worked on AI solutions for automation challenges",
    icon: "🤖",
  },
  {
    year: "2021",
    title: "Freelance Developer",
    company: "Self-employed",
    description: "Delivered custom solutions for diverse clients",
    icon: "💻",
  },
  {
    year: "2020",
    title: "Computer Science Degree",
    company: "Tech University",
    description: "Graduated with honors in Computer Science",
    icon: "🎓",
  },
];

// Testimonials from clients
const testimonials = [
  {
    quote:
      "Sameer delivered our project ahead of schedule with incredible attention to detail. His communication skills made the process smooth and enjoyable.",
    name: "Alex Johnson",
    position: "CTO, StartupX",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote:
      "Working with Sameer was a game-changer for our company. His technical expertise and problem-solving abilities are truly exceptional.",
    name: "Maria Garcia",
    position: "Project Manager, TechSolutions",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    quote:
      "The AI integration Sameer built for us increased our efficiency by 40%. Highly recommended for any technical challenge.",
    name: "David Kim",
    position: "Founder, AIVentures",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
  },
];

// Featured companies/platforms
const featuredIn = [
  {
    name: "TechCrunch",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/TechCrunch_logo.svg/512px-TechCrunch_logo.svg.png",
  },
  {
    name: "ProductHunt",
    logo: "https://ph-static.imgix.net/ph-logo-1.png",
  },
  {
    name: "GitHub",
    logo: "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png",
  },
  {
    name: "Dev.to",
    logo: "https://d2fltix0v2e0sb.cloudfront.net/dev-rainbow.png",
  },
  {
    name: "Dribbble",
    logo: "https://cdn.dribbble.com/assets/dribbble-ball-icon-4e54c54abecf8efe027abe6f8bc7794553b8abef3bdb49cd15797067cf80ca53.svg",
  },
];

// Terminal typing effect component
const TerminalText = ({ text, typingSpeed = 50, className = "" }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, typingSpeed]);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`font-mono ${className}`}>
      <span>{displayedText}</span>
      <span
        className={`${
          cursorVisible ? "opacity-100" : "opacity-0"
        } transition-opacity duration-100`}
      >
        |
      </span>
    </div>
  );
};

// Animated counter for stats
const Counter = ({ end, duration = 2 }) => {
  const nodeRef = useRef();
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      let startTime;
      let animationFrame;

      const updateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min(
          (timestamp - startTime) / (duration * 1000),
          1
        );

        setCount(Math.floor(progress * end));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(updateCount);
        }
      };

      animationFrame = requestAnimationFrame(updateCount);

      return () => cancelAnimationFrame(animationFrame);
    }
  }, [end, duration, inView]);

  return <span ref={nodeRef}>{count}+</span>;
};

// Skills Carousel component
const SkillsCarousel = () => {
  return (
    <div className="flex gap-4 overflow-x-auto py-4">
      {techStack.map((tech, index) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="flex-shrink-0 w-24 h-24 rounded-lg bg-gray-800/60 backdrop-blur-md border border-gray-700 flex items-center justify-center text-center"
        >
          <img
            src={tech.icon}
            alt={tech.name}
            className="w-12 h-12 mb-2 mx-auto"
          />
          <div className="text-xs font-medium text-gray-300">{tech.name}</div>
        </motion.div>
      ))}
    </div>
  );
};

// Timeline component to show career journey
const Timeline = () => {
  return (
    <div className="space-y-6 relative">
      <h3 className="text-cyan-300 font-medium flex items-center text-sm mb-4">
        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        MY JOURNEY
      </h3>

      {/* Vertical line */}
      <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-purple-600 rounded-full"></div>

      <div className="space-y-8">
        {timelineEvents.map((event, index) => (
          <motion.div
            key={event.year}
            className="relative pl-14"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Icon circle */}
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-[#0a0a20] border-2 border-cyan-500 flex items-center justify-center z-10">
              <span className="text-lg">{event.icon}</span>
            </div>

            {/* Content */}
            <div className="bg-[#0a0a20]/60 backdrop-blur-sm p-4 rounded-lg border border-gray-800 hover:border-cyan-900/30 transition-colors">
              <div className="text-purple-400 text-xs mb-1">{event.year}</div>
              <h3 className="text-white font-medium">{event.title}</h3>
              <div className="text-cyan-200 text-sm mb-1">{event.company}</div>
              <p className="text-gray-400 text-sm">{event.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Testimonial carousel component
const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0a0a20]/60 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
      <h3 className="text-cyan-300 font-medium flex items-center text-sm mb-6">
        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.7 19.4l-.9-2.3L5 16l1.4-1.4-.9-2.2 2.3-.9.8-2.2 2.3.9 2.2-.8.9 2.3 2.3.9-1.4 1.4.9 2.2-2.3.9-.8 2.2-2.3-.9-2.2.8z" />
        </svg>
        TESTIMONIALS
      </h3>

      <div className="relative h-48 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div className="mb-4 relative">
              <div className="text-4xl text-cyan-500/20 font-serif absolute -top-2 -left-2">
                "
              </div>
              <p className="text-gray-300 italic text-sm sm:text-base relative z-10">
                {testimonials[currentIndex].quote}
              </p>
              <div className="text-4xl text-cyan-500/20 font-serif absolute -bottom-8 -right-2">
                "
              </div>
            </div>

            <div className="flex items-center mt-4">
              <img
                src={testimonials[currentIndex].avatar}
                alt={testimonials[currentIndex].name}
                className="w-10 h-10 rounded-full border-2 border-cyan-500/30"
              />
              <div className="ml-3">
                <div className="text-white font-medium">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-cyan-300 text-xs">
                  {testimonials[currentIndex].position}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-4">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full mx-1 transition-colors ${
              idx === currentIndex ? "bg-cyan-400" : "bg-gray-600"
            }`}
            aria-label={`View testimonial ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function Hero() {
  // Parallax effect for the globe
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 300], [0, -40]);
  const springY = useSpring(yParallax, { stiffness: 120, damping: 20 });

  // Refs for animation
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: false });

  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = heroRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center (-1 to 1)
    mouseX.set((e.clientX - centerX) / (rect.width / 2));
    mouseY.set((e.clientY - centerY) / (rect.height / 2));
  };

  // Transform values for 3D card effect
  const rotateX = useTransform(mouseY, [-1, 1], [5, -5]);
  const rotateY = useTransform(mouseX, [-1, 1], [-5, 5]);
  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen relative overflow-hidden bg-[#080818] flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 -mt-20 pt-40"
    >
      {" "}
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a3a] via-[#2a1a5a] to-[#3a1a7a] opacity-80 animate-gradientShift" />
      {/* Radial gradient vignette */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        style={{
          background:
            "radial-gradient(circle, transparent 0%, rgba(0, 0, 0, 0.5) 100%)",
        }}
      />
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNjAgMEgwdjYwaDYwVjB6IiBmaWxsPSJub25lIiBzdHJva2U9IiMxMTExMjUiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9zdmc+')] opacity-40" />
      {/* Star field animation */}
      <BackgroundAnimation />
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/5 w-64 h-64 rounded-full bg-purple-600/10 blur-[100px]" />{" "}
      <div className="absolute bottom-1/4 right-1/5 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px]" />
      {/* Main content */}
      <div className="container mx-auto max-w-7xl relative z-10 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column: Text content */}
          <div className="flex flex-col space-y-8 order-2 lg:order-1">
            {" "}
            {/* Terminal-inspired intro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#0a0a20]/80 backdrop-blur-sm p-4 rounded-lg border border-gray-800 font-mono text-sm text-gray-300 w-full sm:w-[90%] mt-6"
            >
              <div className="flex items-center mb-2">
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-2 text-xs text-gray-500">portfolio.sh</div>
              </div>
              <div className="mb-1">
                <span className="text-green-400">visitor@portfolio:~$</span>{" "}
                <TerminalText text="whoami" className="inline" />
              </div>
              <div className="mb-1 text-cyan-300">
                Developer | Problem Solver | Innovator
              </div>
              <div className="mb-1">
                <span className="text-green-400">visitor@portfolio:~$</span>{" "}
                <TerminalText
                  text="echo $SKILLS"
                  className="inline"
                  typingSpeed={40}
                />
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2 + index * 0.1 }}
                    className="flex items-center bg-gray-800/60 px-2 py-1 rounded text-xs"
                  >
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="w-3 h-3 mr-1"
                    />
                    {tech.name}
                  </motion.div>
                ))}
              </div>
            </motion.div>{" "}
            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-4 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-300 to-purple-300">
                  Sameer Pandey
                </span>
              </h1>
              <h2 className="text-2xl sm:text-3xl text-cyan-100 font-bold mb-4">
                Web Developer & AI Enthusiast
              </h2>
              <p className="text-gray-300 text-lg max-w-lg">
                Crafting bold ideas into elegant digital solutions. Specializing
                in seamless UIs and robust backend systems. Forever curious,
                always innovating.
              </p>
            </motion.div>{" "}
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-8 text-center my-6"
            >
              <div className="bg-[#0a0a20]/60 backdrop-blur-sm p-4 rounded-lg border border-cyan-900/30">
                <div className="text-3xl font-bold text-cyan-400 mb-1">
                  <Counter end={25} />
                </div>
                <div className="text-gray-400 text-sm">Projects Completed</div>
              </div>
              <div className="bg-[#0a0a20]/60 backdrop-blur-sm p-4 rounded-lg border border-blue-900/30">
                <div className="text-3xl font-bold text-blue-400 mb-1">
                  <Counter end={15} />
                </div>
                <div className="text-gray-400 text-sm">Happy Clients</div>
              </div>
              <div className="bg-[#0a0a20]/60 backdrop-blur-sm p-4 rounded-lg border border-purple-900/30">
                <div className="text-3xl font-bold text-purple-400 mb-1">
                  <Counter end={3} />
                </div>
                <div className="text-gray-400 text-sm">Years Experience</div>
              </div>
            </motion.div>{" "}
            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="flex flex-wrap gap-4 mt-6"
            >
              <motion.a
                href="/projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="relative inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500/80 via-blue-500/80 to-purple-600/80 backdrop-blur-md text-white font-semibold text-lg shadow-[0_0_25px_rgba(100,200,255,0.5)] hover:shadow-[0_0_35px_rgba(100,200,255,0.7)] transition-all duration-300 overflow-hidden group"
              >
                <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                Explore My Work
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 rounded-xl bg-transparent border-2 border-cyan-500/50 text-cyan-300 font-semibold text-lg hover:bg-cyan-500/10 transition-all duration-300"
              >
                Get In Touch
              </motion.a>
            </motion.div>
            {/* Current position */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-sm text-gray-300 bg-[#0a0a20]/60 backdrop-blur-sm p-3 rounded-lg border border-gray-800 inline-block"
            >
              Machine Learning Intern @{" "}
              <span className="text-cyan-200 font-medium">Aican Automate</span>
              <br />
              Aug 2022 – Sep 2022
            </motion.div>
          </div>

          {/* Right column: 3D Interactive Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              delay: 0.5,
              type: "spring",
              stiffness: 90,
              damping: 15,
            }}
            style={{
              y: springY,
              rotateX: rotateX,
              rotateY: rotateY,
              perspective: 1000,
            }}
            className="order-1 lg:order-2 flex justify-center items-center perspective-1000"
          >
            {/* 3D card containing the globe */}
            <motion.div
              className="relative p-8 flex justify-center items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {/* Glowing backdrop */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-600/20 rounded-2xl blur-xl opacity-70" />

              {/* Floating particle effects */}
              <div className="absolute w-full h-full">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-400/80 rounded-full"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -Math.random() * 50 - 20],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: Math.random() * 2 + 3,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                      delay: Math.random() * 5,
                    }}
                  />
                ))}
              </div>

              {/* Main globe */}
              <WaveGlobe>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.2 }}
                  className="z-10 text-center text-white text-xl sm:text-2xl md:text-3xl font-extrabold drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
                >
                  Let's
                  <br />
                  Build
                  <br />
                  Together
                </motion.div>
              </WaveGlobe>
              {/* Code snippets floating around the globe */}
              <motion.div
                className="absolute -top-4 -right-4 bg-[#0a0a20]/80 backdrop-blur-sm p-2 rounded-lg border border-cyan-900/30 text-[10px] font-mono text-cyan-300 transform rotate-3 shadow-lg z-10 max-w-[120px]"
                animate={{
                  y: [0, -8, 0],
                  rotate: [3, 5, 3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {"const solve = (problem) => {"}
                <br />
                &nbsp;&nbsp;{"return innovative_solution;"}
                <br />
                {"}"}
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-[#0a0a20]/80 backdrop-blur-sm p-2 rounded-lg border border-purple-900/30 text-[10px] font-mono text-purple-300 transform -rotate-2 shadow-lg z-10 max-w-[120px]"
                animate={{
                  y: [0, 8, 0],
                  rotate: [-2, -4, -2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                {"function createAmazing() {"}
                <br />
                &nbsp;&nbsp;{"return passion + skills;"}
                <br />
                {"}"}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-8 h-12 rounded-full border-2 border-cyan-500/50 flex justify-center pt-2">
          <motion.div
            className="w-1 h-2 bg-cyan-400 rounded-full"
            animate={{
              y: [0, 6, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
