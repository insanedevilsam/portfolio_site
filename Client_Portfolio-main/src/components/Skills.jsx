import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion";
import TriangularGridBackground from "./TriangularGridBackground";
import Footer from "./Footer";
// Skill categories with their respective skills and proficiency levels
const SKILLS_DATA = {
  Frontend: [
    {
      name: "React.js",
      level: 90,
      icon: "devicon-react-original colored",
      color: "#61DAFB",
    },
    {
      name: "JavaScript",
      level: 92,
      icon: "devicon-javascript-plain colored",
      color: "#F7DF1E",
    },
    {
      name: "HTML5",
      level: 95,
      icon: "devicon-html5-plain colored",
      color: "#E34F26",
    },
    {
      name: "CSS3",
      level: 90,
      icon: "devicon-css3-plain colored",
      color: "#1572B6",
    },
    {
      name: "Tailwind CSS",
      level: 84,
      icon: "devicon-tailwindcss-plain colored",
      color: "#38B2AC",
    },
    {
      name: "Vue.js",
      level: 78,
      icon: "devicon-vuejs-plain colored",
      color: "#4FC08D",
    },
  ],
  Backend: [
    {
      name: "Node.js",
      level: 85,
      icon: "devicon-nodejs-plain colored",
      color: "#339933",
    },
    {
      name: "Python",
      level: 88,
      icon: "devicon-python-plain colored",
      color: "#3776AB",
    },
    {
      name: "Java",
      level: 80,
      icon: "devicon-java-plain colored",
      color: "#007396",
    },
    {
      name: "C++",
      level: 77,
      icon: "devicon-cplusplus-plain colored",
      color: "#00599C",
    },
    {
      name: "PHP",
      level: 72,
      icon: "devicon-php-plain colored",
      color: "#777BB4",
    },
  ],
  Database: [
    {
      name: "MongoDB",
      level: 78,
      icon: "devicon-mongodb-plain colored",
      color: "#47A248",
    },
    {
      name: "MySQL",
      level: 80,
      icon: "devicon-mysql-plain colored",
      color: "#4479A1",
    },
    {
      name: "Firebase",
      level: 65,
      icon: "devicon-firebase-plain colored",
      color: "#FFCA28",
    },
    {
      name: "PostgreSQL",
      level: 70,
      icon: "devicon-postgresql-plain colored",
      color: "#336791",
    },
  ],
  Tools: [
    {
      name: "Git",
      level: 85,
      icon: "devicon-git-plain colored",
      color: "#F05032",
    },
    {
      name: "Docker",
      level: 75,
      icon: "devicon-docker-plain colored",
      color: "#2496ED",
    },
    {
      name: "Figma",
      level: 70,
      icon: "devicon-figma-plain colored",
      color: "#F24E1E",
    },
    {
      name: "Android Studio",
      level: 70,
      icon: "devicon-android-plain colored",
      color: "#3DDC84",
    },
    {
      name: "Flutter",
      level: 65,
      icon: "devicon-flutter-plain colored",
      color: "#02569B",
    },
  ],
};

// Learning journey data
const LEARNING_JOURNEY = [
  {
    year: "2022",
    milestones: [
      "Mastered React advanced patterns and state management",
      "Learned Node.js backend development and REST API design",
      "Started exploring TypeScript for type-safe applications",
    ],
  },
  {
    year: "2023",
    milestones: [
      "Deep dived into cloud infrastructure with AWS",
      "Built CI/CD pipelines with GitHub Actions",
      "Implemented GraphQL APIs for efficient data fetching",
    ],
  },
  {
    year: "2024",
    milestones: [
      "Specialized in NextJS and full-stack applications",
      "Studied system design and architecture patterns",
      "Developed skills in data visualization libraries",
    ],
  },
  {
    year: "2025",
    milestones: [
      "Advanced AI/ML integration in web applications",
      "Exploring blockchain development and Web3",
      "Contributing to open-source projects",
    ],
  },
];

