import React, { useState } from 'react';
import svgPaths from "../imports/svg-04k7ddfifj";

interface NotificationSettingsProps {
  onBack: () => void;
}

export function NotificationSettings({ onBack }: NotificationSettingsProps) {
  const [reminders, setReminders] = useState({
    morning: { active: true, time: '09:20' },
    afternoon: { active: true, time: '15:20' },
    night: { active: true, time: '21:20' },
    medication: { active: true }
  });

  const toggle = (key: keyof typeof reminders) => {
    setReminders(prev => ({
      ...prev,
      [key]: typeof prev[key] === 'object' && 'active' in prev[key]
        ? { ...prev[key], active: !prev[key].active }
        : prev[key]
    }));
  };

  const updateTime = (key: 'morning' | 'afternoon' | 'night', time: string) => {
    // Precise validation for periods
    const hour = parseInt(time.split(':')[0]);

    if (key === 'morning' && (hour < 5 || hour >= 12)) return;
    if (key === 'afternoon' && (hour < 12 || hour >= 19)) return;
    if (key === 'night' && (hour >= 5 && hour < 19)) return;

    setReminders(prev => ({
      ...prev,
      [key]: { ...prev[key], time }
    }));
  };

  const CustomToggle = ({ active, onClick }: { active: boolean, onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`relative w-[48px] h-[24px] rounded-[33554400px] transition-all duration-300 flex items-center px-[4px] shrink-0 active:scale-90 ${active ? 'bg-[#80c4c1]' : 'bg-gray-300'}`}
    >
      <div className={`w-[16px] h-[16px] bg-white rounded-full shadow-sm transition-transform duration-300 ${active ? 'translate-x-[24px]' : 'translate-x-0'}`} />
    </button>
  );

  return (
    <div className="bg-[#f8f9fa] min-h-screen flex flex-col items-center w-full max-w-[390px] mx-auto overflow-x-hidden pb-12">
      {/* Header Container */}
      <div className="bg-white h-[104px] w-full shadow-[0px_1px_4px_rgba(0,0,0,0.08)] flex items-center px-[16px] gap-[12px] shrink-0">
        <button
          onClick={onBack}
          className="w-[40px] h-[40px] flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-all"
        >
          <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24">
            <path d="M15 18L9 12L15 6" stroke="#18181B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          </svg>
        </button>
        <h1 className="font-['Segoe_UI',sans-serif] font-bold text-[22px] text-[#18181b]">Notificações</h1>
      </div>

      <div className="flex flex-col gap-[24px] p-[16px] w-full">
        {/* Section: Lembretes de Humor */}
        <div className="flex flex-col gap-[8px]">
          <h2 className="font-['Segoe_UI',sans-serif] font-bold text-[13px] tracking-[1.5px] uppercase text-gray-500 pl-[8px]">
            Lembretes de Humor
          </h2>
          <div className="bg-white rounded-[20px] border border-gray-100 overflow-hidden shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
            {/* Row: Manhã */}
            <div className="h-[80px] border-b border-gray-50 flex items-center px-[20px] justify-between">
              <div className="flex items-center gap-[14px]">
                <div className="bg-[#eff6ff] rounded-[12px] w-[36px] h-[36px] flex items-center justify-center shadow-inner">
                  <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 16 16">
                    <path d="M8 4V8L10.6667 9.33333" stroke="#2B7FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
                    <circle cx="8" cy="8" r="6.5" stroke="#2B7FFF" strokeWidth="1.6" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-['Segoe_UI',sans-serif] font-bold text-[15px] text-[#18181b]">Manhã</span>
                  <span className="text-[10px] text-gray-400 font-medium">05:00 - 11:59</span>
                </div>
              </div>
              <div className="flex items-center gap-[14px]">
                <div className="relative border border-gray-200 rounded-[12px] px-[10px] py-[6px] bg-gray-50/50 focus-within:border-[#80c4c1] transition-all w-[90px] flex justify-center shadow-sm">
                  <input
                    type="time"
                    min="05:00"
                    max="11:59"
                    value={reminders.morning.time}
                    onChange={(e) => updateTime('morning', e.target.value)}
                    className="font-['Segoe_UI',sans-serif] text-[15px] font-bold text-[#18181b] bg-transparent border-none p-0 focus:ring-0 w-full text-center cursor-pointer appearance-none"
                  />
                </div>
                <CustomToggle active={reminders.morning.active} onClick={() => toggle('morning')} />
              </div>
            </div>

            {/* Row: Tarde */}
            <div className="h-[80px] border-b border-gray-50 flex items-center px-[20px] justify-between">
              <div className="flex items-center gap-[14px]">
                <div className="bg-[rgba(255,137,4,0.1)] rounded-[12px] w-[36px] h-[36px] flex items-center justify-center shadow-inner">
                  <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 16 16">
                    <path d="M8 4V8L10.6667 9.33333" stroke="#FF8904" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
                    <circle cx="8" cy="8" r="6.5" stroke="#FF8904" strokeWidth="1.6" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-['Segoe_UI',sans-serif] font-bold text-[15px] text-[#18181b]">Tarde</span>
                  <span className="text-[10px] text-gray-400 font-medium">12:00 - 18:59</span>
                </div>
              </div>
              <div className="flex items-center gap-[14px]">
                <div className="relative border border-gray-200 rounded-[12px] px-[10px] py-[6px] bg-gray-50/50 focus-within:border-[#80c4c1] transition-all w-[90px] flex justify-center shadow-sm">
                  <input
                    type="time"
                    min="12:00"
                    max="18:59"
                    value={reminders.afternoon.time}
                    onChange={(e) => updateTime('afternoon', e.target.value)}
                    className="font-['Segoe_UI',sans-serif] text-[15px] font-bold text-[#18181b] bg-transparent border-none p-0 focus:ring-0 w-full text-center cursor-pointer appearance-none"
                  />
                </div>
                <CustomToggle active={reminders.afternoon.active} onClick={() => toggle('afternoon')} />
              </div>
            </div>

            {/* Row: Noite */}
            <div className="h-[80px] flex items-center px-[20px] justify-between">
              <div className="flex items-center gap-[14px]">
                <div className="bg-[#faf5ff] rounded-[12px] w-[36px] h-[36px] flex items-center justify-center shadow-inner">
                  <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 16 16">
                    <path d="M8 4V8L10.6667 9.33333" stroke="#AD46FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
                    <circle cx="8" cy="8" r="6.5" stroke="#AD46FF" strokeWidth="1.6" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-['Segoe_UI',sans-serif] font-bold text-[15px] text-[#18181b]">Noite</span>
                  <span className="text-[10px] text-gray-400 font-medium">19:00 - 04:59</span>
                </div>
              </div>
              <div className="flex items-center gap-[14px]">
                <div className="relative border border-gray-200 rounded-[12px] px-[10px] py-[6px] bg-gray-50/50 focus-within:border-[#80c4c1] transition-all w-[90px] flex justify-center shadow-sm">
                  <input
                    type="time"
                    min="19:00"
                    max="04:59"
                    value={reminders.night.time}
                    onChange={(e) => updateTime('night', e.target.value)}
                    className="font-['Segoe_UI',sans-serif] text-[15px] font-bold text-[#18181b] bg-transparent border-none p-0 focus:ring-0 w-full text-center cursor-pointer appearance-none"
                  />
                </div>
                <CustomToggle active={reminders.night.active} onClick={() => toggle('night')} />
              </div>
            </div>
          </div>
        </div>

        {/* Section: Medicamentos */}
        <div className="flex flex-col gap-[8px]">
          <h2 className="font-['Segoe_UI',sans-serif] font-bold text-[13px] tracking-[1.5px] uppercase text-gray-500 pl-[8px]">
            Medicamentos
          </h2>
          <div className="bg-white rounded-[20px] border border-gray-100 p-[20px] flex items-center justify-between shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-[14px] flex-1">
              <div className="bg-[#80c4c1] rounded-[12px] w-[36px] h-[36px] flex items-center justify-center shrink-0 shadow-md">
                <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 16 16">
                  <path d={svgPaths.p1e6eff00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                  <path d={svgPaths.p5baad20} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                </svg>
              </div>
              <p className="font-['Segoe_UI',sans-serif] font-bold text-[15px] text-[#18181b] leading-[22px]">
                Me lembre de tomar meus medicamentos
              </p>
            </div>
            <CustomToggle active={reminders.medication.active} onClick={() => toggle('medication')} />
          </div>
        </div>

        {/* Info Container */}
        <div className="bg-[#eff6ff] rounded-[16px] border border-[#dbeafe] p-[17px]">
          <p className="font-['Segoe_UI',sans-serif] leading-[19.5px] text-[#1447e6] text-[12px]">
            As notificações ajudam você a manter a consistência nos registros e no tratamento. Você pode alterar os horários clicando sobre eles.
          </p>
        </div>
      </div>
    </div>
  );
}
