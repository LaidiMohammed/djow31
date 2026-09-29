'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function BackgroundZoom({
  src,
  children,
  overlay = true,
}: {
  src: string;
  children?: React.ReactNode;
  overlay?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  // zoom-out au scroll : 1.18 -> 1
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.35]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ scale, y, opacity }} className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover"
          loading="eager"
        />
      </motion.div>
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0b07]/80 via-[#0d0b07]/45 to-[#12100c]" />
      )}
      {children}
    </div>
  );
}
