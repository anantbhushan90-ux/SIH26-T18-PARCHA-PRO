import React from 'react';
import { Globe, ShieldCheck, Phone, LogOut, Sparkles, CheckCircle2, Smartphone, Monitor, Home, Stethoscope, UserCheck } from 'lucide-react';
import { ScreenStep } from '../types';
import { INDIAN_LANGUAGES } from '../data/languages';
import { getTranslation } from '../data/translations';
import { SwasthaAppIcon } from './SwasthaLogo';

interface HeaderBarProps {
  currentStep: ScreenStep;
  selectedLanguageId: string;
  mobileNumber: string;
  isVerified: boolean;
  isMobileFrameMode: boolean;
  onToggleMobileFrame: () => void;
  onNavigateToLanguage: () => void;
  onLogout: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  currentStep,
  selectedLanguageId,
  mobileNumber,
  isVerified,
  isMobileFrameMode,
  onToggleMobileFrame,
  onNavigateToLanguage,
  onLogout
}) => {
  const currentLang = INDIAN_LANGUAGES.find(l => l.id === selectedLanguageId) || INDIAN_LANGUAGES[0];
  const t = getTranslation(selectedLanguageId);

  const steps: { key: ScreenStep; label: string; stepNumber: number }[] = [
    { key: 'login', label: '1. Mobile & OTP', stepNumber: 1 },
    { key: 'language', label: '2. Language', stepNumber: 2 },
    { key: 'home', label: '3. Portals', stepNumber: 3 },
  ];

  const isHomeOrBeyond =
    currentStep === 'home' ||
    currentStep === 'my-login-verification' ||
    currentStep === 'patient-dashboard' ||
    currentStep === 'admin-doctors-portal';

  return (
    <header id="app-top-header" className="w-full relative z-30 pt-3 pb-2 px-3 sm:px-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between gap-2 p-2.5 sm:p-3 rounded-2xl bg-white/80 border border-purple-200/80 backdrop-blur-md shadow-sm">
        
        {/* Brand Badge */}
        <div className="flex items-center gap-2">
          <SwasthaAppIcon size={32} withCard={true} className="shadow-xs" />
          <div>
            <h1 className="text-xs sm:text-sm font-black text-slate-900 tracking-wide flex items-center gap-1.5">
              <span>SWASTHA SEVA SETU</span>
            </h1>
          </div>
        </div>

        {/* Step Progression Indicators */}
        <div className="hidden sm:flex items-center gap-1 text-xs">
          {steps.map((s, index) => {
            const isActive =
              (s.key === 'login' && (currentStep === 'login' || currentStep === 'otp')) ||
              (s.key === 'language' && currentStep === 'language') ||
              (s.key === 'home' && isHomeOrBeyond);

            const isPassed =
              (s.key === 'login' && currentStep !== 'login' && currentStep !== 'otp') ||
              (s.key === 'language' && isHomeOrBeyond);

            return (
              <React.Fragment key={s.key}>
                {index > 0 && (
                  <div className={`w-3 h-0.5 rounded ${isPassed ? 'bg-purple-600' : 'bg-slate-200'}`} />
                )}
                <div
                  className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all ${
                    isActive
                      ? 'bg-purple-100 text-purple-800 border border-purple-300 shadow-xs'
                      : isPassed
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                      : 'text-slate-400 bg-slate-100'
                  }`}
                >
                  {isPassed ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full bg-white text-slate-700 flex items-center justify-center text-[9px] font-bold shadow-xs">
                      {s.stepNumber}
                    </span>
                  )}
                  <span>{s.label.split('.')[1]}</span>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Right Action Tools: Mobile Frame Toggle, Language Switcher & Logout */}
        <div className="flex items-center gap-1.5">
          {/* Mobile phone preview mode toggle button for desktop testing */}
          <button
            type="button"
            id="toggle-mobile-view-btn"
            onClick={onToggleMobileFrame}
            title={isMobileFrameMode ? 'Switch to Full Screen View' : 'Switch to Mobile Phone View'}
            className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            {isMobileFrameMode ? (
              <>
                <Monitor className="w-3.5 h-3.5" />
                <span>Full Screen</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile View</span>
              </>
            )}
          </button>

          {/* Active Language Badge */}
          <button
            id="header-language-pill-btn"
            onClick={onNavigateToLanguage}
            title={t.changeLanguage}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-purple-100/70 hover:bg-purple-100 border border-purple-200 text-purple-800 text-xs font-bold transition-all hover:scale-105 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-purple-600" />
            <span>{currentLang.nativeName}</span>
          </button>

          {/* Logout / Reset button if in Home or beyond */}
          {isHomeOrBeyond && (
            <button
              id="header-logout-btn"
              onClick={onLogout}
              title={t.logout}
              className="flex items-center gap-1 px-2 py-1 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.logout}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
