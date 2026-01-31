
import React, { useState } from 'react';
import { Route, Stop, Bus } from '../types';

interface DriverDashboardProps {
  routes: Route[];
  stops: Stop[];
}

const DriverDashboard: React.FC<DriverDashboardProps> = ({ routes, stops }) => {
  const [isShiftActive, setIsShiftActive] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<string>(routes[0].id);
  const [status, setStatus] = useState<Bus['status']>('active');
  const [occupancy, setOccupancy] = useState(0);

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 space-y-6">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <i className="fa-solid fa-user-circle text-4xl"></i>
          </div>
          <div>
            <h2 className="text-xl font-bold">Driver ID: #4402</h2>
            <p className="text-slate-500 text-sm">Registered Vehicle: BU-992</p>
          </div>
        </div>

        <button 
          onClick={() => setIsShiftActive(!isShiftActive)}
          className={`w-full py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-lg transition-all active:scale-95 ${
            isShiftActive 
              ? 'bg-red-500 text-white shadow-red-200' 
              : 'bg-emerald-500 text-white shadow-emerald-200'
          }`}
        >
          <i className={`fa-solid ${isShiftActive ? 'fa-stop-circle' : 'fa-play-circle'}`}></i>
          {isShiftActive ? 'END SHIFT' : 'START SHIFT'}
        </button>
      </div>

      {isShiftActive && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <label className="text-xs font-bold uppercase text-slate-400 mb-2 block">Assigned Route</label>
              <select 
                value={selectedRoute}
                onChange={(e) => setSelectedRoute(e.target.value)}
                className="w-full bg-slate-50 p-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-500 font-bold"
              >
                {routes.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <label className="text-xs font-bold uppercase text-slate-400 mb-2 block">Current Status</label>
              <div className="flex gap-2">
                {(['active', 'delayed', 'maintenance'] as Bus['status'][]).map(s => (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={`flex-1 py-2 text-[10px] uppercase font-bold rounded-lg border-2 transition-all ${
                      status === s 
                        ? 'bg-blue-600 border-blue-600 text-white' 
                        : 'bg-white border-slate-100 text-slate-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Slider for occupancy */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <label className="text-xs font-bold uppercase text-slate-400">Current Occupancy</label>
              <span className={`font-bold px-3 py-1 rounded-full text-sm ${occupancy > 80 ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                {occupancy}% Full
              </span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={occupancy} 
              onChange={(e) => setOccupancy(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div className="bg-blue-600 text-white p-6 rounded-3xl shadow-xl shadow-blue-100 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-sm font-bold opacity-80 uppercase mb-4">Live GPS Broadcast</h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center animate-pulse">
                  <i className="fa-solid fa-satellite-dish text-2xl"></i>
                </div>
                <div>
                  <p className="text-lg font-bold">Transmitting Coordinates</p>
                  <p className="text-xs opacity-70">Students can now see you on the map</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      )}

      {!isShiftActive && (
        <div className="text-center p-12 text-slate-400">
          <i className="fa-solid fa-clock text-4xl mb-4 opacity-20"></i>
          <p>Please start your shift to begin transmitting location data to the university network.</p>
        </div>
      )}
    </div>
  );
};

export default DriverDashboard;
