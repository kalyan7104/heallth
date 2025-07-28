
// Mock API functions using localStorage with proper HTTP methods simulation
export interface Doctor {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  specialty: string;
  hospital: string;
  experience: string;
  rating: number;
  license: string;
  education: string;
  about: string;
  totalPatients: number;
  avatar: string;
  profilePicture?: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  emergencyContact: string;
  bloodType: string;
  allergies: string;
  medications: string;
  avatar: string;
  profilePicture?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  type: string;
  status: string;
  duration: string;
  notes: string;
}

// Initialize mock data
const initializeMockData = () => {
  if (!localStorage.getItem('doctors')) {
    const mockDoctors: Doctor[] = [
      {
        id: 'D001',
        name: 'Dr. Sarah Johnson',
        email: 'sarah.johnson@hospital.com',
        password: 'password123',
        phone: '+1 (555) 234-5678',
        specialty: 'Cardiologist',
        hospital: 'City General Hospital',
        experience: '12 years',
        rating: 4.8,
        license: 'MD-2021-001',
        education: 'MD from Harvard Medical School',
        about: 'Experienced cardiologist dedicated to providing comprehensive heart care.',
        totalPatients: 156,
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20female%20doctor%20with%20stethoscope%2C%20medical%20coat%2C%20confident%20smile%2C%20hospital%20background%2C%20medical%20photography%20style&width=100&height=100&seq=doc1&orientation=squarish'
      },
      {
        id: 'D002',
        name: 'Dr. Michael Chen',
        email: 'michael.chen@hospital.com',
        password: 'password123',
        phone: '+1 (555) 345-6789',
        specialty: 'Orthopedic',
        hospital: 'Regional Medical Center',
        experience: '8 years',
        rating: 4.6,
        license: 'MD-2021-002',
        education: 'MD from Johns Hopkins University',
        about: 'Orthopedic specialist focusing on sports injuries and joint replacement.',
        totalPatients: 89,
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20Asian%20male%20doctor%20with%20glasses%2C%20white%20coat%2C%20stethoscope%2C%20friendly%20expression%2C%20clinical%20setting&width=100&height=100&seq=doc2&orientation=squarish'
      }
    ];
    localStorage.setItem('doctors', JSON.stringify(mockDoctors));
  }

  if (!localStorage.getItem('patients')) {
    const mockPatients: Patient[] = [
      {
        id: 'P001',
        name: 'John Smith',
        email: 'john.smith@email.com',
        password: 'password123',
        phone: '+1 (555) 123-4567',
        dateOfBirth: '1990-05-15',
        address: '123 Main St, New York, NY 10001',
        emergencyContact: 'Jane Smith - +1 (555) 987-6543',
        bloodType: 'A+',
        allergies: 'Penicillin',
        medications: 'None',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20middle-aged%20man%20with%20friendly%20smile%2C%20casual%20attire%2C%20clean%20background%2C%20portrait%20photography%20style&width=100&height=100&seq=patient1&orientation=squarish'
      },
      {
        id: 'P002',
        name: 'Emily Johnson',
        email: 'emily.johnson@email.com',
        password: 'password123',
        phone: '+1 (555) 234-5678',
        dateOfBirth: '1985-08-22',
        address: '456 Oak Ave, Boston, MA 02101',
        emergencyContact: 'Robert Johnson - +1 (555) 876-5432',
        bloodType: 'B+',
        allergies: 'None',
        medications: 'Vitamins',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20young%20woman%20with%20brown%20hair%2C%20warm%20smile%2C%20business%20casual%2C%20studio%20lighting%2C%20clean%20background&width=100&height=100&seq=patient2&orientation=squarish'
      }
    ];
    localStorage.setItem('patients', JSON.stringify(mockPatients));
  }

  if (!localStorage.getItem('appointments')) {
    const mockAppointments: Appointment[] = [
      {
        id: 'A001',
        patientId: 'P001',
        doctorId: 'D001',
        patientName: 'John Smith',
        doctorName: 'Dr. Sarah Johnson',
        date: '2024-01-15',
        time: '10:00 AM',
        type: 'Consultation',
        status: 'Confirmed',
        duration: '30 min',
        notes: 'Regular checkup'
      },
      {
        id: 'A002',
        patientId: 'P002',
        doctorId: 'D002',
        patientName: 'Emily Johnson',
        doctorName: 'Dr. Michael Chen',
        date: '2024-01-20',
        time: '2:30 PM',
        type: 'Follow-up',
        status: 'Pending',
        duration: '15 min',
        notes: 'Follow-up appointment'
      }
    ];
    localStorage.setItem('appointments', JSON.stringify(mockAppointments));
  }
};

// Helper function to simulate HTTP requests
const simulateRequest = <T>(data: T, delay: number = 800): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

