import React from 'react';
import { useApp } from '../context/AppContext';
import { TabType } from '../types';

interface NavItem {
  id: TabType;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { id: 'estado', label: 'Estado', icon: 'air' },
  { id: 'diagnostico', label: 'Diagnóstico', icon: 'query_stats' },
  { id: 'pronostico', label: 'Pronóstico', icon: 'schedule' },
  { id: 'historial', label: 'Historial', icon: 'trending_up' },
  { id: 'dispositivo', label: 'Dispositivo', icon: 'tune' }
];

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-[#eefcff]/90 backdrop-blur-xl border-t border-[#0e7673]/8 shadow-[0_-4px_24px_rgba(14,118,115,0.08)]">
      <div className="max-w-md mx-auto flex justify-around items-center h-20 px-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center gap-1 min-w-[44px] min-h-[44px] py-1.5 px-2 flex-1 transition-all rounded-xl ${
                isActive
                  ? 'text-[#005c59] font-semibold scale-102'
                  : 'text-[#3e4948] hover:text-[#005c59] opacity-80'
              }`}
            >
              <span 
                className="material-symbols-outlined text-[24px] transition-transform"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              <span className="font-label text-[11px] leading-tight text-center truncate max-w-full">
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#005c59] -mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
