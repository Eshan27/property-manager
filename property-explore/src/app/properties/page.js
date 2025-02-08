"use client";

import { motion } from "framer-motion";

export default function PropertiesPage() {
  return (
    <motion.div
      initial={{ x: 1000, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="p-10"
    >
      <h1 className="text-3xl font-bold mb-4">Property Details</h1>
      <p>Property information will be displayed here...</p>
    </motion.div>
  );
}
