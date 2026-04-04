import React, { useState, useEffect } from 'react';
import { useLoading } from '../context/LoadingContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Cake, Cookie, Sandwich, Croissant } from 'lucide-react';

const loadingTexts = [
  "Baking your experience...",
  "Preparing fresh items...",
  "Just out of the oven...",
  "Rolling the dough...",
  "Frosting the cupcakes...",
  "Whipping up some magic...",
];

export const GlobalLoader = () => {
  const { isLoading } = useLoading();
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setTextIndex(prev => (prev + 1) % loadingTexts.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/90 backdrop-blur-md"
        >
          <div className="relative">
            {/* Spinning Icons */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="relative w-32 h-32 flex items-center justify-center"
            >
              <Cake className="absolute top-0 text-amber-500 w-8 h-8" />
              <Cookie className="absolute right-0 text-amber-800 w-8 h-8" />
              <Sandwich className="absolute bottom-0 text-orange-400 w-8 h-8" />
              <Croissant className="absolute left-0 text-amber-600 w-8 h-8" />
            </motion.div>

            {/* Central Animated Logo/Icon */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
                <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <Cake className="text-white w-10 h-10" />
                </div>
            </motion.div>
          </div>

          {/* Loading Text */}
          <motion.div
            key={textIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="mt-8 text-xl font-bold text-amber-900 lora italic"
          >
            {loadingTexts[textIndex]}
          </motion.div>

          {/* Progress Bar (Indeterminate) */}
          <div className="mt-4 w-48 h-1 bg-amber-100 rounded-full overflow-hidden">
            <motion.div
              animate={{ 
                x: ["-100%", "100%"]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "linear"
              }}
              className="w-full h-full bg-pink-500"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
