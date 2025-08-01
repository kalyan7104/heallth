'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function BookAppointmentContent() {
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('consultation');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const doctorId = searchParams.get('doctorId');

  const doctors = [
    {
      id: 'D001',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20female%20cardiologist%20doctor%20with%20stethoscope%2C%20medical%20coat%2C%20confident%20smile%2C%20hospital%20background%2C%20medical%20photography%20style&width=60&height=60&seq=doc1&orientation=squarish'
    },
    {
      id: 'D002',
      name: 'Dr. Michael Chen',
      specialty: 'Orthopedics',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20Asian%20male%20orthopedic%20doctor%20with%20glasses%2C%20white%20coat%2C%20stethoscope%2C%20friendly%20expression%2C%20clinical%20setting&width=60&height=60&seq=doc2&orientation=squarish'
    }
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  const appointmentTypes = [
    { value: 'consultation', label: 'Consultation' },
    { value: 'follow-up', label: 'Follow-up' },
    { value: 'checkup', label: 'Regular Check-up' },
    { value: 'urgent', label: 'Urgent Care' }
  ];

  useEffect(() => {
    if (doctorId) {
      const doctor = doctors.find(d => d.id === doctorId);
      if (doctor) {
        setSelectedDoctor(doctor);
      }
    }
  }, [doctorId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push('/patient-dashboard');
      }, 2000);
    }, 1500);
  };

  const getNextSevenDays = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        })
      });
    }
    
    return dates;
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-8 text-center shadow-lg max-w-md w-full">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-check-line text-green-600 text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Appointment Booked!</h2>
          <p className="text-gray-600 mb-6">Your appointment has been successfully scheduled.</p>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Doctor:</strong> {selectedDoctor?.name}</p>
            <p><strong>Date:</strong> {selectedDate}</p>
            <p><strong>Time:</strong> {selectedTime}</p>
            <p><strong>Type:</strong> {appointmentTypes.find(t => t.value === appointmentType)?.label}</p>
          </div>
          <div className="mt-6">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-sm text-gray-500 mt-2">Redirecting to dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 py-4">
          <div className="flex items-center space-x-3">
            <button onClick={() => router.back()} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <i className="ri-arrow-left-line text-gray-600"></i>
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Book Appointment</h1>
              <p className="text-sm text-gray-500">Schedule your consultation</p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Doctor Selection */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Doctor</h3>
          
          {selectedDoctor ? (
            <div className="flex items-center space-x-3 p-3 border border-blue-200 rounded-lg bg-blue-50">
              <img 
                src={selectedDoctor.avatar} 
                alt={selectedDoctor.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{selectedDoctor.name}</h4>
                <p className="text-sm text-blue-600">{selectedDoctor.specialty}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDoctor(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line"></i>
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {doctors.map((doctor) => (
                <button
                  key={doctor.id}
                  type="button"
                  onClick={() => setSelectedDoctor(doctor)}
                  className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-blue-200 hover:bg-blue-50 transition-colors"
                >
                  <img 
                    src={doctor.avatar} 
                    alt={doctor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-gray-900">{doctor.name}</h4>
                    <p className="text-sm text-gray-600">{doctor.specialty}</p>
                  </div>
                  <i className="ri-arrow-right-line text-gray-400"></i>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date Selection */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h3>
          <div className="grid grid-cols-2 gap-3">
            {getNextSevenDays().map((date) => (
              <button
                key={date.value}
                type="button"
                onClick={() => setSelectedDate(date.value)}
                className={`p-3 rounded-lg border text-center transition-colors !rounded-button ${
                  selectedDate === date.value
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
                }`}
              >
                {date.label}
              </button>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Time</h3>
          <div className="grid grid-cols-3 gap-3">
            {timeSlots.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => setSelectedTime(time)}
                className={`p-3 rounded-lg border text-center transition-colors !rounded-button ${
                  selectedTime === time
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Appointment Type */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Type</h3>
          <div className="space-y-2">
            {appointmentTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setAppointmentType(type.value)}
                className={`w-full p-3 rounded-lg border text-left transition-colors !rounded-button ${
                  appointmentType === type.value
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Additional Notes */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any specific symptoms or concerns you'd like to discuss..."
            className="w-full h-24 p-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
            maxLength={500}
          />
          <p className="text-sm text-gray-500 mt-2">{notes.length}/500 characters</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!selectedDoctor || !selectedDate || !selectedTime || isSubmitting}
          className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed !rounded-button"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Booking Appointment...</span>
            </div>
          ) : (
            'Book Appointment'
          )}
        </button>
      </form>
    </div>
  );
}

export default function BookAppointment() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <BookAppointmentContent />
    </Suspense>
  );
}