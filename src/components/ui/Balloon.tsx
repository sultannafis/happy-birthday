import { motion } from "framer-motion";

interface BalloonProps {
  color?: string;
  delay?: number;
  duration?: number;
  left?: string;
  className?: string;
}

export default function Balloon({
  color = "#FF9AA2",
  delay = 0,
  duration = 15,
  left = "50%",
  className = "",
}: BalloonProps) {
  return (
    <motion.div
      className={`absolute bottom-[-150px] ${className}`}
      style={{ left }}
      initial={{ y: 0, opacity: 0, scale: 0.8 }}
      animate={{ y: "-120vh", opacity: [0, 1, 1, 0], scale: 1 }}
      transition={{
        y: { duration, delay, ease: "linear", repeat: Infinity },
        opacity: { duration, delay, ease: "linear", repeat: Infinity },
      }}
    >
      <svg
        width="60"
        height="80"
        viewBox="0 0 60 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.1))" }}
      >
        <path
          d="M30 0C13.4315 0 0 12.3137 0 27.5C0 42.6863 15 65 30 75C45 65 60 42.6863 60 27.5C60 12.3137 46.5685 0 30 0Z"
          fill={color}
          fillOpacity="0.9"
        />
        {/* Balloon Reflection */}
        <path
          d="M15 15C15 15 25 5 35 10"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeOpacity="0.4"
        />
        {/* Knot */}
        <polygon points="25,75 35,75 30,80" fill={color} />
      </svg>
    </motion.div>
  );
}
