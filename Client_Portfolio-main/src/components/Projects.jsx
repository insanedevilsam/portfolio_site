import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Updated project data according to your resume
const PROJECTS_DATA = [
  {
    id: 1,
    title: "Campus Navigation App",
    description:
      "Developed a hybrid indoor-outdoor navigation app using Flutter and Google Maps API. Enhanced route clarity by 40% and increased navigation efficiency by 30% using Dijkstra’s algorithm.",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    technologies: ["Flutter", "Google Maps API", "Dijkstra's Algorithm"],
    github: "https://github.com/yourusername/campus-navigation-app", // Update with your GitHub link
    demo: "https://campus-navigation-demo.yourdomain.com", // Update with your demo link
    featured: true,
  },
  {
    id: 2,
    title: "Real-Time Chat Application",
    description:
      "Built a chat platform with Spring Boot and React.js. Implemented real-time communication protocols and achieved a 15% boost in usage metrics.",
    image:
      "https://herobot.app/wp-content/uploads/2022/11/11-Reasons-Why-A-Chat-Application-Is-Great-For-Business_1.jpg",
    technologies: ["React", "Spring Boot", "WebSocket"],
    github: "https://github.com/yourusername/chat-app", // Update with your GitHub link
    demo: "https://chat-application-demo.yourdomain.com", // Update with your demo link
    featured: true,
  },
  {
    id: 3,
    title: "Agro - Smart Farming Assistant",
    description:
      "Designed a full-stack web platform to assist farmers by optimizing soil and crop decisions. Improved yield by 20% and decision-making speed by 25%.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/yourusername/agro-smart-farming", // Update with your GitHub link
    demo: "https://agro-smart-farming-demo.yourdomain.com", // Update with your demo link
    featured: true,
  },
  {
    id: 4,
    title: "Machine Learning Classification Model",
    description:
      "A machine learning model focusing on classification tasks with an average precision of 82%. Improved model accuracy through engineering and tuning by 15%.",
    image:
      "https://images.unsplash.com/photo-1531991340693-af878c384f52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    technologies: ["Python", "TensorFlow", "Machine Learning"],
    github: "https://github.com/yourusername/ml-classification-model", // Update with your GitHub link
    demo: "https://ml-classification-demo.yourdomain.com", // Update with your demo link
    featured: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
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

function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      className={`relative overflow-hidden ${
        project.featured ? "md:col-span-2" : ""
      } group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card with 3D perspective effect */}
      <div className="relative bg-[#0a0a20] overflow-hidden rounded-lg transform transition-transform duration-700 group-hover:rotate-y-12 shadow-[0_10px_50px_rgba(8,8,40,0.5)]">
        {/* Top colorful border */}
        <div className="h-1.5 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>

        {/* Content grid */}
        <div className="grid md:grid-cols-2 h-full">
          {/* Image section */}
          <div
            className={`${
              project.featured ? "" : "md:col-span-2"
            } relative overflow-hidden h-60 md:h-full bg-black`}
          >
            {/* Image with parallax effect */}
            <div
              className="absolute inset-0 bg-center bg-cover transition-all duration-700 group-hover:scale-110"
              style={{
                backgroundImage: `url(${project.image})`,
                filter: "brightness(0.8) contrast(1.1)",
              }}
            ></div>

            {/* Dark overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/70 to-transparent opacity-70"></div>

            {/* Project title on image for mobile/small screens */}
            <div className="absolute bottom-0 left-0 w-full p-5 md:hidden z-10">
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors duration-300">
                {project.title}
              </h3>
              <div className="h-0.5 w-1/3 bg-cyan-400 rounded-full transform origin-left transition-all duration-300 group-hover:w-1/2"></div>
            </div>

            {/* Featured badge */}
            {project.featured && (
              <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-black text-xs font-bold py-1 px-3 rounded transform rotate-3 shadow-lg z-10">
                FEATURED
              </div>
            )}
          </div>

          {/* Content section */}
          <div
            className={`${
              project.featured ? "" : "md:col-span-2"
            } p-6 flex flex-col justify-between h-full`}
          >
            {/* Title - only visible on md breakpoint and above */}
            <div className="hidden md:block mb-3">
              <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                {project.title}
              </h3>
              <div className="h-0.5 w-1/3 bg-cyan-400 rounded-full transform origin-left transition-all duration-300 group-hover:w-1/2"></div>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm md:text-base line-clamp-3 md:line-clamp-4 mb-4">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="mb-4">
              <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                Tech Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 4).map((tech, idx) => (
                  <span
                    key={idx}
                    className="inline-block px-2 py-1 text-xs text-cyan-300 border border-cyan-800/50 rounded"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="inline-block px-2 py-1 text-xs text-gray-400 border border-gray-800 rounded">
                    +{project.technologies.length - 4} more
                  </span>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-auto">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#151530] hover:bg-[#1a1a40] text-white text-sm py-2 px-3 rounded flex items-center justify-center gap-2 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Code
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-sm py-2 px-3 rounded flex items-center justify-center gap-2 transition-all"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M15 15l5-5-5-5M4 12h16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Live Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState(PROJECTS_DATA);

  // Filter categories
  const filterOptions = ["all", "fullstack", "flutter"];

  useEffect(() => {
    if (filter === "all") {
      setFilteredProjects(PROJECTS_DATA);
    } else if (filter === "fullstack") {
      // Filter projects that have both frontend and backend technologies
      setFilteredProjects(
        PROJECTS_DATA.filter(
          (project) =>
            project.technologies.some((tech) =>
              ["React", "Vue.js", "Angular"].includes(tech)
            ) &&
            project.technologies.some((tech) =>
              ["Node.js", "Express", "MongoDB", "Firebase"].includes(tech)
            )
        )
      );
    } else if (filter === "flutter") {
      // Filter projects that use Flutter
      setFilteredProjects(
        PROJECTS_DATA.filter((project) =>
          project.technologies.includes("Flutter")
        )
      );
    } else {
      setFilteredProjects(
        PROJECTS_DATA.filter((project) => project.technologies.includes(filter))
      );
    }
  }, [filter]);

  return (
    <div className="min-h-screen relative bg-[#050510]">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Dark grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNjAgMEgwdjYwaDYwVjB6IiBmaWxsPSJub25lIiBzdHJva2U9IiMxMTExMjUiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9zdmc+')] opacity-60"></div>

        {/* Corner light effect */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-indigo-500/10 to-transparent rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        {/* Header section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <span className="h-px w-8 bg-cyan-500 mr-4"></span>
            <span className="text-cyan-500 text-sm uppercase tracking-wider font-semibold">
              My Portfolio
            </span>
            <span className="h-px w-8 bg-cyan-500 ml-4"></span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Projects Showcase
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Explore my collection of projects that demonstrate my skills and
            passion for creating impactful digital solutions.
          </p>
        </div>

        {/* Filter options - Only showing the three required options */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-4 justify-center">
            {filterOptions.map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`px-6 py-3 text-sm font-medium transition-all ${
                  filter === option
                    ? "bg-cyan-500 text-black"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                } rounded-md`}
              >
                {option === "all"
                  ? "All"
                  : option === "fullstack"
                  ? "FullStack"
                  : "Flutter"}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid with horizontal layout for featured projects */}
        {filteredProjects.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16 bg-gray-900/30 rounded-lg border border-gray-800">
            <svg
              className="w-16 h-16 mx-auto text-gray-600 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl text-gray-300 font-semibold mb-2">
              No projects found
            </h3>
            <p className="text-gray-500 mb-6">
              No projects match the selected category.
            </p>
            <button
              onClick={() => setFilter("all")}
              className="px-5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md transition-colors"
            >
              Show All Projects
            </button>
          </div>
        )}

        {/* Contact callout with terminal-inspired design */}
        <div className="mt-24 bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden">
          <div className="bg-gray-800 px-4 py-2 flex items-center">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-gray-400 text-sm font-mono">
              contact@request.sh
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                <h2 className="text-2xl md:text-3xl font-mono text-white mb-4">
                  <span className="text-cyan-500">$</span> ./connect-with-me.sh
                </h2>
                <p className="text-gray-400 font-mono leading-relaxed mb-4">
                  I'm always interested in hearing about new projects and
                  opportunities. Let's create something amazing together!
                </p>
                <div className="font-mono text-gray-500 text-sm">
                  <div className="mb-1">// Run the following command</div>
                  <div className="text-cyan-400">npm run contact-me</div>
                </div>
              </div>

              <div className="md:w-1/3 flex justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
                >
                  <span>Get In Touch</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}