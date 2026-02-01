import React, { useState, useEffect } from 'react';
import { Clock, Candy, Wheat, Wine, Coffee, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MedicationCheckModal } from './MedicationCheckModal';
import { PillVisualization } from './PillVisualization';
import svgMoonPaths from "../imports/svg-niby5m8f0i";

const commonSvgPaths = {
  arrow: "M13.8564 7.6L6.9282 0L0 7.6H13.8564Z",
  star: "M2.37764 0L2.9103 1.63943H4.63412L3.23955 2.6528L3.77221 4.29223L2.37764 3.27886L0.983069 4.29223L1.51573 2.6528L0.121162 1.63943H1.84498L2.37764 0Z"
};

interface HomeScreenProps {
  onRecordMood: (period?: string) => void;
  onSettings: () => void;
  todayMoods: {
    morning?: string;
    afternoon?: string;
    night?: string;
  };
  medications: Array<{
    id: string;
    name: string;
    quantity: string;
    unit: string;
    doseTimes: string[];
    pill?: {
      shape: 'capsule' | 'round' | 'square' | 'triangular';
      size: 'S' | 'M' | 'L';
      color1: string;
      color2: string;
      image?: string;
    };
  }>;
  onMedicationCheck: (medId: string, time: string) => void;
  medicationTaken: { [key: string]: string };
  onMoodSelect: (period: Period, mood: string) => void;
}

const allMoods = [
  { name: 'Sad', emoji: '😟', label: 'Triste' },
  { name: 'Apathetic', emoji: '😶', label: 'Apático' },
  { name: 'Anxious', emoji: '😫', label: 'Ansioso' },
  { name: 'Angry', emoji: '😠', label: 'Irritado' },
  { name: 'Happy', emoji: '😁', label: 'Feliz' }
];

type Period = 'morning' | 'afternoon' | 'night';

