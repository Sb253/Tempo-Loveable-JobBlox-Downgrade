import { motion } from "framer-motion";
import React from "react";

export const ShimmerLoader = () => {
  const shimmerVariants = {
    initial: { x: "-100%" },
    animate: { x: "100%" },
  };

  return (
    <motion.div
      className="relative p-6 space-y-5 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
      style={{ backgroundColor: "#1e1e2f", borderRadius: "0.5rem" }}
    >
      {/* Optional branded pulse icon */}
      <motion.div
        className="h-10 w-10 rounded-full mx-auto mb-4"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
        style={{ backgroundColor: "#4f46e5" }}
      />

      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="relative h-4 rounded overflow-hidden"
          style={{ backgroundColor: "#2c2c3a" }}
        >
          <motion.div
            className="absolute inset-0"
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            transition={{
              duration: 1.4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
              delay: i * 0.1,
            }}
            style={{
              backgroundImage: `linear-gradient(90deg, transparent, #4f46e5, transparent)`,
              backgroundSize: "200% 100%",
            }}
          />
        </div>
      ))}
    </motion.div>
  );
};
