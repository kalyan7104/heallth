
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DoctorDashboard() {
  const [doctorData, setDoctorData] = useState<any>(null);
  const [todayAppointments, setTodayAppointments] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('doctorData');
    if (!userData) {
      router.push('/doctor-login');
      return;
    }
    
    setDoctorData(JSON.parse(userData));
    
    // Mock today's appointments
    setTodayAppointments([
      {
        id: 'A001',
        patientName: 'John Smith',
        time: '9:00 AM',
        type: 'Consultation',
        status: 'Confirmed',
        duration: '30 min',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20middle-aged%20man%20with%20friendly%20smile%2C%20casual%20attire%2C%20clean%20background%2C%20portrait%20photography%20style&width=50&height=50&seq=patient1&orientation=squarish'
      },
      {
        id: 'A002',
        patientName: 'Emily Johnson',
        time: '10:30 AM',
        type: 'Follow-up',
        status: 'Waiting',
        duration: '15 min',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20young%20woman%20with%20brown%20hair%2C%20warm%20smile%2C%20business%20casual%2C%20studio%20lighting%2C%20clean%20background&width=50&height=50&seq=patient2&orientation=squarish'
      },
      {
        id: 'A003',
        patientName: 'Michael Brown',
        time: '2:00 PM',
        type: 'Check-up',
        status: 'Confirmed',
        duration: '45 min',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20young%20man%20with%20short%20hair%2C%20confident%20expression%2C%20casual%20shirt%2C%20studio%20lighting%2C%20clean%20background&width=50&height=50&seq=patient3&orientation=squarish'
      }
    ]);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('doctorData');
    localStorage.removeItem('userType');
    router.push('/');
  };

  if (!doctorData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                <i className="ri-stethoscope-line text-white text-lg"></i>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Welcome, {doctorData.name}</h1>
                <p className="text-sm text-gray-500">{doctorData.specialty}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <i className="ri-logout-box-line text-gray-600"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="ri-calendar-check-line text-blue-600"></i>
                </div>
                <span className="text-2xl font-bold text-gray-900">8</span>
              </div>
              <p className="text-sm text-gray-600 font-medium">Today's Patients</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="ri-user-heart-line text-green-600"></i>
                </div>
                <span className="text-2xl font-bold text-gray-900">156</span>
              </div>
              <p className="text-sm text-gray-600 font-medium">Total Patients</p>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
              <Link href="/doctor-appointments" className="text-indigo-600 text-sm font-medium">
                View All
              </Link>
            </div>
            
            <div className="space-y-3">
              {todayAppointments.map((appointment) => (
                <div key={appointment.id} className="border border-gray-100 rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={appointment.avatar} 
                      alt={appointment.patientName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{appointment.patientName}</h3>
                      <p className="text-sm text-gray-600">{appointment.type}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-indigo-600">{appointment.time}</span>
                        <span className="text-sm text-gray-500">{appointment.duration}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/doctor-appointments"
              className="bg-indigo-600 text-white p-4 rounded-xl flex flex-col items-center justify-center space-y-2 hover:bg-indigo-700 transition-colors !rounded-button"
            >
              <i className="ri-calendar-line text-2xl"></i>
              <span className="text-sm font-medium">My Schedule</span>
            </Link>
            <Link
              href="/patient-records"
              className="bg-blue-600 text-white p-4 rounded-xl flex flex-col items-center justify-center space-y-2 hover:bg-blue-700 transition-colors !rounded-button"
            >
              <i className="ri-file-list-line text-2xl"></i>
              <span className="text-sm font-medium">Patient Records</span>
            </Link>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="ri-time-line text-purple-600"></i>
              </div>
              <p className="text-xl font-bold text-gray-900">4.5</p>
              <p className="text-sm text-gray-600">Avg Hours</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="ri-star-line text-yellow-600"></i>
              </div>
              <p className="text-xl font-bold text-gray-900">{doctorData.rating}</p>
              <p className="text-sm text-gray-600">Rating</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="ri-heart-pulse-line text-red-600"></i>
              </div>
              <p className="text-xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600">Years Exp</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-20">
        <div className="grid grid-cols-4 px-0">
          <Link href="/doctor-dashboard" className="flex flex-col items-center justify-center py-3 text-indigo-600 bg-indigo-50">
            <i className="ri-home-line text-xl mb-1"></i>
            <span className="text-xs font-medium">Home</span>
          </Link>
          <Link href="/doctor-appointments" className="flex flex-col items-center justify-center py-3 text-gray-500 hover:text-gray-700">
            <i className="ri-calendar-line text-xl mb-1"></i>
            <span className="text-xs font-medium">Schedule</span>
          </Link>
          <Link href="/doctor-profile" className="flex flex-col items-center justify-center py-3 text-gray-500 hover:text-gray-700">
            <i className="ri-user-line text-xl mb-1"></i>
            <span className="text-xs font-medium">Profile</span>
          </Link>
          <Link href="/settings" className="flex flex-col items-center justify-center py-3 text-gray-500 hover:text-gray-700">
            <i className="ri-settings-line text-xl mb-1"></i>
            <span className="text-xs font-medium">Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
