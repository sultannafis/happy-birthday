import { motion } from "framer-motion";

interface CloudProps {
  className?: string;
  delay?: number;
  duration?: number;
  width?: number;
  opacity?: number;
}

export default function Cloud({
  className = "",
  delay = 0,
  duration = 20,
  width = 120,
  opacity = 0.8,
}: CloudProps) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={{ opacity, width }}
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: "100%", opacity }}
      transition={{
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: duration,
          ease: "linear",
          delay: delay,
        },
        opacity: {
          duration: 2,
          delay: delay,
        }
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-full h-auto text-white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.5 19C19.9853 19 22 16.9853 22 14.5C22 12.1332 20.177 10.2109 17.8576 10.021C17.3879 7.17066 14.9221 5 12 5C9.37893 5 7.15174 6.83732 6.33129 9.3243C3.93489 9.54446 2 11.5303 2 14C2 16.7614 4.23858 19 7 19H17.5Z" />
      </svg>
    </motion.div>
  );
}
