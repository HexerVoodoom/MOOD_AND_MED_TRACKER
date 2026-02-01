import React from 'react';
import { Home, Pill, BarChart3 } from 'lucide-react';

interface TabBarProps {
  activeTab: 'home' | 'medications' | 'reports';
  onTabChange: (tab: 'home' | 'medications' | 'reports') => void;
}

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  const tabs = [
    { id: 'medications', label: 'Medicamentos', icon: Pill },
    { id: 'home', label: 'Início', icon: Home },
    { id: 'reports', label: 'Relatórios', icon: BarChart3 }
  ] as const;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[rgb(var(--color-border))] safe-area-inset-bottom z-[60]">
      <div className="flex items-center justify-around h-20">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center gap-1 min-w-[80px] min-h-[56px] transition-colors ${
                isActive ? 'text-[rgb(var(--color-primary))]' : 'text-[rgb(var(--color-gray-400))]'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className={`text-xs ${isActive ? 'font-medium' : 'font-normal'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}