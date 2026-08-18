import React from 'react';

// Reusable Washi Tape
export const WashiTape = ({ className, color = "bg-rose-200/50" }: { className?: string, color?: string }) => (
  <div className={`absolute z-20 backdrop-blur-sm -rotate-2 ${color} ${className}`} 
       style={{
         boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
         clipPath: 'polygon(2% 0, 98% 2%, 100% 98%, 0 100%)'
       }}>
  </div>
);

// Hand Drawn Star
export const StarDoodle = ({ className, color = "#fcd34d" }: { className?: string, color?: string }) => (
  <svg className={`absolute z-10 ${className}`} width="40" height="40" viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M50 10 L61 38 L90 40 L67 59 L75 88 L50 72 L25 88 L33 59 L10 40 L39 38 Z" strokeDasharray="300" strokeDashoffset="0">
      <animate attributeName="stroke-dashoffset" from="300" to="0" dur="2s" fill="freeze" />
    </path>
  </svg>
);

// Squiggly Line
export const SquigglyLine = ({ className, color = "#cbd5e1" }: { className?: string, color?: string }) => (
  <svg className={`absolute z-10 ${className}`} width="80" height="20" viewBox="0 0 80 20" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round">
    <path d="M5 10 Q 15 20, 25 10 T 45 10 T 65 10 T 75 10" />
  </svg>
);

// Doodle Heart
export const HeartDoodle = ({ className, color = "#f43f5e" }: { className?: string, color?: string }) => (
  <svg className={`absolute z-10 ${className}`} width="30" height="30" viewBox="0 0 50 50" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M25 45 C -5 25, 5 -5, 25 10 C 45 -5, 55 25, 25 45 Z" />
  </svg>
);

// Doodle Cloud
export const CloudDoodle = ({ className, color = "#bae6fd" }: { className?: string, color?: string }) => (
  <svg className={`absolute z-10 ${className}`} width="50" height="35" viewBox="0 0 60 40" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 25 Q 5 25, 5 15 Q 5 5, 15 5 Q 25 5, 30 15 Q 40 5, 50 10 Q 60 15, 55 25 Q 65 35, 50 35 Q 35 35, 30 30 Q 20 45, 10 35 Z" />
  </svg>
);

// Doodle Ribbon
export const RibbonDoodle = ({ className, color = "#fda4af" }: { className?: string, color?: string }) => (
  <svg className={`absolute z-10 ${className}`} width="45" height="40" viewBox="0 0 50 40" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M25 15 L 10 35 L 5 25 L 20 15 M25 15 L 40 35 L 45 25 L 30 15 M15 15 Q 25 5, 35 15 Q 25 25, 15 15" />
  </svg>
);

// Flower
export const FlowerDoodle = ({ className, color = "#fbbf24" }: { className?: string, color?: string }) => (
  <svg className={`absolute z-10 ${className}`} width="40" height="40" viewBox="0 0 50 50" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="25" cy="25" r="5" />
    <path d="M25 20 C 15 5, 35 5, 25 20 M25 30 C 15 45, 35 45, 25 30 M20 25 C 5 15, 5 35, 20 25 M30 25 C 45 15, 45 35, 30 25" />
  </svg>
);

// Smile
export const SmileDoodle = ({ className, color = "#fb923c" }: { className?: string, color?: string }) => (
  <svg className={`absolute z-10 ${className}`} width="35" height="35" viewBox="0 0 50 50" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round">
    <circle cx="25" cy="25" r="20" strokeLinejoin="round" />
    <circle cx="17" cy="20" r="2" fill={color} stroke="none" />
    <circle cx="33" cy="20" r="2" fill={color} stroke="none" />
    <path d="M15 30 Q 25 40, 35 30" />
  </svg>
);

// Note
export const MiniNote = ({ className, text, rotation = "-rotate-3", color="bg-yellow-100" }: { className?: string, text: string, rotation?: string, color?: string }) => (
  <div className={`absolute z-20 ${color} p-2 shadow-sm font-handwriting text-neutral-600 text-sm md:text-base border border-yellow-200/50 ${rotation} ${className}`}
       style={{ clipPath: 'polygon(0 0, 100% 2%, 98% 100%, 2% 98%)' }}>
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-3 bg-red-200/50 backdrop-blur-sm shadow-sm -mt-1 -rotate-2" />
    {text}
  </div>
);

// Little Spark
export const SparkDoodle = ({ className, color = "#fcd34d" }: { className?: string, color?: string }) => (
  <svg className={`absolute z-10 ${className}`} width="20" height="20" viewBox="0 0 30 30" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round">
    <path d="M15 0 L15 10 M15 20 L15 30 M0 15 L10 15 M20 15 L30 15" />
    <circle cx="15" cy="15" r="2" fill={color} stroke="none" />
  </svg>
);

// Arrow
export const ArrowDoodle = ({ className, color = "#94a3b8" }: { className?: string, color?: string }) => (
  <svg className={`absolute z-10 ${className}`} width="40" height="30" viewBox="0 0 50 30" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 15 C 20 5, 35 25, 45 15 M35 10 L 45 15 L 40 25" />
  </svg>
);
