import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, ArrowLeft, KeyRound, Sparkles, CheckCircle2, User, MapPin, Calendar, Check, ExternalLink, RefreshCw } from 'lucide-react';
import { useHealthApp } from '../context/HealthAppContext';
import { INITIAL_DEMO_PATIENTS } from '../data/mockHealthData';
import { SwasthaLogo } from './SwasthaLogo';

interface AadhaarDigiLockerVerificationProps {
  onVerificationComplete: () => void;
  onBack: () => void;
}

export const AadhaarDigiLockerVerification: React.FC<AadhaarDigiLockerVerificationProps> = ({
  onVerificationComplete,
  onBack
}) => {
  const { verifyPatientWithAadhaar, verifyPatientWithDigiLocker } = useHealthApp();

  const [aadhaarInput, setAadhaarInput] = useState('7842 9012 3456');
  const [selectedDemoIndex, setSelectedDemoIndex] = useState(0);
  const [step, setStep] = useState<'input' | 'otp' | 'success'>('input');
  const [otpValue, setOtpValue] = useState('');
  const [simulatedOtp, setSimulatedOtp] = useState('892014');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle Aadhaar input formatting
  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 12);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setAadhaarInput(formatted);
    setErrorMsg('');
  };

  // Select demo profile
  const handleSelectDemoProfile = (idx: number) => {
    setSelectedDemoIndex(idx);
    const profile = INITIAL_DEMO_PATIENTS[idx];
    setAadhaarInput(profile.aadhaarNumber);
    setErrorMsg('');
  };

  // Submit Aadhaar -> Trigger e-KYC OTP
  const handleRequestAadhaarOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const rawDigits = aadhaarInput.replace(/\s+/g, '');
    if (rawDigits.length !== 12) {
      setErrorMsg('Please enter a valid 12-digit Aadhaar Number');
      return;
    }

    setIsLoading(true);
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setSimulatedOtp(code);

    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 600);
  };

  // 1-Click DigiLocker Verification
  const handleDigiLockerDirectVerify = (idx = selectedDemoIndex) => {
    setIsLoading(true);
    setTimeout(() => {
      verifyPatientWithDigiLocker(idx);
      setIsLoading(false);
      setStep('success');
      setTimeout(() => {
        onVerificationComplete();
      }, 1200);
    }, 700);
  };

  // Verify OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (otpValue === simulatedOtp || otpValue === '123456' || otpValue.length === 6) {
        verifyPatientWithAadhaar(aadhaarInput, selectedDemoIndex);
        setStep('success');
        setTimeout(() => {
          onVerificationComplete();
        }, 1200);
      } else {
        setErrorMsg('Invalid e-KYC OTP. Please enter the 6-digit code or click Auto-Fill.');
      }
    }, 500);
  };

  return (
    <div id="aadhaar-verification-container" className="w-full max-w-lg mx-auto relative z-10 animate-in fade-in zoom-in-95 duration-300">
      
      {/* Brand Header */}
      <div className="text-center pt-2 pb-3">
        <SwasthaLogo size="md" showSubtitle={false} />
      </div>

      <div className="rounded-3xl bg-white/90 border border-purple-200/90 p-5 sm:p-7 backdrop-blur-xl shadow-xl shadow-purple-950/5 relative overflow-hidden">
        
        {/* Navigation & Title */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-purple-700 font-medium px-2 py-1 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portal</span>
          </button>
          
          <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Govt. e-KYC Gateway</span>
          </div>
        </div>

        {step === 'input' && (
          <div>
            <div className="text-center mb-5">
              <div className="w-12 h-12 mx-auto mb-2 rounded-2xl bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600 p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
                Patient Identity Verification
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-sm mx-auto">
                Verify via <strong>Aadhaar</strong> or <strong>DigiLocker</strong> to automatically fetch demographic details, address, age & sex.
              </p>
            </div>

            {/* DigiLocker 1-Click Fast Track Option */}
            <div className="mb-5 p-3.5 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-indigo-200/80">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
                    DL
                  </div>
                  <div>
                    <div className="text-xs font-black text-indigo-950 flex items-center gap-1.5">
                      <span>DigiLocker Instant Fetch</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-200 text-indigo-800 font-bold">Recommended</span>
                    </div>
                    <div className="text-[11px] text-indigo-700 font-medium">1-Click verified health demographic card</div>
                  </div>
                </div>
                <button
                  type="button"
                  id="digilocker-instant-fetch-btn"
                  disabled={isLoading}
                  onClick={() => handleDigiLockerDirectVerify(selectedDemoIndex)}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-transform hover:scale-105 shadow-sm shrink-0 cursor-pointer"
                >
                  {isLoading ? 'Fetching...' : 'Verify Now'}
                </button>
              </div>
            </div>

            {/* Quick Demo Pre-filled Aadhaar Profiles */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700">Select Demo Aadhaar Profile:</span>
                <span className="text-[10px] text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded-md">Instant e-KYC Test</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {INITIAL_DEMO_PATIENTS.map((p, idx) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelectDemoProfile(idx)}
                    className={`p-2.5 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedDemoIndex === idx
                        ? 'border-purple-600 bg-purple-50/80 shadow-xs'
                        : 'border-slate-200 hover:border-purple-300 bg-slate-50'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900 truncate">{p.name.split(' ')[0]} {p.name.split(' ')[1] || ''}</div>
                    <div className="text-[10px] text-slate-500">{p.age} yrs • {p.gender}</div>
                    <div className="text-[10px] font-mono text-purple-700 font-bold">{p.city}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Aadhaar Manual Number Input Form */}
            <form onSubmit={handleRequestAadhaarOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-900/80 mb-1.5">
                  12-Digit Aadhaar Card Number (आधार नंबर)
                </label>
                <div className="relative flex items-center rounded-2xl bg-slate-50 border-2 border-purple-100 focus-within:border-purple-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-purple-500/10 transition-all p-1">
                  <div className="px-3 text-slate-400 font-bold text-xs shrink-0">
                    UIDAI
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="XXXX XXXX XXXX"
                    value={aadhaarInput}
                    onChange={handleAadhaarChange}
                    maxLength={14}
                    className="w-full bg-transparent px-2 py-2 text-base sm:text-lg font-mono font-bold text-slate-900 tracking-wider focus:outline-none"
                  />
                  {aadhaarInput.replace(/\s+/g, '').length === 12 && (
                    <div className="pr-3 text-emerald-600">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  )}
                </div>
                {errorMsg && <p className="text-xs text-rose-600 font-semibold mt-1.5">{errorMsg}</p>}
              </div>

              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
                <strong>e-KYC Consent:</strong> By proceeding, your address, age, sex, and name will be securely auto-extracted from Aadhaar / DigiLocker for OPD appointment token allocation.
              </div>

              <button
                type="submit"
                id="aadhaar-get-otp-btn"
                disabled={isLoading || aadhaarInput.replace(/\s+/g, '').length !== 12}
                className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 text-white transition-all shadow-md cursor-pointer ${
                  aadhaarInput.replace(/\s+/g, '').length === 12
                    ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 shadow-purple-600/25 hover:scale-[1.01]'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Connecting UIDAI e-KYC...</span>
                  </div>
                ) : (
                  <>
                    <span>Proceed to e-KYC Verification</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Step 2: e-KYC OTP screen */}
        {step === 'otp' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-800">UIDAI e-KYC OTP</h3>
              <p className="text-xs text-slate-600 mt-1">
                Enter 6-digit Aadhaar security OTP sent to linked mobile
              </p>
              <div className="inline-block mt-1 px-3 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-mono font-bold">
                Aadhaar: {aadhaarInput}
              </div>
            </div>

            {/* Instant Demo OTP helper */}
            <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase text-purple-900">UIDAI e-KYC Security Code</div>
                <div className="text-lg font-mono font-black text-purple-700 tracking-widest">{simulatedOtp}</div>
              </div>
              <button
                type="button"
                onClick={() => setOtpValue(simulatedOtp)}
                className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all"
              >
                Auto-Fill
              </button>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <input
                type="text"
                maxLength={6}
                placeholder="Enter 6-Digit OTP"
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ''))}
                className="w-full py-3 px-4 rounded-2xl bg-slate-50 border-2 border-purple-200 text-center font-mono text-2xl tracking-widest text-slate-900 focus:outline-none focus:border-purple-600 focus:bg-white"
                autoFocus
              />

              {errorMsg && <p className="text-xs text-rose-600 text-center font-semibold">{errorMsg}</p>}

              <button
                type="submit"
                disabled={isLoading || otpValue.length < 6}
                className="w-full py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 shadow-md shadow-purple-600/20 cursor-pointer"
              >
                {isLoading ? 'Verifying with UIDAI...' : 'Verify & Extract Patient Data'}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep('input')}
                  className="text-xs text-slate-500 hover:text-purple-700 font-medium"
                >
                  Change Aadhaar Number
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Success Extraction Animation */}
        {step === 'success' && (
          <div className="py-6 text-center space-y-3 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center text-emerald-600 animate-bounce">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-xl font-black text-slate-900">Demographic Data Extracted!</h3>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              Aadhaar & DigiLocker verification successful. Opening Patient Dashboard...
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Address, Age & Gender Linked to ABHA</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
