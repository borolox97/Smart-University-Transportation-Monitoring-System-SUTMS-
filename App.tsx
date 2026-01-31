
import React, { useState, useEffect } from 'react';
import { CAMPUS_STOPS, ROUTES } from './constants';
import { Bus, Coordinate, UserRole } from './types';
import CampusMap from './components/CampusMap';
import Sidebar from './components/Sidebar';
import ChatBot from './components/ChatBot';
import Login from './components/Login';
import DriverDashboard from './components/DriverDashboard';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole>('none');
  const [buses, setBuses] = useState<Bus[]>([
    { 
      id: '101', 
      routeId: 'R1', 
      currentPosition: { x: 50, y: 450 }, 
      nextStopId: 'S2', 
      status: 'active', 
      occupancy: 45, 
      speed: 35, 
      lastUpdated: new Date() 
    },
    { 
      id: '202', 
      routeId: 'R2', 
      currentPosition: { x: 250, y: 100 }, 
      nextStopId: 'S7', 
      status: 'active', 
      occupancy: 12, 
      speed: 28, 
      lastUpdated: new Date() 
    },
    { 
      id: '303', 
      routeId: 'R3', 
      currentPosition: { x: 400, y: 300 }, 
      nextStopId: 'S2', 
      status: 'delayed', 
      occupancy: 88, 
      speed: 12, 
      lastUpdated: new Date() 
    },
  ]);

  const [selectedBusId, setSelectedBusId] = useState<string | null>(null);
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      setBuses(prevBuses => prevBuses.map(bus => {
        const route = ROUTES.find(r => r.id === bus.routeId);
        if (!route) return bus;

        const currentPathIndex = route.path.findIndex(p => 
          p.x === bus.currentPosition.x && p.y === bus.currentPosition.y
        );

        let nextTargetIndex = (currentPathIndex + 1) % route.path.length;
        if (currentPathIndex === -1) nextTargetIndex = 0;

        const target = route.path[nextTargetIndex];
        const step = 2;

        const dx = target.x - bus.currentPosition.x;
        const dy = target.y - bus.currentPosition.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let nextPos: Coordinate;
        if (dist <= step) {
          nextPos = target;
        } else {
          nextPos = {
            x: bus.currentPosition.x + (dx / dist) * step,
            y: bus.currentPosition.y + (dy / dist) * step,
          };
        }

        return {
          ...bus,
          currentPosition: nextPos,
          lastUpdated: new Date(),
          speed: bus.status === 'delayed' ? 10 + Math.random() * 5 : 30 + Math.random() * 10
        };
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (userRole === 'none') {
    return <Login onLogin={setUserRole} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2 rounded-xl shadow-blue-200 shadow-lg">
            <i className="fa-solid fa-university text-xl"></i>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-800 uppercase">SUTMS</h1>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
              {userRole === 'student' ? 'Student Access' : 'Driver Console'}
            </p>
          </div>
        </div>

        <nav className="flex items-center gap-6 text-sm font-medium text-slate-500">
          <button className="text-blue-600 border-b-2 border-blue-600 pb-1">Dashboard</button>
          <button className="hover:text-blue-600 transition-colors">Alerts</button>
          <button className="hover:text-blue-600 transition-colors">Contact</button>
        </nav>

        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <p className="text-xs font-bold text-slate-800">{currentTime.toLocaleTimeString()}</p>
            <p className="text-[10px] text-slate-400 font-medium">Logged in as {userRole}</p>
          </div>
          <button 
            onClick={() => setUserRole('none')}
            className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all text-sm font-bold text-slate-600"
          >
            <i className="fa-solid fa-sign-out-alt"></i>
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-6 flex flex-col lg:flex-row gap-6 h-[calc(100vh-80px)] overflow-hidden">
        {userRole === 'student' ? (
          <>
            <div className="flex-1 relative flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Campus Live Map</h2>
                  <p className="text-slate-500 text-sm">Real-time bus locations and routes.</p>
                </div>
              </div>
              
              <div className="flex-1 min-h-[400px]">
                <CampusMap 
                  routes={ROUTES} 
                  stops={CAMPUS_STOPS} 
                  buses={buses} 
                  selectedBusId={selectedBusId}
                  onBusSelect={setSelectedBusId}
                  selectedRouteId={selectedRouteId}
                />
              </div>
            </div>

            <Sidebar 
              buses={buses} 
              routes={ROUTES} 
              stops={CAMPUS_STOPS}
              selectedBusId={selectedBusId}
              onBusSelect={setSelectedBusId}
              selectedRouteId={selectedRouteId}
              onRouteSelect={setSelectedRouteId}
            />
            
            <ChatBot buses={buses} routes={ROUTES} stops={CAMPUS_STOPS} />
          </>
        ) : (
          <div className="flex-1 overflow-y-auto">
            <DriverDashboard routes={ROUTES} stops={CAMPUS_STOPS} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
