import React, { createContext, useContext, useState, useEffect } from 'react';
import { Hospital, Doctor, PatientProfile, Appointment, TimingSlot } from '../types';
import {
  INITIAL_HOSPITALS,
  INITIAL_DOCTORS,
  INITIAL_DEMO_PATIENTS,
  INITIAL_APPOINTMENTS,
  getAvailableDateStrings
} from '../data/mockHealthData';

interface HealthAppContextType {
  // Hospitals & Doctors
  hospitals: Hospital[];
  doctors: Doctor[];
  appointments: Appointment[];
  
  // Active Patient Profile
  currentPatient: PatientProfile | null;
  setCurrentPatient: (patient: PatientProfile | null) => void;
  
  // Actions for Patients
  verifyPatientWithAadhaar: (aadhaarNum: string, demoIndex?: number) => PatientProfile;
  verifyPatientWithDigiLocker: (demoIndex?: number) => PatientProfile;
  bookAppointment: (params: {
    hospitalId: string;
    department: string;
    doctorId: string;
    date: string;
    timeSlot: TimingSlot;
    chiefComplaint?: string;
  }) => Appointment;
  cancelAppointment: (appointmentId: string) => void;

  // Actions for Admin / Doctors
  updateDoctorSchedule: (doctorId: string, updates: {
    morningShift?: string;
    eveningShift?: string;
    avgTimePerPatientMin?: number;
    status?: Doctor['status'];
    announcement?: string;
    roomNo?: string;
  }) => void;
  callNextToken: (doctorId: string) => number;
  callSpecificToken: (doctorId: string, tokenNum: number) => void;
  setDoctorStatus: (doctorId: string, status: Doctor['status'], announcement?: string) => void;
  
  // Helper filters
  availableDates: { value: string; display: string; sub: string }[];
  getDoctorById: (doctorId: string) => Doctor | undefined;
  getHospitalById: (hospId: string) => Hospital | undefined;
}

const HealthAppContext = createContext<HealthAppContextType | undefined>(undefined);

