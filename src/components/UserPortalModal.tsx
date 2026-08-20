import React from 'react';
import { User, Phone, Globe, ShieldCheck, ArrowLeft, Clock, Bell, Settings, Heart, FileText, Calendar } from 'lucide-react';
import { INDIAN_LANGUAGES } from '../data/languages';

interface UserPortalModalProps {
  mobileNumber: string;
  selectedLanguageId: string;
  onClose: () => void;
  onNavigateToLanguage: () => void;
}

export const UserPortalModal: React.FC<UserPortalModalProps> = ({
  mobileNumber,
  selectedLanguageId,
  onClose,
  onNavigateToLanguage
}) => {
  const currentLang = INDIAN_LANGUAGES.find(l => l.id === selectedLanguageId) || INDIAN_LANGUAGES[0];

  return (
    <div id="user-portal-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl bg-white border border-pink-200 p-6 sm:p-7 shadow-2xl relative overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-pink-700 transition-colors px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-pink-50 font-semibold cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portal</span>
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Patient / User</span>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-gradient-to-r from-pink-50 via-purple-50 to-amber-50 border border-pink-200 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-600 via-rose-500 to-amber-500 p-0.5 shrink-0 flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-pink-600">
              <User className="w-7 h-7 text-pink-600" />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-1.5">
              <span>My Health Profile</span>
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-600">
              <span className="flex items-center gap-1 font-mono font-bold text-slate-800">
                <Phone className="w-3.5 h-3.5 text-emerald-600" /> +91 {mobileNumber}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-purple-700 font-bold">
                <Globe className="w-3.5 h-3.5" /> {currentLang.nativeName}
              </span>
            </div>
          </div>
        </div>

        {/* Quick User Services */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold mb-1">
              <Calendar className="w-3.5 h-3.5 text-pink-600" /> Appointments
            </div>
            <div className="text-sm font-bold text-slate-900">Dr. Sharma (Cardio)</div>
            <div className="text-[10px] text-emerald-600 font-semibold">Tomorrow, 10:30 AM</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold mb-1">
              <FileText className="w-3.5 h-3.5 text-purple-600" /> Records
            </div>
            <div className="text-sm font-bold text-slate-900">3 Lab Reports</div>
            <div className="text-[10px] text-purple-700 font-semibold">Digital Setu Synced</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={() => {
              onClose();
              onNavigateToLanguage();
            }}
            className="flex-1 py-2.5 px-4 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Globe className="w-4 h-4 text-purple-600" />
            <span>Change Language</span>
          </button>
          
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>Close</span>
          </button>
        </div>

      </div>
    </div>
  );
};
