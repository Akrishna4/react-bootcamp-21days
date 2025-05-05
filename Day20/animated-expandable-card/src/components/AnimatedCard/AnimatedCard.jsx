import React from "react";
import "./AnimatedCard.css";
import { motion } from "framer-motion";

const AnimatedCard = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const animate = {
    layout: true,
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.3 },
  };

  return (
    <motion.div
      className={`card ${isExpanded ? "expanded" : ""}`}
      layout
      onClick={() => !isExpanded && setIsExpanded(true)}
    >
      <motion.h5 layout="position">Expandable Card</motion.h5>

      <motion.p layout="position">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        voluptatibus voluptatum. Quisquam, voluptatibus voluptatum.
      </motion.p>

      {isExpanded && (
        <>
          <motion.img
            {...animate}
            src="https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="demo image"
            className="card-image"
          />
          <motion.p {...animate}>
            Additional content shown when expanded. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quisquam, voluptatibus voluptatum.
          </motion.p>

          <motion.div {...animate} className="btn-container">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
            >
              Close
            </motion.button>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default AnimatedCard;
