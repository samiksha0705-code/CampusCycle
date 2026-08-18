import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textColor?: string;
}

export const CampusLogo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = true,
  textColor = 'text-[#1B4332]'
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <div id="campuscycle-logo-container" className="flex items-center gap-2.5 select-none cursor-pointer group">
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-[#1B4332] via-[#2D6A4F] to-[#40916C] shadow-sm shadow-[#1B4332]/20 text-white p-2 transition-transform duration-300 group-hover:scale-105 ${iconSizes[size]}`}>
        {/* Circular arrow leaf SVG */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-full h-full"
        >
          {/* Circular arrow 1 */}
          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
          {/* Circular arrow 2 */}
          <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
          <path d="M21 21v-5h-5" />
          {/* Leaf center */}
          <path d="M12 7c2 0 4 2 4 5 0 3-4 5-4 5s-4-2-4-5c0-3 2-5 4-5z" fill="#B9F98C" fillOpacity="0.4" />
          <path d="M12 7v10" strokeWidth="1.8" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className={`font-['Outfit',sans-serif] font-bold tracking-tight ${textColor} ${textSizes[size]} flex items-center`}>
            <span>Campus</span>
            <span className="text-[#2D6A4F]">Cycle</span>
            <span className="ml-1 w-2 h-2 rounded-full bg-[#B9F98C] inline-block ring-1 ring-[#2D6A4F]/30"></span>
          </div>
          <span className="text-[10px] uppercase font-semibold tracking-wider text-[#6B8577] mt-0.5">
            Circular Campus
          </span>
        </div>
      )}
    </div>
  );
};
