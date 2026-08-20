import { Hospital, Doctor, PatientProfile, Appointment, TimingSlot } from '../types';

export const INITIAL_HOSPITALS: Hospital[] = [
  {
    id: 'hosp-1',
    name: 'AIIMS (All India Institute of Medical Sciences)',
    location: 'Ansari Nagar, Ring Road',
    city: 'New Delhi',
    state: 'Delhi',
    distanceKm: 2.4,
    type: 'AIIMS / Apex',
    departments: ['Cardiology', 'General Medicine', 'Orthopedics', 'Pediatrics', 'Neurology', 'ENT', 'Dermatology', 'Gynecology'],
    rating: 4.9,
    phone: '011-26588500',
    address: 'Sri Aurobindo Marg, Ansari Nagar, New Delhi 110029',
    emergencyAvailable: true,
    opdTimingSummary: '08:30 AM - 01:30 PM (Mon-Sat)'
  },
  {
    id: 'hosp-2',
    name: 'District Civil & General Hospital',
    location: 'Civil Lines, Near Metro',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    distanceKm: 3.8,
    type: 'District Civil Hospital',
    departments: ['General Medicine', 'Orthopedics', 'Pediatrics', 'ENT', 'Gynecology', 'Dermatology'],
    rating: 4.5,
    phone: '0522-2623344',
    address: 'Park Road, Civil Lines, Lucknow 226001',
    emergencyAvailable: true,
    opdTimingSummary: '09:00 AM - 02:00 PM (Daily)'
  },
  {
    id: 'hosp-3',
    name: 'Apollo Multispeciality Hospital',
    location: 'Canal Circular Road',
    city: 'Kolkata',
    state: 'West Bengal',
    distanceKm: 5.2,
    type: 'Multi-Speciality Hospital',
    departments: ['Cardiology', 'Neurology', 'Orthopedics', 'General Medicine', 'Dermatology', 'Pediatrics'],
    rating: 4.8,
    phone: '033-23203040',
    address: '58 Canal Circular Road, Kadapara, Kolkata 700054',
    emergencyAvailable: true,
    opdTimingSummary: '08:00 AM - 08:00 PM (All Days)'
  },
  {
    id: 'hosp-4',
    name: 'KEM (King Edward Memorial) Hospital',
    location: 'Parel East',
    city: 'Mumbai',
    state: 'Maharashtra',
    distanceKm: 6.7,
    type: 'District Civil Hospital',
    departments: ['General Medicine', 'Cardiology', 'Pediatrics', 'Orthopedics', 'Gynecology', 'ENT'],
    rating: 4.6,
    phone: '022-24107000',
    address: 'Acharya Donde Marg, Parel, Mumbai 400012',
    emergencyAvailable: true,
    opdTimingSummary: '08:30 AM - 01:00 PM (Mon-Sat)'
  },
  {
    id: 'hosp-5',
    name: 'Nizam\'s Institute of Medical Sciences (NIMS)',
    location: 'Punjagutta',
    city: 'Hyderabad',
    state: 'Telangana',
    distanceKm: 4.1,
    type: 'AIIMS / Apex',
    departments: ['Neurology', 'Cardiology', 'Orthopedics', 'General Medicine', 'Gynecology'],
    rating: 4.7,
    phone: '040-23489000',
    address: 'Punjagutta Main Road, Hyderabad 500082',
    emergencyAvailable: true,
    opdTimingSummary: '09:00 AM - 03:00 PM (Mon-Sat)'
  },
  {
    id: 'hosp-6',
    name: 'Community Health Center (CHC) Model Node',
    location: 'Sector 14 Medical Enclave',
    city: 'Jaipur',
    state: 'Rajasthan',
    distanceKm: 1.8,
    type: 'Community Health Center (CHC)',
    departments: ['General Medicine', 'Pediatrics', 'Gynecology', 'Dermatology'],
    rating: 4.4,
    phone: '0141-2748899',
    address: 'Medical Enclave, Sector 14, Jaipur 302015',
    emergencyAvailable: true,
    opdTimingSummary: '09:00 AM - 04:00 PM (Daily)'
  }
];

