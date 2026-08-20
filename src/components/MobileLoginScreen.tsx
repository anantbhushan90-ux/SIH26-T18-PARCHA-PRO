import React, { useState } from 'react';
import { Phone, ArrowRight, Shield, Zap, Sparkles, CheckCircle, Info } from 'lucide-react';
import { getTranslation } from '../data/translations';
import { SwasthaLogo } from './SwasthaLogo';

interface MobileLoginScreenProps {
  selectedLanguageId: string;
  initialMobile: string;
  onConfirmMobile: (mobile: string, generatedOtp: string) => void;
}

export const MobileLoginScreen: React.FC<MobileLoginScreenProps> = ({
  selectedLanguageId,
  initialMobile,
  onConfirmMobile
}) => {
  const [mobileNumber, setMobileNumber] = useState<string>(initialMobile || '');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const t = getTranslation(selectedLanguageId);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    if (raw.length <= 10) {
      setMobileNumber(raw);
      if (errorMessage) setErrorMessage('');
    }
  };

  const handleQuickFill = (num: string) => {
    setMobileNumber(num);
    setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length !== 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsSubmitting(true);

    // Generate a realistic 6-digit OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    setTimeout(() => {
      setIsSubmitting(false);
      onConfirmMobile(mobileNumber, generatedOtp);
    }, 500);
  };

  return (
    <div id="login-page-container" className="w-full max-w-sm sm:max-w-md mx-auto relative z-10 animate-in fade-in zoom-in-95 duration-300">
      
      {/* Brand Header matching the attached template */}
      <div className="text-center pt-2 pb-5">
        <SwasthaLogo size="hero" showSubtitle={true} langSubtitle={t.brandSubtitle !== 'SWASTHA SEVA SETU' ? t.brandSubtitle : undefined} />
      </div>

      {/* Main Glass Card matching the template aesthetic */}
      <div className="rounded-3xl bg-white/85 border border-purple-200/80 p-6 sm:p-7 backdrop-blur-xl shadow-xl shadow-purple-950/5 relative overflow-hidden">
        
        {/* Subtle decorative top corner tint */}
        <div className="absolute -top-16 -left-16 w-36 h-36 bg-purple-200/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-amber-200/40 rounded-full blur-2xl pointer-events-none" />

        {/* Welcome Section */}
        <div className="text-center mb-6 relative z-10">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-1">
            Welcome!
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-snug">
            Healthcare simplified, wellness multiplied.
          </p>
        </div>

        {/* Mobile Number Entry Form */}
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div>
            <label htmlFor="mobile-input" className="block text-xs font-bold uppercase tracking-wider text-purple-900/80 mb-2">
              {t.mobileLabel}
            </label>
            
            <div className="relative flex items-center rounded-2xl bg-slate-50/90 border-2 border-purple-100 focus-within:border-purple-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-purple-500/15 transition-all p-1">
              {/* Country Code Prefix */}
              <div className="flex items-center gap-1.5 px-3 py-2 border-r border-slate-200 text-slate-700 shrink-0 font-medium select-none text-sm">
                <span className="text-base" role="img" aria-label="India flag">🇮🇳</span>
                <span className="font-bold text-slate-900">+91</span>
              </div>

              {/* Mobile Input Field */}
              <input
                id="mobile-input"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
                placeholder={t.mobilePlaceholder}
                value={mobileNumber}
                onChange={handleInputChange}
                className="w-full bg-transparent px-3 py-2 text-lg text-slate-900 font-mono placeholder:text-slate-400 focus:outline-none tracking-widest"
                autoFocus
              />

              {mobileNumber.length === 10 && (
                <div className="pr-3 text-emerald-600 animate-in fade-in duration-200">
                  <CheckCircle className="w-5 h-5" />
                </div>
              )}
            </div>

            {/* Error Feedback */}
            {errorMessage && (
              <p className="mt-2 text-xs text-rose-600 font-medium flex items-center gap-1">
                <Info className="w-3.5 h-3.5 shrink-0" />
                {errorMessage}
              </p>
            )}
          </div>

          {/* Quick Demo Fill Options */}
          <div className="flex items-center justify-between text-xs pt-0.5">
            <span className="text-slate-500 font-medium text-[11px]">{t.quickFillDemo}:</span>
            <div className="flex gap-1.5">
              <button
                type="button"
                id="quick-fill-1-btn"
                onClick={() => handleQuickFill('9876543210')}
                className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 font-mono text-[11px] font-semibold border border-purple-200 transition-colors"
              >
                98765 43210
              </button>
              <button
                type="button"
                id="quick-fill-2-btn"
                onClick={() => handleQuickFill('9123456789')}
                className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 font-mono text-[11px] font-semibold border border-purple-200 transition-colors"
              >
                91234 56789
              </button>
            </div>
          </div>

          {/* Primary Confirm Button */}
          <button
            type="submit"
            id="confirm-mobile-btn"
            disabled={isSubmitting || mobileNumber.length < 10}
            className={`w-full py-3.5 px-6 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 shadow-md cursor-pointer ${
              mobileNumber.length === 10
                ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white shadow-purple-600/25 hover:scale-[1.02] active:scale-[0.99]'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generating Security OTP...</span>
              </div>
            ) : (
              <>
                <span>Confirm</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Security badges */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-center gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[11px] font-medium">Encrypted & Private</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-300" />
          <div className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-purple-600" />
            <span className="text-[11px] font-medium">Instant OTP</span>
          </div>
        </div>

      </div>
    </div>
  );
};
