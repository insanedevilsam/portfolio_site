import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent text-white w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-grow w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
