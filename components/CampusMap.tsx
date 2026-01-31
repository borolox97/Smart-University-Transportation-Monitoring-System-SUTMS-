
import React from 'react';
import { Coordinate, Route, Stop, Bus } from '../types';

interface CampusMapProps {
  routes: Route[];
  stops: Stop[];
  buses: Bus[];
  selectedBusId: string | null;
  onBusSelect: (id: string) => void;
  selectedRouteId: string | null;
}

const CampusMap: React.FC<CampusMapProps> = ({ 
  routes, 
  stops, 
  buses, 
  selectedBusId, 
  onBusSelect,
  selectedRouteId 
}) => {
  return (
    <div className="relative w-full h-full bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
      <svg 
        viewBox="0 0 1000 500" 
        className="w-full h-full preserve-3d"
        style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.05))' }}
      >
        {/* Background Grid */}
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#e2e8f0" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="1000" height="500" fill="url(#grid)" />

        {/* Routes Layers */}
        {routes.map((route) => (
          <g key={route.id} style={{ opacity: selectedRouteId && selectedRouteId !== route.id ? 0.2 : 1 }}>
            <polyline
              points={route.path.map(p => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke={route.color}
              strokeWidth="4"
              strokeLinejoin="round"
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </g>
        ))}

        {/* Stops */}
        {stops.map((stop) => (
          <g key={stop.id} className="cursor-help group">
            <circle
              cx={stop.location.x}
              cy={stop.location.y}
              r="6"
              fill="white"
              stroke="#475569"
              strokeWidth="2"
            />
            <text
              x={stop.location.x}
              y={stop.location.y - 12}
              textAnchor="middle"
              className="text-[10px] font-semibold fill-slate-600 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {stop.name}
            </text>
          </g>
        ))}

        {/* Buses */}
        {buses.map((bus) => {
          const route = routes.find(r => r.id === bus.routeId);
          const isSelected = selectedBusId === bus.id;
          
          return (
            <g 
              key={bus.id} 
              className="cursor-pointer transition-all duration-1000 ease-linear"
              onClick={() => onBusSelect(bus.id)}
            >
              {/* Pulse effect for selected bus */}
              {isSelected && (
                <circle
                  cx={bus.currentPosition.x}
                  cy={bus.currentPosition.y}
                  r="15"
                  fill={route?.color}
                  className="animate-ping opacity-25"
                />
              )}
              
              <circle
                cx={bus.currentPosition.x}
                cy={bus.currentPosition.y}
                r={isSelected ? "12" : "10"}
                fill={route?.color || '#000'}
                stroke="white"
                strokeWidth="2"
                className="shadow-lg transition-all"
              />
              
              <path
                d="M -6 -4 L 6 -4 L 6 4 L -6 4 Z"
                transform={`translate(${bus.currentPosition.x}, ${bus.currentPosition.y})`}
                fill="white"
                className="opacity-50"
              />
              
              <text
                x={bus.currentPosition.x}
                y={bus.currentPosition.y + 25}
                textAnchor="middle"
                className={`text-[12px] font-bold ${isSelected ? 'fill-blue-600' : 'fill-slate-700'}`}
              >
                Bus {bus.id}
              </text>
            </g>
          );
        })}
      </svg>
      
      {/* Legend */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-3 rounded-lg border border-slate-200 shadow-sm text-xs space-y-2">
        <h4 className="font-bold border-b pb-1 mb-1">Live Legend</h4>
        {routes.map(r => (
          <div key={r.id} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: r.color }}></span>
            <span>{r.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampusMap;
