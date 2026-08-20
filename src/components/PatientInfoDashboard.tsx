import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Building2,
  Stethoscope,
  User,
  ShieldCheck,
  QrCode,
  ArrowRight,
  ArrowLeft,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Phone,
  Activity,
  FileText,
  Volume2,
  RefreshCw,
  Sparkles,
  ChevronRight,
  HeartPulse,
  Share2,
  Download
} from 'lucide-react';
import { useHealthApp } from '../context/HealthAppContext';
import { Hospital, Doctor, TimingSlot, Appointment } from '../types';
import { SwasthaLogo } from './SwasthaLogo';

interface PatientInfoDashboardProps {
  onBackToHome: () => void;
  selectedLanguageId: string;
}

export const PatientInfoDashboard: React.FC<PatientInfoDashboardProps> = ({
  onBackToHome,
  selectedLanguageId
}) => {
  const {
    currentPatient,
    hospitals,
    doctors,
    appointments,
    bookAppointment,
    cancelAppointment,
    availableDates
  } = useHealthApp();

  // Active view within patient workspace
  const [activeTab, setActiveTab] = useState<'overview' | 'booking' | 'queue' | 'records'>('overview');

  // Booking Flow State
  const [selectedHospitalId, setSelectedHospitalId] = useState<string>(hospitals[0]?.id || 'hosp-1');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('Cardiology');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('doc-1');
  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0]?.value || '');
  const [selectedSlot, setSelectedSlot] = useState<TimingSlot | null>(null);
  const [chiefComplaint, setChiefComplaint] = useState<string>('');
  const [hospitalSearchQuery, setHospitalSearchQuery] = useState<string>('');
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);
  const [showSlipModal, setShowSlipModal] = useState<boolean>(false);
  const [activeSlipAppointment, setActiveSlipAppointment] = useState<Appointment | null>(null);

  // Filters
  const [locationFilter, setLocationFilter] = useState<'all' | 'closest' | 'delhi' | 'lucknow' | 'kolkata' | 'mumbai'>('all');

  const patient = currentPatient;

  // Selected Hospital & Doctors
  const selectedHospital = hospitals.find(h => h.id === selectedHospitalId) || hospitals[0];
  
  // Available departments in chosen hospital
  const availableDepartments = selectedHospital?.departments || ['General Medicine', 'Cardiology'];

  // Filtered doctors based on selected hospital and department
  const filteredDoctors = doctors.filter(
    d => d.hospitalId === selectedHospitalId && (d.department === selectedDepartment || !selectedDepartment)
  );

  const activeDoctor = doctors.find(d => d.id === selectedDoctorId) || filteredDoctors[0] || doctors[0];

  // Timing slots for the active doctor on selected date
  const doctorSlots = (activeDoctor?.timingSlots && activeDoctor.timingSlots[selectedDate]) || [];

  // Filtered hospitals list
  const filteredHospitals = hospitals.filter(h => {
    const matchesSearch =
      h.name.toLowerCase().includes(hospitalSearchQuery.toLowerCase()) ||
      h.city.toLowerCase().includes(hospitalSearchQuery.toLowerCase()) ||
      h.location.toLowerCase().includes(hospitalSearchQuery.toLowerCase());
    
    if (locationFilter === 'closest') return matchesSearch && h.distanceKm <= 4.0;
    if (locationFilter === 'delhi') return matchesSearch && h.city === 'New Delhi';
    if (locationFilter === 'lucknow') return matchesSearch && h.city === 'Lucknow';
    if (locationFilter === 'kolkata') return matchesSearch && h.city === 'Kolkata';
    if (locationFilter === 'mumbai') return matchesSearch && h.city === 'Mumbai';
    return matchesSearch;
  });

  // Patient's active appointments
  const patientAppointments = appointments.filter(
    apt => apt.patientId === patient?.id || apt.patientAadhaar === patient?.aadhaarNumber
  );

  // Handle Hospital Selection
  const handleSelectHospital = (hosp: Hospital) => {
    setSelectedHospitalId(hosp.id);
    // Auto select first department in this hospital
    if (hosp.departments.length > 0) {
      setSelectedDepartment(hosp.departments[0]);
    }
    // Auto select first doctor in that department
    const matchingDoc = doctors.find(d => d.hospitalId === hosp.id);
    if (matchingDoc) {
      setSelectedDoctorId(matchingDoc.id);
    }
    setSelectedSlot(null);
  };

  // Handle Department Selection
  const handleSelectDepartment = (dept: string) => {
    setSelectedDepartment(dept);
    const matchingDoc = doctors.find(d => d.hospitalId === selectedHospitalId && d.department === dept);
    if (matchingDoc) {
      setSelectedDoctorId(matchingDoc.id);
    }
    setSelectedSlot(null);
  };

  // Handle Book Submit
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;

    const newApt = bookAppointment({
      hospitalId: selectedHospitalId,
      department: selectedDepartment,
      doctorId: selectedDoctorId,
      date: selectedDate,
      timeSlot: selectedSlot,
      chiefComplaint: chiefComplaint || 'General Health Consultation'
    });

    setConfirmedAppointment(newApt);
    setActiveSlipAppointment(newApt);
    setShowSlipModal(true);
    setActiveTab('queue');
  };

  // Play audio announcement simulation for queue
  const playQueueAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div id="patient-dashboard-container" className="w-full max-w-4xl mx-auto relative z-10 animate-in fade-in zoom-in-95 duration-300 pb-10">
      
      {/* Brand Header */}
      <div className="text-center pt-1 pb-3">
        <SwasthaLogo size="sm" showSubtitle={false} />
      </div>

      {/* Top Bar with Navigation & Patient Identifier */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 mb-4 rounded-3xl bg-white/90 border border-purple-200 backdrop-blur-xl shadow-md">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-purple-800 font-bold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-purple-50 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Main Portals</span>
        </button>

        <div className="flex items-center gap-2 text-xs">
          <div className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300 flex items-center gap-1.5 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Aadhaar & DigiLocker Verified</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 font-bold border border-purple-200">
            <User className="w-3.5 h-3.5" />
            <span>ABHA: {patient?.abhaId || '91-8472-1092-4411'}</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: Patient Aadhaar Verified Demographic Profile Card */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 text-white shadow-xl mb-5 relative overflow-hidden">
        {/* Subtle Decorative Badge */}
        <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
          <ShieldCheck className="w-48 h-48 text-white" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={patient?.photoUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'}
                alt={patient?.name || 'Patient'}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-purple-300 shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full shadow">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">{patient?.name || 'Ramesh Kumar Verma'}</h2>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 border border-emerald-400/40">
                  UIDAI e-KYC
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-purple-200">
                <span className="font-semibold text-white">Age: <strong>{patient?.age || 42} Yrs</strong></span>
                <span>•</span>
                <span className="font-semibold text-white">Sex: <strong>{patient?.gender || 'Male'}</strong></span>
                <span>•</span>
                <span>Blood Group: <strong className="text-amber-300">{patient?.bloodGroup || 'B+ Positive'}</strong></span>
              </div>

              <div className="flex items-center gap-1 text-[11px] text-purple-300 font-mono mt-1">
                <span>Aadhaar:</span>
                <strong className="text-white tracking-wider">{patient?.aadhaarNumber || '7842 9012 3456'}</strong>
              </div>
            </div>
          </div>

          {/* Extracted Address block */}
          <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-xs max-w-sm w-full md:w-auto">
            <div className="text-[10px] uppercase font-bold text-purple-300 flex items-center gap-1 mb-1">
              <MapPin className="w-3 h-3 text-pink-400" /> Auto-Extracted Address from Aadhaar:
            </div>
            <p className="text-slate-100 text-xs font-medium leading-tight">
              {patient?.address || 'Flat 402, Shanti Niketan Apts, Sector 12, RK Puram'}
            </p>
            <div className="text-[11px] text-purple-200 mt-1 font-semibold">
              {patient?.city || 'New Delhi'}, {patient?.state || 'Delhi'} - {patient?.pincode || '110022'}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs (Block Options Overview / Appointment Booking / Queue Tracking / Records) */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/80 border border-purple-200/90 backdrop-blur-md mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-purple-700 text-white shadow-md shadow-purple-700/20'
              : 'text-slate-700 hover:bg-purple-50'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Services Overview</span>
        </button>

        <button
          id="tab-book-appointment"
          onClick={() => setActiveTab('booking')}
          className={`flex-1 min-w-[160px] py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'booking'
              ? 'bg-purple-700 text-white shadow-md shadow-purple-700/20'
              : 'text-slate-700 hover:bg-purple-50'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Book Appointment</span>
        </button>

        <button
          id="tab-queue-tracking"
          onClick={() => setActiveTab('queue')}
          className={`flex-1 min-w-[160px] py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer relative ${
            activeTab === 'queue'
              ? 'bg-purple-700 text-white shadow-md shadow-purple-700/20'
              : 'text-slate-700 hover:bg-purple-50'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Live Queue Tracking</span>
          {patientAppointments.length > 0 && (
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping absolute top-2 right-3" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('records')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'records'
              ? 'bg-purple-700 text-white shadow-md shadow-purple-700/20'
              : 'text-slate-700 hover:bg-purple-50'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>ABHA Records</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW BLOCK FORMAT GRID */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 animate-in fade-in duration-200">
          
          {/* BLOCK A: Appointment Booking */}
          <div
            id="block-appointment-booking"
            onClick={() => setActiveTab('booking')}
            className="group rounded-3xl p-6 bg-white/90 hover:bg-white border-2 border-purple-200 hover:border-purple-600 backdrop-blur-xl shadow-lg hover:shadow-xl shadow-purple-950/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-500 p-0.5 shadow-md group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-purple-700">
                    <Calendar className="w-7 h-7 text-purple-700" />
                  </div>
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                  Govt. & Private OPD
                </span>
              </div>

              <h3 className="text-xl font-black text-slate-900 group-hover:text-purple-700 transition-colors mb-1">
                Appointment Booking
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium mb-4">
                Choose preferred hospital (by closest distance or location), select specialized health departments, doctors, and available timing slots.
              </p>

              <div className="flex flex-wrap gap-1.5 text-[11px] text-purple-800 font-semibold mb-2">
                <span className="px-2 py-0.5 rounded-md bg-purple-50 border border-purple-200">AIIMS / Civil Hospitals</span>
                <span className="px-2 py-0.5 rounded-md bg-purple-50 border border-purple-200">Specialist Doctors</span>
                <span className="px-2 py-0.5 rounded-md bg-purple-50 border border-purple-200">Zero Wait Token</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-700 group-hover:text-purple-900">
              <span>Book Doctor Slot Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* BLOCK B: Live Queue Tracking */}
          <div
            id="block-queue-tracking"
            onClick={() => setActiveTab('queue')}
            className="group rounded-3xl p-6 bg-white/90 hover:bg-white border-2 border-emerald-200 hover:border-emerald-500 backdrop-blur-xl shadow-lg hover:shadow-xl shadow-emerald-950/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 p-0.5 shadow-md group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-emerald-700">
                    <Clock className="w-7 h-7 text-emerald-600" />
                  </div>
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  Live Sync
                </span>
              </div>

              <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors mb-1">
                Live Queue Tracking
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium mb-4">
                Real-time tracking of current OPD token being attended by the doctor, estimated wait time, room instructions, and doctor timing updates.
              </p>

              {patientAppointments.length > 0 ? (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs mb-2">
                  <div className="flex items-center justify-between font-bold text-emerald-900">
                    <span>Active Token: #{patientAppointments[0].tokenNumber}</span>
                    <span className="text-[11px] text-emerald-700">{patientAppointments[0].doctorName.split(' ')[1]}</span>
                  </div>
                  <div className="text-[11px] text-emerald-700 mt-0.5">
                    {patientAppointments[0].hospitalName}
                  </div>
                </div>
              ) : (
                <div className="text-[11px] text-slate-500 italic mb-2">
                  No active tokens waiting. Book an appointment to track live queue.
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-900">
              <span>View OPD Queue Status</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* BLOCK C: My Health Records & ABHA */}
          <div
            onClick={() => setActiveTab('records')}
            className="group rounded-3xl p-6 bg-white/90 hover:bg-white border-2 border-indigo-200 hover:border-indigo-500 backdrop-blur-xl shadow-lg hover:shadow-xl shadow-indigo-950/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 p-0.5 shadow-md group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-indigo-600">
                    <FileText className="w-7 h-7 text-indigo-600" />
                  </div>
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                  Ayushman Linked
                </span>
              </div>

              <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-700 transition-colors mb-1">
                ABHA & DigiLocker Records
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium mb-3">
                Access your verified e-Aadhaar health profile, digital prescriptions, lab test reports, and vaccination history.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-700 group-hover:text-indigo-900">
              <span>Open Document Vault</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* BLOCK D: Emergency SOS & Helplines */}
          <div className="rounded-3xl p-6 bg-gradient-to-tr from-rose-50 to-pink-50 border-2 border-rose-200 backdrop-blur-xl shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-13 h-13 rounded-2xl bg-rose-600 p-0.5 shadow-md flex items-center justify-center">
                  <HeartPulse className="w-7 h-7 text-white" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-rose-200 text-rose-900 border border-rose-300">
                  24x7 Emergency
                </span>
              </div>

              <h3 className="text-xl font-black text-slate-900 mb-1">Emergency Hospital Help</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium mb-3">
                Instant connection to National Ambulance (108), Medical Helpline (102), and closest emergency triage centers.
              </p>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:108"
                  className="p-2.5 rounded-xl bg-white border border-rose-200 hover:bg-rose-100 flex items-center justify-center gap-1.5 text-xs font-bold text-rose-700 shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-rose-600" />
                  <span>Call 108 (Ambulance)</span>
                </a>
                <a
                  href="tel:102"
                  className="p-2.5 rounded-xl bg-white border border-rose-200 hover:bg-rose-100 flex items-center justify-center gap-1.5 text-xs font-bold text-rose-700 shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-rose-600" />
                  <span>Call 102 (Medical)</span>
                </a>
              </div>
            </div>

            <div className="pt-3 border-t border-rose-200/60 text-[11px] text-rose-700 font-semibold">
              Geo-located to: {patient?.city || 'Delhi / NCR'}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: APPOINTMENT BOOKING WORKFLOW */}
      {activeTab === 'booking' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* STEP 1: Choose Preferred Hospital */}
          <div className="rounded-3xl bg-white/90 border border-purple-200 p-5 sm:p-6 backdrop-blur-xl shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-purple-700" />
                  <span>1. Choose Hospital (अस्पताल चयन)</span>
                </h3>
                <p className="text-xs text-slate-600">
                  Select by closest location, city, or specific hospital network
                </p>
              </div>

              {/* Location filter chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
                {[
                  { key: 'all', label: 'All Hospitals' },
                  { key: 'closest', label: 'Closest (Near Me)' },
                  { key: 'delhi', label: 'Delhi' },
                  { key: 'lucknow', label: 'Lucknow' },
                  { key: 'kolkata', label: 'Kolkata' },
                  { key: 'mumbai', label: 'Mumbai' }
                ].map(chip => (
                  <button
                    key={chip.key}
                    type="button"
                    onClick={() => setLocationFilter(chip.key as any)}
                    className={`px-2.5 py-1 rounded-full font-bold whitespace-nowrap transition-all cursor-pointer ${
                      locationFilter === chip.key
                        ? 'bg-purple-700 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-purple-50'
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Hospital Search input */}
            <div className="relative mb-4">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search hospital name, area, or city..."
                value={hospitalSearchQuery}
                onChange={e => setHospitalSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-purple-100 text-xs sm:text-sm focus:outline-none focus:border-purple-600 focus:bg-white"
              />
            </div>

            {/* Hospital Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredHospitals.map(hosp => {
                const isSelected = selectedHospitalId === hosp.id;
                return (
                  <div
                    key={hosp.id}
                    onClick={() => handleSelectHospital(hosp)}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50/90 shadow-md scale-[1.01]'
                        : 'border-slate-200 hover:border-purple-300 bg-white/70 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 border border-purple-200">
                          {hosp.type.split(' ')[0]}
                        </span>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {hosp.distanceKm} km
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 line-clamp-2 mb-1">
                        {hosp.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 mb-2">
                        {hosp.location}, {hosp.city}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200/80 text-[11px] flex items-center justify-between font-medium">
                      <span className="text-purple-700 font-bold">{hosp.departments.length} Specialties</span>
                      <span className="text-slate-500">⭐ {hosp.rating}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 2: Choose Preferred Health Department */}
          <div className="rounded-3xl bg-white/90 border border-purple-200 p-5 sm:p-6 backdrop-blur-xl shadow-lg">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 mb-1">
              <Stethoscope className="w-5 h-5 text-purple-700" />
              <span>2. Select Health Department (स्वास्थ्य विभाग)</span>
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              Available departments in <strong>{selectedHospital.name}</strong>:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {availableDepartments.map(dept => {
                const isSelected = selectedDepartment === dept;
                return (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => handleSelectDepartment(dept)}
                    className={`p-3 rounded-2xl border-2 font-bold text-xs text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-purple-600 bg-purple-700 text-white shadow-md'
                        : 'border-slate-200 bg-slate-50 hover:bg-purple-50 text-slate-800'
                    }`}
                  >
                    <span>{dept}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-white shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3: Select Doctor & Timing Allotment */}
          <div className="rounded-3xl bg-white/90 border border-purple-200 p-5 sm:p-6 backdrop-blur-xl shadow-lg">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 mb-1">
              <User className="w-5 h-5 text-purple-700" />
              <span>3. Choose Doctor & Consultation Shift</span>
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              Doctors on duty for {selectedDepartment} at {selectedHospital.name}:
            </p>

            {filteredDoctors.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {filteredDoctors.map(doc => {
                  const isSelected = selectedDoctorId === doc.id;
                  return (
                    <div
                      key={doc.id}
                      onClick={() => {
                        setSelectedDoctorId(doc.id);
                        setSelectedSlot(null);
                      }}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${
                        isSelected
                          ? 'border-purple-600 bg-purple-50/90 shadow-md'
                          : 'border-slate-200 hover:border-purple-300 bg-white/70'
                      }`}
                    >
                      <img
                        src={doc.avatarUrl}
                        alt={doc.name}
                        className="w-14 h-14 rounded-2xl object-cover border border-purple-200 shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-900">{doc.name}</h4>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                            {doc.status}
                          </span>
                        </div>
                        <div className="text-xs text-purple-700 font-semibold">{doc.specialty}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{doc.qualification}</div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-600 font-medium mt-1">
                          <span>{doc.roomNo}</span>
                          <span>•</span>
                          <span className="text-emerald-700 font-bold">{doc.consultationFee}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs mb-4">
                No specific doctor profile mapped for this department. Default Chief OPD Consultant is allotted.
              </div>
            )}

            {/* Date Selection */}
            <div className="mb-4">
              <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                Select Appointment Date (तारीख):
              </label>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {availableDates.map(d => (
                  <button
                    key={d.value}
                    type="button"
                    onClick={() => {
                      setSelectedDate(d.value);
                      setSelectedSlot(null);
                    }}
                    className={`px-4 py-2.5 rounded-2xl font-bold text-xs whitespace-nowrap transition-all cursor-pointer text-center min-w-[90px] ${
                      selectedDate === d.value
                        ? 'bg-purple-700 text-white shadow-md shadow-purple-700/20 scale-105'
                        : 'bg-slate-100 text-slate-700 hover:bg-purple-50'
                    }`}
                  >
                    <div className="text-[10px] uppercase opacity-80">{d.sub}</div>
                    <div className="text-xs font-black">{d.display}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots Selection */}
            <div className="mb-5">
              <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                Available Timing Slots Allotted by Doctor ({activeDoctor?.name}):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {doctorSlots.map(slot => {
                  const isSelected = selectedSlot?.id === slot.id;
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={!slot.isAvailable}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-2.5 rounded-xl border-2 text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center ${
                        !slot.isAvailable
                          ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through'
                          : isSelected
                          ? 'border-purple-600 bg-purple-600 text-white shadow-md'
                          : 'border-purple-200 bg-purple-50/60 hover:bg-purple-100 text-slate-800'
                      }`}
                    >
                      <span>{slot.time}</span>
                      <span className={`text-[10px] ${isSelected ? 'text-purple-100' : 'text-slate-500'}`}>
                        {slot.shift} • {slot.maxCapacity - slot.bookedCount} left
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chief Health Complaint input */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Health Reason / Chief Symptom (वैकल्पिक लक्षण):
              </label>
              <input
                type="text"
                placeholder="e.g., Chest discomfort, BP checkup, Knee pain, Fever..."
                value={chiefComplaint}
                onChange={e => setChiefComplaint(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-purple-600 focus:bg-white"
              />
            </div>

            {/* Book Submit CTA */}
            <button
              type="button"
              id="confirm-appointment-booking-btn"
              disabled={!selectedSlot}
              onClick={handleConfirmBooking}
              className={`w-full py-4 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 text-white transition-all shadow-md cursor-pointer ${
                selectedSlot
                  ? 'bg-gradient-to-r from-purple-700 via-pink-600 to-amber-500 hover:from-purple-800 hover:to-amber-600 shadow-purple-600/30 hover:scale-[1.01]'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>
                {selectedSlot
                  ? `Confirm Booking: Token Allotment for ${selectedSlot.time}`
                  : 'Please Select a Timing Slot to Proceed'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* TAB 3: LIVE QUEUE TRACKING */}
      {activeTab === 'queue' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          
          {patientAppointments.length === 0 ? (
            <div className="text-center p-8 rounded-3xl bg-white/90 border border-purple-200 backdrop-blur-xl shadow-lg">
              <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800 mb-1">No Active OPD Appointments in Queue</h3>
              <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto">
                You haven't booked any OPD consultation token yet. Book an appointment to track live wait time and doctor status.
              </p>
              <button
                onClick={() => setActiveTab('booking')}
                className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition-all shadow-md"
              >
                Book OPD Appointment Now
              </button>
            </div>
          ) : (
            patientAppointments.map(apt => {
              const doc = doctors.find(d => d.id === apt.doctorId) || doctors[0];
              const queueDiff = apt.tokenNumber - doc.currentToken;
              const isTurnNow = queueDiff === 0;
              const isCompleted = apt.tokenNumber < doc.currentToken;
              const estWaitMinutes = Math.max(0, queueDiff * doc.opdSchedule.avgTimePerPatientMin);

              return (
                <div
                  key={apt.id}
                  id={`queue-card-${apt.id}`}
                  className="rounded-3xl bg-white/95 border-2 border-purple-200 p-5 sm:p-7 backdrop-blur-xl shadow-xl shadow-purple-950/5 relative overflow-hidden"
                >
                  {/* Top Status Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100 mb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-xs font-black uppercase tracking-wider text-purple-900">
                        Live OPD Queue Tracker
                      </span>
                      <span className="text-[11px] text-slate-400">• OPD Live Node</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setActiveSlipAppointment(apt);
                          setShowSlipModal(true);
                        }}
                        className="px-3 py-1 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold text-xs flex items-center gap-1 border border-purple-200 transition-colors cursor-pointer"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>View Token Slip</span>
                      </button>

                      <button
                        onClick={() =>
                          playQueueAudio(
                            `Live queue update for ${apt.patientName}. Your token is number ${apt.tokenNumber}. Currently token number ${doc.currentToken} is in consultation with ${doc.name} at ${doc.roomNo}. Estimated wait is approximately ${estWaitMinutes} minutes.`
                          )
                        }
                        title="Listen to queue announcement"
                        className="p-1.5 rounded-xl bg-slate-100 hover:bg-purple-100 text-slate-600 hover:text-purple-700 transition-colors"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Main Token Comparison Big Indicators */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    
                    {/* Block 1: Currently Calling Token */}
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white text-center flex flex-col justify-between shadow-md">
                      <div className="text-[10px] uppercase font-bold text-indigo-300">Doctor Calling Now</div>
                      <div className="my-2">
                        <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-emerald-400">
                          #{doc.currentToken}
                        </span>
                      </div>
                      <div className="text-[11px] text-indigo-200 font-semibold truncate">
                        {doc.roomNo}
                      </div>
                    </div>

                    {/* Block 2: Your Allotted Token */}
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-700 via-purple-600 to-pink-600 text-white text-center flex flex-col justify-between shadow-md">
                      <div className="text-[10px] uppercase font-bold text-purple-200">Your Allotted Token</div>
                      <div className="my-2">
                        <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white">
                          #{apt.tokenNumber}
                        </span>
                      </div>
                      <div className="text-[11px] text-purple-100 font-semibold">
                        {isTurnNow
                          ? '👉 Your Turn Now! Enter Room'
                          : isCompleted
                          ? 'Consultation Done'
                          : `${queueDiff} Patients Ahead of You`}
                      </div>
                    </div>

                    {/* Block 3: Estimated Wait Time */}
                    <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 text-amber-950 text-center flex flex-col justify-between shadow-sm">
                      <div className="text-[10px] uppercase font-bold text-amber-800">Estimated Wait Time</div>
                      <div className="my-2">
                        <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-amber-600">
                          {isTurnNow ? '0 Min' : isCompleted ? 'Done' : `~${estWaitMinutes} Min`}
                        </span>
                      </div>
                      <div className="text-[11px] text-amber-800 font-semibold">
                        Avg. {doc.opdSchedule.avgTimePerPatientMin} mins/patient
                      </div>
                    </div>

                  </div>

                  {/* Doctor's Live Advisory & Controls */}
                  <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 mb-4">
                    <div className="flex items-start gap-3">
                      <img
                        src={doc.avatarUrl}
                        alt={doc.name}
                        className="w-12 h-12 rounded-xl object-cover border border-purple-200 shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <h4 className="text-sm font-bold text-slate-900">{doc.name}</h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            {doc.status}
                          </span>
                        </div>
                        <div className="text-xs text-purple-700 font-semibold">{doc.specialty} • {apt.hospitalName}</div>
                        
                        {/* Live Announcement from Doctor */}
                        {doc.announcement && (
                          <div className="mt-2 text-xs bg-white p-2.5 rounded-xl border border-purple-100 text-slate-700 flex items-start gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                            <span>
                              <strong>Doctor's Live Desk:</strong> {doc.announcement}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Appointment Details Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <span>Date: <strong className="text-slate-800">{apt.appointmentDate}</strong></span>
                      <span>•</span>
                      <span>Slot: <strong className="text-slate-800">{apt.appointmentTime}</strong></span>
                    </div>

                    <button
                      onClick={() => cancelAppointment(apt.id)}
                      className="text-rose-600 hover:text-rose-800 font-semibold cursor-pointer"
                    >
                      Cancel Appointment
                    </button>
                  </div>
                </div>
              );
            })
          )}

        </div>
      )}

      {/* TAB 4: ABHA HEALTH RECORDS & DIGILOCKER */}
      {activeTab === 'records' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="rounded-3xl bg-white/90 border border-purple-200 p-5 sm:p-7 backdrop-blur-xl shadow-lg">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-indigo-600" />
                  <span>Ayushman Bharat Health Account (ABHA)</span>
                </h3>
                <p className="text-xs text-slate-600">
                  Govt. of India e-Health & DigiLocker Integrated Vault
                </p>
              </div>

              <div className="px-3 py-1 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-mono font-bold">
                ABHA: {patient?.abhaId || '91-8472-1092-4411'}
              </div>
            </div>

            {/* List of Verified Documents */}
            <div className="space-y-3">
              {[
                { title: 'Aadhaar Identity e-KYC Verification Certificate', issuer: 'UIDAI & Govt. of India', date: 'Verified Today', type: 'Identity' },
                { title: 'Digital OPD Consultation Slip - AIIMS Cardiology', issuer: 'Dr. Rajesh K. Sharma', date: 'Active Session', type: 'OPD Token' },
                { title: 'COVID-19 & Comprehensive Vaccine Certificate', issuer: 'CoWIN / MoHFW', date: 'Universal Dose 3', type: 'Vaccine' },
                { title: 'ECG & Blood Pressure Telemetry Record', issuer: 'Swastha Digital Setu', date: 'Synced via ABHA', type: 'Telemetry' }
              ].map((doc, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 hover:bg-purple-50/50 border border-slate-200 flex items-center justify-between gap-3 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{doc.title}</h4>
                      <div className="text-[11px] text-slate-500 font-medium">{doc.issuer} • {doc.date}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`Opening secure certificate: ${doc.title}`)}
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-indigo-600 hover:text-white border border-slate-200 text-xs font-bold text-indigo-700 transition-all cursor-pointer"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* APPOINTMENT DIGITAL TOKEN SLIP MODAL */}
      {showSlipModal && activeSlipAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl bg-white border-2 border-purple-200 p-6 shadow-2xl relative overflow-hidden">
            
            {/* Header */}
            <div className="text-center pb-3 border-b border-dashed border-slate-200">
              <SwasthaLogo size="sm" showSubtitle={false} />
              <h3 className="text-base font-black text-slate-900 mt-1">Digital OPD Token Slip</h3>
              <p className="text-[10px] text-slate-500">Ministry of Health & Family Welfare • Swastha Seva Setu</p>
            </div>

            {/* Token Number Highlight */}
            <div className="text-center my-4 py-3 rounded-2xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 text-white shadow-md">
              <div className="text-[10px] uppercase font-bold tracking-widest text-purple-200">Allotted OPD Token</div>
              <div className="text-5xl font-black font-mono my-1 tracking-tight">#{activeSlipAppointment.tokenNumber}</div>
              <div className="text-xs font-bold text-purple-100">{activeSlipAppointment.appointmentTime}</div>
            </div>

            {/* Patient & Doctor Specs */}
            <div className="space-y-2 text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-200 mb-4">
              <div className="flex justify-between">
                <span className="text-slate-500">Patient Name:</span>
                <span className="font-bold text-slate-900">{activeSlipAppointment.patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Age / Sex:</span>
                <span className="font-semibold text-slate-800">{activeSlipAppointment.patientAge} Yrs / {activeSlipAppointment.patientGender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Hospital:</span>
                <span className="font-bold text-slate-900 text-right max-w-[200px] truncate">{activeSlipAppointment.hospitalName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Doctor / Dept:</span>
                <span className="font-bold text-purple-700">{activeSlipAppointment.doctorName} ({activeSlipAppointment.department})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">OPD Room:</span>
                <span className="font-mono font-bold text-slate-900">{activeSlipAppointment.roomNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date:</span>
                <span className="font-semibold text-slate-800">{activeSlipAppointment.appointmentDate}</span>
              </div>
            </div>

            {/* QR Code Simulation */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-purple-50 border border-purple-200 mb-4">
              <div className="w-16 h-16 bg-white p-1 rounded-xl border border-purple-200 flex items-center justify-center">
                <QrCode className="w-14 h-14 text-purple-900" />
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Fast-Track OPD QR Token</div>
                <div className="text-xs font-mono font-bold text-purple-900">{activeSlipAppointment.qrCodeToken}</div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Scan at OPD Counter</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowSlipModal(false);
                  setActiveTab('queue');
                }}
                className="flex-1 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Track Live Queue
              </button>
              <button
                onClick={() => setShowSlipModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
