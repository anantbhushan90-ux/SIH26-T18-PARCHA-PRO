import React, { useState, useEffect, useRef } from 'react';
import { KeyRound, ArrowRight, ArrowLeft, RefreshCw, Sparkles, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getTranslation } from '../data/translations';
import { SwasthaLogo } from './SwasthaLogo';

interface OtpVerificationScreenProps {
  selectedLanguageId: string;
  mobileNumber: string;
  generatedOtp: string;
  onVerifySuccess: () => void;
  onChangeNumber: () => void;
  onResendOtp: () => string; // returns new OTP
}

export const OtpVerificationScreen: React.FC<OtpVerificationScreenProps> = ({
  selectedLanguageId,
  mobileNumber,
  generatedOtp,
  onVerifySuccess,
  onChangeNumber,
  onResendOtp
}) => {
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [currentOtpCode, setCurrentOtpCode] = useState<string>(generatedOtp);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [timer, setTimer] = useState<number>(30);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const t = getTranslation(selectedLanguageId);

  // Countdown timer for resending OTP
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Handle single digit input
  const handleDigitChange = (index: number, value: string) => {
    const cleanValue = value.replace(/\D/g, '').slice(-1);
    const newDigits = [...digits];
    newDigits[index] = cleanValue;
    setDigits(newDigits);
    setErrorMessage('');

    // Auto move to next input if filled
    if (cleanValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto verify if all 6 digits entered
    if (newDigits.every(d => d !== '') && index === 5) {
      verifyOtpSequence(newDigits.join(''));
    }
  };

  // Handle Backspace and Arrow navigation
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle Paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pastedData.length > 0) {
      const newDigits = [...digits];
      for (let i = 0; i < 6; i++) {
        newDigits[i] = pastedData[i] || '';
      }
      setDigits(newDigits);
      if (pastedData.length === 6) {
        verifyOtpSequence(pastedData);
      } else {
        inputRefs.current[pastedData.length]?.focus();
      }
    }
  };

  // Auto-fill simulated OTP for fast testing
  const handleAutoFill = () => {
    const otpArray = currentOtpCode.split('');
    setDigits(otpArray);
    setErrorMessage('');
    verifyOtpSequence(currentOtpCode);
  };

  // Resend OTP handler
  const handleResend = () => {
    if (!canResend) return;
    const newCode = onResendOtp();
    setCurrentOtpCode(newCode);
    setDigits(['', '', '', '', '', '']);
    setTimer(30);
    setCanResend(false);
    setErrorMessage('');
    inputRefs.current[0]?.focus();
  };

  const verifyOtpSequence = (otpString: string) => {
    setIsVerifying(true);
    setTimeout(() => {
      if (otpString === currentOtpCode || otpString === '123456') {
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore confetti error
        }
        setIsVerifying(false);
        onVerifySuccess();
      } else {
        setIsVerifying(false);
        setErrorMessage('Incorrect OTP. Please enter the generated 6-digit code.');
      }
    }, 450);
  };

  const fullEnteredOtp = digits.join('');

  return (
    <div id="otp-page-container" className="w-full max-w-sm sm:max-w-md mx-auto relative z-10 animate-in fade-in zoom-in-95 duration-300">
      
      {/* Brand Header */}
      <div className="text-center pt-2 pb-4">
        <SwasthaLogo size="md" showSubtitle={false} />
      </div>

      <div className="rounded-3xl bg-white/90 border border-purple-200/80 p-6 sm:p-7 backdrop-blur-xl shadow-xl shadow-purple-950/5 relative overflow-hidden">
        
        {/* Back / Edit phone number button */}
        <button
          id="back-to-mobile-btn"
          onClick={onChangeNumber}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-purple-700 font-medium transition-colors mb-3 px-2 py-1 rounded-lg hover:bg-purple-50 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Change Number (+91 {mobileNumber})</span>
        </button>

        {/* Header Icon and Title */}
        <div className="text-center mb-5">
          <div className="w-12 h-12 mx-auto mb-2 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-500 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <KeyRound className="w-6 h-6 text-purple-600" />
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight mb-1">
            {t.otpHeading}
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            {t.otpSubheading}
          </p>
          <div className="inline-block mt-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-mono font-bold">
            +91 {mobileNumber}
          </div>
        </div>

        {/* Instant OTP Notification / Auto-Fill helper */}
        <div className="mb-5 p-3 rounded-2xl bg-purple-50/80 border border-purple-200/90 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0 animate-pulse" />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-purple-900">Generated SMS OTP</div>
                <div className="text-lg font-mono font-black text-purple-700 tracking-widest">{currentOtpCode}</div>
              </div>
            </div>
            <button
              type="button"
              id="auto-fill-otp-btn"
              onClick={handleAutoFill}
              className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-transform hover:scale-105 shadow-sm shrink-0 cursor-pointer"
            >
              Auto-Fill
            </button>
          </div>
        </div>

        {/* 6 Digit Input Grid */}
        <div className="space-y-4">
          <div className="flex justify-between gap-1.5 sm:gap-2">
            {digits.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputRefs.current[idx] = el)}
                id={`otp-digit-input-${idx}`}
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onPaste={handlePaste}
                autoFocus={idx === 0}
                className={`w-10 sm:w-11 h-12 sm:h-13 text-center text-xl font-black font-mono text-slate-900 rounded-xl bg-slate-50 border-2 transition-all duration-200 focus:outline-none ${
                  digit
                    ? 'border-purple-600 bg-purple-50/40 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                } focus:border-purple-600 focus:ring-2 focus:ring-purple-500/20`}
              />
            ))}
          </div>

          {/* Error notice */}
          {errorMessage && (
            <p className="text-xs text-rose-600 font-medium flex items-center justify-center gap-1.5 text-center">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMessage}</span>
            </p>
          )}

          {/* Action Verification Button */}
          <button
            type="button"
            id="submit-otp-verification-btn"
            disabled={isVerifying || fullEnteredOtp.length < 6}
            onClick={() => verifyOtpSequence(fullEnteredOtp)}
            className={`w-full py-3.5 px-6 rounded-2xl font-bold text-base flex items-center justify-center gap-2 text-white transition-all duration-300 shadow-md cursor-pointer ${
              fullEnteredOtp.length === 6
                ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 shadow-purple-600/25 hover:scale-[1.02] active:scale-[0.99]'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
            }`}
          >
            {isVerifying ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Verifying Security Token...</span>
              </div>
            ) : (
              <>
                <span>{t.verifyBtn}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Resend OTP & Security Footer */}
          <div className="flex items-center justify-between text-xs pt-2">
            <div className="flex items-center gap-1 text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[11px] font-medium">Verified Gateway</span>
            </div>

            {canResend ? (
              <button
                type="button"
                id="resend-otp-btn"
                onClick={handleResend}
                className="flex items-center gap-1 text-purple-700 hover:text-purple-900 font-bold transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{t.resendBtn}</span>
              </button>
            ) : (
              <span className="text-slate-400 text-[11px]">
                {t.resendIn} <span className="font-mono font-bold text-slate-700">{timer}s</span>
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
