import React, { useState } from 'react';
import { ShieldCheck, Lock, Users, Server, Activity, ArrowLeft, Key, Stethoscope, Building2, CheckCircle2 } from 'lucide-react';

interface AdminPortalModalProps {
  onClose: () => void;
  selectedLanguageId: string;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ onClose }) => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleAdminVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '9999' || pin === '1234' || pin.length === 4) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Please enter 4-digit administrator PIN (Default: 9999 or 1234)');
    }
  };

  return (
    <div id="admin-portal-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl bg-white border border-purple-200 p-6 sm:p-7 shadow-2xl relative overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-purple-800 transition-colors px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-purple-50 font-semibold cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portal</span>
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold border border-purple-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Clearance</span>
          </div>
        </div>

        {!isAuthenticated ? (
          <div className="text-center max-w-sm mx-auto py-2">
            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-1">Admin Security Authentication</h3>
            <p className="text-xs text-slate-600 mb-5">Enter PIN to access hospital & system administration (PIN: <span className="font-mono text-purple-700 font-bold">9999</span>)</p>

            <form onSubmit={handleAdminVerify} className="space-y-4">
              <div className="relative">
                <Key className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                <input
                  type="password"
                  maxLength={4}
                  placeholder="Enter 4-digit PIN (9999)"
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value.replace(/\D/g, ''));
                    setError('');
                  }}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border-2 border-purple-100 text-center font-mono text-xl tracking-widest text-slate-900 focus:outline-none focus:border-purple-600 focus:bg-white"
                  autoFocus
                />
              </div>

              {error && <p className="text-xs text-rose-600 font-semibold">{error}</p>}

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-white bg-purple-700 hover:bg-purple-800 transition-all cursor-pointer shadow-md shadow-purple-700/20"
              >
                Authenticate Admin Access
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Hospital Administration Desk</h3>
                <p className="text-xs text-emerald-700 font-medium">Clearance Verified • Telemetry Connected</p>
              </div>
            </div>

            {/* Admin Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold mb-1">
                  <Users className="w-3.5 h-3.5 text-purple-600" /> Active Patients
                </div>
                <div className="text-xl font-black text-slate-900">1,48,290</div>
                <div className="text-[10px] text-emerald-600 font-semibold">+14% this month</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold mb-1">
                  <Server className="w-3.5 h-3.5 text-indigo-600" /> System Uptime
                </div>
                <div className="text-xl font-black text-emerald-700">99.98%</div>
                <div className="text-[10px] text-slate-500">Cloud Health Node</div>
              </div>
            </div>

            {/* Operations */}
            <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-2">
              <div className="text-xs font-bold text-purple-950">Administrative Actions</div>
              <div className="flex flex-wrap gap-2 text-xs">
                <button 
                  onClick={() => alert('Exporting Health Audit Logs...')}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-purple-100 text-slate-700 border border-slate-200 font-semibold cursor-pointer"
                >
                  Export Audit Logs
                </button>
                <button 
                  onClick={() => alert('Language packs synced')}
                  className="px-3 py-1.5 rounded-lg bg-purple-700 text-white font-semibold cursor-pointer"
                >
                  Sync Language Registry
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
