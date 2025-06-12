import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Hero from "../components/Hero";
import TriangularGridBackground from "../components/TriangularGridBackground";

// Updated featured projects to showcase three specific projects
const featuredProjects = [
  {
    id: 1,
    title: "Campus Navigation App",
    description:
      "Developed a hybrid indoor-outdoor navigation app using Flutter and Google Maps API. Enhanced route clarity by 40% and increased navigation efficiency by 30% using Dijkstra’s algorithm.",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    technologies: ["Flutter", "Google Maps API", "Dijkstra's Algorithm"],
    link: "/projects",
  },
  {
    id: 2,
    title: "Real-Time Chat Application",
    description:
      "Built a chat platform with Spring Boot and React.js. Implemented real-time communication protocols and achieved a 15% boost in usage metrics.",
    image:
      "https://images.unsplash.com/photo-1611746872915-64382b5c2a98?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "Spring Boot", "WebSocket"],
    link: "/projects",
  },
  {
    id: 3,
    title: "Agro - Smart Farming Assistant",
    description:
      "Designed a full-stack web platform to assist farmers by optimizing soil and crop decisions. Improved yield by 20% and decision-making speed by 25%.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "Node.js", "MongoDB"],
    link: "/projects",
  },
];

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "How to Build a Responsive UI with TailwindCSS",
    excerpt:
      "Learn how to create beautiful, responsive user interfaces using TailwindCSS framework...",
    date: "June 5, 2025",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Introduction to React Server Components",
    excerpt:
      "Discover how React Server Components can improve your application's performance...",
    date: "May 20, 2025",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Implementing AI Features in Web Applications",
    excerpt:
      "A practical guide to integrating AI capabilities into your web projects...",
    date: "April 15, 2025",
    readTime: "10 min read",
    image:
      "https://images.unsplash.com/photo-1677442135130-1750bd00034a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    text: "Working with Sameer was a game-changer for our company. His technical expertise and problem-solving abilities are truly exceptional.",
    author: "Maria Garcia",
    position: "Project Manager, TechSolutions",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    text: "Sameer delivered our project ahead of schedule with incredible attention to detail. His communication skills made the process smooth and enjoyable.",
    author: "Alex Johnson",
    position: "CTO, StartupX",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    text: "The AI integration Sameer built for us increased our efficiency by 40%. Highly recommended for any technical challenge.",
    author: "David Kim",
    position: "Founder, AIVentures",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
  },
];

// Featured skills
const highlightedSkills = [
  {
    name: "Frontend Development",
    icon: "💻",
    description:
      "Creating beautiful, responsive user interfaces with modern web technologies",
  },
  {
    name: "Backend Systems",
    icon: "⚙️",
    description:
      "Building robust server architectures and APIs that power web applications",
  },
  {
    name: "AI Integration",
    icon: "🤖",
    description:
      "Implementing machine learning and AI solutions for smarter applications",
  },
  {
    name: "Mobile Development",
    icon: "📱",
    description:
      "Developing cross-platform mobile apps with React Native and Flutter",
  },
];

// Section divider component
const SectionDivider = ({ title }) => (
  <div className="flex items-center justify-center my-20 w-full">
    <div className="h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent w-full max-w-xl"></div>
    <h2 className="text-cyan-300 font-bold text-lg mx-6 whitespace-nowrap">
      {title}
    </h2>
    <div className="h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent w-full max-w-xl"></div>
  </div>
);

// Project card component
const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
      className="bg-[#0a0a20]/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-cyan-900/30 transition-all group"
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a20] via-transparent to-transparent opacity-80"></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-300 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="text-xs bg-cyan-900/30 text-cyan-300 px-2 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <a
          href={project.link}
          className="inline-block text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          View Project &rarr;
        </a>
      </div>
    </motion.div>
  );
};

// Blog card component
const BlogCard = ({ post }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
      className="bg-[#0a0a20]/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-cyan-900/30 transition-all group"
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a20] via-transparent to-transparent opacity-80"></div>
      </div>
      <div className="p-6">
        <div className="flex items-center text-xs text-gray-400 mb-2">
          <span>{post.date}</span>
          <span className="mx-2">•</span>
          <span>{post.readTime}</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
        <p className="text-gray-300 mb-4">{post.excerpt}</p>
        <a
          href="#"
          className="inline-block text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          Read More &rarr;
        </a>
      </div>
    </motion.div>
  );
};

