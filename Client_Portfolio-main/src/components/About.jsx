import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

// Custom hook for detecting if an element is in view
const useCustomInView = (options) => {
  const [ref, setRef] = React.useState(null);
  const [inView, setInView] = React.useState(false);

  useEffect(() => {
    if (ref) {
      // Simple implementation that sets inView to true after a delay
      const timer = setTimeout(() => setInView(true), 300);
      return () => clearTimeout(timer);
    }
  }, [ref]);

  return [setRef, inView];
};

// Use the actual useInView from react-intersection-observer if available
let useInView;
try {
  // Import from react-intersection-observer if available
  const reactIntersectionObserver = require("react-intersection-observer");
  useInView = reactIntersectionObserver.useInView;
} catch (error) {
  // Fall back to our custom implementation
  useInView = useCustomInView;
}

const About = () => {
  // Animation controls for sections
  const controlsHeading = useAnimation();
  const controlsContent = useAnimation();
  const [headingRef, headingInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [contentRef, contentInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (headingInView) controlsHeading.start("visible");
    if (contentInView) controlsContent.start("visible");
  }, [controlsHeading, controlsContent, headingInView, contentInView]);

  // Animation variants
  const headingVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="relative min-h-screen bg-[#0a0616] text-white overflow-hidden">
      {/* Wave SVG Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 800"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#6d28d9"
            fillOpacity="0.5"
            d="M0,192L48,213.3C96,235,192,277,288,282.7C384,288,480,256,576,240C672,224,768,224,864,240C960,256,1056,288,1152,272C1248,256,1344,192,1392,160L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
          <path
            fill="#4f46e5"
            fillOpacity="0.4"
            d="M0,352L48,336C96,320,192,288,288,282.7C384,277,480,299,576,293.3C672,288,768,256,864,250.7C960,245,1056,267,1152,277.3C1248,288,1344,288,1392,288L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
          <path
            fill="#8b5cf6"
            fillOpacity="0.3"
            d="M0,480L48,458.7C96,437,192,395,288,378.7C384,363,480,373,576,400C672,427,768,469,864,480C960,491,1056,469,1152,448C1248,427,1344,405,1392,394.7L1440,384L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Heading Section */}
        <motion.div
          ref={headingRef}
          animate={controlsHeading}
          initial="hidden"
          variants={headingVariants}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-3 font-['Poppins'] bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">
            About Me
          </h1>
          <div className="w-24 h-1 bg-purple-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-['Quicksand'] leading-relaxed">
            Passionate developer with a creative mindset, constantly exploring
            new technologies and pushing boundaries to create impactful digital
            experiences.
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          ref={contentRef}
          animate={controlsContent}
          initial="hidden"
          variants={contentVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto"
        >
          {/* Journey Section */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-gray-900/70 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-800/30 shadow-xl"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-purple-600/20 rounded-lg mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold font-['Poppins'] text-purple-300">
                My Journey
              </h2>
            </div>
            <div className="space-y-4 font-['Quicksand']">
              <p className="text-gray-300 leading-relaxed">
                My passion for programming began when I was in high school,
                where I created my first website. The excitement of bringing
                ideas to life through code set me on a path of continuous
                learning and exploration.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Over the years, I've embraced the challenges of evolving
                technologies, moving from simple HTML/CSS websites to complex
                applications using modern frameworks like React and Vue.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Each project has been a stepping stone, teaching me valuable
                lessons not just about coding, but about problem-solving,
                collaboration, and the impact of good design.
              </p>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-gray-900/70 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-800/30 shadow-xl"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-purple-600/20 rounded-lg mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold font-['Poppins'] text-purple-300">
                Timeline
              </h2>
            </div>
            <div className="space-y-6 font-['Quicksand']">
              <div className="relative pl-8 border-l-2 border-purple-500/50">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-purple-500"></div>
                <h3 className="text-xl font-semibold text-purple-300">
                  2020 - Present
                </h3>
                <p className="text-gray-300">
                  Senior Front-end Developer at TechVision
                </p>
                <p className="text-sm text-gray-400">
                  Leading UI/UX initiatives and implementing modern web
                  solutions
                </p>
              </div>
              <div className="relative pl-8 border-l-2 border-purple-500/50">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-purple-500"></div>
                <h3 className="text-xl font-semibold text-purple-300">
                  2018 - 2020
                </h3>
                <p className="text-gray-300">Web Developer at CreativeMinds</p>
                <p className="text-sm text-gray-400">
                  Developed responsive websites and e-commerce solutions
                </p>
              </div>
              <div className="relative pl-8 border-l-2 border-purple-500/50">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-purple-500"></div>
                <h3 className="text-xl font-semibold text-purple-300">
                  2015 - 2018
                </h3>
                <p className="text-gray-300">Computer Science Graduate</p>
                <p className="text-sm text-gray-400">
                  Bachelor's degree with focus on software development
                </p>
              </div>
            </div>
          </motion.div>

          {/* Strengths & Weaknesses */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-gray-900/70 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-800/30 shadow-xl"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-purple-600/20 rounded-lg mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold font-['Poppins'] text-purple-300">
                Strengths & Growth Areas
              </h2>
            </div>
            <div className="space-y-4 font-['Quicksand']">
              <h3 className="text-xl font-semibold text-purple-300">
                Strengths
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Creative problem-solving and innovative thinking</li>
                <li>Strong attention to UI/UX design principles</li>
                <li>Quick learner who adapts to new technologies</li>
                <li>Effective communication in cross-functional teams</li>
                <li>Detail-oriented with a focus on code quality</li>
              </ul>

              <h3 className="text-xl font-semibold text-purple-300 mt-6">
                Growth Areas
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Balancing perfectionism with project deadlines</li>
                <li>Delegating tasks more effectively in team settings</li>
                <li>Strengthening backend development skills</li>
                <li>Public speaking and presentation confidence</li>
              </ul>
            </div>
          </motion.div>

          {/* Hobbies & Interests */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-gray-900/70 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-800/30 shadow-xl"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-purple-600/20 rounded-lg mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold font-['Poppins'] text-purple-300">
                Hobbies & Interests
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4 font-['Quicksand']">
              <div className="flex flex-col items-center p-4 bg-purple-900/20 rounded-lg hover:bg-purple-900/30 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-purple-400 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-center text-gray-300">Photography</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-purple-900/20 rounded-lg hover:bg-purple-900/30 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-purple-400 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <p className="text-center text-gray-300">Reading</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-purple-900/20 rounded-lg hover:bg-purple-900/30 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-purple-400 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-center text-gray-300">Traveling</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-purple-900/20 rounded-lg hover:bg-purple-900/30 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-purple-400 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                  />
                </svg>
                <p className="text-center text-gray-300">Music</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-purple-900/20 rounded-lg hover:bg-purple-900/30 transition-all col-span-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-purple-400 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="text-center text-gray-300">
                  Exploring New Technologies
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Quote Section */}
        <motion.div
          variants={itemVariants}
          className="mt-16 text-center max-w-3xl mx-auto bg-gradient-to-br from-gray-900/60 to-purple-900/20 p-8 rounded-2xl backdrop-blur-sm border border-purple-800/30"
        >
          <svg
            className="w-10 h-10 text-purple-500 mx-auto mb-4 opacity-80"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="text-xl italic text-gray-300 font-['Quicksand'] mb-4">
            "The beautiful thing about learning is that nobody can take it away
            from you."
          </p>
          <p className="text-purple-400 font-semibold">— B.B. King</p>
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden rotate-180 z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-full"
        >
          <path
            fill="#6d28d9"
            fillOpacity="0.2"
            d="M0,96L48,112C96,128,192,160,288,170.7C384,181,480,171,576,138.7C672,107,768,53,864,48C960,43,1056,85,1152,96C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default About;
