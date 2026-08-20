import React, { useState } from 'react';
import {
  ShieldCheck,
  Building2,
  Stethoscope,
  Clock,
  User,
  Users,
  Calendar,
  Lock,
  Key,
  ArrowLeft,
  Search,
  CheckCircle2,
  AlertCircle,
  Play,
  Pause,
  Megaphone,
  Sparkles,
  Edit3,
  Save,
  Check,
  Activity,
  Plus
} from 'lucide-react';
import { useHealthApp } from '../context/HealthAppContext';
import { Doctor, Hospital } from '../types';
import { SwasthaLogo } from './SwasthaLogo';

interface AdminDoctorsControlPortalProps {
  onBackToHome: () => void;
  selectedLanguageId: string;
}

export const AdminDoctorsControlPortal: React.FC<AdminDoctorsControlPortalProps> = ({
  onBackToHome,
  selectedLanguageId
}) => {
  const {
    doctors,
    hospitals,
    appointments,
    updateDoctorSchedule,
    callNextToken,
    callSpecificToken,
    setDoctorStatus
  } = useHealthApp();

  // Authentication state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(true); // Pre-authenticated for seamless test, or PIN check
  const [pinInput, setPinInput] = useState<string>('9999');
  const [authError, setAuthError] = useState<string>('');

  // Active Admin View
  const [activeAdminTab, setActiveAdminTab] = useState<'doctors' | 'queue-controller' | 'appointments' | 'hospitals'>('doctors');
  
  // Selected Doctor for Editing Timings & Queue Control
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(doctors[0]?.id || 'doc-1');
  const [hospitalFilter, setHospitalFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Doctor OPD Timing Edit Form State
  const [isEditingSchedule, setIsEditingSchedule] = useState<boolean>(false);
  const [editMorningShift, setEditMorningShift] = useState<string>('09:00 AM - 01:00 PM');
  const [editEveningShift, setEditEveningShift] = useState<string>('04:00 PM - 06:30 PM');
  const [editAvgTime, setEditAvgTime] = useState<number>(12);
  const [editRoomNo, setEditRoomNo] = useState<string>('OPD Block A - Room 204');
  const [announcementText, setAnnouncementText] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const activeDoctor = doctors.find(d => d.id === selectedDoctorId) || doctors[0];

  // Initialize edit fields when doctor selection changes
  const handleSelectDoctor = (doc: Doctor) => {
    setSelectedDoctorId(doc.id);
    setEditMorningShift(doc.opdSchedule.morningShift);
    setEditEveningShift(doc.opdSchedule.eveningShift);
    setEditAvgTime(doc.opdSchedule.avgTimePerPatientMin);
    setEditRoomNo(doc.roomNo);
    setAnnouncementText(doc.announcement || '');
    setIsEditingSchedule(false);
  };

  // Filtered Doctors
  const filteredDoctors = doctors.filter(doc => {
    const matchesHosp = hospitalFilter === 'all' || doc.hospitalId === hospitalFilter;
    const matchesDept = departmentFilter === 'all' || doc.department === departmentFilter;
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.hospitalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesHosp && matchesDept && matchesSearch;
  });

  // Save timing allotment updates
  const handleSaveSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    updateDoctorSchedule(activeDoctor.id, {
      morningShift: editMorningShift,
      eveningShift: editEveningShift,
      avgTimePerPatientMin: editAvgTime,
      roomNo: editRoomNo,
      announcement: announcementText
    });
    setIsEditingSchedule(false);
    setStatusMessage('OPD timing allotments and room details updated successfully!');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  // Doctor calls next token
  const handleCallNext = () => {
    const nextNum = callNextToken(activeDoctor.id);
    setStatusMessage(`📢 Called Token #${nextNum} to ${activeDoctor.roomNo}. Synchronized with Patient Queue!`);
    setTimeout(() => setStatusMessage(''), 4000);
  };

  // Broadcast announcement
  const handleBroadcastAnnouncement = () => {
    updateDoctorSchedule(activeDoctor.id, {
      announcement: announcementText
    });
    setStatusMessage('Announcement broadcasted to all patients waiting in live queue!');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  // Quick PIN Auth Handler if logged out
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '9999' || pinInput === '1234' || pinInput.length === 4) {
      setIsAdminAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid Admin PIN. Use default 9999 or 1234.');
    }
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="w-full max-w-md mx-auto p-6 rounded-3xl bg-white/90 border border-purple-200 shadow-xl backdrop-blur-xl animate-in zoom-in-95 duration-200 text-center">
        <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
          <Lock className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-black text-slate-800">Admin Security Authentication</h2>
        <p className="text-xs text-slate-600 mb-5">Enter 4-digit PIN for Doctors & Hospital Timing Management</p>

        <form onSubmit={handleAdminLogin} className="space-y-4">
          <input
            type="password"
            maxLength={4}
            value={pinInput}
            onChange={e => setPinInput(e.target.value.replace(/\D/g, ''))}
            placeholder="PIN (9999)"
            className="w-full py-3 px-4 rounded-2xl bg-slate-50 border-2 border-purple-200 text-center font-mono text-2xl tracking-widest text-slate-900 focus:outline-none focus:border-purple-600"
          />
          {authError && <p className="text-xs text-rose-600 font-semibold">{authError}</p>}
          
          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl font-bold text-white bg-purple-700 hover:bg-purple-800 shadow-md transition-all cursor-pointer"
          >
            Access Doctors Control Desk
          </button>
        </form>
      </div>
    );
  }

  return (
    <div id="admin-doctors-control-portal" className="w-full max-w-5xl mx-auto relative z-10 animate-in fade-in zoom-in-95 duration-300 pb-10">
      
      {/* Brand Header */}
      <div className="text-center pt-1 pb-3">
        <SwasthaLogo size="sm" showSubtitle={false} />
      </div>

      {/* Top Header Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 mb-4 rounded-3xl bg-white/90 border border-purple-200 backdrop-blur-xl shadow-md">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-purple-800 font-bold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-purple-50 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Main Portals</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 font-bold border border-purple-200 text-xs flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
            <span>Doctors & Hospital Control Desk</span>
          </div>
          <span className="text-xs font-mono text-slate-500 hidden sm:inline">Admin Clearance Active</span>
        </div>
      </div>

      {/* Status Banner notification */}
      {statusMessage && (
        <div className="p-3.5 mb-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2 shadow-sm animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/80 border border-purple-200 backdrop-blur-md mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveAdminTab('doctors')}
          className={`flex-1 min-w-[170px] py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeAdminTab === 'doctors'
              ? 'bg-purple-700 text-white shadow-md shadow-purple-700/20'
              : 'text-slate-700 hover:bg-purple-50'
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          <span>Doctors & Timing Allotment</span>
        </button>

        <button
          id="tab-queue-controller"
          onClick={() => setActiveAdminTab('queue-controller')}
          className={`flex-1 min-w-[170px] py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeAdminTab === 'queue-controller'
              ? 'bg-purple-700 text-white shadow-md shadow-purple-700/20'
              : 'text-slate-700 hover:bg-purple-50'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Live OPD Queue Controller</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('appointments')}
          className={`flex-1 min-w-[150px] py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeAdminTab === 'appointments'
              ? 'bg-purple-700 text-white shadow-md shadow-purple-700/20'
              : 'text-slate-700 hover:bg-purple-50'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Bookings Registry ({appointments.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('hospitals')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeAdminTab === 'hospitals'
              ? 'bg-purple-700 text-white shadow-md shadow-purple-700/20'
              : 'text-slate-700 hover:bg-purple-50'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Associated Hospitals ({hospitals.length})</span>
        </button>
      </div>

      {/* TAB 1: DOCTORS INFORMATION & TIMING ALLOTMENT CONTROLS */}
      {activeAdminTab === 'doctors' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 animate-in fade-in duration-200">
          
          {/* Left Column: Doctor Directory with Hospital Filter */}
          <div className="lg:col-span-5 space-y-3">
            <div className="rounded-3xl bg-white/90 border border-purple-200 p-4 backdrop-blur-xl shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                  <Stethoscope className="w-4 h-4 text-purple-700" />
                  <span>Doctors Roster ({filteredDoctors.length})</span>
                </h3>
              </div>

              {/* Hospital Filter Select */}
              <div className="space-y-2 mb-3">
                <select
                  value={hospitalFilter}
                  onChange={e => setHospitalFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-purple-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-purple-600"
                >
                  <option value="all">All Associated Hospitals</option>
                  {hospitals.map(h => (
                    <option key={h.id} value={h.id}>
                      {h.name} ({h.city})
                    </option>
                  ))}
                </select>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search doctor or specialty..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-purple-600"
                  />
                </div>
              </div>

              {/* List of Doctors */}
              <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1 custom-scrollbar">
                {filteredDoctors.map(doc => {
                  const isSelected = selectedDoctorId === doc.id;
                  return (
                    <div
                      key={doc.id}
                      onClick={() => handleSelectDoctor(doc)}
                      className={`p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-purple-600 bg-purple-50/90 shadow-sm'
                          : 'border-slate-200 hover:border-purple-300 bg-white/70'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <img
                          src={doc.avatarUrl}
                          alt={doc.name}
                          className="w-11 h-11 rounded-xl object-cover border border-purple-200 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold text-slate-900 truncate">{doc.name}</h4>
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                              {doc.status.split(' ')[0]}
                            </span>
                          </div>
                          <div className="text-[11px] text-purple-700 font-semibold truncate">{doc.specialty}</div>
                          <div className="text-[10px] text-slate-500 truncate">{doc.hospitalName}</div>
                          <div className="flex items-center justify-between text-[10px] text-slate-600 mt-1">
                            <span>{doc.roomNo}</span>
                            <span className="font-bold text-purple-800">Token #{doc.currentToken} / {doc.totalTokensToday}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Selected Doctor's Detailed Timing Allotment & OPD Control */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-3xl bg-white/95 border-2 border-purple-200 p-5 sm:p-6 backdrop-blur-xl shadow-xl">
              
              {/* Doctor Profile Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3.5">
                  <img
                    src={activeDoctor.avatarUrl}
                    alt={activeDoctor.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-300 shadow-md"
                  />
                  <div>
                    <h3 className="text-lg font-black text-slate-900">{activeDoctor.name}</h3>
                    <div className="text-xs text-purple-700 font-bold">{activeDoctor.specialty}</div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      {activeDoctor.qualification} • {activeDoctor.experienceYears} Years Exp.
                    </div>
                    <div className="text-xs font-bold text-slate-700 mt-0.5 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-purple-600" />
                      <span>{activeDoctor.hospitalName}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right sm:border-l sm:pl-4 border-slate-100">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Live Status</div>
                  <div className="inline-block mt-0.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                    {activeDoctor.status}
                  </div>
                  <div className="text-[11px] text-purple-800 font-bold mt-1">
                    Room: {activeDoctor.roomNo}
                  </div>
                </div>
              </div>

              {/* DOCTOR TIMING ALLOTMENT CONTROLS */}
              <div className="my-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-purple-700" />
                      <span>OPD Timing Allotment & Schedule Controls</span>
                    </h4>
                    <p className="text-xs text-slate-500">
                      Configure patient consultation timing slots and duration
                    </p>
                  </div>

                  {!isEditingSchedule ? (
                    <button
                      onClick={() => setIsEditingSchedule(true)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold text-xs border border-purple-200 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Timings</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditingSchedule(false)}
                      className="text-xs text-slate-500 hover:text-slate-700 font-bold"
                    >
                      Cancel
                    </button>
                  )}
                </div>

                {!isEditingSchedule ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-purple-50/60 border border-purple-200">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-500">Morning Shift OPD</div>
                      <div className="text-sm font-black text-slate-900">{activeDoctor.opdSchedule.morningShift}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-500">Evening Shift OPD</div>
                      <div className="text-sm font-black text-slate-900">{activeDoctor.opdSchedule.eveningShift}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-500">Consultation Pace</div>
                      <div className="text-sm font-black text-purple-800">{activeDoctor.opdSchedule.avgTimePerPatientMin} mins / patient</div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSaveSchedule} className="p-4 rounded-2xl bg-purple-50/80 border border-purple-300 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Morning Shift Hours</label>
                        <input
                          type="text"
                          value={editMorningShift}
                          onChange={e => setEditMorningShift(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-purple-200 text-xs font-bold text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Evening Shift Hours</label>
                        <input
                          type="text"
                          value={editEveningShift}
                          onChange={e => setEditEveningShift(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-purple-200 text-xs font-bold text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Avg. Consultation Time (Minutes)</label>
                        <input
                          type="number"
                          min={5}
                          max={60}
                          value={editAvgTime}
                          onChange={e => setEditAvgTime(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-purple-200 text-xs font-bold text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Assigned OPD Room</label>
                        <input
                          type="text"
                          value={editRoomNo}
                          onChange={e => setEditRoomNo(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-purple-200 text-xs font-bold text-slate-900"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Timing Allotments</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Status Toggles (In OPD / Short Break / Emergency Round) */}
              <div className="mb-5">
                <div className="text-xs font-bold text-slate-700 mb-2">Doctor Duty Status Control:</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { status: 'In OPD Active' as const, label: 'Active in OPD', color: 'bg-emerald-600' },
                    { status: 'On Short Break' as const, label: '10m Break', color: 'bg-amber-600' },
                    { status: 'Emergency Round' as const, label: 'ICU Emergency', color: 'bg-rose-600' },
                    { status: 'Off Duty' as const, label: 'Off Duty', color: 'bg-slate-600' }
                  ].map(item => (
                    <button
                      key={item.status}
                      type="button"
                      onClick={() => setDoctorStatus(activeDoctor.id, item.status)}
                      className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        activeDoctor.status === item.status
                          ? `${item.color} text-white shadow-md scale-105`
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Doctor's Live Patient Queue Action Desk */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-purple-300">Live OPD Queue Controller</div>
                    <div className="text-base font-black">
                      Current Token Calling: <span className="text-emerald-400 font-mono text-xl">#{activeDoctor.currentToken}</span> of {activeDoctor.totalTokensToday} Booked
                    </div>
                  </div>

                  <button
                    onClick={handleCallNext}
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-emerald-500/30 transition-transform hover:scale-105 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Call Next Token (#{activeDoctor.currentToken + 1})</span>
                  </button>
                </div>

                {/* Announcement input */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
                  <input
                    type="text"
                    placeholder="Broadcast live message to waiting queue (e.g., Doctor on 10 min round)..."
                    value={announcementText}
                    onChange={e => setAnnouncementText(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder:text-purple-200 focus:outline-none focus:bg-white/20"
                  />
                  <button
                    onClick={handleBroadcastAnnouncement}
                    className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    <Megaphone className="w-3.5 h-3.5" />
                    <span>Broadcast</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* TAB 2: LIVE OPD QUEUE CONTROLLER GRID (ALL DOCTORS) */}
      {activeAdminTab === 'queue-controller' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="rounded-3xl bg-white/90 border border-purple-200 p-5 sm:p-6 backdrop-blur-xl shadow-lg">
            <h3 className="text-lg font-black text-slate-900 mb-1 flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-700" />
              <span>Multi-Doctor Live OPD Queue Command Center</span>
            </h3>
            <p className="text-xs text-slate-600 mb-5">
              Live token callers and patient flow synchronization across all hospital departments
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {doctors.map(doc => (
                <div
                  key={doc.id}
                  className="p-4 rounded-2xl bg-slate-50 border-2 border-purple-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                        {doc.roomNo}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {doc.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">{doc.name}</h4>
                    <div className="text-xs text-purple-700 font-semibold">{doc.specialty}</div>
                    <div className="text-[11px] text-slate-500 truncate mb-3">{doc.hospitalName}</div>

                    <div className="p-3 rounded-xl bg-white border border-purple-100 flex items-center justify-between mb-3">
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase font-bold">Current Token</div>
                        <div className="text-2xl font-black font-mono text-purple-900">#{doc.currentToken}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-slate-500 uppercase font-bold">Total Booked</div>
                        <div className="text-xl font-bold font-mono text-slate-700">{doc.totalTokensToday} Patients</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => callNextToken(doc.id)}
                      className="flex-1 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Next (#{doc.currentToken + 1})</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDoctorId(doc.id);
                        setActiveAdminTab('doctors');
                      }}
                      className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-purple-100 text-slate-700 text-xs font-bold cursor-pointer"
                    >
                      Schedule
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BOOKINGS REGISTRY */}
      {activeAdminTab === 'appointments' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="rounded-3xl bg-white/90 border border-purple-200 p-5 sm:p-6 backdrop-blur-xl shadow-lg">
            <h3 className="text-lg font-black text-slate-900 mb-1 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-700" />
              <span>All Registered Patient Appointments ({appointments.length})</span>
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              Aadhaar-verified tokens across all departments and hospitals
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-purple-200 bg-purple-50/70 text-purple-950 font-bold">
                    <th className="p-3">Token #</th>
                    <th className="p-3">Patient Name / Aadhaar</th>
                    <th className="p-3">Hospital</th>
                    <th className="p-3">Doctor & Dept</th>
                    <th className="p-3">Date & Slot</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {appointments.map(apt => (
                    <tr key={apt.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-black text-purple-700 text-sm">#{apt.tokenNumber}</td>
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{apt.patientName}</div>
                        <div className="text-[10px] text-slate-500 font-mono">UIDAI: {apt.patientAadhaar}</div>
                      </td>
                      <td className="p-3 font-medium text-slate-700">{apt.hospitalName}</td>
                      <td className="p-3">
                        <div className="font-bold text-purple-800">{apt.doctorName}</div>
                        <div className="text-[10px] text-slate-500">{apt.department} • {apt.roomNo}</div>
                      </td>
                      <td className="p-3 font-medium text-slate-700">
                        <div>{apt.appointmentDate}</div>
                        <div className="text-[10px] text-slate-500">{apt.appointmentTime}</div>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-emerald-100 text-emerald-800">
                          {apt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ASSOCIATED HOSPITALS */}
      {activeAdminTab === 'hospitals' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="rounded-3xl bg-white/90 border border-purple-200 p-5 sm:p-6 backdrop-blur-xl shadow-lg">
            <h3 className="text-lg font-black text-slate-900 mb-1 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-purple-700" />
              <span>Associated Hospitals & Healthcare Nodes</span>
            </h3>
            <p className="text-xs text-slate-600 mb-5">
              Live hospital integration with Swastha Seva Setu
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {hospitals.map(hosp => (
                <div key={hosp.id} className="p-4 rounded-2xl bg-slate-50 border border-purple-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                        {hosp.type}
                      </span>
                      <span className="text-xs font-bold text-emerald-700">24x7 Emergency Active</span>
                    </div>

                    <h4 className="text-sm font-black text-slate-900 mb-1">{hosp.name}</h4>
                    <p className="text-xs text-slate-600 mb-2">{hosp.address}</p>
                    
                    <div className="text-xs text-purple-800 font-bold mb-2">
                      OPD Schedule: {hosp.opdTimingSummary}
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                      {hosp.departments.map(d => (
                        <span key={d} className="text-[10px] bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700 font-medium">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 text-xs font-bold text-purple-700 flex justify-between">
                    <span>Contact: {hosp.phone}</span>
                    <span>⭐ {hosp.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
