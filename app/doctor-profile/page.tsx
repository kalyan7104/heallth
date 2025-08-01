'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DoctorProfile() {
  const [doctorData, setDoctorData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialty: '',
    hospital: '',
    experience: '',
    license: '',
    education: '',
    about: ''
  });
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('doctorData');
    if (!userData) {
      router.push('/doctor-login');
      return;
    }
    
    const doctor = JSON.parse(userData);
    setDoctorData(doctor);
    setFormData({
      name: doctor.name || '',
      email: doctor.email || '',
      phone: doctor.phone || '',
      specialty: doctor.specialty || '',
      hospital: doctor.hospital || '',
      experience: doctor.experience || '',
      license: doctor.license || '',
      education: doctor.education || 'MD from Medical University',
      about: doctor.about || 'Experienced medical professional dedicated to providing quality healthcare.'
    });
  }, [router]);

  const handleSave = () => {
    const updatedData = { ...doctorData, ...formData };
    localStorage.setItem('doctorData', JSON.stringify(updatedData));
    setDoctorData(updatedData);
    setIsEditing(false);
  };

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/doctor-dashboard" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <i className="ri-arrow-left-line text-gray-600"></i>
              </Link>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">My Profile</h1>
                <p className="text-sm text-gray-500">Manage your information</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
            >
              <i className="ri-logout-box-line text-red-600"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm text-center">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-stethoscope-line text-indigo-600 text-2xl"></i>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">{doctorData.name}</h2>
          <p className="text-indigo-600 font-medium mb-2">{doctorData.specialty}</p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <i className="ri-star-fill text-yellow-400"></i>
              <span>{doctorData.rating || '4.8'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <i className="ri-user-line text-gray-400"></i>
              <span>{doctorData.totalPatients || '156'} patients</span>
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Professional Information</h3>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-indigo-600 text-sm font-medium hover:text-indigo-700"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              ) : (
                <p className="text-gray-900">{doctorData.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              ) : (
                <p className="text-gray-900">{doctorData.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              ) : (
                <p className="text-gray-900">{doctorData.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.specialty}
                  onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              ) : (
                <p className="text-gray-900">{doctorData.specialty}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hospital/Clinic</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.hospital}
                  onChange={(e) => setFormData({...formData, hospital: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              ) : (
                <p className="text-gray-900">{doctorData.hospital}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              ) : (
                <p className="text-gray-900">{doctorData.experience}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.license}
                  onChange={(e) => setFormData({...formData, license: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              ) : (
                <p className="text-gray-900">{doctorData.license}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.education}
                  onChange={(e) => setFormData({...formData, education: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              ) : (
                <p className="text-gray-900">{formData.education}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
              {isEditing ? (
                <textarea
                  value={formData.about}
                  onChange={(e) => setFormData({...formData, about: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-24 resize-none"
                  placeholder="Tell patients about yourself..."
                />
              ) : (
                <p className="text-gray-900">{formData.about}</p>
              )}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="ri-user-heart-line text-blue-600"></i>
              </div>
              <p className="text-2xl font-bold text-gray-900">156</p>
              <p className="text-sm text-gray-600">Total Patients</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="ri-calendar-check-line text-green-600"></i>
              </div>
              <p className="text-2xl font-bold text-gray-900">1,234</p>
              <p className="text-sm text-gray-600">Appointments</p>
            </div>
          </div>
        </div>

        {isEditing && (
          <button
            onClick={handleSave}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-indigo-700 transition-colors !rounded-button"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
}