import React from 'react';

interface SwasthaLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'hero';
  showSubtitle?: boolean;
  className?: string;
  langSubtitle?: string;
  iconOnly?: boolean;
  variant?: 'card' | 'plain';
}

/**
 * EXACT reproduction of the user's uploaded emblem:
 * Features:
 * 1. Warm Golden/Bronze Suspension Bridge with horizontal deck, two dual-tier towers with cross-braces, suspension cable curves and vertical suspender lines.
 * 2. Left Wing: Sharp angular purple/violet feathers fanning up-left, with distinct rectangular bridge cable truss windows.
 * 3. Central heart loop with tiered bridge rungs at bottom arch.
 * 4. Graceful Bird/Phoenix head facing right with elegant rear crest, beak, eye curvature, and sweeping orange-pink ribbon heart perimeter.
 * 5. Elegant swirling decorative tail spirals (scroll flourishes) in vibrant blue/indigo/magenta at the bottom.
 * 6. Authentic watercolor gradient texture matching the reference art.
 */
export const SwasthaAppIcon: React.FC<{ size?: number; className?: string; withCard?: boolean }> = ({
  size = 56,
  className = '',
  withCard = true
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none shrink-0 ${
        withCard
          ? 'bg-gradient-to-b from-[#fcfbfe] to-[#f4eef9] rounded-[24%] shadow-lg shadow-purple-950/15 border border-slate-200/80 p-1.5'
          : ''
      } ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 1000 1000"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Bridge Gold/Bronze Gradient */}
          <linearGradient id="bridgeWood" x1="100" y1="500" x2="900" y2="700" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#af7339" />
            <stop offset="35%" stopColor="#cd8d48" />
            <stop offset="65%" stopColor="#df9f52" />
            <stop offset="100%" stopColor="#9a5e2a" />
          </linearGradient>

          {/* Wing Upper & Outer Indigo/Purple */}
          <linearGradient id="wingIndigo" x1="180" y1="160" x2="480" y2="520" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#323f85" />
            <stop offset="25%" stopColor="#433b94" />
            <stop offset="50%" stopColor="#682c89" />
            <stop offset="75%" stopColor="#96227b" />
            <stop offset="100%" stopColor="#bc1e6c" />
          </linearGradient>

          {/* Right Ribbon / Phoenix Head Orange/Pink */}
          <linearGradient id="phoenixOrange" x1="520" y1="240" x2="800" y2="550" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#902684" />
            <stop offset="20%" stopColor="#b8216c" />
            <stop offset="45%" stopColor="#e23348" />
            <stop offset="75%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#f58220" />
          </linearGradient>

          {/* Tail Spiral Rich Indigo-Crimson */}
          <linearGradient id="tailGradient" x1="320" y1="550" x2="650" y2="820" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2c3a88" />
            <stop offset="30%" stopColor="#3f3898" />
            <stop offset="60%" stopColor="#7a2789" />
            <stop offset="85%" stopColor="#bc1e68" />
            <stop offset="100%" stopColor="#e23348" />
          </linearGradient>

          {/* Subtle drop shadow */}
          <filter id="softShadow" x="-8%" y="-8%" width="120%" height="120%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#3d1445" floodOpacity="0.16" />
          </filter>
        </defs>

        {/* ======================================================== */}
        {/* 1. SUSPENSION BRIDGE ARCHITECTURE (Background Gold Structure) */}
        {/* ======================================================== */}
        <g id="suspension-bridge" filter="url(#softShadow)">
          {/* Main Horizontal Deck (Tapered ends) */}
          <path
            d="M 68 668 C 220 632, 780 632, 932 668 L 916 688 C 760 656, 240 656, 84 688 Z"
            fill="url(#bridgeWood)"
          />

          {/* Left Tower Pylons */}
          <path
            d="M 238 520 L 258 520 L 258 692 L 238 692 Z"
            fill="url(#bridgeWood)"
          />
          <path
            d="M 276 520 L 296 520 L 296 692 L 276 692 Z"
            fill="url(#bridgeWood)"
          />
          {/* Left Tower Cross-beams */}
          <rect x="238" y="562" width="58" height="12" rx="2" fill="#8f5223" />
          <rect x="238" y="618" width="58" height="12" rx="2" fill="#8f5223" />
          <polygon points="230,520 304,520 292,510 242,510" fill="#df9f52" />

          {/* Left Side Outward Cable & Vertical Rungs */}
          <path
            d="M 72 668 Q 165 605 248 522"
            stroke="url(#bridgeWood)"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
          <line x1="140" y1="622" x2="140" y2="674" stroke="url(#bridgeWood)" strokeWidth="10" strokeLinecap="round" />
          <line x1="184" y1="580" x2="184" y2="668" stroke="url(#bridgeWood)" strokeWidth="10" strokeLinecap="round" />

          {/* Right Tower Pylons */}
          <path
            d="M 704 520 L 724 520 L 724 692 L 704 692 Z"
            fill="url(#bridgeWood)"
          />
          <path
            d="M 742 520 L 762 520 L 762 692 L 742 692 Z"
            fill="url(#bridgeWood)"
          />
          {/* Right Tower Cross-beams */}
          <rect x="704" y="562" width="58" height="12" rx="2" fill="#8f5223" />
          <rect x="704" y="618" width="58" height="12" rx="2" fill="#8f5223" />
          <polygon points="696,520 770,520 758,510 708,510" fill="#df9f52" />

          {/* Right Side Outward Cable & Vertical Rungs */}
          <path
            d="M 928 668 Q 835 605 752 522"
            stroke="url(#bridgeWood)"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
          <line x1="860" y1="622" x2="860" y2="674" stroke="url(#bridgeWood)" strokeWidth="10" strokeLinecap="round" />
          <line x1="816" y1="580" x2="816" y2="668" stroke="url(#bridgeWood)" strokeWidth="10" strokeLinecap="round" />

          {/* Center Main Suspension Cable */}
          <path
            d="M 286 522 C 370 655, 630 655, 714 522"
            stroke="url(#bridgeWood)"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* ======================================================== */}
        {/* 2. CENTRAL BRIDGE WALKWAY RIBS (Arched Rungs on bottom heart) */}
        {/* ======================================================== */}
        <g id="bridge-rungs">
          <path
            d="M 334 515 C 410 610, 590 610, 666 515"
            stroke="#b8216c"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
          {/* Wooden rungs bridging the heart curve */}
          <line x1="365" y1="532" x2="372" y2="556" stroke="#af7339" strokeWidth="8" strokeLinecap="round" />
          <line x1="405" y1="558" x2="413" y2="582" stroke="#af7339" strokeWidth="8" strokeLinecap="round" />
          <line x1="452" y1="578" x2="456" y2="602" stroke="#cd8d48" strokeWidth="8" strokeLinecap="round" />
          <line x1="500" y1="585" x2="500" y2="610" stroke="#cd8d48" strokeWidth="8" strokeLinecap="round" />
          <line x1="548" y1="578" x2="544" y2="602" stroke="#cd8d48" strokeWidth="8" strokeLinecap="round" />
          <line x1="595" y1="558" x2="587" y2="582" stroke="#af7339" strokeWidth="8" strokeLinecap="round" />
          <line x1="635" y1="532" x2="628" y2="556" stroke="#af7339" strokeWidth="8" strokeLinecap="round" />
        </g>

        {/* ======================================================== */}
        {/* 3. PHOENIX BIRD / HEART EMBLEM (Primary Foreground) */}
        {/* ======================================================== */}
        <g id="phoenix-bird" filter="url(#softShadow)">
          
          {/* --- TOP-LEFT WING FEATHERS (Pointed tips radiating up-left) --- */}
          {/* Highest outer wing feather */}
          <path
            d="M 245 162 C 285 260, 318 340, 348 435 C 310 380, 275 275, 245 162 Z"
            fill="#323f85"
          />
          {/* Second top wing feather */}
          <path
            d="M 195 235 C 255 298, 305 378, 332 460 C 285 410, 230 325, 195 235 Z"
            fill="#433b94"
          />
          {/* Third lower wing feather */}
          <path
            d="M 192 368 C 248 375, 302 410, 338 468 C 285 450, 235 415, 192 368 Z"
            fill="#682c89"
          />

          {/* --- LEFT WING BRIDGE-TRUSS FRAME (The distinctive cable lattice) --- */}
          {/* Outer thick purple framing border */}
          <path
            d="M 345 242 L 532 405 C 475 490, 355 505, 288 430 C 245 370, 272 275, 345 242 Z"
            fill="none"
            stroke="url(#wingIndigo)"
            strokeWidth="32"
            strokeLinejoin="round"
          />

          {/* Cable-truss vertical dividers inside the wing (Bridge Cables) */}
          <line x1="340" y1="255" x2="308" y2="402" stroke="#682c89" strokeWidth="14" strokeLinecap="round" />
          <line x1="382" y1="285" x2="360" y2="442" stroke="#7a2789" strokeWidth="14" strokeLinecap="round" />
          <line x1="428" y1="318" x2="412" y2="466" stroke="#96227b" strokeWidth="14" strokeLinecap="round" />
          <line x1="472" y1="352" x2="462" y2="480" stroke="#bc1e6c" strokeWidth="14" strokeLinecap="round" />
          <line x1="510" y1="382" x2="502" y2="484" stroke="#e23348" strokeWidth="14" strokeLinecap="round" />

          {/* Inner Wing Flame/Feather Swooshes */}
          <path
            d="M 312 390 C 380 400, 450 425, 470 505 C 410 490, 350 460, 312 390 Z"
            fill="#bc1e6c"
          />
          <path
            d="M 350 440 C 410 445, 470 470, 476 545 C 425 530, 380 500, 350 440 Z"
            fill="#e23348"
          />

          {/* --- RIGHT BIRD HEAD, CREST & SWEEPING HEART RIBBON --- */}
          {/* Bird Head Crest Feathers (sweeping backward-left) */}
          <path
            d="M 590 316 C 570 280, 536 256, 560 240 C 596 240, 620 270, 624 300 Z"
            fill="#bc1e6c"
          />

          {/* Bird Head, Beak pointing to right */}
          <path
            d="M 604 310 C 616 264, 670 244, 696 250 C 684 260, 660 276, 664 288 C 676 288, 696 256, 700 252 C 688 270, 672 284, 660 296 C 644 316, 628 350, 624 390 C 604 360, 604 330, 604 310 Z"
            fill="url(#phoenixOrange)"
          />

          {/* Outer Right Wing / Heart Contour (Bright Orange-Magenta Ribbon) */}
          <path
            d="M 648 336 C 730 340, 790 400, 760 490 C 730 570, 640 640, 550 700 C 630 630, 720 540, 716 464 C 712 400, 672 364, 632 360 Z"
            fill="url(#phoenixOrange)"
          />

          {/* Inner Heart Loop Contour */}
          <path
            d="M 604 376 C 656 380, 696 430, 672 496 C 640 570, 550 656, 490 704 C 560 636, 636 550, 630 490 C 624 444, 596 410, 570 404 Z"
            fill="#e23348"
          />

          {/* Core Inner Glow / Flame / Heart Accent */}
          <path
            d="M 570 370 C 590 396, 590 430, 564 456 C 550 440, 550 410, 570 370 Z"
            fill="#ea580c"
          />

          {/* --- BOTTOM TAIL EMBLEM & ARTISTIC SPIRAL FLOURISHES --- */}
          {/* Main Central Tail Spine */}
          <path
            d="M 540 560 C 544 650, 470 750, 430 820 C 470 740, 510 660, 504 560 Z"
            fill="url(#tailGradient)"
          />

          {/* Left Flowing Swirl & Loop (Indigo to Magenta) */}
          <path
            d="M 490 640 C 430 730, 340 810, 344 870 C 348 890, 370 900, 390 884 C 410 864, 392 830, 376 836 C 392 790, 460 720, 490 640 Z"
            fill="url(#tailGradient)"
          />

          {/* Right Bottom Decorative Spiral Feather */}
          <path
            d="M 524 670 C 550 760, 596 850, 630 896 C 648 912, 668 900, 664 876 C 656 852, 624 844, 620 864 C 600 820, 564 750, 524 670 Z"
            fill="#bc1e6c"
          />

          {/* Central Lower Ornamental Curl */}
          <path
            d="M 440 760 C 400 830, 430 910, 480 916 C 510 920, 524 896, 504 876 C 484 856, 460 880, 476 896 C 450 884, 436 836, 464 776 Z"
            fill="#323f85"
          />
        </g>
      </svg>
    </div>
  );
};

