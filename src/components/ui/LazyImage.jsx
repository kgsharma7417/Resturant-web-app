import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LazyImage({ src, alt, className }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset state if src changes
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Skeleton / Shimmer Effect */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-[#1a1a1a] dark:via-[#2a2a2a] dark:to-[#1a1a1a] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"></div>
      )}
      
      {/* Fallback Error State */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
          <span className="text-xs font-medium uppercase tracking-widest">Image Unavailable</span>
        </div>
      )}

      {/* Actual Image */}
      <motion.img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setIsLoaded(true);
          setHasError(true);
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded && !hasError ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`w-full h-full object-cover ${className}`}
      />
    </div>
  );
}