export function HomeScreen({ todayMoods, medications, onMedicationCheck, medicationTaken, onMoodSelect, onSettings }: HomeScreenProps) {
  const [selectedMed, setSelectedMed] = useState<{ id: string; name: string; quantity: string } | null>(null);

  const getCurrentPeriod = (): Period => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    return 'night';
  };

  const [activePeriod, setActivePeriod] = useState<Period>(getCurrentPeriod());
  const [direction, setDirection] = useState(0);

  const periods: Period[] = ['morning', 'afternoon', 'night'];

  const navigateTo = (dir: number) => {
    const currentIndex = periods.indexOf(activePeriod);
    let nextIndex = currentIndex + dir;
    if (nextIndex < 0) nextIndex = periods.length - 1;
    if (nextIndex >= periods.length) nextIndex = 0;
    setDirection(dir);
    setActivePeriod(periods[nextIndex]);
  };

  const isPeriodPast = (p: Period): boolean => {
    const hour = new Date().getHours();
    if (p === 'morning') return hour >= 12;
    if (p === 'afternoon') return hour >= 18;
    return true;
  };

  const isCurrentPeriod = (p: Period): boolean => getCurrentPeriod() === p;

  const formatQuantity = (quantity: string, unit: string) => {
    const q = parseFloat(quantity) || 1;
    let u = unit;

    // Simple pluralization rules for common units
    if (q > 1) {
      if (unit === 'comprimido') u = 'comprimidos';
      else if (unit === 'cápsula') u = 'cápsulas';
      else if (unit === 'gota') u = 'gotas';
    }

    return `${q} ${u}`;
  };

  const getMedicationsForPeriod = (p: Period) => {
    const result: any[] = [];
    medications.forEach(med => {
      med.doseTimes.forEach(doseTime => {
        const [hour] = doseTime.split(':').map(Number);
        let medPeriod: Period;
        if (hour >= 0 && hour < 12) medPeriod = 'morning';
        else if (hour >= 12 && hour < 18) medPeriod = 'afternoon';
        else medPeriod = 'night';
        if (medPeriod === p) {
          result.push({
            medId: `${med.id}-${doseTime}`,
            originalId: med.id,
            name: med.name,
            quantity: med.quantity,
            unit: med.unit,
            time: doseTime,
            pill: med.pill
          });
        }
      });
    });
    return result.sort((a, b) => a.time.localeCompare(b.time));
  };

  const getPeriodStyles = (p: Period) => {
    switch (p) {
      case 'morning':
        return {
          bg: 'bg-gradient-to-b from-[#74c3ff] to-[#f5fdff]',
          headerBg: 'bg-[#fdfdfd]',
          title: 'Manhã',
          titleColor: 'text-[#18181b]',
          sun: true,
          sunPos: { left: '3px', top: '23px', size: '104px' },
          stars: false,
          cardBg: 'bg-white',
          textColor: 'text-[#18181b]',
          arrowColor: '#C5C5C5'
        };
      case 'afternoon':
        return {
          bg: 'bg-gradient-to-b from-[#35bcff] to-[#008cff]',
          headerBg: 'bg-[#fbf6e2]',
          title: 'Tarde',
          titleColor: 'text-[#18181b]',
          sun: true,
          sunPos: { left: '176px', top: '-40px', size: '78.7px' },
          stars: false,
          cardBg: 'bg-white',
          textColor: 'text-[#18181b]',
          arrowColor: '#C5C5C5'
        };
      case 'night':
        return {
          bg: 'bg-gradient-to-br from-[#684e96] to-[#022745]',
          headerBg: 'bg-[#00092a]',
          title: 'Noite',
          titleColor: 'text-[#d9d9d9]',
          sun: false, // means moon
          moonPos: { left: '195px', top: '5px', w: '41.036px', h: '46.466px' },
          stars: true,
          cardBg: 'bg-[#252433]',
          textColor: 'text-white',
          arrowColor: '#C5C5C5'
        };
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 390 : -390,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 390 : -390,
      opacity: 0
    })
  };

  const activeStyles = getPeriodStyles(activePeriod);
  const activeMood = todayMoods[activePeriod];
  const activeMeds = getMedicationsForPeriod(activePeriod);
  const isEditable = isPeriodPast(activePeriod) || isCurrentPeriod(activePeriod);

  return (
    <div className={`relative min-h-screen w-full overflow-hidden flex flex-col transition-colors duration-500 ${activeStyles.bg}`}>

      {/* CONFIRMATION MODAL - Moved to top for z-index hierarchy */}
      {selectedMed && (
        <MedicationCheckModal
          medicationName={selectedMed.name}
          quantity={selectedMed.quantity}
          onConfirm={(time) => {
            onMedicationCheck(selectedMed.id, time);
            setSelectedMed(null);
          }}
          onClose={() => setSelectedMed(null)}
        />
      )}
      <div className={`w-full h-[60px] relative z-50 shrink-0 shadow-sm transition-colors duration-500 overflow-hidden ${activeStyles.headerBg}`}>

        {/* Decorations */}
        {activeStyles.sun && activeStyles.sunPos && (
          <div
            className="absolute pointer-events-none transition-all duration-500"
            style={{
              left: activeStyles.sunPos.left,
              top: activeStyles.sunPos.top,
              width: activeStyles.sunPos.size,
              height: activeStyles.sunPos.size
            }}
          >
            <svg className="block size-full" fill="none" viewBox="0 0 104 104">
              <circle cx="52" cy="52" r="52" fill="url(#paint_sun_dynamic)" />
              <defs>
                <linearGradient id="paint_sun_dynamic" x1="52" y1="0" x2="52" y2="104" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FDC700" />
                  <stop offset="1" stopColor="#FF8904" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        )}

        {activePeriod === 'night' && activeStyles.moonPos && (
          <>
            {/* Moon (Using provided SVG paths to avoid cutting) */}
            <div
              className="absolute pointer-events-none transition-all duration-500"
              style={{
                left: activeStyles.moonPos.left,
                top: activeStyles.moonPos.top,
                width: activeStyles.moonPos.w,
                height: activeStyles.moonPos.h
              }}
            >
              <svg className="block size-full" fill="none" viewBox="0 0 41.036 46.4665">
                <path d={svgMoonPaths.p182f64c0} fill="url(#paint_moon_night_fixed)" />
                <defs>
                  <linearGradient id="paint_moon_night_fixed" x1="5.79905" x2="29.2878" y1="43.3159" y2="2.63225" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFCC11" />
                    <stop offset="1" stopColor="#FFF099" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            {/* Stars */}
            <div className="absolute left-[16px] top-[21px] size-[5px] opacity-[0.86]">
              <svg viewBox="0 0 4.75528 4.52254" fill="none"><path d="M2.37764 0L2.9103 1.63943H4.63412L3.23955 2.6528L3.77221 4.29223L2.37764 3.27886L0.983069 4.29223L1.51573 2.6528L0.121162 1.63943H1.84498L2.37764 0Z" fill="white" /></svg>
            </div>
            <div className="absolute left-[21px] top-[11px] size-[5px] opacity-[0.86]">
              <svg viewBox="0 0 4.75528 4.52254" fill="none"><path d="M2.37764 0L2.9103 1.63943H4.63412L3.23955 2.6528L3.77221 4.29223L2.37764 3.27886L0.983069 4.29223L1.51573 2.6528L0.121162 1.63943H1.84498L2.37764 0Z" fill="white" /></svg>
            </div>
            <div className="absolute left-[31px] top-[13px] size-[5px] opacity-[0.86]">
              <svg viewBox="0 0 4.75528 4.52254" fill="none"><path d="M2.37764 0L2.9103 1.63943H4.63412L3.23955 2.6528L3.77221 4.29223L2.37764 3.27886L0.983069 4.29223L1.51573 2.6528L0.121162 1.63943H1.84498L2.37764 0Z" fill="white" /></svg>
            </div>
          </>
        )}

        {/* Navigation Elements */}
        <button
          onClick={() => navigateTo(-1)}
          className="absolute left-[14px] top-[19px] z-10 w-4 h-4 flex items-center justify-center rotate-[-90deg]"
        >
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
            <path d={commonSvgPaths.arrow} fill={activeStyles.arrowColor} />
          </svg>
        </button>

        <h2 className={`absolute left-1/2 top-[12px] -translate-x-1/2 z-10 font-bold text-[22px] tracking-tight whitespace-nowrap ${activeStyles.titleColor}`}>
          {activeStyles.title}
        </h2>

        <button
          onClick={onSettings}
          className={`absolute right-[48px] top-[16px] z-10 w-6 h-6 flex items-center justify-center ${activeStyles.textColor} opacity-60 active:opacity-100 transition-opacity`}
        >
          <Settings className="w-6 h-6" />
        </button>

        <button
          onClick={() => navigateTo(1)}
          className="absolute right-[14px] top-[19px] z-10 w-4 h-4 flex items-center justify-center rotate-[90deg]"
        >
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
            <path d={commonSvgPaths.arrow} fill={activeStyles.arrowColor} />
          </svg>
        </button>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 relative">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activePeriod}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset }) => {
              const swipe = offset.x;
              if (swipe < -50) navigateTo(1);
              else if (swipe > 50) navigateTo(-1);
            }}
            className="absolute inset-0 flex flex-col p-4"
          >
            {/* Mood Tracking Card */}
            <div className="mt-2">
              <div className={`${activeStyles.cardBg} rounded-[16.4px] shadow-lg border border-[#a7a7ae] p-4 flex flex-col items-center gap-4`}>
                <p className={`font-bold text-[14px] text-center ${activeStyles.textColor}`}>
                  Como está se sentindo agora?
                </p>
                <div className="flex items-center justify-between w-full px-1">
                  {allMoods.map((mood) => {
                    const isSelected = mood.name === activeMood;
                    const opacityClass = activeMood
                      ? (isSelected ? 'opacity-100' : 'opacity-30')
                      : 'opacity-100';

                    return (
                      <button
                        key={mood.name}
                        onClick={() => isEditable && onMoodSelect(activePeriod, mood.name)}
                        className={`flex flex-col items-center transition-all duration-300 ${opacityClass} ${isEditable ? 'active:scale-95' : 'cursor-not-allowed'}`}
                      >
                        <span className="text-[34px] leading-none mb-1">{mood.emoji}</span>
                        <span className={`text-[10px] font-medium ${activeStyles.textColor}`}>{mood.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Section Prompt */}
            <p className={`font-bold text-[14px] text-center my-6 transition-colors duration-500 ${activePeriod === 'night' ? 'text-white' : 'text-[#18181b]'}`}>
              Marque quando tomar o remédio
            </p>

            {/* Medications List */}
            <div className="flex-1 overflow-y-auto space-y-4 pb-36">
              {activeMeds.length > 0 ? (
                activeMeds.map(dose => {
                  const isTaken = medicationTaken[dose.medId] !== undefined;
                  return (
                    <button
                      key={dose.medId}
                      onClick={() => !isTaken && isEditable && setSelectedMed({ id: dose.medId, name: dose.name, quantity: formatQuantity(dose.quantity, dose.unit) })}
                      className={`${activeStyles.cardBg} w-full text-left rounded-[16.4px] p-4 border border-[#a7a7ae] shadow-md flex items-center gap-3 transition-all ${isTaken ? 'opacity-60 grayscale-[0.2]' : 'active:scale-[0.98]'}`}
                    >
                      <div
                        className={`w-11 h-11 rounded-[6.8px] border-2 flex-shrink-0 flex items-center justify-center transition-colors ${isTaken ? 'bg-[#18181b] border-[#18181b]' : 'border-[#7e7e7e]'}`}
                      >
                        {isTaken ? (
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4">
                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : (
                          <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                            {dose.pill?.image ? (
                              <img src={dose.pill.image} alt="" className="w-full h-full object-cover rounded-[4px]" />
                            ) : dose.pill ? (
                              <PillVisualization
                                shape={dose.pill.shape}
                                size="S"
                                color1={dose.pill.color1}
                                color2={dose.pill.color2}
                              />
                            ) : null}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-bold text-[14px] truncate ${activeStyles.textColor}`}>{dose.name}</p>
                        <p className="text-[14px] font-bold text-black">{formatQuantity(dose.quantity, dose.unit)}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0 px-2 py-1">
                        <Clock className={`w-4 h-4 opacity-50 ${activeStyles.textColor}`} />
                        <span className={`text-[14px] font-bold ${activeStyles.textColor}`}>{isTaken ? medicationTaken[dose.medId] : dose.time}</span>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="text-center py-12 opacity-40">
                  <p className={activeStyles.textColor}>Nenhum medicamento para este período</p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}