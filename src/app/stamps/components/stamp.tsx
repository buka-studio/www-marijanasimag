'use client';

import { motion } from 'framer-motion';
import { ReactNode, useRef } from 'react';

// Define the props for the Stamp component
interface StampProps {
  stamp: ReactNode;
  index: number;
  isSelected: boolean;
  onClick: () => void;
  selectedStamp: number | null;
  constraintElement?: any;
}

// Stamp component definition
export function Stamp({
  stamp,
  index,
  isSelected,
  onClick,
  selectedStamp,
  constraintElement,
}: StampProps) {
  // Generate a random position for the stamp
  const randomPosition = useRef({
    x: Math.random() * 950 - 150,
    y: Math.random() * 400 - 150,
  });

  // Define the initial centered position
  const initialPosition = { x: '80%', y: '80%' };

  // Define the position for the selected stamp
  const selectedPosition = { x: '55%', y: '125%', rotation: 0 };

  // Determine the position based on whether the stamp is selected
  const position = isSelected ? selectedPosition : randomPosition.current;

  // Define the scale and zIndex based on whether the stamp is selected
  const scale = isSelected ? 1.5 : 1;
  const zIndex = isSelected ? 10 : 1;

  // Define the blur and opacity based on whether the stamp is selected
  const blur = selectedStamp !== null && !isSelected ? 'blur(2px)' : 'blur(0px)';
  const opacity = selectedStamp !== null && !isSelected ? 0.6 : 1;

  return (
    // Motion div for the stamp with draggable and animation properties
    <motion.div
      drag
      dragConstraints={constraintElement}
      dragElastic={0.5}
      initial={initialPosition}
      whileHover={{ scale: isSelected ? 1.45 : 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        ...position,
        scale,
        zIndex,
        filter: blur,
        opacity,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 80 }}
      onClick={onClick}
      className="absolute h-60 w-60 cursor-pointer"
      style={{
        rotate: isSelected ? 0 : Math.random() * 30 - 15,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 150px',
        transformOrigin: 'center center',
      }}
    >
      {/* Inner motion div to center the stamp content */}
      <motion.div className="pointer-events-none flex h-full w-full flex-col items-center justify-center p-4 text-center">
        {stamp}
      </motion.div>
    </motion.div>
  );
}
