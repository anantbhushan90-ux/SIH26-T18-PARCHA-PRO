export type ScreenStep =
  | 'login'
  | 'otp'
  | 'language'
  | 'home'
  | 'my-login-verification'
  | 'patient-dashboard'
  | 'admin-doctors-portal';

export interface BackgroundTheme {
  id: string;
  name: string;
  previewGradient: string;
  bgClass: string;
  accentColor: string;
  patternOpacity: number;
}

export type PortalView = 'home' | 'my-login-auth' | 'patient-dashboard' | 'admin-login' | 'admin-dashboard';

export interface LanguageItem {
  id: string;
  name: string;
  nativeName: string;
  greeting: string;
  script: string;
  region: string;
  speakers: string;
  speechCode?: string;
}

export interface PatientProfile {
  id: string;
  aadhaarNumber: string;
  isDigiLockerVerified: boolean;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  mobile: string;
  abhaId: string;
  bloodGroup: string;
  photoUrl?: string;
  verificationTimestamp?: string;
}

export interface Hospital {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  distanceKm: number;
  type: 'AIIMS / Apex' | 'District Civil Hospital' | 'Multi-Speciality Hospital' | 'Community Health Center (CHC)';
  departments: string[];
  rating: number;
  phone: string;
  address: string;
  emergencyAvailable: boolean;
  opdTimingSummary: string;
}

export interface TimingSlot {
  id: string;
  time: string;
  label: string; // e.g. "09:30 AM - 09:45 AM"
  shift: 'Morning' | 'Afternoon' | 'Evening';
  isAvailable: boolean;
  maxCapacity: number;
  bookedCount: number;
}

export interface Doctor {
  id: string;
  name: string;
  qualification: string;
  specialty: string;
  department: string;
  hospitalId: string;
  hospitalName: string;
  roomNo: string;
  experienceYears: number;
  consultationFee: string;
  rating: number;
  avatarUrl: string;
  currentToken: number;
  totalTokensToday: number;
  status: 'In OPD Active' | 'In Consultation' | 'On Short Break' | 'Emergency Round' | 'Off Duty';
  announcement?: string;
  opdSchedule: {
    morningShift: string;
    eveningShift: string;
    avgTimePerPatientMin: number;
    daysActive: string[];
  };
  timingSlots: Record<string, TimingSlot[]>; // date -> slots
}

export interface Appointment {
  id: string;
  tokenNumber: number;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  patientMobile: string;
  patientAadhaar: string;
  hospitalId: string;
  hospitalName: string;
  hospitalLocation: string;
  department: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  roomNo: string;
  appointmentDate: string;
  appointmentTime: string;
  status: 'Waiting' | 'In Consultation' | 'Completed' | 'Cancelled';
  bookingTimestamp: string;
  qrCodeToken: string;
  chiefComplaint?: string;
}

export interface UserSession {
  mobileNumber: string;
  countryCode: string;
  isVerified: boolean;
  selectedLanguage: string;
  role: 'none' | 'admin' | 'user';
  loginTimestamp?: string;
}
