import { motion } from "framer-motion";

interface FlowerProps {
  delay?: number;
  duration?: number;
  left?: string;
  className?: string;
  size?: number;
}

export default function Flower({
  delay = 0,
  duration = 10,
  left = "50%",
  className = "",
  size = 40,
}: FlowerProps) {
  return (
    <motion.div
      className={`absolute top-[-100px] z-20 ${className}`}
      style={{ left }}
      initial={{ y: 0, opacity: 0, rotate: 0 }}
      animate={{ y: "120vh", opacity: [0, 1, 1, 0], rotate: 360 }}
      transition={{
        y: { duration, delay, ease: "linear", repeat: Infinity },
        opacity: { duration, delay, ease: "linear", repeat: Infinity },
        rotate: { duration: duration / 2, ease: "linear", repeat: Infinity },
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))" }}
      >
        <path
          d="M50 20C55 5 75 5 80 20C85 35 65 45 50 50C35 45 15 35 20 20C25 5 45 5 50 20Z"
          fill="#FFB7B2"
          opacity="0.8"
        />
        <path
          d="M80 50C95 45 95 65 80 70C65 75 55 55 50 50C55 35 75 35 80 50Z"
          fill="#FFDAC1"
          opacity="0.8"
        />
        <path
          d="M50 80C45 95 25 95 20 80C15 65 35 55 50 50C65 55 85 65 80 80C75 95 55 95 50 80Z"
          fill="#E2F0CB"
          opacity="0.8"
        />
        <path
          d="M20 50C5 55 5 35 20 30C35 25 45 45 50 50C45 65 25 65 20 50Z"
          fill="#FFB7B2"
          opacity="0.8"
        />
        <circle cx="50" cy="50" r="12" fill="#FFDFD3" />
      </svg>
    </motion.div>
  );
}
