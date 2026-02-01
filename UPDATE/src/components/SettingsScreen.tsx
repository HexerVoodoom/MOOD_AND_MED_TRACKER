import React from 'react';
import { ChevronLeft, LogOut, Bell, Shield, CircleHelp } from 'lucide-react';

interface SettingsScreenProps {
  onBack: () => void;
  onNavigate: (screen: 'notificationSettings' | 'privacySettings' | 'helpSupport') => void;
}

export function SettingsScreen({ onBack, onNavigate }: SettingsScreenProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="p-6 flex items-center gap-4">
        <button onClick={onBack} className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1>Configurações</h1>
      </div>
      
      <div className="px-6 space-y-8 pb-12">
        {/* Profile Info */}
        <div className="flex items-center gap-4 p-4 bg-[rgb(var(--color-surface))] rounded-2xl border border-[rgb(var(--color-border))]">
          <div className="w-14 h-14 rounded-full bg-[rgb(var(--color-primary))] flex items-center justify-center text-white text-xl font-bold">
            U
          </div>
          <div>
            <h3 className="mb-0.5">Usuário</h3>
            <p className="text-[rgb(var(--color-text-secondary))] text-sm">Versão 1.0.0</p>
          </div>
        </div>

        {/* General Settings */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[rgb(var(--color-gray-400))] px-2">
            Geral
          </h2>
          
          <div className="bg-[rgb(var(--color-surface))] rounded-2xl border border-[rgb(var(--color-border))] overflow-hidden">
            <button 
              onClick={() => onNavigate('notificationSettings')}
              className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-[rgb(var(--color-border))]"
            >
              <Bell className="w-5 h-5 text-[rgb(var(--color-gray-400))]" />
              <div className="flex-1 text-left">
                <p className="font-medium">Notificações</p>
                <p className="text-xs text-[rgb(var(--color-text-secondary))]">Lembretes de humor e medicação</p>
              </div>
            </button>
            
            <button 
              onClick={() => onNavigate('privacySettings')}
              className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-[rgb(var(--color-border))]"
            >
              <Shield className="w-5 h-5 text-[rgb(var(--color-gray-400))]" />
              <div className="flex-1 text-left">
                <p className="font-medium">Privacidade & Dados</p>
                <p className="text-xs text-[rgb(var(--color-text-secondary))]">Gerenciar histórico e exportação</p>
              </div>
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="pt-4">
          <button className="w-full flex items-center justify-center gap-2 p-4 text-red-500 font-bold border-2 border-red-100 rounded-2xl hover:bg-red-50 transition-colors">
            <LogOut className="w-5 h-5" />
            Sair do Aplicativo
          </button>
        </div>
      </div>
    </div>
  );
}