export const INITIAL_DEMO_PATIENTS: PatientProfile[] = [
  {
    id: 'patient-1',
    aadhaarNumber: '7842 9012 3456',
    isDigiLockerVerified: true,
    name: 'Ramesh Kumar Verma',
    age: 42,
    gender: 'Male',
    dob: '14-08-1984',
    address: 'Flat 402, Shanti Niketan Apts, Sector 12, RK Puram',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110022',
    mobile: '9876543210',
    abhaId: '91-8472-1092-4411',
    bloodGroup: 'B+ Positive',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    verificationTimestamp: 'Verified via UIDAI e-KYC & DigiLocker Gateway'
  },
  {
    id: 'patient-2',
    aadhaarNumber: '9214 5531 8762',
    isDigiLockerVerified: true,
    name: 'Sunita Devi Sharma',
    age: 38,
    gender: 'Female',
    dob: '05-11-1988',
    address: 'House 14/B, Ganga Ghat Road, Assi Ghat',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    pincode: '221005',
    mobile: '9123456789',
    abhaId: '91-3329-8812-7004',
    bloodGroup: 'O+ Positive',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    verificationTimestamp: 'Verified via UIDAI e-KYC & DigiLocker Gateway'
  },
  {
    id: 'patient-3',
    aadhaarNumber: '6145 7789 2034',
    isDigiLockerVerified: true,
    name: 'Ananya Banerjee',
    age: 29,
    gender: 'Female',
    dob: '22-03-1997',
    address: '74 Salt Lake City, Block CD, Bidhannagar',
    city: 'Kolkata',
    state: 'West Bengal',
    pincode: '700064',
    mobile: '9830112233',
    abhaId: '91-5612-9904-1234',
    bloodGroup: 'A+ Positive',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    verificationTimestamp: 'Verified via UIDAI e-KYC & DigiLocker Gateway'
  }
];

const generateSlots = (dates: string[]): Record<string, TimingSlot[]> => {
  const result: Record<string, TimingSlot[]> = {};
  const timeLabels = [
    { time: '09:00 AM', label: '09:00 AM - 09:20 AM', shift: 'Morning' as const },
    { time: '09:30 AM', label: '09:30 AM - 09:50 AM', shift: 'Morning' as const },
    { time: '10:00 AM', label: '10:00 AM - 10:20 AM', shift: 'Morning' as const },
    { time: '10:30 AM', label: '10:30 AM - 10:50 AM', shift: 'Morning' as const },
    { time: '11:15 AM', label: '11:15 AM - 11:35 AM', shift: 'Morning' as const },
    { time: '11:45 AM', label: '11:45 AM - 12:05 PM', shift: 'Morning' as const },
    { time: '12:30 PM', label: '12:30 PM - 12:50 PM', shift: 'Morning' as const },
    { time: '04:00 PM', label: '04:00 PM - 04:20 PM', shift: 'Evening' as const },
    { time: '04:30 PM', label: '04:30 PM - 04:50 PM', shift: 'Evening' as const },
    { time: '05:00 PM', label: '05:00 PM - 05:20 PM', shift: 'Evening' as const },
    { time: '05:45 PM', label: '05:45 PM - 06:05 PM', shift: 'Evening' as const }
  ];

  dates.forEach((date, dateIdx) => {
    result[date] = timeLabels.map((slot, idx) => ({
      id: `${date}-${idx}`,
      time: slot.time,
      label: slot.label,
      shift: slot.shift,
      isAvailable: idx !== 1 && idx !== 4, // couple booked
      maxCapacity: 4,
      bookedCount: idx === 1 ? 4 : idx === 4 ? 4 : (idx % 3)
    }));
  });

  return result;
};

