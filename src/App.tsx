/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ScreenStep } from './types';
import { HealthAppProvider, useHealthApp } from './context/HealthAppContext';
import { SwasthaBackground } from './components/SwasthaBackground';
import { HeaderBar } from './components/HeaderBar';
import { MobileLoginScreen } from './components/MobileLoginScreen';
import { OtpVerificationScreen } from './components/OtpVerificationScreen';
import { LanguageSelectionScreen } from './components/LanguageSelectionScreen';
import { HomeScreen } from './components/HomeScreen';
import { AadhaarDigiLockerVerification } from './components/AadhaarDigiLockerVerification';
import { PatientInfoDashboard } from './components/PatientInfoDashboard';
import { AdminDoctorsControlPortal } from './components/AdminDoctorsControlPortal';
import { Palette, Image as ImageIcon, RefreshCw, Smartphone, Wifi, Battery, Signal } from 'lucide-react';

function AppContent() {
  const [currentStep, setCurrentStep] = useState<ScreenStep>('login');
  const [mobileNumber, setMobileNumber] = useState<string>('9876543210');
  const [generatedOtp, setGeneratedOtp] = useState<string>('482910');
  const [selectedLanguageId, setSelectedLanguageId] = useState<string>('hi');
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [customBgUrl, setCustomBgUrl] = useState<string | null>(null);
  const [isMobileFrameMode, setIsMobileFrameMode] = useState<boolean>(false);
  const [showBgDrawer, setShowBgDrawer] = useState<boolean>(false);

  const { isPatientVerified } = useHealthApp();

  // Handlers for step navigation
  const handleConfirmMobile = (mobile: string, otp: string) => {
    setMobileNumber(mobile);
    setGeneratedOtp(otp);
    setCurrentStep('otp');
  };

  const handleOtpVerified = () => {
    setIsVerified(true);
    setCurrentStep('language');
  };

  const handleLanguageSelected = (langId: string) => {
    setSelectedLanguageId(langId);
  };

  const handleLanguageConfirmed = () => {
    setCurrentStep('home');
  };

  const handleOpenMyLogin = () => {
    if (isPatientVerified) {
      setCurrentStep('patient-dashboard');
    } else {
      setCurrentStep('my-login-verification');
    }
  };

  const handleOpenAdminLogin = () => {
    setCurrentStep('admin-doctors-portal');
  };

  const handleAadhaarVerificationComplete = () => {
    setCurrentStep('patient-dashboard');
  };

  const handleLogout = () => {
    setIsVerified(false);
    setCurrentStep('login');
  };

  const handleResendOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    return newOtp;
  };

  const handleCustomFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomBgUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <SwasthaBackground customBgUrl={customBgUrl}>
      <div id="app-root-container" className="min-h-screen w-full flex flex-col justify-between text-slate-800 font-sans">
        
        {/* Top Header & Navigation Bar */}
        <HeaderBar
          currentStep={currentStep}
          selectedLanguageId={selectedLanguageId}
          mobileNumber={mobileNumber}
          isVerified={isVerified}
          isMobileFrameMode={isMobileFrameMode}
          onToggleMobileFrame={() => setIsMobileFrameMode(!isMobileFrameMode)}
          onNavigateToLanguage={() => setCurrentStep('language')}
          onLogout={handleLogout}
        />

        {/* Main Step Content Stage (Fluid responsive or Phone Frame) */}
        <main className="flex-1 flex items-center justify-center p-3 sm:p-5 md:p-6 z-10 w-full">
          <div
            className={`w-full transition-all duration-300 ${
              isMobileFrameMode
                ? 'max-w-[420px] rounded-[44px] bg-white/95 border-[10px] border-slate-800 shadow-2xl overflow-hidden min-h-[780px] max-h-[88vh] overflow-y-auto flex flex-col justify-between relative custom-scrollbar'
                : 'max-w-4xl'
            }`}
          >
            {/* If Mobile Phone chassis view is active, render phone status notch */}
            {isMobileFrameMode && (
              <div className="w-full pt-3 px-6 pb-2 flex items-center justify-between text-[11px] font-bold text-slate-800 select-none bg-white/70 backdrop-blur-sm border-b border-slate-100 sticky top-0 z-40">
                <span>9:41</span>
                {/* Dynamic island pill */}
                <div className="w-20 h-4 bg-slate-900 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-slate-800 ml-auto mr-2" />
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Signal className="w-3 h-3" />
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-4 h-4" />
                </div>
              </div>
            )}

            {/* Content Body */}
            <div className={`w-full ${isMobileFrameMode ? 'p-3 sm:p-4 flex-1' : ''}`}>
              <AnimatePresence mode="wait">
                {currentStep === 'login' && (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="w-full"
                  >
                    <MobileLoginScreen
                      selectedLanguageId={selectedLanguageId}
                      initialMobile={mobileNumber}
                      onConfirmMobile={handleConfirmMobile}
                    />
                  </motion.div>
                )}

                {currentStep === 'otp' && (
                  <motion.div
                    key="otp"
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="w-full"
                  >
                    <OtpVerificationScreen
                      selectedLanguageId={selectedLanguageId}
                      mobileNumber={mobileNumber}
                      generatedOtp={generatedOtp}
                      onVerifySuccess={handleOtpVerified}
                      onChangeNumber={() => setCurrentStep('login')}
                      onResendOtp={handleResendOtp}
                    />
                  </motion.div>
                )}

                {currentStep === 'language' && (
                  <motion.div
                    key="language"
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="w-full"
                  >
                    <LanguageSelectionScreen
                      selectedLanguageId={selectedLanguageId}
                      onSelectLanguage={handleLanguageSelected}
                      onConfirmLanguage={handleLanguageConfirmed}
                    />
                  </motion.div>
                )}

                {currentStep === 'home' && (
                  <motion.div
                    key="home"
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="w-full"
                  >
                    <HomeScreen
                      selectedLanguageId={selectedLanguageId}
                      mobileNumber={mobileNumber}
                      onNavigateToLanguage={() => setCurrentStep('language')}
                      onOpenMyLogin={handleOpenMyLogin}
                      onOpenAdminLogin={handleOpenAdminLogin}
                    />
                  </motion.div>
                )}

                {currentStep === 'my-login-verification' && (
                  <motion.div
                    key="verification"
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="w-full"
                  >
                    <AadhaarDigiLockerVerification
                      selectedLanguageId={selectedLanguageId}
                      mobileNumber={mobileNumber}
                      onVerificationComplete={handleAadhaarVerificationComplete}
                      onBack={() => setCurrentStep('home')}
                    />
                  </motion.div>
                )}

                {currentStep === 'patient-dashboard' && (
                  <motion.div
                    key="patient-dashboard"
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="w-full"
                  >
                    <PatientInfoDashboard
                      selectedLanguageId={selectedLanguageId}
                      onBackToHome={() => setCurrentStep('home')}
                    />
                  </motion.div>
                )}

                {currentStep === 'admin-doctors-portal' && (
                  <motion.div
                    key="admin-portal"
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="w-full"
                  >
                    <AdminDoctorsControlPortal
                      selectedLanguageId={selectedLanguageId}
                      onBackToHome={() => setCurrentStep('home')}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Phone bottom home indicator line if in chassis mode */}
            {isMobileFrameMode && (
              <div className="w-full py-2 flex justify-center bg-white/50 sticky bottom-0">
                <div className="w-32 h-1 bg-slate-400 rounded-full" />
              </div>
            )}
          </div>
        </main>

        {/* Subtle Footer info */}
        <footer className="relative z-10 py-2.5 px-4 text-center text-xs text-slate-500 font-medium select-none backdrop-blur-sm bg-white/40 border-t border-purple-100/70">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5">
            <span>Swastha Seva Setu • Your Digital Bridge to Health</span>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
              <span>Aadhaar e-KYC • Doctors OPD Schedule Control • Live Queue Tracker</span>
            </div>
          </div>
        </footer>

        {/* Floating Wallpaper Customizer Tool */}
        <div className="fixed bottom-3 right-3 z-40">
          <button
            id="toggle-bg-drawer-btn"
            onClick={() => setShowBgDrawer(!showBgDrawer)}
            title="Wallpaper Settings"
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/90 hover:bg-white text-purple-800 border border-purple-200 shadow-md text-xs font-bold transition-all hover:scale-105 cursor-pointer backdrop-blur-md"
          >
            <Palette className="w-3.5 h-3.5 text-purple-600" />
            <span className="hidden sm:inline">Background</span>
          </button>
        </div>

        {/* Wallpaper Drawer */}
        {showBgDrawer && (
          <div className="fixed bottom-14 right-3 w-72 rounded-2xl bg-white border border-purple-200 p-4 shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <span className="font-bold text-slate-900">Background Settings</span>
              <button
                onClick={() => setShowBgDrawer(false)}
                className="text-slate-400 hover:text-slate-700 font-bold px-1.5 py-0.5 rounded bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-slate-500 text-[11px]">
                Default is set to the attached pastel template with suspension bridge art. You can also upload a custom image.
              </p>

              <label className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold border border-purple-200 cursor-pointer transition-colors">
                <ImageIcon className="w-4 h-4" />
                <span>Upload Custom Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCustomFileUpload}
                  className="hidden"
                />
              </label>

              {customBgUrl && (
                <button
                  onClick={() => setCustomBgUrl(null)}
                  className="w-full flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset to Template Background</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </SwasthaBackground>
  );
}

export default function App() {
  return (
    <HealthAppProvider>
      <AppContent />
    </HealthAppProvider>
  );
}
