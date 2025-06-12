import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import MainLayout from "./components/MainLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SkillsPage from "./pages/SkillsPage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import ResumePage from "./pages/ResumePage";
import NotFoundPage from "./pages/NotFoundPage";
import WelcomePage from "./components/WelcomePage";

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  return (
    <div>
      <AnimatePresence mode="wait">
        {loading && <WelcomePage onLoadingComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex flex-col bg-transparent text-white w-full overflow-x-hidden"
      >
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {" "}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="skills" element={<SkillsPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="resume" element={<ResumePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;