export const SwasthaLogo: React.FC<SwasthaLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
  langSubtitle,
  iconOnly = false,
  variant = 'card'
}) => {
  const pixelSizes = {
    xs: 32,
    sm: 48,
    md: 72,
    lg: 96,
    hero: 120
  };

  const currentPixelSize = pixelSizes[size];

  if (iconOnly) {
    return <SwasthaAppIcon size={currentPixelSize} className={className} withCard={variant === 'card'} />;
  }

  return (
    <div id="swastha-brand-emblem" className={`flex flex-col items-center text-center select-none ${className}`}>
      {/* Official App Logo Icon */}
      <div className="mb-2 transition-transform duration-300 hover:scale-105">
        <SwasthaAppIcon size={currentPixelSize} withCard={variant === 'card'} />
      </div>

      {/* Brand Title with distinct spacing and color styling matching the uploaded template */}
      <div className="flex flex-col items-center">
        <h1
          className={`font-black tracking-wider text-slate-800 uppercase ${
            size === 'hero'
              ? 'text-2xl sm:text-3xl'
              : size === 'lg'
              ? 'text-xl sm:text-2xl'
              : size === 'md'
              ? 'text-lg sm:text-xl'
              : 'text-base'
          }`}
          style={{ letterSpacing: '0.08em' }}
        >
          SWASTHA SEVA SETU
        </h1>

        {showSubtitle && (
          <div className="flex flex-col items-center mt-0.5 space-y-0.5">
            <p className="text-xs sm:text-sm font-medium text-slate-600 tracking-wide">
              Your Digital bridge to health
            </p>
            {langSubtitle && (
              <p className="text-[11px] font-semibold text-purple-700">
                {langSubtitle}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
