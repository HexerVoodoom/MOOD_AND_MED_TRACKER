import React from 'react';
import { ChevronLeft, MessageCircle, Mail, HelpCircle, ExternalLink } from 'lucide-react';

interface HelpSupportScreenProps {
  onBack: () => void;
}

export function HelpSupportScreen({ onBack }: HelpSupportScreenProps) {
  const faqs = [
    { q: "Como configurar lembretes?", a: "Vá em Configurações > Notificações para ajustar os horários." },
    { q: "Posso usar em mais de um aparelho?", a: "Atualmente os dados são locais e salvos apenas neste dispositivo." },
    { q: "Como editar um humor passado?", a: "Toque no dia desejado na aba de Relatórios para ver detalhes." }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      <div className="bg-white px-4 pt-12 pb-4 shadow-sm flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-all">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Ajuda e Suporte</h1>
      </div>

      <div className="p-4 space-y-6 flex-1 overflow-y-auto">
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-2">Perguntas Frequentes</h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <p className="font-bold text-sm text-gray-800 mb-1">{faq.q}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-2">Canais de Contato</h2>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <button className="w-full flex items-center justify-between p-4 border-b border-gray-50 active:bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-50 text-green-500 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <span className="font-medium text-gray-700">Chat via WhatsApp</span>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-300" />
            </button>
            <button className="w-full flex items-center justify-between p-4 active:bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="font-medium text-gray-700">Suporte por E-mail</span>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-300" />
            </button>
          </div>
        </div>

        <div className="text-center py-6">
          <HelpCircle className="w-12 h-12 text-blue-200 mx-auto mb-3" />
          <p className="text-sm text-gray-400">Ainda precisa de ajuda?</p>
          <p className="text-xs text-gray-400">Estamos disponíveis de Seg. a Sex. das 9h às 18h.</p>
        </div>
      </div>
    </div>
  );
}
