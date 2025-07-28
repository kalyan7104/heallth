'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AppointmentHistory() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const router = useRouter();

  useEffect(() => {
    // Mock appointment history
    setAppointments([
      {
        id: 'A001',
        doctorName: 'Dr. Sarah Johnson',
        specialty: 'Cardiology',
        date: '2024-01-15',
        time: '10:00 AM',
        type: 'Consultation',
        status: 'upcoming',
        notes: 'Routine cardiac check-up',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20female%20cardiologist%20doctor%20with%20stethoscope%2C%20medical%20coat%2C%20confident%20smile%2C%20hospital%20background%2C%20medical%20photography%20style&width=60&height=60&seq=doc1&orientation=squarish'
      },
      {
        id: 'A002',
        doctorName: 'Dr. Michael Chen',
        specialty: 'Orthopedics',
        date: '2024-01-20',
        time: '2:30 PM',
        type: 'Follow-up',
        status: 'upcoming',
        notes: 'Knee injury follow-up examination',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20Asian%20male%20orthopedic%20doctor%20with%20glasses%2C%20white%20coat%2C%20stethoscope%2C%20friendly%20expression%2C%20clinical%20setting&width=60&height=60&seq=doc2&orientation=squarish'
      },
      {
        id: 'A003',
        doctorName: 'Dr. Emily Rodriguez',
        specialty: 'Dermatology',
        date: '2024-01-10',
        time: '11:00 AM',
        type: 'Consultation',
        status: 'completed',
        notes: 'Skin condition evaluation',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20Hispanic%20female%20dermatologist%20doctor%2C%20medical%20coat%2C%20warm%20smile%2C%20modern%20clinic%20background%2C%20medical%20photography%20style&width=60&height=60&seq=doc3&orientation=squarish'
      },
      {
        id: 'A004',
        doctorName: 'Dr. James Wilson',
        specialty: 'General Practice',
        date: '2024-01-05',
        time: '9:30 AM',
        type: 'Check-up',
        status: 'completed',
        notes: 'Annual physical examination',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20male%20general%20practitioner%20doctor%20with%20kind%20expression%2C%20white%20coat%2C%20stethoscope%2C%20hospital%20background%2C%20medical%20photography%20style&width=60&height=60&seq=doc4&orientation=squarish'
      },
      {
        id: 'A005',
        doctorName: 'Dr. Lisa Park',
        specialty: 'Neurology',
        date: '2023-12-28',
        time: '3:00 PM',
        type: 'Consultation',
        status: 'cancelled',
        notes: 'Headache consultation - rescheduled',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20Asian%20female%20neurologist%20doctor%2C%20medical%20coat%2C%20professional%20expression%2C%20modern%20hospital%20background%2C%20medical%20photography%20style&width=60&height=60&seq=doc5&orientation=squarish'
      }
    ]);
  }, []);

  const filteredAppointments = appointments.filter(appointment => {
    if (activeTab === 'upcoming') return appointment.status === 'upcoming';
    if (activeTab === 'completed') return appointment.status === 'completed';
    if (activeTab === 'cancelled') return appointment.status === 'cancelled';
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleReschedule = (appointmentId: string) => {
    router.push(`/reschedule-appointment?id=${appointmentId}`);
  };

  const handleCancel = (appointmentId: string) => {
    const updatedAppointments = appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status: 'cancelled' } : apt
    );
    setAppointments(updatedAppointments);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 py-4">
          <div className="flex items-center space-x-3">
            <Link href="/patient-dashboard" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <i className="ri-arrow-left-line text-gray-600"></i>
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Appointment History</h1>
              <p className="text-sm text-gray-500">View and manage your appointments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'upcoming'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'completed'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setActiveTab('cancelled')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'cancelled'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Cancelled
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-calendar-line text-gray-400 text-2xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No appointments found</h3>
            <p className="text-gray-600 mb-6">You don't have any {activeTab} appointments.</p>
            <Link 
              href="/book-appointment"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors !rounded-button"
            >
              Book New Appointment
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-start space-x-4">
                  <img 
                    src={appointment.avatar} 
                    alt={appointment.doctorName}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{appointment.doctorName}</h3>
                        <p className="text-sm text-blue-600 font-medium">{appointment.specialty}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-2">
                        <i className="ri-calendar-line text-gray-400"></i>
                        <span>{new Date(appointment.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <i className="ri-time-line text-gray-400"></i>
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <i className="ri-file-text-line text-gray-400"></i>
                        <span>{appointment.type}</span>
                      </div>
                    </div>
                    
                    {appointment.notes && (
                      <p className="text-sm text-gray-600 mb-3 bg-gray-50 p-2 rounded-lg">
                        {appointment.notes}
                      </p>
                    )}
                    
                    {appointment.status === 'upcoming' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleReschedule(appointment.id)}
                          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors !rounded-button"
                        >
                          Reschedule
                        </button>
                        <button
                          onClick={() => handleCancel(appointment.id)}
                          className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors !rounded-button"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                    
                    {appointment.status === 'completed' && (
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors !rounded-button">
                          View Report
                        </button>
                        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors !rounded-button">
                          Book Again
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}