'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <i className="ri-calendar-check-line text-white text-3xl"></i>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">MediCare</h1>
        <p className="text-gray-600 mb-8">Book appointments with trusted doctors</p>
        
        <div className="space-y-4">
          <Link 
            href="/patient-login" 
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 flex items-center justify-center space-x-3 !rounded-button shadow-lg"
          >
            <i className="ri-user-line text-xl"></i>
            <span>Patient Login</span>
          </Link>
          
          <Link 
            href="/doctor-login" 
            className="w-full bg-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-200 flex items-center justify-center space-x-3 !rounded-button shadow-lg"
          >
            <i className="ri-stethoscope-line text-xl"></i>
            <span>Doctor Login</span>
          </Link>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            New here? 
            <Link href="/register" className="text-blue-600 font-medium ml-1">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}