// Doctor API functions
export const doctorAPI = {
  // GET - Login (check credentials)
  login: async (email: string, password: string): Promise<Doctor> => {
    initializeMockData();
    const doctors: Doctor[] = JSON.parse(localStorage.getItem('doctors') || '[]');
    const doctor = doctors.find(d => d.email === email && d.password === password);
    
    if (!doctor) {
      throw new Error('Invalid credentials');
    }
    
    return simulateRequest(doctor);
  },

  // POST - Register new doctor
  register: async (doctorData: Omit<Doctor, 'id' | 'rating' | 'totalPatients' | 'avatar'>): Promise<Doctor> => {
    initializeMockData();
    const doctors: Doctor[] = JSON.parse(localStorage.getItem('doctors') || '[]');
    
    // Check if email already exists
    if (doctors.some(d => d.email === doctorData.email)) {
      throw new Error('Email already exists');
    }
    
    const newDoctor: Doctor = {
      ...doctorData,
      id: `D${String(doctors.length + 1).padStart(3, '0')}`,
      rating: 0,
      totalPatients: 0,
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20doctor%20with%20stethoscope%2C%20medical%20coat%2C%20confident%20smile%2C%20hospital%20background%2C%20medical%20photography%20style&width=100&height=100&seq=newdoc&orientation=squarish'
    };
    
    doctors.push(newDoctor);
    localStorage.setItem('doctors', JSON.stringify(doctors));
    
    return simulateRequest(newDoctor);
  },

  // PUT - Update doctor profile
  updateProfile: async (id: string, updates: Partial<Doctor>): Promise<Doctor> => {
    const doctors: Doctor[] = JSON.parse(localStorage.getItem('doctors') || '[]');
    const index = doctors.findIndex(d => d.id === id);
    
    if (index === -1) {
      throw new Error('Doctor not found');
    }
    
    doctors[index] = { ...doctors[index], ...updates };
    localStorage.setItem('doctors', JSON.stringify(doctors));
    
    return simulateRequest(doctors[index], 500);
  },

  // PUT - Reset password
  resetPassword: async (email: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
    const doctors: Doctor[] = JSON.parse(localStorage.getItem('doctors') || '[]');
    const index = doctors.findIndex(d => d.email === email);
    
    if (index === -1) {
      throw new Error('Email not found');
    }
    
    doctors[index].password = newPassword;
    localStorage.setItem('doctors', JSON.stringify(doctors));
    
    return simulateRequest({ success: true, message: 'Password updated successfully' });
  },

  // GET - Get all doctors
  getAll: async (): Promise<Doctor[]> => {
    initializeMockData();
    const doctors: Doctor[] = JSON.parse(localStorage.getItem('doctors') || '[]');
    return simulateRequest(doctors, 500);
  }
};

// Patient API functions
export const patientAPI = {
  // GET - Login (check credentials)
  login: async (email: string, password: string): Promise<Patient> => {
    initializeMockData();
    const patients: Patient[] = JSON.parse(localStorage.getItem('patients') || '[]');
    const patient = patients.find(p => p.email === email && p.password === password);
    
    if (!patient) {
      throw new Error('Invalid credentials');
    }
    
    return simulateRequest(patient);
  },

  // POST - Register new patient
  register: async (patientData: Omit<Patient, 'id' | 'avatar'>): Promise<Patient> => {
    initializeMockData();
    const patients: Patient[] = JSON.parse(localStorage.getItem('patients') || '[]');
    
    // Check if email already exists
    if (patients.some(p => p.email === patientData.email)) {
      throw new Error('Email already exists');
    }
    
    const newPatient: Patient = {
      ...patientData,
      id: `P${String(patients.length + 1).padStart(3, '0')}`,
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20person%20with%20friendly%20smile%2C%20casual%20attire%2C%20clean%20background%2C%20portrait%20photography%20style&width=100&height=100&seq=newpatient&orientation=squarish'
    };
    
    patients.push(newPatient);
    localStorage.setItem('patients', JSON.stringify(patients));
    
    return simulateRequest(newPatient);
  },

  // PUT - Update patient profile
  updateProfile: async (id: string, updates: Partial<Patient>): Promise<Patient> => {
    const patients: Patient[] = JSON.parse(localStorage.getItem('patients') || '[]');
    const index = patients.findIndex(p => p.id === id);
    
    if (index === -1) {
      throw new Error('Patient not found');
    }
    
    patients[index] = { ...patients[index], ...updates };
    localStorage.setItem('patients', JSON.stringify(patients));
    
    return simulateRequest(patients[index], 500);
  },

  // PUT - Reset password
  resetPassword: async (email: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
    const patients: Patient[] = JSON.parse(localStorage.getItem('patients') || '[]');
    const index = patients.findIndex(p => p.email === email);
    
    if (index === -1) {
      throw new Error('Email not found');
    }
    
    patients[index].password = newPassword;
    localStorage.setItem('patients', JSON.stringify(patients));
    
    return simulateRequest({ success: true, message: 'Password updated successfully' });
  }
};

// Appointment API functions
export const appointmentAPI = {
  getByPatient: async (patientId: string): Promise<Appointment[]> => {
    initializeMockData();
    const appointments: Appointment[] = JSON.parse(localStorage.getItem('appointments') || '[]');
    return simulateRequest(appointments.filter(a => a.patientId === patientId), 500);
  },

  getByDoctor: async (doctorId: string): Promise<Appointment[]> => {
    initializeMockData();
    const appointments: Appointment[] = JSON.parse(localStorage.getItem('appointments') || '[]');
    return simulateRequest(appointments.filter(a => a.doctorId === doctorId), 500);
  },

  create: async (appointmentData: Omit<Appointment, 'id'>): Promise<Appointment> => {
    const appointments: Appointment[] = JSON.parse(localStorage.getItem('appointments') || '[]');
    
    const newAppointment: Appointment = {
      ...appointmentData,
      id: `A${String(appointments.length + 1).padStart(3, '0')}`
    };
    
    appointments.push(newAppointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    
    return simulateRequest(newAppointment, 500);
  },

  update: async (id: string, updates: Partial<Appointment>): Promise<Appointment> => {
    const appointments: Appointment[] = JSON.parse(localStorage.getItem('appointments') || '[]');
    const index = appointments.findIndex(a => a.id === id);
    
    if (index === -1) {
      throw new Error('Appointment not found');
    }
    
    appointments[index] = { ...appointments[index], ...updates };
    localStorage.setItem('appointments', JSON.stringify(appointments));
    
    return simulateRequest(appointments[index], 500);
  }
};
