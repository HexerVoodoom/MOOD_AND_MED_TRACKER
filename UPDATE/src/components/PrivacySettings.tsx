import React from 'react';
import { ChevronLeft, Shield, Trash2, FileText } from 'lucide-react';

interface PrivacySettingsProps {
  onBack: () => void;
}

export function PrivacySettings({ onBack }: PrivacySettingsProps) {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      <div className="bg-white px-4 pt-12 pb-4 shadow-sm flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-all">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Privacidade e Dados</h1>
      </div>

      <div className="p-4 space-y-6">
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-2">Gerenciamento de Dados</h2>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <button className="w-full flex items-center justify-between p-4 active:bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center">
                  <Trash2 className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-700">Limpar Registros</p>
                  <p className="text-[10px] text-gray-400">Ação irreversível</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-2">Legal</h2>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <button className="w-full flex items-center justify-between p-4 border-b border-gray-50 active:bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-50 text-gray-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="font-medium text-gray-700">Termos de Uso</span>
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-4 active:bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-50 text-gray-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="font-medium text-gray-700">Política de Privacidade</span>
              </div>
            </button>
          </div>
        </div>

        <div className="p-4 bg-gray-100 rounded-2xl border border-gray-200">
          <p className="text-xs text-gray-500 leading-relaxed">
            Seus dados de saúde são armazenados localmente e nunca compartilhados com terceiros sem sua autorização explícita.
          </p>
        </div>
      </div>
    </div>
  );
}
