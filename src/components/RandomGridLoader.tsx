import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import "./styles/RandomGridLoader.css";
import { useLoading } from "../context/LoadingProvider";

const RandomGridLoader = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (percent >= 100) {
      const timer = setTimeout(() => {
        setShow(false);
        // Delay before unmounting to show exit animation
        setTimeout(() => {
          import("./utils/initialFX").then((module) => {
            if (module.initialFX) {
              module.initialFX();
            }
            setIsLoading(false);
          });
        }, 800);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [percent, setIsLoading]);

  // Create an array of 9 indices for the 3x3 grid
  const cells = Array.from({ length: 9 });

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="grid-loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="grid-container">
            {cells.map((_, i) => (
              <GridCell key={i} />
            ))}
          </div>
          
          <div className="loader-progress-text">
            {Math.floor(percent)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const GridCell = () => {
  return (
    <motion.div
      className="grid-cell"
      animate={{
        opacity: [0.1, 0.4, 0.1, 0.8, 0.2, 1, 0.3],
      }}
      transition={{
        duration: 2 + Math.random() * 2,
        repeat: Infinity,
        ease: "linear",
        delay: Math.random() * 2,
      }}
    />
  );
};

export default RandomGridLoader;
