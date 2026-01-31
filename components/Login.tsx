
import React from 'react';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8">
        {/* Branding Section */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 text-white p-4 rounded-2xl shadow-xl shadow-blue-200">
              <i className="fa-solid fa-university text-4xl"></i>
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">SUTMS</h1>
              <p className="text-blue-600 font-bold tracking-widest text-sm uppercase">Campus Mobility</p>
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-slate-700">Welcome to the University Smart Transportation Portal</h2>
          <p className="text-slate-500 leading-relaxed">
            Real-time tracking, intelligent routing, and simplified driver management all in one place.
          </p>
        </div>

        {/* Selection Cards */}
        <div className="space-y-4">
          <button 
            onClick={() => onLogin('student')}
            className="w-full bg-white p-8 rounded-3xl border-2 border-transparent hover:border-blue-500 hover:shadow-2xl transition-all group text-left shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="bg-blue-50 text-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <i className="fa-solid fa-graduation-cap text-2xl"></i>
              </div>
              <i className="fa-solid fa-arrow-right text-slate-300 group-hover:text-blue-500 transition-colors"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Student Login</h3>
            <p className="text-slate-500 text-sm">Track buses, get arrival times, and chat with our AI assistant.</p>
          </button>

          <button 
            onClick={() => onLogin('driver')}
            className="w-full bg-white p-8 rounded-3xl border-2 border-transparent hover:border-emerald-500 hover:shadow-2xl transition-all group text-left shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="bg-emerald-50 text-emerald-600 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <i className="fa-solid fa-id-badge text-2xl"></i>
              </div>
              <i className="fa-solid fa-arrow-right text-slate-300 group-hover:text-emerald-500 transition-colors"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Driver Portal</h3>
            <p className="text-slate-500 text-sm">Start shifts, report status updates, and view your assigned routes.</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