// Skill level labels
const SKILL_LEVEL_LABELS = {
  95: "Expert",
  90: "Expert",
  85: "Advanced",
  80: "Advanced",
  75: "Proficient",
  70: "Proficient",
  65: "Intermediate",
  60: "Intermediate",
  0: "Beginner",
};

// Get skill level label based on the numeric value
function getSkillLevelLabel(level) {
  const thresholds = Object.keys(SKILL_LEVEL_LABELS)
    .map(Number)
    .sort((a, b) => b - a);

  for (const threshold of thresholds) {
    if (level >= threshold) {
      return SKILL_LEVEL_LABELS[threshold];
    }
  }
  return SKILL_LEVEL_LABELS[0];
}

function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleSkills, setVisibleSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Refs for section visibility
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const radarRef = useRef(null);
  const journeyRef = useRef(null);

  // Check if sections are in view
  const heroInView = useInView(heroRef, { once: false, margin: "-100px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-50px" });
  const radarInView = useInView(radarRef, { once: true });
  const journeyInView = useInView(journeyRef, { once: true, margin: "-100px" });

  // For 3D card effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const categories = ["All", ...Object.keys(SKILLS_DATA)];

  // Handle skill selection for comparison
  const toggleSkillSelection = (skill) => {
    if (selectedSkills.some((s) => s.name === skill.name)) {
      setSelectedSkills(selectedSkills.filter((s) => s.name !== skill.name));
    } else {
      if (selectedSkills.length < 3) {
        setSelectedSkills([...selectedSkills, skill]);
      }
    }
  };

  // Check if a skill is selected
  const isSkillSelected = (skill) => {
    return selectedSkills.some((s) => s.name === skill.name);
  };

  // Handle 3D card effect
  const handleMouseMove = (event, cardElement) => {
    if (!cardElement) return;
    const rect = cardElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Handle category change with filtering
  useEffect(() => {
    setIsAnimating(true);

    setTimeout(() => {
      let filteredSkills = [];

      if (activeCategory === "All") {
        Object.entries(SKILLS_DATA).forEach(([category, skills]) => {
          filteredSkills = [
            ...filteredSkills,
            ...skills.map((skill) => ({ ...skill, category })),
          ];
        });
      } else {
        filteredSkills = SKILLS_DATA[activeCategory].map((skill) => ({
          ...skill,
          category: activeCategory,
        }));
      }

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredSkills = filteredSkills.filter((skill) =>
          skill.name.toLowerCase().includes(query)
        );
      }

      filteredSkills.sort((a, b) => b.level - a.level);
      setVisibleSkills(filteredSkills);
      setIsAnimating(false);
    }, 300);
  }, [activeCategory, searchQuery]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const skillCardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const categoryVariants = {
    inactive: { scale: 1 },
    active: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-transparent">
      {/* Animated background elements */}
      <div className="fixed inset-0 w-full h-full z-0">
        

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-400/80"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -Math.random() * 100 - 50],
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            />
          ))}

          {/* Glowing orbs */}
          <div className="absolute top-1/4 left-1/5 w-64 h-64 rounded-full bg-purple-600/10 blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/5 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="absolute top-2/3 left-2/3 w-80 h-80 rounded-full bg-blue-600/10 blur-[100px]" />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-24 pb-20">
        {/* Hero Section */}
        <div ref={heroRef} className="relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.7 }}
            className="mb-16 text-center"
          >
            <motion.h2
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 tracking-tight"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #60a5fa, #8b5cf6, #ec4899, #8b5cf6, #60a5fa)",
                backgroundSize: "200% auto",
                color: "transparent",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
              }}
            >
              Technical Expertise
            </motion.h2>

            <p className="text-gray-200 text-xl max-w-3xl mx-auto leading-relaxed">
              Transforming ideas into reality through code. Explore my journey,
              skills, and proficiency across the technology landscape.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex flex-wrap justify-center gap-4"
            >
              <a
                href="#skills-grid"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-purple-600/20 transition-all duration-300"
              >
                Explore Skills
              </a>
              <a
                href="#skill-journey"
                className="px-6 py-3 bg-transparent border border-purple-500/50 text-purple-300 rounded-full font-medium hover:bg-purple-500/10 transition-all duration-300"
              >
                View Journey
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Skill Categories */}
        <div id="skills-grid" className="scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
            className="mb-10"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Skill Categories
                </h3>
                <p className="text-gray-400">
                  Browse my technical skills by category or search for specific
                  technologies
                </p>
              </div>

              {/* Search bar */}
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-900/60 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                />
                <svg
                  className="absolute right-3 top-2.5 text-gray-400 w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  variants={categoryVariants}
                  initial="inactive"
                  animate={activeCategory === category ? "active" : "inactive"}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeCategory === category
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-600/20"
                      : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Selected skills count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mt-1 text-xs text-center text-gray-400">
                Found:{" "}
                <span className="text-purple-500 font-medium">
                  {visibleSkills.length}
                </span>{" "}
                skills
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Skills Grid */}
        <div ref={gridRef}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="wait">
              {visibleSkills.length > 0 ? (
                <React.Fragment>
                  {/* Comparison button */}
                  {selectedSkills.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="col-span-full mb-6 flex justify-center"
                    >
                      <div className="bg-black/60 backdrop-blur-md border border-purple-500/30 rounded-full px-6 py-3 text-white flex items-center shadow-lg">
                        <span className="mr-3">
                          <span className="font-semibold text-purple-400">
                            {selectedSkills.length}
                          </span>{" "}
                          skills selected
                        </span>
                        <button
                          onClick={() => setShowComparison(true)}
                          disabled={selectedSkills.length < 2}
                          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                            selectedSkills.length < 2
                              ? "bg-gray-700/50 text-gray-400 cursor-not-allowed"
                              : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-600/20"
                          }`}
                        >
                          Compare Skills
                        </button>
                        <button
                          onClick={() => setSelectedSkills([])}
                          className="ml-2 p-1.5 rounded-full text-gray-400 hover:text-white transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Skills Comparison Modal */}
                  <AnimatePresence>
                    {showComparison && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
                      >
                        <motion.div
                          initial={{ scale: 0.9, y: 20 }}
                          animate={{ scale: 1, y: 0 }}
                          exit={{ scale: 0.9, y: 20 }}
                          className="bg-gray-900/90 border border-gray-700 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-auto"
                        >
                          <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                              <h3 className="text-2xl font-bold text-white">
                                Skills Comparison
                              </h3>
                              <button
                                onClick={() => setShowComparison(false)}
                                className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>

                            {/* Comparison chart */}
                            <div className="mb-8">
                              <div className="w-full h-80">
                                <svg
                                  viewBox="0 0 800 400"
                                  className="w-full h-full"
                                >
                                  {/* Background grid */}
                                  {[0, 20, 40, 60, 80, 100].map((level) => (
                                    <g key={`grid-${level}`}>
                                      <line
                                        x1="150"
                                        y1={400 - level * 3.5}
                                        x2="750"
                                        y2={400 - level * 3.5}
                                        stroke="#333"
                                        strokeWidth="1"
                                        strokeDasharray={
                                          level % 20 === 0 ? "0" : "4,4"
                                        }
                                      />
                                      <text
                                        x="140"
                                        y={400 - level * 3.5 + 5}
                                        textAnchor="end"
                                        fontSize="12"
                                        fill="#aaa"
                                      >
                                        {level}%
                                      </text>
                                    </g>
                                  ))}

                                  {/* Bars */}
                                  {selectedSkills.map((skill, i) => {
                                    const width = 120;
                                    const gap = 40;
                                    const x = 200 + i * (width + gap);
                                    return (
                                      <g key={`bar-${skill.name}`}>
                                        <motion.rect
                                          x={x}
                                          y={400 - skill.level * 3.5}
                                          width={width}
                                          height={skill.level * 3.5}
                                          fill={`url(#grad-${i})`}
                                          rx="4"
                                          initial={{ height: 0, y: 400 }}
                                          animate={{
                                            height: skill.level * 3.5,
                                            y: 400 - skill.level * 3.5,
                                          }}
                                          transition={{
                                            duration: 1,
                                            delay: 0.2 + i * 0.1,
                                          }}
                                        />

                                        {/* Skill name and icon */}
                                        <foreignObject
                                          x={x}
                                          y={400 + 10}
                                          width={width}
                                          height="60"
                                        >
                                          <div className="flex flex-col items-center">
                                            <div
                                              className="w-10 h-10 rounded-lg flex items-center justify-center mb-2"
                                              style={{
                                                backgroundColor: `${skill.color}20`,
                                                color: skill.color,
                                              }}
                                            >
                                              <i className={skill.icon}></i>
                                            </div>
                                            <div className="text-center">
                                              <div className="text-white font-medium text-sm">
                                                {skill.name}
                                              </div>
                                              <div className="text-xs text-gray-400">
                                                {skill.category}
                                              </div>
                                            </div>
                                          </div>
                                        </foreignObject>

                                        {/* Skill level text */}
                                        <text
                                          x={x + width / 2}
                                          y={400 - skill.level * 3.5 - 10}
                                          textAnchor="middle"
                                          fontSize="14"
                                          fontWeight="bold"
                                          fill={skill.color}
                                        >
                                          {skill.level}%
                                        </text>
                                      </g>
                                    );
                                  })}

                                  {/* Gradients */}
                                  <defs>
                                    {selectedSkills.map((skill, i) => (
                                      <linearGradient
                                        key={`grad-${i}`}
                                        id={`grad-${i}`}
                                        x1="0%"
                                        y1="0%"
                                        x2="0%"
                                        y2="100%"
                                      >
                                        <stop
                                          offset="0%"
                                          stopColor={skill.color}
                                          stopOpacity="0.8"
                                        />
                                        <stop
                                          offset="100%"
                                          stopColor={skill.color}
                                          stopOpacity="0.4"
                                        />
                                      </linearGradient>
                                    ))}
                                  </defs>
                                </svg>
                              </div>
                            </div>

                            {/* Detailed comparison */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {selectedSkills.map((skill) => (
                                <div
                                  key={`detail-${skill.name}`}
                                  className="bg-black/40 rounded-lg p-4 border border-gray-800"
                                  style={{
                                    borderLeft: `3px solid ${skill.color}`,
                                  }}
                                >
                                  <div className="flex items-center mb-3">
                                    <div
                                      className="w-8 h-8 rounded-lg flex items-center justify-center mr-2"
                                      style={{
                                        backgroundColor: `${skill.color}20`,
                                      }}
                                    >
                                      <i
                                        className={skill.icon}
                                        style={{ color: skill.color }}
                                      ></i>
                                    </div>
                                    <div>
                                      <h4 className="text-white font-medium">
                                        {skill.name}
                                      </h4>
                                      <p className="text-xs text-gray-400">
                                        {skill.category}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-400">
                                        Proficiency:
                                      </span>
                                      <span className="text-white">
                                        {getSkillLevelLabel(skill.level)}
                                      </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-400">
                                        Experience:
                                      </span>
                                      <span className="text-white">
                                        {skill.level >= 85
                                          ? "5+ years"
                                          : skill.level >= 75
                                          ? "3-5 years"
                                          : skill.level >= 65
                                          ? "1-3 years"
                                          : "< 1 year"}
                                      </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-400">
                                        Confidence:
                                      </span>
                                      <span className="text-white">
                                        {skill.level >= 85
                                          ? "Expert level"
                                          : skill.level >= 75
                                          ? "Very confident"
                                          : skill.level >= 65
                                          ? "Confident"
                                          : "Learning"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Skill cards */}
                  {visibleSkills.map((skill, index) => (
                    <motion.div
                      key={`${skill.category}-${skill.name}`}
                      variants={skillCardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                      id={`${skill.category.toLowerCase()}-skills`}
                      className={`bg-black/50 backdrop-blur-md border ${
                        isSkillSelected(skill)
                          ? "border-purple-500 shadow-lg shadow-purple-500/20"
                          : "border-gray-800"
                      } rounded-xl p-6 hover:shadow-xl hover:border-purple-500/30 transition-all duration-500 group`}
                      whileHover={{
                        y: -5,
                        boxShadow: "0 15px 30px -10px rgba(124, 58, 237, 0.3)",
                      }}
                      onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                        perspective: 1000,
                      }}
                      onHoverStart={() => setHoveredSkill(skill.name)}
                      onHoverEnd={() => setHoveredSkill(null)}
                    >
                      {/* Skill selection checkbox */}
                      <div className="absolute top-4 right-4 z-20">
                        <button
                          onClick={() => toggleSkillSelection(skill)}
                          className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                            isSkillSelected(skill)
                              ? "bg-purple-600 text-white"
                              : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                          }`}
                        >
                          {isSkillSelected(skill) ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          )}
                        </button>
                      </div>

                      {/* Glowing accent in corner */}
                      <div
                        className="absolute -top-5 -right-5 w-20 h-20 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                        style={{ backgroundColor: skill.color }}
                      />

                      {/* Card Header */}
                      <div
                        className="flex items-center justify-between mb-5 relative"
                        style={{ transform: "translateZ(30px)" }}
                      >
                        <div className="flex items-center">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center mr-3 relative overflow-hidden shadow-lg"
                            style={{
                              boxShadow: `0 8px 20px -6px ${skill.color}50`,
                            }}
                          >
                            <div
                              className="absolute inset-0"
                              style={{ backgroundColor: `${skill.color}20` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />
                            <motion.div
                              className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                              animate={{
                                background: [
                                  `linear-gradient(0deg, ${skill.color}00, ${skill.color}40)`,
                                  `linear-gradient(90deg, ${skill.color}00, ${skill.color}40)`,
                                  `linear-gradient(180deg, ${skill.color}00, ${skill.color}40)`,
                                  `linear-gradient(270deg, ${skill.color}00, ${skill.color}40)`,
                                  `linear-gradient(0deg, ${skill.color}00, ${skill.color}40)`,
                                ],
                              }}
                              transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            />
                            <i
                              className={`${skill.icon} text-2xl relative z-10`}
                              style={{ color: skill.color }}
                            ></i>
                          </div>
                          <div>
                            <h3 className="font-bold text-white text-lg group-hover:text-white transition-colors">
                              {skill.name}
                            </h3>
                            <div className="flex items-center">
                              <span
                                className="text-xs font-medium px-2 py-0.5 rounded-full mr-1.5"
                                style={{
                                  backgroundColor: `${skill.color}20`,
                                  color: skill.color,
                                }}
                              >
                                {skill.category}
                              </span>
                              <span className="text-xs text-gray-400">
                                • {getSkillLevelLabel(skill.level)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div
                          className="w-16 h-16 relative"
                          style={{
                            filter: `drop-shadow(0 4px 6px ${skill.color}40)`,
                          }}
                        >
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="#1f2937"
                              strokeWidth="8"
                              className="opacity-50"
                            />
                            <motion.circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke={skill.color}
                              strokeWidth="8"
                              strokeDasharray="282.6"
                              initial={{ strokeDashoffset: 282.6 }}
                              whileInView={{
                                strokeDashoffset:
                                  282.6 - (282.6 * skill.level) / 100,
                              }}
                              transition={{
                                duration: 1.5,
                                delay: index * 0.05,
                              }}
                              strokeLinecap="round"
                              transform="rotate(-90 50 50)"
                            />
                            <text
                              x="50"
                              y="50"
                              textAnchor="middle"
                              dominantBaseline="central"
                              fill="white"
                              fontSize="24"
                              fontWeight="bold"
                            >
                              {skill.level}
                            </text>
                            <text
                              x="50"
                              y="70"
                              textAnchor="middle"
                              dominantBaseline="central"
                              fill="white"
                              fontSize="10"
                            >
                              %
                            </text>
                          </svg>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div
                        className="mt-4 space-y-3"
                        style={{ transform: "translateZ(20px)" }}
                      >
                        {/* Project Examples using this skill */}
                        <div className="bg-gray-900/30 p-3 rounded-lg">
                          <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                            <svg
                              className="w-3.5 h-3.5 mr-1.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                              />
                            </svg>
                            Projects Using {skill.name}
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {[1, 2].map((_, i) => (
                              <span
                                key={i}
                                className="inline-block px-2 py-1 bg-gray-800/60 text-gray-300 text-xs rounded"
                              >
                                {skill.category === "Frontend"
                                  ? [
                                      "Portfolio Website",
                                      "E-Commerce UI",
                                      "Admin Dashboard",
                                    ][i % 3]
                                  : skill.category === "Backend"
                                  ? [
                                      "API Server",
                                      "Auth System",
                                      "Payment Processing",
                                    ][i % 3]
                                  : skill.category === "Database"
                                  ? [
                                      "User Storage",
                                      "Product Catalog",
                                      "Analytics DB",
                                    ][i % 3]
                                  : [
                                      "Version Control",
                                      "Deploy Pipeline",
                                      "UI Mockups",
                                    ][i % 3]}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Experience details */}
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <svg
                              className="w-4 h-4 text-green-500 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm text-gray-300">
                              {skill.level >= 85
                                ? "Extensive production experience"
                                : skill.level >= 70
                                ? "Professional working knowledge"
                                : "Practical application in projects"}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <svg
                              className="w-4 h-4 text-green-500 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm text-gray-300">
                              {skill.level >= 85
                                ? "Advanced problem solving"
                                : skill.level >= 70
                                ? "Independent implementation"
                                : "Guided implementation"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Learn more button */}
                      <div
                        className="mt-5 pt-3 border-t border-gray-800 text-right"
                        style={{ transform: "translateZ(10px)" }}
                      >
                        <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center">
                          Learn more
                          <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </React.Fragment>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-full flex items-center justify-center h-48"
                >
                  <p className="text-gray-300 text-lg">
                    No skills found matching your criteria.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Skill Radar Chart Section */}
        <div ref={radarRef} className="my-24 scroll-mt-24" id="skills-overview">
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={
                radarInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
              }
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 bg-blue-900/30 rounded-full text-blue-300 text-sm font-medium mb-3"
            >
              SKILLS OVERVIEW
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={
                radarInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-3xl font-bold text-white mb-4"
            >
              Skill Proficiency Radar
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={
                radarInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-gray-400 max-w-2xl mx-auto"
            >
              A visual representation of my skill proficiency across different
              technology categories
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={radarInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full max-w-2xl mx-auto"
          >
            <svg viewBox="0 0 400 400" className="w-full h-auto">
              {/* Background circles */}
              {[0.25, 0.5, 0.75, 1].map((radius) => (
                <circle
                  key={`circle-${radius}`}
                  cx="200"
                  cy="200"
                  r={160 * radius}
                  fill="none"
                  stroke="#333"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
              ))}

              {/* Background lines */}
              {Object.keys(SKILLS_DATA).map((category, i) => {
                const angle =
                  (Math.PI * 2 * i) / Object.keys(SKILLS_DATA).length;
                return (
                  <line
                    key={`line-${category}`}
                    x1="200"
                    y1="200"
                    x2={200 + 160 * Math.sin(angle)}
                    y2={200 - 160 * Math.cos(angle)}
                    stroke="#333"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Category labels */}
              {Object.keys(SKILLS_DATA).map((category, i) => {
                const angle =
                  (Math.PI * 2 * i) / Object.keys(SKILLS_DATA).length;
                const x = 200 + 185 * Math.sin(angle);
                const y = 200 - 185 * Math.cos(angle);
                return (
                  <motion.text
                    key={`text-${category}`}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="white"
                    fontSize="14"
                    fontWeight="500"
                    initial={{ opacity: 0 }}
                    animate={radarInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                  >
                    {category}
                  </motion.text>
                );
              })}

              {/* Radar polygon */}
              <motion.path
                d={
                  Object.entries(SKILLS_DATA)
                    .map(([category, skills], i) => {
                      const avgLevel =
                        Math.round(
                          skills.reduce((sum, skill) => sum + skill.level, 0) /
                            skills.length
                        ) / 100;
                      const angle =
                        (Math.PI * 2 * i) / Object.keys(SKILLS_DATA).length;
                      const x = 200 + 160 * avgLevel * Math.sin(angle);
                      const y = 200 - 160 * avgLevel * Math.cos(angle);
                      return `${i === 0 ? "M" : "L"}${x},${y}`;
                    })
                    .join(" ") + " Z"
                }
                fill="url(#radarGradient)"
                fillOpacity="0.6"
                stroke="url(#radarStrokeGradient)"
                strokeWidth="3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  radarInView
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{ duration: 1.5, delay: 0.5 }}
              />

              {/* Radar data points */}
              {Object.entries(SKILLS_DATA).map(([category, skills], i) => {
                const avgLevel =
                  Math.round(
                    skills.reduce((sum, skill) => sum + skill.level, 0) /
                      skills.length
                  ) / 100;
                const angle =
                  (Math.PI * 2 * i) / Object.keys(SKILLS_DATA).length;
                const x = 200 + 160 * avgLevel * Math.sin(angle);
                const y = 200 - 160 * avgLevel * Math.cos(angle);
                const colors = ["#61DAFB", "#339933", "#4479A1", "#F05032"];
                return (
                  <motion.g
                    key={`point-${category}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={
                      radarInView
                        ? { scale: 1, opacity: 1 }
                        : { scale: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                  >
                    <circle cx={x} cy={y} r="6" fill={colors[i]} />
                    <circle
                      cx={x}
                      cy={y}
                      r="10"
                      fill={colors[i]}
                      fillOpacity="0.3"
                    />
                  </motion.g>
                );
              })}

              {/* Gradients */}
              <defs>
                <linearGradient
                  id="radarGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient
                  id="radarStrokeGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>

        {/* Skill Journey Timeline */}
        <div ref={journeyRef} className="my-24 scroll-mt-24" id="skill-journey">
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={
                journeyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
              }
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 bg-purple-900/30 rounded-full text-purple-300 text-sm font-medium mb-3"
            >
              MY JOURNEY
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={
                journeyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-3xl font-bold text-white mb-4"
            >
              Skill Development Timeline
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={
                journeyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-gray-400 max-w-2xl mx-auto"
            >
              My continuous learning journey and skill acquisition over the
              years
            </motion.p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-600/30 via-purple-600/30 to-pink-600/30 rounded-full" />

            {/* Timeline items */}
            {LEARNING_JOURNEY.map((period, i) => (
              <motion.div
                key={period.year}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  journeyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.7, delay: 0.2 + i * 0.2 }}
                className={`relative mb-12 ${
                  i % 2 === 0 ? "md:text-right" : ""
                }`}
              >
                <div
                  className={`flex items-center justify-center ${
                    i % 2 === 0 ? "md:justify-end" : "md:justify-start"
                  } mb-4`}
                >
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-purple-600/20">
                    <span className="text-xl font-bold text-white">
                      {period.year}
                    </span>
                  </div>
                </div>

                <div
                  className={`md:flex ${
                    i % 2 === 0 ? "md:justify-end" : "md:justify-start"
                  }`}
                >
                  <div
                    className={`md:w-1/2 ${
                      i % 2 === 0 ? "md:pl-12" : "md:pr-12"
                    }`}
                  >
                    <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300">
                      <ul className="space-y-3">
                        {period.milestones.map((milestone, j) => (
                          <motion.li
                            key={j}
                            initial={{ opacity: 0, x: i % 2 === 0 ? 20 : -20 }}
                            animate={
                              journeyInView
                                ? { opacity: 1, x: 0 }
                                : { opacity: 0, x: i % 2 === 0 ? 20 : -20 }
                            }
                            transition={{
                              duration: 0.5,
                              delay: 0.4 + i * 0.2 + j * 0.1,
                            }}
                            className="flex items-start"
                          >
                            <div className="mt-1 mr-3 flex-shrink-0">
                              <div className="w-2 h-2 rounded-full bg-purple-500" />
                            </div>
                            <p className="text-gray-300">{milestone}</p>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
