'use client';

import { motion } from 'framer-motion';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.985, filter: 'blur(6px)', y: 14 }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
      exit={{ opacity: 0, scale: 1.02, filter: 'blur(6px)', y: -10 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen"
    >
      {children}
    </motion.main>
  );
}