export const HealthAppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hospitals, setHospitals] = useState<Hospital[]>(INITIAL_HOSPITALS);
  const [doctors, setDoctors] = useState<Doctor[]>(INITIAL_DOCTORS);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [currentPatient, setCurrentPatient] = useState<PatientProfile | null>(null);

  const availableDates = getAvailableDateStrings();

  // Aadhaar Verification Simulation
  const verifyPatientWithAadhaar = (aadhaarNum: string, demoIndex = 0): PatientProfile => {
    const cleanNum = aadhaarNum.replace(/\s+/g, '');
    const matchedDemo = INITIAL_DEMO_PATIENTS[demoIndex] || INITIAL_DEMO_PATIENTS[0];
    
    const verifiedProfile: PatientProfile = {
      ...matchedDemo,
      aadhaarNumber: aadhaarNum || matchedDemo.aadhaarNumber,
      isDigiLockerVerified: true,
      verificationTimestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };

    setCurrentPatient(verifiedProfile);
    return verifiedProfile;
  };

  // DigiLocker 1-Click Verification Simulation
  const verifyPatientWithDigiLocker = (demoIndex = 0): PatientProfile => {
    const matchedDemo = INITIAL_DEMO_PATIENTS[demoIndex] || INITIAL_DEMO_PATIENTS[0];
    const verifiedProfile: PatientProfile = {
      ...matchedDemo,
      isDigiLockerVerified: true,
      verificationTimestamp: 'Verified via Govt. DigiLocker Document Vault'
    };
    setCurrentPatient(verifiedProfile);
    return verifiedProfile;
  };

  // Book Appointment
  const bookAppointment = ({
    hospitalId,
    department,
    doctorId,
    date,
    timeSlot,
    chiefComplaint
  }: {
    hospitalId: string;
    department: string;
    doctorId: string;
    date: string;
    timeSlot: TimingSlot;
    chiefComplaint?: string;
  }): Appointment => {
    const hospital = hospitals.find(h => h.id === hospitalId) || hospitals[0];
    const doctor = doctors.find(d => d.id === doctorId) || doctors[0];
    const patient = currentPatient || INITIAL_DEMO_PATIENTS[0];

    const nextTokenNumber = doctor.totalTokensToday + 1;

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      tokenNumber: nextTokenNumber,
      patientId: patient.id,
      patientName: patient.name,
      patientAge: patient.age,
      patientGender: patient.gender,
      patientMobile: patient.mobile,
      patientAadhaar: patient.aadhaarNumber,
      hospitalId: hospital.id,
      hospitalName: hospital.name,
      hospitalLocation: `${hospital.location}, ${hospital.city}`,
      department: department,
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      roomNo: doctor.roomNo,
      appointmentDate: date,
      appointmentTime: timeSlot.label,
      status: 'Waiting',
      bookingTimestamp: 'Just now',
      qrCodeToken: `SSS-${hospital.name.slice(0, 4).toUpperCase()}-${doctor.department.slice(0, 4).toUpperCase()}-${nextTokenNumber}`,
      chiefComplaint: chiefComplaint || 'General Consultation & Health Check'
    };

    // Update Doctor's total tokens & slot count
    setDoctors(prev =>
      prev.map(doc => {
        if (doc.id === doctorId) {
          const updatedSlots = { ...doc.timingSlots };
          if (updatedSlots[date]) {
            updatedSlots[date] = updatedSlots[date].map(slot =>
              slot.id === timeSlot.id
                ? { ...slot, bookedCount: slot.bookedCount + 1, isAvailable: slot.bookedCount + 1 < slot.maxCapacity }
                : slot
            );
          }
          return {
            ...doc,
            totalTokensToday: doc.totalTokensToday + 1,
            timingSlots: updatedSlots
          };
        }
        return doc;
      })
    );

    setAppointments(prev => [newAppointment, ...prev]);
    return newAppointment;
  };

  // Cancel Appointment
  const cancelAppointment = (appointmentId: string) => {
    setAppointments(prev =>
      prev.map(apt => (apt.id === appointmentId ? { ...apt, status: 'Cancelled' } : apt))
    );
  };

  // Doctor OPD Schedule / Timing Allotment Control (by Doctor or Admin)
  const updateDoctorSchedule = (
    doctorId: string,
    updates: {
      morningShift?: string;
      eveningShift?: string;
      avgTimePerPatientMin?: number;
      status?: Doctor['status'];
      announcement?: string;
      roomNo?: string;
    }
  ) => {
    setDoctors(prev =>
      prev.map(doc => {
        if (doc.id === doctorId) {
          return {
            ...doc,
            roomNo: updates.roomNo !== undefined ? updates.roomNo : doc.roomNo,
            status: updates.status || doc.status,
            announcement: updates.announcement !== undefined ? updates.announcement : doc.announcement,
            opdSchedule: {
              ...doc.opdSchedule,
              morningShift: updates.morningShift || doc.opdSchedule.morningShift,
              eveningShift: updates.eveningShift || doc.opdSchedule.eveningShift,
              avgTimePerPatientMin: updates.avgTimePerPatientMin || doc.opdSchedule.avgTimePerPatientMin
            }
          };
        }
        return doc;
      })
    );
  };

  // Doctor Call Next Patient Token
  const callNextToken = (doctorId: string): number => {
    let newToken = 1;
    setDoctors(prev =>
      prev.map(doc => {
        if (doc.id === doctorId) {
          newToken = doc.currentToken < doc.totalTokensToday ? doc.currentToken + 1 : doc.currentToken;
          return {
            ...doc,
            currentToken: newToken,
            status: 'In Consultation',
            announcement: `Token #${newToken} is now called into ${doc.roomNo}. Please proceed.`
          };
        }
        return doc;
      })
    );

    // Update appointment status if matching
    setAppointments(prev =>
      prev.map(apt => {
        if (apt.doctorId === doctorId) {
          if (apt.tokenNumber === newToken) {
            return { ...apt, status: 'In Consultation' };
          } else if (apt.tokenNumber < newToken && apt.status !== 'Cancelled') {
            return { ...apt, status: 'Completed' };
          }
        }
        return apt;
      })
    );

    return newToken;
  };

  // Call specific token
  const callSpecificToken = (doctorId: string, tokenNum: number) => {
    setDoctors(prev =>
      prev.map(doc => {
        if (doc.id === doctorId) {
          return {
            ...doc,
            currentToken: tokenNum,
            status: 'In Consultation',
            announcement: `Token #${tokenNum} is currently in consultation.`
          };
        }
        return doc;
      })
    );
  };

  const setDoctorStatus = (doctorId: string, status: Doctor['status'], announcement?: string) => {
    setDoctors(prev =>
      prev.map(doc => {
        if (doc.id === doctorId) {
          return {
            ...doc,
            status,
            announcement: announcement || (status === 'Emergency Round' ? 'Doctor currently attending Emergency ICU round' : status === 'On Short Break' ? 'Doctor on 10 min break' : doc.announcement)
          };
        }
        return doc;
      })
    );
  };

  const getDoctorById = (doctorId: string) => doctors.find(d => d.id === doctorId);
  const getHospitalById = (hospId: string) => hospitals.find(h => h.id === hospId);

  return (
    <HealthAppContext.Provider
      value={{
        hospitals,
        doctors,
        appointments,
        currentPatient,
        setCurrentPatient,
        verifyPatientWithAadhaar,
        verifyPatientWithDigiLocker,
        bookAppointment,
        cancelAppointment,
        updateDoctorSchedule,
        callNextToken,
        callSpecificToken,
        setDoctorStatus,
        availableDates,
        getDoctorById,
        getHospitalById
      }}
    >
      {children}
    </HealthAppContext.Provider>
  );
};

export const useHealthApp = () => {
  const context = useContext(HealthAppContext);
  if (!context) {
    throw new Error('useHealthApp must be used within a HealthAppProvider');
  }
  return context;
};
