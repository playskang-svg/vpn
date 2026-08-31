import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark' | 'monochrome';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'light'
}) => {
  const iconDimensions = {
    sm: 'w-6 h-6 sm:w-7 sm:h-7',
    md: 'w-7 h-7 sm:w-9 sm:h-9',
    lg: 'w-9 h-9 sm:w-11 sm:h-11'
  }[size];

  const textSizes = {
    sm: 'text-[15px] sm:text-[18px]',
    md: 'text-[17px] sm:text-[22px]',
    lg: 'text-[20px] sm:text-[26px]'
  }[size];

  return (
    <div className={`flex items-center gap-2.5 select-none group ${className}`}>
      {/* Dynamic Modern Vector Emblem */}
      <div className={`relative ${iconDimensions} flex items-center justify-center shrink-0`}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            <linearGradient id="vgcShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#614abf" />
              <stop offset="50%" stopColor="#7e65e6" />
              <stop offset="100%" stopColor="#432c9e" />
            </linearGradient>
            <linearGradient id="vgcCheckGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E676" />
              <stop offset="100%" stopColor="#00C853" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Shield Outer Container */}
          <path
            d="M20 3L34 7.8V17.5C34 26.2 28 34.2 20 37C12 34.2 6 26.2 6 17.5V7.8L20 3Z"
            fill="url(#vgcShieldGrad)"
          />

          {/* Inner Accent Ring */}
          <path
            d="M20 5.5L31.5 9.5V17.5C31.5 24.8 26.5 31.6 20 34C13.5 31.6 8.5 24.8 8.5 17.5V9.5L20 5.5Z"
            stroke="white"
            strokeWidth="0.75"
            strokeOpacity="0.3"
            fill="none"
          />

          {/* Global Network Nodes & Links */}
          <circle cx="20" cy="13" r="1.75" fill="white" fillOpacity="0.9" />
          <circle cx="14" cy="20" r="1.5" fill="white" fillOpacity="0.7" />
          <circle cx="26" cy="20" r="1.5" fill="white" fillOpacity="0.7" />
          <path
            d="M14 20L20 13L26 20"
            stroke="white"
            strokeWidth="1"
            strokeOpacity="0.4"
            strokeDasharray="1.5 1.5"
          />

          {/* Bold "Good Choice" Checkmark Badge */}
          <circle cx="20" cy="24" r="7.5" fill="#111111" />
          <circle cx="20" cy="24" r="6.8" fill="url(#vgcCheckGrad)" />
          <path
            d="M16.5 24L18.8 26.3L23.5 21.6"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Brand Text Typography */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span className={`font-['Hanken_Grotesk'] ${textSizes} font-black tracking-tight ${
            variant === 'dark' ? 'text-white' : variant === 'monochrome' ? 'text-[#444748]' : 'text-[#111111]'
          }`}>
            VPN <span className="text-[#614abf]">Good Choice</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00C853] inline-block animate-pulse" />
        </div>
        <span className={`hidden sm:inline text-[10px] font-semibold tracking-wider uppercase ${
          variant === 'dark' ? 'text-[#a1a1aa]' : 'text-[#747878]'
        }`}>
          Verified Security Guide
        </span>
      </div>
    </div>
  );
};
