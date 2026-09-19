import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  lightMode?: boolean;
}

export const SportsFlyLogo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  lightMode = true,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  return (
    <div className="inline-flex items-center gap-2.5 select-none group cursor-pointer">
      {/* SportsFly S Icon (Geometric Dual Wing Origami S from sportsfly.jpeg) */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center rounded-2xl bg-white p-1 shadow-sm border border-slate-200/80 group-hover:border-blue-300 group-hover:shadow-md transition-all duration-300 group-hover:scale-105 flex-shrink-0`}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            {/* Top Blue Wing Gradients */}
            <linearGradient id="sf-blue-top" x1="32" y1="28" x2="52" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#29B6F6" />
              <stop offset="60%" stopColor="#0288D1" />
              <stop offset="100%" stopColor="#01579B" />
            </linearGradient>

            <linearGradient id="sf-blue-base" x1="30" y1="44" x2="48" y2="58" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0277BD" />
              <stop offset="50%" stopColor="#1565C0" />
              <stop offset="100%" stopColor="#0D47A1" />
            </linearGradient>

            {/* Bottom Warm Wing Gradients */}
            <linearGradient id="sf-pink-top" x1="52" y1="44" x2="70" y2="58" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF4081" />
              <stop offset="60%" stopColor="#E91E63" />
              <stop offset="100%" stopColor="#C2185B" />
            </linearGradient>

            <linearGradient id="sf-orange-mid" x1="54" y1="52" x2="68" y2="68" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF5252" />
              <stop offset="60%" stopColor="#FF7043" />
              <stop offset="100%" stopColor="#FF9800" />
            </linearGradient>

            <linearGradient id="sf-yellow-tail" x1="50" y1="62" x2="66" y2="76" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFA726" />
              <stop offset="100%" stopColor="#FFCA28" />
            </linearGradient>
          </defs>

          {/* TOP PIECE (Blue Wing) */}
          {/* Top Upper Curve */}
          <path
            d="M 50.5 29 C 43 32, 33 42, 32 50 C 37 43, 43 38, 50.5 29 Z"
            fill="#4FC3F7"
            opacity="0.95"
          />
          {/* Top Main Wing Facet */}
          <path
            d="M 50.5 29 C 42 36, 32 46, 32 50 C 32 56, 38 58, 43 58 C 45 54, 47.5 49, 50.5 29 Z"
            fill="url(#sf-blue-top)"
          />
          {/* Top Bottom Fold Facet */}
          <path
            d="M 32 50 C 32 56, 37.5 58, 43 58 C 47.5 58, 48 55, 47 52 C 43 47.5, 38 48, 32 50 Z"
            fill="url(#sf-blue-base)"
          />

          {/* BOTTOM PIECE (Pink/Orange/Yellow Wing) */}
          {/* Bottom Top Pink Facet */}
          <path
            d="M 54 46 C 58 45.5, 66 47, 68 53 C 69 57, 65 60.5, 60 62.5 C 57 58, 55 52, 54 46 Z"
            fill="url(#sf-pink-top)"
          />
          {/* Bottom Middle Orange Facet */}
          <path
            d="M 68 53 C 70 58, 67 63, 62 67 C 58 64, 57 59, 60 62.5 C 65 60.5, 69 57, 68 53 Z"
            fill="url(#sf-orange-mid)"
          />
          {/* Bottom Lower Yellow/Amber Tail Facet */}
          <path
            d="M 62 67 C 58 71, 52 75, 50.5 75 C 55 70, 58 65, 62 67 Z"
            fill="url(#sf-yellow-tail)"
          />
          {/* Bottom Connected Curved Body */}
          <path
            d="M 60 62.5 C 56 65, 52 70, 50.5 75 C 55 74, 60 70, 64 65.5 C 66 63, 64 61, 60 62.5 Z"
            fill="url(#sf-orange-mid)"
            opacity="0.9"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex items-center">
          <div className={`tracking-tight flex items-baseline leading-none ${textSizes[size]}`}>
            <span className={`font-extrabold ${lightMode ? 'text-slate-900' : 'text-white'}`}>
              Sports
            </span>
            <span className="font-extralight tracking-wide bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-500 bg-clip-text text-transparent ml-0.5">
              Fly
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
