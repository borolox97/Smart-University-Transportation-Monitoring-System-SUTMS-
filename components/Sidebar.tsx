
import React from 'react';
import { Bus, Route, Stop } from '../types';

interface SidebarProps {
  buses: Bus[];
  routes: Route[];
  stops: Stop[];
  selectedBusId: string | null;
  onBusSelect: (id: string) => void;
  selectedRouteId: string | null;
  onRouteSelect: (id: string | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  buses, 
  routes, 
  stops, 
  selectedBusId, 
  onBusSelect,
  selectedRouteId,
  onRouteSelect
}) => {
  const selectedBus = buses.find(b => b.id === selectedBusId);
  const selectedBusRoute = selectedBus ? routes.find(r => r.id === selectedBus.routeId) : null;
  const nextStop = selectedBus ? stops.find(s => s.id === selectedBus.nextStopId) : null;

  return (
    <div className="w-full lg:w-96 flex flex-col gap-4 h-full">
      {/* Route Selector */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <i className="fa-solid fa-route text-blue-500"></i>
          Active Routes
        </h3>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onRouteSelect(null)}
            className={`text-left px-4 py-2 rounded-xl transition-all ${!selectedRouteId ? 'bg-blue-50 border-2 border-blue-500 text-blue-700' : 'bg-slate-50 border-2 border-transparent hover:bg-slate-100'}`}
          >
            All Routes
          </button>
          {routes.map(route => (
            <button
              key={route.id}
              onClick={() => onRouteSelect(route.id)}
              className={`text-left px-4 py-2 rounded-xl border-2 transition-all flex justify-between items-center ${selectedRouteId === route.id ? 'bg-white border-blue-500 text-blue-700' : 'bg-slate-50 border-transparent hover:bg-slate-100'}`}
            >
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: route.color }}></span>
                <span className="font-medium">{route.name}</span>
              </div>
              <span className="text-xs bg-slate-200 px-2 py-0.5 rounded-full text-slate-600">
                {buses.filter(b => b.routeId === route.id).length} buses
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bus Details */}
      <div className="flex-1 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm overflow-y-auto">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <i className="fa-solid fa-bus text-blue-500"></i>
          Fleet Status
        </h3>
        
        {selectedBus ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="p-4 rounded-xl border-2 border-blue-100 bg-blue-50/30">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-xl">Bus {selectedBus.id}</h4>
                  <p className="text-sm text-slate-500">{selectedBusRoute?.name}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                  selectedBus.status === 'active' ? 'bg-green-100 text-green-700' : 
                  selectedBus.status === 'delayed' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                }`}>
                  {selectedBus.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Occupancy</p>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{selectedBus.occupancy}%</span>
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${selectedBus.occupancy > 80 ? 'bg-red-500' : 'bg-blue-500'}`} 
                        style={{ width: `${selectedBus.occupancy}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Speed</p>
                  <p className="font-bold">{selectedBus.speed} km/h</p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-white rounded-lg shadow-sm">
                <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Next Stop</p>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <i className="fa-solid fa-location-dot text-blue-600"></i>
                  </div>
                  <div>
                    <p className="font-bold">{nextStop?.name || 'End of Route'}</p>
                    <p className="text-xs text-blue-600 font-medium">Estimated arrival: 4 mins</p>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => onBusSelect('')}
                className="w-full mt-4 py-2 text-sm text-slate-500 hover:text-blue-600 font-medium transition-colors"
              >
                Clear Selection
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400 text-center">
            <i className="fa-solid fa-hand-pointer text-3xl mb-3 opacity-20"></i>
            <p>Select a bus on the map or from the fleet list to see live telemetry and ETA data.</p>
          </div>
        )}

        {/* Quick Fleet List */}
        {!selectedBus && (
          <div className="mt-4 space-y-2">
            {buses
              .filter(b => !selectedRouteId || b.routeId === selectedRouteId)
              .map(bus => (
                <div 
                  key={bus.id}
                  onClick={() => onBusSelect(bus.id)}
                  className="p-3 border rounded-xl hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-2 h-10 rounded-full" 
                      style={{ backgroundColor: routes.find(r => r.id === bus.routeId)?.color }}
                    ></div>
                    <div>
                      <p className="font-bold text-sm">Bus {bus.id}</p>
                      <p className="text-xs text-slate-500">{routes.find(r => r.id === bus.routeId)?.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-blue-600">Active</p>
                    <p className="text-[10px] text-slate-400">ETA: {Math.floor(Math.random() * 10) + 1}m</p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