// Testimonial slider component
const TestimonialSlider = () => {
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
    <div className="relative bg-[#0a0a20]/60 backdrop-blur-sm p-8 rounded-xl border border-gray-800 overflow-hidden">
      {/* Background glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-600/10 blur-xl opacity-70"></div>

      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-8 text-center">
          What My Clients Say
        </h3>

        <div className="relative h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl text-cyan-500/20 font-serif">"</div>
                <p className="text-gray-300 italic text-lg mb-6 max-w-2xl mx-auto">
                  {testimonials[currentIndex].text}
                </p>
                <div className="text-4xl text-cyan-500/20 font-serif mb-4">
                  "
                </div>

                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].author}
                  className="w-16 h-16 rounded-full border-2 border-cyan-500/30 mb-4"
                />
                <div className="text-white font-medium text-lg">
                  {testimonials[currentIndex].author}
                </div>
                <div className="text-cyan-300 text-sm">
                  {testimonials[currentIndex].position}
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
              className={`w-3 h-3 rounded-full mx-1 transition-colors ${
                idx === currentIndex ? "bg-cyan-400" : "bg-gray-600"
              }`}
              aria-label={`View testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Skill card component
const SkillCard = ({ skill, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-[#0a0a20]/60 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-cyan-900/30 transition-colors"
    >
      <div className="text-4xl mb-4">{skill.icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{skill.name}</h3>
      <p className="text-gray-300">{skill.description}</p>
    </motion.div>
  );
};

function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden"
    >
      {/* Hero Section */}
      <Hero />

      {/* Featured Projects Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[#080818]"></div>
        <TriangularGridBackground />
        <div className="absolute top-1/4 left-1/5 w-64 h-64 rounded-full bg-purple-600/10 blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/5 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px]"></div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-300 to-purple-300 mb-4"
            >
              Featured Projects
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-300 max-w-2xl mx-auto"
            >
              Check out some of my recent work. These projects showcase my
              skills and expertise in web development and AI integration.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="text-center mt-12">
            <motion.a
              href="/projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500/80 to-blue-600/80 backdrop-blur-md text-white font-semibold shadow-[0_0_15px_rgba(100,200,255,0.3)] hover:shadow-[0_0_25px_rgba(100,200,255,0.5)] transition-all duration-300"
            >
              View All Projects
            </motion.a>
          </div>
        </div>
      </section>

      <SectionDivider title="MY EXPERTISE" />

      {/* Skills Highlights Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-300 to-purple-300 mb-4"
            >
              Skills & Expertise
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-300 max-w-2xl mx-auto"
            >
              With a diverse skill set and years of experience, I can bring your
              digital ideas to life with the perfect blend of technology and
              creativity.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlightedSkills.map((skill, index) => (
              <SkillCard key={index} skill={skill} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <motion.a
              href="/skills"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block px-8 py-3 rounded-xl bg-transparent border-2 border-cyan-500/50 text-cyan-300 font-semibold hover:bg-cyan-500/10 transition-all duration-300"
            >
              Explore All Skills
            </motion.a>
          </div>
        </div>
      </section>

      <SectionDivider title="TESTIMONIALS" />

      {/* Testimonials Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="container mx-auto max-w-4xl relative z-10">
          <TestimonialSlider />
        </div>
      </section>

      <SectionDivider title="LATEST ARTICLES" />

      {/* Blog Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-300 to-purple-300 mb-4"
            >
              From My Blog
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-300 max-w-2xl mx-auto"
            >
              Insights, tutorials, and thoughts on web development, AI, and the
              tech industry.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          <div className="text-center mt-12">
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block px-8 py-3 rounded-xl bg-transparent border-2 border-cyan-500/50 text-cyan-300 font-semibold hover:bg-cyan-500/10 transition-all duration-300"
            >
              Read All Articles
            </motion.a>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-purple-900/20"></div>
        <div className="absolute inset-0 backdrop-blur-sm"></div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-[#0a0a20]/80 backdrop-blur-md p-12 rounded-2xl border border-gray-800 text-center"
          >
            {/* Glowing backdrop */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-600/20 blur-xl opacity-70 rounded-2xl"></div>

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Ready to Build Something Amazing?
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                Let's collaborate to bring your ideas to life with cutting-edge
                technology and exceptional design.
              </p>
              <motion.div className="flex flex-wrap justify-center gap-4">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg shadow-[0_0_25px_rgba(100,200,255,0.5)] hover:shadow-[0_0_35px_rgba(100,200,255,0.7)] transition-all duration-300"
                >
                  Get In Touch
                </motion.a>
                <motion.a
                  href="/projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 rounded-xl bg-transparent border-2 border-cyan-500/50 text-cyan-300 font-semibold text-lg hover:bg-cyan-500/10 transition-all duration-300"
                >
                  View My Work
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

export default HomePage;