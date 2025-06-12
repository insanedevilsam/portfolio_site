import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Resume = () => {
  // References for scroll animations
  const heroRef = useRef(null);
  const educationRef = useRef(null);
  const experienceRef = useRef(null);
  const skillsRef = useRef(null);
  const certificationsRef = useRef(null);

  // Check if sections are in view
  const heroInView = useInView(heroRef, { once: false, margin: "-100px" });
  const educationInView = useInView(educationRef, {
    once: true,
    margin: "-50px",
  });
  const experienceInView = useInView(experienceRef, {
    once: true,
    margin: "-50px",
  });
  const skillsInView = useInView(skillsRef, { once: true, margin: "-50px" });
  const certificationsInView = useInView(certificationsRef, {
    once: true,
    margin: "-50px",
  });

  // Education data
  const education = [
    {  
      degree: "Master of Computer Applications (MCA)",  
      institution: "Vellore Institute of Technology (VIT)",  
      location: "Vellore, India",  
      period: "2024 - 2026",  
      description: "Specializing in advanced computing and software engineering.",  
      gpa: "-",  
      highlights: [  
        "Research Assistant",  
        "Data Structures and Algorithms coursework",  
        "Participated in Hackathons",  
      ],  
    },  
    {  
      degree: "Bachelor of Computer Applications (BCA)",  
      institution: "Dr. Virendra Swaroop Institute of Computer Studies",  
      location: "Kanpur, Uttar Pradesh, India",  
      period: "2021 - 2024",  
      description: "Focused on software development and programming principles.",  
      gpa: "-",  
      highlights: [  
        "Media and Publication Committee Coordinator",  
        "Coding Club Member",  
        "Participated in various coding competitions",  
      ],  
    },  
  ];

  // Work experience data
  const experience = [
       {  
      title: "Machine Learning Intern",  
      company: "Aican Automate",  
      location: "Remote",  
      period: "Aug 2022 - Sep 2022",  
      description: "Applied machine learning concepts to real-world classification challenges.",  
      responsibilities: [  
        "Achieved an average precision of 82% using Python and TensorFlow.",  
        "Collaborated with a team to optimize hyperparameters, reducing training time by 20%.",  
      ],  
      technologies: ["Python", "TensorFlow"],  
    }, 
  ];

  // Skills data - categorized
  const skills = {
    "Programming Languages": [
      { name: "Python", level: 95 },
      { name: "JavaScript", level: 90 },
      { name: "Java", level: 85 },
      { name: "C++", level: 80 },
      { name: "TypeScript", level: 85 },
      { name: "SQL", level: 90 },
    ],
    "Web Development": [
      { name: "React", level: 90 },
      { name: "Node.js", level: 85 },
      { name: "HTML/CSS", level: 95 },
      { name: "Angular", level: 80 },
      { name: "Express.js", level: 85 },
    ],
    "Cloud & DevOps": [
      { name: "AWS", level: 85 },
      { name: "Docker", level: 90 },
      { name: "Kubernetes", level: 80 },
      { name: "CI/CD", level: 85 },
      { name: "Terraform", level: 75 },
    ],
    "Data Science & ML": [
      { name: "TensorFlow", level: 85 },
      { name: "PyTorch", level: 80 },
      { name: "Scikit-learn", level: 90 },
      { name: "Data Analysis", level: 85 },
      { name: "Natural Language Processing", level: 90 },
    ],
  };

  // Certifications data
  const certifications = [
    {
    name: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "Apr 2025",
  },
  {
    name: "Prompt Design in Vertex AI",
    issuer: "Google",
    date: "Feb 2025",
  },
  {
    name: "Foundations of UX Design",
    issuer: "Google",
    date: "Mar 2024",
  },
  {
    name: "Career Essentials in Generative AI",
    issuer: "Microsoft LinkedIn",
    date: "Oct 2023",
  },
  {
    name: "Machine Learning",
    issuer: "Teachnook Wissenarie, IIT Bhubaneswar",
    date: "Oct 2022",
  },
  {
    name: "Android Development",
    issuer: "Dr. Virendra Swaroop Institute",
    date: "Aug 2023",
  },
  ];

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (custom) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        delay: custom * 0.1,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="relative w-full overflow-hidden bg-transparent">
      {/* Background Elements */}
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
        <div ref={heroRef} className="relative mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.7 }}
            className="text-center"
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
              Professional Resume
            </motion.h2>

            <p className="text-gray-200 text-xl max-w-3xl mx-auto leading-relaxed">
              My professional journey, qualifications, and expertise outlined in
              a comprehensive resume.
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
                href="#education-section"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-purple-600/20 transition-all duration-300"
              >
                View Education
              </a>
              <a
                href="#experience-section"
                className="px-6 py-3 bg-transparent border border-purple-500/50 text-purple-300 rounded-full font-medium hover:bg-purple-500/10 transition-all duration-300"
              >
                Explore Experience
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.print();
                }}
                className="px-6 py-3 bg-transparent border border-green-500/50 text-green-300 rounded-full font-medium hover:bg-green-500/10 transition-all duration-300"
              >
                Download PDF
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Education Section */}
        <div
          id="education-section"
          ref={educationRef}
          className="my-20 scroll-mt-24"
        >
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate={educationInView ? "visible" : "hidden"}
            className="mb-12"
          >
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white">Education</h2>
            </div>

            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate={educationInView ? "visible" : "hidden"}
                  transition={{ delay: index * 0.2 }}
                  className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {edu.degree}
                      </h3>
                      <p className="text-purple-400">
                        {edu.institution}, {edu.location}
                      </p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-900/30 text-purple-300">
                        {edu.period}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4">{edu.description}</p>

                  <div className="flex items-center mb-4">
                    <span className="text-sm font-medium px-2.5 py-0.5 rounded bg-blue-900/30 text-blue-300">
                      GPA: {edu.gpa}
                    </span>
                  </div>

                  <h4 className="text-md font-medium text-gray-200 mb-2">
                    Highlights:
                  </h4>
                  <ul className="space-y-1">
                    {edu.highlights.map((highlight, i) => (
                      <motion.li
                        key={i}
                        custom={i}
                        variants={listItemVariants}
                        initial="hidden"
                        animate={educationInView ? "visible" : "hidden"}
                        className="flex items-center text-gray-300"
                      >
                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
                        {highlight}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Experience Section */}
        <div
          id="experience-section"
          ref={experienceRef}
          className="my-20 scroll-mt-24"
        >
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate={experienceInView ? "visible" : "hidden"}
            className="mb-12"
          >
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white">
                Professional Experience
              </h2>
            </div>

            <div className="space-y-8">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate={experienceInView ? "visible" : "hidden"}
                  transition={{ delay: index * 0.2 }}
                  className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {exp.title}
                      </h3>
                      <p className="text-purple-400">
                        {exp.company}, {exp.location}
                      </p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-900/30 text-purple-300">
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4">{exp.description}</p>

                  <h4 className="text-md font-medium text-gray-200 mb-2">
                    Key Responsibilities:
                  </h4>
                  <ul className="space-y-1 mb-4">
                    {exp.responsibilities.map((responsibility, i) => (
                      <motion.li
                        key={i}
                        custom={i}
                        variants={listItemVariants}
                        initial="hidden"
                        animate={experienceInView ? "visible" : "hidden"}
                        className="flex items-start text-gray-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-purple-400 mr-2 flex-shrink-0 mt-0.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {responsibility}
                      </motion.li>
                    ))}
                  </ul>

                  <h4 className="text-md font-medium text-gray-200 mb-2">
                    Technologies Used:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={
                          experienceInView
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 0, scale: 0.8 }
                        }
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="px-2.5 py-1 rounded-md text-sm font-medium bg-blue-900/30 text-blue-300"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <div id="skills-section" ref={skillsRef} className="my-20 scroll-mt-24">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate={skillsInView ? "visible" : "hidden"}
          >
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white">
                Technical Skills
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(skills).map(
                ([category, skillList], categoryIndex) => (
                  <motion.div
                    key={category}
                    variants={cardVariants}
                    initial="hidden"
                    animate={skillsInView ? "visible" : "hidden"}
                    transition={{ delay: categoryIndex * 0.2 }}
                    className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300"
                  >
                    <h3 className="text-xl font-bold text-white mb-4">
                      {category}
                    </h3>
                    <div className="space-y-4">
                      {skillList.map((skill, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">{skill.name}</span>
                            <span className="text-sm text-purple-400">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-700/50 rounded-full h-2.5">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={
                                skillsInView
                                  ? { width: `${skill.level}%` }
                                  : { width: 0 }
                              }
                              transition={{
                                duration: 1,
                                delay: 0.3 + index * 0.1,
                              }}
                              className="h-2.5 rounded-full"
                              style={{
                                background:
                                  "linear-gradient(90deg, #60a5fa, #8b5cf6)",
                              }}
                            ></motion.div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        </div>

        {/* Certifications Section */}
        <div
          id="certifications-section"
          ref={certificationsRef}
          className="my-20 scroll-mt-24"
        >
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate={certificationsInView ? "visible" : "hidden"}
          >
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white">Certifications</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate={certificationsInView ? "visible" : "hidden"}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.3)",
                  }}
                  className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-800 mx-auto mb-4 flex items-center justify-center">
                    <div className={`text-3xl ${cert.logo}`}>
                      {cert.logo === "aws-logo" && "☁️"}
                      {cert.logo === "gcp-logo" && "☁️"}
                      {cert.logo === "tensorflow-logo" && "🧠"}
                      {cert.logo === "azure-logo" && "☁️"}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {cert.name}
                  </h3>
                  <p className="text-purple-400 mb-2">{cert.issuer}</p>
                  <p className="text-gray-400 text-sm">{cert.date}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Download Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-8 bg-black/50 backdrop-blur-xl border border-purple-500/30 rounded-2xl hover:border-purple-500/50 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to take a copy?
            </h3>
            <p className="text-gray-300 mb-6 max-w-lg mx-auto">
              Download a PDF version of my resume for your reference or share it
              with your network.
            </p>
            <button
              onClick={() => window.print()}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-600/20 transition-all duration-300 flex items-center justify-center mx-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Download Resume
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