// Helper for formatted upcoming dates
export const getAvailableDateStrings = (): { value: string; display: string; sub: string }[] => {
  const today = new Date();
  const dates: { value: string; display: string; sub: string }[] = [];
  
  for (let i = 0; i < 5; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const val = `${yyyy}-${mm}-${dd}`;
    
    let sub = d.toLocaleDateString('en-IN', { weekday: 'short' });
    let display = `${dd} ${d.toLocaleDateString('en-IN', { month: 'short' })}`;
    if (i === 0) sub = 'Today';
    else if (i === 1) sub = 'Tomorrow';

    dates.push({ value: val, display, sub });
  }
  return dates;
};

const dateStrings = getAvailableDateStrings().map(d => d.value);

export const INITIAL_DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Rajesh K. Sharma',
    qualification: 'MBBS, MD (Cardiology), DM (AIIMS)',
    specialty: 'Senior Interventional Cardiologist',
    department: 'Cardiology',
    hospitalId: 'hosp-1',
    hospitalName: 'AIIMS (All India Institute of Medical Sciences)',
    roomNo: 'OPD Block A - Room 204',
    experienceYears: 18,
    consultationFee: 'Free (Govt. AIIMS Ayushman Covered)',
    rating: 4.9,
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    currentToken: 7,
    totalTokensToday: 24,
    status: 'In OPD Active',
    announcement: 'Currently seeing Token #7. Average consultation time 12 minutes.',
    opdSchedule: {
      morningShift: '09:00 AM - 01:00 PM',
      eveningShift: '04:00 PM - 06:30 PM',
      avgTimePerPatientMin: 12,
      daysActive: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    },
    timingSlots: generateSlots(dateStrings)
  },
  {
    id: 'doc-2',
    name: 'Dr. Meenakshi Sundaram',
    qualification: 'MBBS, MS (Orthopedics), MCh (Joint Replacement)',
    specialty: 'Orthopedic & Joint Surgeon',
    department: 'Orthopedics',
    hospitalId: 'hosp-1',
    hospitalName: 'AIIMS (All India Institute of Medical Sciences)',
    roomNo: 'OPD Block B - Room 108',
    experienceYears: 15,
    consultationFee: 'Free (Govt. AIIMS Ayushman Covered)',
    rating: 4.8,
    avatarUrl: 'https://images.unsplash.com/photo-1594824813587-f04491a82d0d?w=150&auto=format&fit=crop&q=80',
    currentToken: 12,
    totalTokensToday: 28,
    status: 'In OPD Active',
    announcement: 'Queue running on schedule. Post-op follow-ups expedited.',
    opdSchedule: {
      morningShift: '09:30 AM - 01:30 PM',
      eveningShift: '04:30 PM - 07:00 PM',
      avgTimePerPatientMin: 15,
      daysActive: ['Mon', 'Wed', 'Fri', 'Sat']
    },
    timingSlots: generateSlots(dateStrings)
  },
  {
    id: 'doc-3',
    name: 'Dr. Anupam Mukherjee',
    qualification: 'MBBS, MD (General Medicine), FICP',
    specialty: 'Chief Physician & Diabetes Specialist',
    department: 'General Medicine',
    hospitalId: 'hosp-2',
    hospitalName: 'District Civil & General Hospital',
    roomNo: 'Ground Floor - Room 12',
    experienceYears: 22,
    consultationFee: 'Free / ₹10 OPD Slip',
    rating: 4.7,
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
    currentToken: 15,
    totalTokensToday: 35,
    status: 'In OPD Active',
    announcement: 'Token #15 in room. Fast-track queue for senior citizens active.',
    opdSchedule: {
      morningShift: '09:00 AM - 02:00 PM',
      eveningShift: 'Off Duty',
      avgTimePerPatientMin: 10,
      daysActive: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    },
    timingSlots: generateSlots(dateStrings)
  },
  {
    id: 'doc-4',
    name: 'Dr. Shailaja Deshpande',
    qualification: 'MBBS, DCH, MD (Pediatrics)',
    specialty: 'Senior Pediatrician & Child Health',
    department: 'Pediatrics',
    hospitalId: 'hosp-4',
    hospitalName: 'KEM (King Edward Memorial) Hospital',
    roomNo: 'Child Wing - Room 302',
    experienceYears: 14,
    consultationFee: 'Free (Govt. Covered)',
    rating: 4.9,
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    currentToken: 4,
    totalTokensToday: 18,
    status: 'In OPD Active',
    announcement: 'Vaccination & pediatric checkups on schedule.',
    opdSchedule: {
      morningShift: '09:00 AM - 01:00 PM',
      eveningShift: '03:30 PM - 05:30 PM',
      avgTimePerPatientMin: 12,
      daysActive: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    },
    timingSlots: generateSlots(dateStrings)
  },
  {
    id: 'doc-5',
    name: 'Dr. Arvind Venkatraman',
    qualification: 'MBBS, MD, DM (Neurology - NIMHANS)',
    specialty: 'Consultant Neurologist',
    department: 'Neurology',
    hospitalId: 'hosp-5',
    hospitalName: 'Nizam\'s Institute of Medical Sciences (NIMS)',
    roomNo: 'Neuro Science Center - Room 410',
    experienceYears: 19,
    consultationFee: 'Govt. Subsidized / ₹50',
    rating: 4.8,
    avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=80',
    currentToken: 9,
    totalTokensToday: 20,
    status: 'In OPD Active',
    announcement: 'EEG review in progress for Token #9. Next token #10 in 8 mins.',
    opdSchedule: {
      morningShift: '10:00 AM - 02:00 PM',
      eveningShift: '04:00 PM - 06:00 PM',
      avgTimePerPatientMin: 15,
      daysActive: ['Mon', 'Tue', 'Thu', 'Sat']
    },
    timingSlots: generateSlots(dateStrings)
  },
  {
    id: 'doc-6',
    name: 'Dr. Fatima Begum',
    qualification: 'MBBS, MS (Obstetrics & Gynecology)',
    specialty: 'Maternal & Fetal Health Specialist',
    department: 'Gynecology',
    hospitalId: 'hosp-1',
    hospitalName: 'AIIMS (All India Institute of Medical Sciences)',
    roomNo: 'Maternity Wing - Room 105',
    experienceYears: 16,
    consultationFee: 'Free (Govt. Ayushman Bharat)',
    rating: 4.9,
    avatarUrl: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=150&auto=format&fit=crop&q=80',
    currentToken: 8,
    totalTokensToday: 22,
    status: 'In OPD Active',
    announcement: 'Antenatal care consultations active.',
    opdSchedule: {
      morningShift: '08:30 AM - 01:00 PM',
      eveningShift: '03:00 PM - 05:00 PM',
      avgTimePerPatientMin: 15,
      daysActive: ['Mon', 'Wed', 'Fri', 'Sat']
    },
    timingSlots: generateSlots(dateStrings)
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-101',
    tokenNumber: 9,
    patientId: 'patient-1',
    patientName: 'Ramesh Kumar Verma',
    patientAge: 42,
    patientGender: 'Male',
    patientMobile: '9876543210',
    patientAadhaar: '7842 9012 3456',
    hospitalId: 'hosp-1',
    hospitalName: 'AIIMS (All India Institute of Medical Sciences)',
    hospitalLocation: 'Ansari Nagar, Ring Road, New Delhi',
    department: 'Cardiology',
    doctorId: 'doc-1',
    doctorName: 'Dr. Rajesh K. Sharma',
    doctorSpecialty: 'Senior Interventional Cardiologist',
    roomNo: 'OPD Block A - Room 204',
    appointmentDate: dateStrings[0], // Today
    appointmentTime: '10:30 AM - 10:50 AM',
    status: 'Waiting',
    bookingTimestamp: 'Today, 08:45 AM',
    qrCodeToken: 'SSS-AIIMS-CARD-09',
    chiefComplaint: 'Routine Blood Pressure Follow-up & ECG Check'
  }
];
