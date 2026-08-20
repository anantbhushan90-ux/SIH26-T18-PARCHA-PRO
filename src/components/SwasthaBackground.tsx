import React from 'react';

interface SwasthaBackgroundProps {
  children: React.ReactNode;
  customBgUrl?: string | null;
  showPhoneFrame?: boolean;
}

export const SwasthaBackground: React.FC<SwasthaBackgroundProps> = ({
  children,
  customBgUrl,
}) => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#f7f5fa] overflow-x-hidden">
      {/* If custom user background is uploaded, render it with overlay */}
      {customBgUrl ? (
        <div
          className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
          style={{ backgroundImage: `url(${customBgUrl})` }}
        >
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />
        </div>
      ) : (
        /* The Template Background from the attached image: Soft pastel lilac/peach waves + suspension bridge bottom */
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-gradient-to-b from-[#fbfaff] via-[#f8f5fd] to-[#f4eff9]">
          {/* Top-Left Pastel Purple/Magenta Waves */}
          <div className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-gradient-to-br from-purple-200/50 via-pink-200/40 to-transparent blur-2xl" />
          <svg
            className="absolute top-0 left-0 w-full max-w-lg h-64 opacity-40 text-purple-200/60"
            viewBox="0 0 500 250"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-40 -20 C120 40, 180 180, 360 120 C420 100, 480 140, 520 170 L520 -20 Z"
              fill="url(#topWaveGradient)"
            />
            <defs>
              <linearGradient id="topWaveGradient" x1="0" y1="0" x2="400" y2="200" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#e9d5ff" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#fbcfe8" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#fde047" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center-Right Ambient Glow */}
          <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-gradient-to-bl from-purple-100/60 via-amber-100/40 to-transparent blur-3xl" />

          {/* Bottom-Left Peach/Violet Flow Curve */}
          <div className="absolute bottom-0 -left-20 w-96 h-96 rounded-full bg-gradient-to-tr from-pink-200/50 via-purple-100/40 to-transparent blur-2xl" />

          {/* Bottom Architectural Suspension Bridge Vector Graphic (as seen in the template footer) */}
          <div className="absolute bottom-0 inset-x-0 h-44 sm:h-52 w-full flex items-end justify-center overflow-hidden opacity-30 select-none pointer-events-none">
            <svg
              className="w-full min-w-[700px] h-full text-purple-900"
              viewBox="0 0 1000 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="bridgeGrad" x1="0" y1="0" x2="0" y2="200" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7e22ce" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="waterWave" x1="0" y1="140" x2="1000" y2="140" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#c084fc" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#e879f9" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Distant City Skyline Silhouettes */}
              <path
                d="M100 140 L100 100 L115 100 L115 140 M120 140 L120 85 L140 85 L140 140 M145 140 L145 110 L160 110 L160 140 M820 140 L820 90 L840 90 L840 140 M850 140 L850 105 L870 105 L870 140 M880 140 L880 75 L900 75 L900 140"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeOpacity="0.4"
              />

              {/* Main Suspension Bridge Towers */}
              {/* Left Tower */}
              <path
                d="M320 160 L335 30 L345 30 L360 160 Z"
                fill="none"
                stroke="url(#bridgeGrad)"
                strokeWidth="2.5"
              />
              <line x1="330" y1="70" x2="350" y2="70" stroke="url(#bridgeGrad)" strokeWidth="2" />
              <line x1="326" y1="100" x2="354" y2="100" stroke="url(#bridgeGrad)" strokeWidth="2" />
              <line x1="323" y1="130" x2="357" y2="130" stroke="url(#bridgeGrad)" strokeWidth="2" />

              {/* Right Tower */}
              <path
                d="M640 160 L655 30 L665 30 L680 160 Z"
                fill="none"
                stroke="url(#bridgeGrad)"
                strokeWidth="2.5"
              />
              <line x1="650" y1="70" x2="670" y2="70" stroke="url(#bridgeGrad)" strokeWidth="2" />
              <line x1="646" y1="100" x2="674" y2="100" stroke="url(#bridgeGrad)" strokeWidth="2" />
              <line x1="643" y1="130" x2="677" y2="130" stroke="url(#bridgeGrad)" strokeWidth="2" />

              {/* Main Suspension Cables */}
              <path
                d="M50 140 Q 180 140, 340 30 Q 500 135, 660 30 Q 820 140, 950 140"
                fill="none"
                stroke="#6b21a8"
                strokeWidth="2.5"
              />

              {/* Vertical Suspension Wire Hangers */}
              {/* Center Span Hangers */}
              <line x1="380" y1="65" x2="380" y2="140" stroke="#9333ea" strokeWidth="1" />
              <line x1="420" y1="90" x2="420" y2="140" stroke="#9333ea" strokeWidth="1" />
              <line x1="460" y1="110" x2="460" y2="140" stroke="#9333ea" strokeWidth="1" />
              <line x1="500" y1="118" x2="500" y2="140" stroke="#9333ea" strokeWidth="1" />
              <line x1="540" y1="110" x2="540" y2="140" stroke="#9333ea" strokeWidth="1" />
              <line x1="580" y1="90" x2="580" y2="140" stroke="#9333ea" strokeWidth="1" />
              <line x1="620" y1="65" x2="620" y2="140" stroke="#9333ea" strokeWidth="1" />

              {/* Left Span Hangers */}
              <line x1="200" y1="125" x2="200" y2="140" stroke="#9333ea" strokeWidth="1" />
              <line x1="240" y1="105" x2="240" y2="140" stroke="#9333ea" strokeWidth="1" />
              <line x1="280" y1="75" x2="280" y2="140" stroke="#9333ea" strokeWidth="1" />

              {/* Right Span Hangers */}
              <line x1="720" y1="75" x2="720" y2="140" stroke="#9333ea" strokeWidth="1" />
              <line x1="760" y1="105" x2="760" y2="140" stroke="#9333ea" strokeWidth="1" />
              <line x1="800" y1="125" x2="800" y2="140" stroke="#9333ea" strokeWidth="1" />

              {/* Bridge Deck / Roadway */}
              <line x1="0" y1="140" x2="1000" y2="140" stroke="#581c87" strokeWidth="4" />
              <line x1="0" y1="144" x2="1000" y2="144" stroke="#7e22ce" strokeWidth="1.5" />

              {/* Water Wave Lines beneath bridge */}
              <path
                d="M0 160 Q 250 155, 500 160 T 1000 160"
                stroke="url(#waterWave)"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M0 180 Q 250 175, 500 180 T 1000 180"
                stroke="url(#waterWave)"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Content wrapper */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};
