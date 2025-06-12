import { motion } from "framer-motion";
import Resume from "../components/Resume";

function ResumePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Resume />
    </motion.div>
  );
}

export default ResumePage;
