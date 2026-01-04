import React, { useState, useRef, useEffect } from 'react';
import { Settings, Cloud, CloudRain, Sun, CloudSnow, Sunrise, Moon, ChevronLeft, ChevronRight, Candy, Wheat, Wine, Clock, Coffee } from 'lucide-react';
import { Button } from './Button';
import { MedicationCheckModal } from './MedicationCheckModal';
import { PillVisualization } from './PillVisualization';
import bgImage from 'figma:asset/b518b9f4b297cc8b217716933a81b1d2f0c00236.png';

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
    doseTimes: string[];
    pill?: {
      shape: 'capsule' | 'round' | 'square' | 'triangular';
      size: 'S' | 'M' | 'L';
      color1: string;
      color2: string;
    };
  }>;
  onMedicationCheck: (medId: string, time: string) => void;
  medicationTaken: { [key: string]: string };
  activeDietaryTrackers: {
    sugar: boolean;
    gluten: boolean;
    alcohol: boolean;
    caffeine: boolean;
  };
  trackWeatherTime: boolean;
  onMoodSelect: (period: Period, mood: string) => void;
}

const moodEmojis: { [key: string]: string } = {
  Sad: '😟',
  Angry: '😠',
  Anxious: '😫',
  Happy: '😁',
  Apathetic: '😶'
};

const allMoods = [
  { name: 'Sad', emoji: '😟' },
  { name: 'Apathetic', emoji: '😶' },
  { name: 'Anxious', emoji: '😫' },
  { name: 'Angry', emoji: '😠' },
  { name: 'Happy', emoji: '😁' }
];

type Period = 'morning' | 'afternoon' | 'night';

export function HomeScreen({ onRecordMood, onSettings, todayMoods, medications, onMedicationCheck, medicationTaken, activeDietaryTrackers, trackWeatherTime, onMoodSelect }: HomeScreenProps) {
  const [selectedMed, setSelectedMed] = useState<{ id: string; name: string; quantity: string } | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [changingMoodPeriod, setChangingMoodPeriod] = useState<Period | null>(null);
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);
  
  // Get current period
  const getCurrentPeriod = (): Period => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    return 'night';
  };
  
  // Check if a period has passed (can be edited)
  const isPeriodPast = (period: Period): boolean => {
    const hour = currentTime.getHours();
    if (period === 'morning') {
      return hour >= 12; // Morning ends at 12:00
    } else if (period === 'afternoon') {
      return hour >= 18; // Afternoon ends at 18:00
    } else {
      return true; // Night is always editable (current or past)
    }
  };
  
  // Check if a period is the current period
  const isCurrentPeriod = (period: Period): boolean => {
    return getCurrentPeriod() === period;
  };
  
  const [activePeriod, setActivePeriod] = useState<Period>(getCurrentPeriod());
  
  // Dietary tracking state
  const [dietaryChecks, setDietaryChecks] = useState<Record<Period, {
    sugar: boolean;
    gluten: boolean;
    alcohol: boolean;
    caffeine: boolean;
  }>>({
    morning: { sugar: false, gluten: false, alcohol: false, caffeine: false },
    afternoon: { sugar: false, gluten: false, alcohol: false, caffeine: false },
    night: { sugar: false, gluten: false, alcohol: false, caffeine: false }
  });
  
  const toggleDietary = (period: Period, type: 'sugar' | 'gluten' | 'alcohol' | 'caffeine', e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Don't allow toggling for future periods
    if (!isPeriodPast(period) && !isCurrentPeriod(period)) {
      return;
    }
    
    setDietaryChecks(prev => ({
      ...prev,
      [period]: {
        ...prev[period],
        [type]: !prev[period][type]
      }
    }));
  };
  
  // Get current weather (mock data)
  const weather = {
    temp: 24,
    condition: 'sunny' as 'sunny' | 'cloudy' | 'rainy' | 'snowy'
  };
  
  const WeatherIcon = () => {
    switch (weather.condition) {
      case 'sunny':
        return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="w-5 h-5 text-gray-400" />;
      case 'rainy':
        return <CloudRain className="w-5 h-5 text-blue-400" />;
      case 'snowy':
        return <CloudSnow className="w-5 h-5 text-blue-200" />;
    }
  };
  
  const getQuantityFromName = (name: string) => {
    const match = name.match(/\d+\s*[a-zA-Z]+/);
    return match ? match[0] : '1 dose';
  };
  
  // Group medications by period
  const getMedicationsByPeriod = () => {
    const byPeriod: Record<Period, Array<{
      medId: string;
      name: string;
      time: string;
      pill?: any;
    }>> = {
      morning: [],
      afternoon: [],
      night: []
    };
    
    medications.forEach(med => {
      med.doseTimes.forEach(doseTime => {
        const [hour] = doseTime.split(':').map(Number);
        let period: Period;
        
        if (hour >= 0 && hour < 12) {
          period = 'morning';
        } else if (hour >= 12 && hour < 18) {
          period = 'afternoon';
        } else {
          period = 'night';
        }
        
        byPeriod[period].push({
          medId: `${med.id}-${doseTime}`,
          name: med.name,
          time: doseTime,
          pill: med.pill
        });
      });
    });
    
    // Sort each period by time
    Object.keys(byPeriod).forEach(key => {
      byPeriod[key as Period].sort((a, b) => {
        const [aHour, aMin] = a.time.split(':').map(Number);
        const [bHour, bMin] = b.time.split(':').map(Number);
        return (aHour * 60 + aMin) - (bHour * 60 + bMin);
      });
    });
    
    return byPeriod;
  };
  
  const medicationsByPeriod = getMedicationsByPeriod();
  
  // Scroll to specific period
  const scrollToPeriod = (period: Period, behavior: 'smooth' | 'auto' = 'smooth') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const periods: Period[] = ['morning', 'afternoon', 'night'];
      // Add 1 to index because we have a duplicated card at the start
      const periodIndex = periods.indexOf(period) + 1;
      const containerWidth = container.offsetWidth;
      
      // Card is 75% of container width, with 8px padding on each side (16px total)
      const cardWithPadding = containerWidth * 0.75 + 16;
      
      // Calculate scroll position to center the card
      const scrollPosition = (periodIndex * cardWithPadding) - (containerWidth / 2) + (containerWidth * 0.75 / 2) + 8;
      
      container.scrollTo({
        left: scrollPosition,
        behavior
      });
      
      setActivePeriod(period);
    }
  };
  
  // Handle scroll end to detect if we need to jump to real card and snap to center
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScrollEnd = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const containerWidth = container.offsetWidth;
        const cardWithPadding = containerWidth * 0.75 + 16;
        const scrollLeft = container.scrollLeft;
        const centerPosition = scrollLeft + (containerWidth / 2);
        
        // Find which card is closest to center
        const currentIndex = Math.round((centerPosition - (containerWidth * 0.75 / 2) - 8) / cardWithPadding);
        
        // If we're at the first duplicated card (night at index 0)
        if (currentIndex === 0) {
          // Jump to the real night card (index 3)
          const scrollPosition = (3 * cardWithPadding) - (containerWidth / 2) + (containerWidth * 0.75 / 2) + 8;
          container.scrollTo({
            left: scrollPosition,
            behavior: 'auto'
          });
          setActivePeriod('night');
        }
        // If we're at the last duplicated card (morning at index 4)
        else if (currentIndex === 4) {
          // Jump to the real morning card (index 1)
          const scrollPosition = (1 * cardWithPadding) - (containerWidth / 2) + (containerWidth * 0.75 / 2) + 8;
          container.scrollTo({
            left: scrollPosition,
            behavior: 'auto'
          });
          setActivePeriod('morning');
        }
        // Update active period and snap to center
        else {
          const periods: Period[] = ['morning', 'afternoon', 'night'];
          const realIndex = currentIndex - 1;
          if (realIndex >= 0 && realIndex < 3) {
            const newPeriod = periods[realIndex];
            setActivePeriod(newPeriod);
            // Snap to center
            const scrollPosition = (currentIndex * cardWithPadding) - (containerWidth / 2) + (containerWidth * 0.75 / 2) + 8;
            if (Math.abs(container.scrollLeft - scrollPosition) > 1) {
              container.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
              });
            }
          }
        }
      }, 150);
    };
    
    container.addEventListener('scroll', handleScrollEnd);
    
    return () => {
      container.removeEventListener('scroll', handleScrollEnd);
      clearTimeout(scrollTimeout);
    };
  }, []);
  
  // Scroll to active period on mount
  useEffect(() => {
    // Small delay to ensure container is rendered
    setTimeout(() => {
      scrollToPeriod(getCurrentPeriod(), 'auto');
    }, 100);
  }, []);
  
  const PeriodCard = ({ 
    period, 
    mood, 
    medications,
    onClick
  }: { 
    period: Period; 
    mood?: string; 
    medications: Array<any>;
    onClick?: () => void;
  }) => {
    const getPeriodGradient = () => {
      if (period === 'morning') {
        return 'linear-gradient(84deg, rgb(186, 222, 255) 0%, rgb(255, 231, 151) 100%)';
      } else if (period === 'afternoon') {
        return 'linear-gradient(84deg, rgb(255, 200, 124) 0%, rgb(255, 165, 124) 100%)';
      } else {
        return 'linear-gradient(84deg, rgb(107, 114, 255) 0%, rgb(186, 143, 255) 100%)';
      }
    };
    
    const getPeriodIcon = () => {
      if (period === 'morning') {
        return <Sunrise className="w-6 h-6 text-white opacity-60" />;
      } else if (period === 'afternoon') {
        return <Sun className="w-6 h-6 text-white opacity-60" />;
      } else {
        return <Moon className="w-6 h-6 text-white opacity-60" />;
      }
    };
    
    const isActive = activePeriod === period;
    const isPast = isPeriodPast(period);
    const isCurrent = isCurrentPeriod(period);
    const isEditable = isPast || isCurrent;
    
    const handleCardClick = (e: React.MouseEvent) => {
      // Only center the card if it's not already active (centered)
      if (onClick && !isActive) {
        onClick();
      }
    };
    
    return (
      <div 
        className={`flex-shrink-0 w-[75%] px-2 transition-opacity ${!isEditable ? 'opacity-50' : 'opacity-100'}`}
        onClick={handleCardClick}
      >
        <div className="rounded-3xl border border-gray-200 bg-white h-[600px] flex flex-col overflow-hidden">
          {/* Period Header with Gradient */}
          <div 
            className="relative px-6 py-3 rounded-t-3xl"
            style={{ background: getPeriodGradient() }}
          >
            {/* Icon */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              {getPeriodIcon()}
            </div>
            
            {/* Title */}
            <h2 className="text-center text-[22px] text-[#18181b]">
              {period === 'morning' ? 'Manhã' : period === 'afternoon' ? 'Tarde' : 'Noite'}
            </h2>
          </div>
          
          {/* Mood Selection */}
          <div 
            className="px-6 py-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {mood && changingMoodPeriod !== period ? (
              /* Selected mood - clicking shows change options */
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (isEditable) {
                    setChangingMoodPeriod(period);
                  }
                }}
                disabled={!isEditable}
                className={`flex flex-col items-center justify-center w-full gap-2 ${
                  isEditable ? 'cursor-pointer hover:scale-105 transition-transform' : 'cursor-not-allowed'
                }`}
              >
                <span className="text-6xl">{moodEmojis[mood]}</span>
                <span className="text-sm text-[rgb(var(--color-text))]">
                  {mood === 'Sad' ? 'Triste' :
                   mood === 'Apathetic' ? 'Apático' :
                   mood === 'Anxious' ? 'Ansioso' :
                   mood === 'Angry' ? 'Irritado' :
                   'Feliz'}
                </span>
              </button>
            ) : mood && changingMoodPeriod === period ? (
              /* Changing mood - show all options with current at opacity 100% and others at 50% */
              <div className="relative">
                {/* "alterar humor?" text */}
                <p className="text-xs text-center text-[rgb(var(--color-text-secondary))] mb-3">
                  alterar humor?
                </p>
                
                {/* Overlay to detect clicks outside */}
                <div 
                  className="fixed inset-0 z-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    setChangingMoodPeriod(null);
                  }}
                />
                
                {/* Mood options */}
                <div className="flex items-center justify-between gap-2 relative z-10">
                  {allMoods.map((moodOption) => (
                    <button
                      key={moodOption.name}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isEditable) {
                          onMoodSelect(period, moodOption.name);
                          setChangingMoodPeriod(null);
                        }
                      }}
                      disabled={!isEditable}
                      className={`flex items-center justify-center transition-all ${
                        moodOption.name === mood ? 'opacity-100' : 'opacity-50'
                      } ${
                        isEditable 
                          ? 'hover:scale-110 cursor-pointer'
                          : 'cursor-not-allowed opacity-50'
                      }`}
                      title={moodOption.name}
                    >
                      <span className="text-3xl">{moodOption.emoji}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* No mood selected - show mood options */
              <div className="flex items-center justify-between gap-2">
                {allMoods.map((moodOption) => (
                  <button
                    key={moodOption.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isEditable) {
                        onMoodSelect(period, moodOption.name);
                        setChangingMoodPeriod(null);
                      }
                    }}
                    disabled={!isEditable}
                    className={`flex items-center justify-center transition-transform ${
                      isEditable 
                        ? 'hover:scale-110 cursor-pointer'
                        : 'cursor-not-allowed opacity-50'
                    }`}
                    title={moodOption.name}
                  >
                    <span className="text-3xl">{moodOption.emoji}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Medications */}
          <div 
            className="flex-1 overflow-y-auto space-y-3 px-6 mb-4"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
          >
            {medications.length > 0 ? (
              medications.map(dose => {
                const isTaken = medicationTaken[dose.medId] !== undefined;
                const takenTime = medicationTaken[dose.medId];
                
                return (
                  <div 
                    key={dose.medId}
                    className={`backdrop-blur-md rounded-xl p-4 border transition-all ${
                      isTaken 
                        ? 'bg-[rgba(216,230,234,0.5)] border-[#aad5e8] opacity-75'
                        : 'bg-white/50 border-[#a7a7ae]'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-start gap-3">
                      {/* Checkbox */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isTaken && isEditable) {
                            setSelectedMed({ 
                              id: dose.medId, 
                              name: dose.name, 
                              quantity: getQuantityFromName(dose.name) 
                            });
                          }
                        }}
                        disabled={!isEditable}
                        className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                          isTaken 
                            ? 'bg-[#6e8c89] border-[#e4e4e7]' 
                            : isEditable
                            ? 'border-[#7e7e7e] hover:border-gray-400 cursor-pointer'
                            : 'border-gray-200 cursor-not-allowed'
                        }`}
                      >
                        {isTaken && (
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                          </svg>
                        )}
                      </button>
                      
                      {/* Medication Info - Takes remaining space */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{dose.name}</p>
                        <small className="text-[rgb(var(--color-text-secondary))]">
                          {getQuantityFromName(dose.name)}
                        </small>
                      </div>
                      
                      {/* Time and Pill stacked vertically on the right */}
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        {/* Time with Clock Icon */}
                        <div className="flex items-center gap-1">
                          <Clock className="w-5 h-5 opacity-50" />
                          <p className={`text-sm ${isTaken ? 'opacity-75' : ''}`}>{isTaken ? takenTime : dose.time}</p>
                        </div>
                        
                        {/* Pill Visualization */}
                        {dose.pill && (
                          <div className="w-10 h-10">
                            <PillVisualization 
                              shape={dose.pill.shape}
                              size="S"
                              color1={dose.pill.color1}
                              color2={dose.pill.color2}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8">
                <p className="text-[rgb(var(--color-text-secondary))]">Nenhum medicamento</p>
              </div>
            )}
          </div>
          
          {/* Dietary Checkboxes - Moved to bottom */}
          <div 
            className="mt-auto px-6 pb-6 pt-4 border-t border-[rgb(var(--color-border))]" 
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}
            onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); }}
            onTouchStart={(e) => { e.stopPropagation(); e.preventDefault(); }}
            onPointerDown={(e) => { e.stopPropagation(); e.preventDefault(); }}
          >
            <div className="flex gap-2 justify-center">
              {activeDietaryTrackers.sugar && (
                <button
                  onClick={(e) => { e.stopPropagation(); e.preventDefault(); toggleDietary(period, 'sugar', e); }}
                  onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); }}
                  onTouchStart={(e) => { e.stopPropagation(); e.preventDefault(); }}
                  onPointerDown={(e) => { e.stopPropagation(); e.preventDefault(); }}
                  disabled={!isEditable}
                  className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${
                    dietaryChecks[period].sugar
                      ? 'bg-[rgb(var(--color-primary))] border-[rgb(var(--color-primary))]'
                      : isEditable
                      ? 'border-[#a7a7ae] hover:border-gray-400 cursor-pointer'
                      : 'border-gray-200 cursor-not-allowed'
                  }`}
                  title="Açúcar"
                >
                  <Candy className={`w-6 h-6 ${dietaryChecks[period].sugar ? 'text-white' : 'text-[#696969]'}`} />
                </button>
              )}
              
              {activeDietaryTrackers.gluten && (
                <button
                  onClick={(e) => { e.stopPropagation(); e.preventDefault(); toggleDietary(period, 'gluten', e); }}
                  onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); }}
                  onTouchStart={(e) => { e.stopPropagation(); e.preventDefault(); }}
                  onPointerDown={(e) => { e.stopPropagation(); e.preventDefault(); }}
                  disabled={!isEditable}
                  className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${
                    dietaryChecks[period].gluten
                      ? 'bg-[rgb(var(--color-primary))] border-[rgb(var(--color-primary))]'
                      : isEditable
                      ? 'border-[#a7a7ae] hover:border-gray-400 cursor-pointer'
                      : 'border-gray-200 cursor-not-allowed'
                  }`}
                  title="Glúten"
                >
                  <Wheat className={`w-6 h-6 ${dietaryChecks[period].gluten ? 'text-white' : 'text-[#696969]'}`} />
                </button>
              )}
              
              {activeDietaryTrackers.alcohol && (
                <button
                  onClick={(e) => { e.stopPropagation(); e.preventDefault(); toggleDietary(period, 'alcohol', e); }}
                  onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); }}
                  onTouchStart={(e) => { e.stopPropagation(); e.preventDefault(); }}
                  onPointerDown={(e) => { e.stopPropagation(); e.preventDefault(); }}
                  disabled={!isEditable}
                  className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${
                    dietaryChecks[period].alcohol
                      ? 'bg-[rgb(var(--color-primary))] border-[rgb(var(--color-primary))]'
                      : isEditable
                      ? 'border-[#a7a7ae] hover:border-gray-400 cursor-pointer'
                      : 'border-gray-200 cursor-not-allowed'
                  }`}
                  title="Álcool"
                >
                  <Wine className={`w-6 h-6 ${dietaryChecks[period].alcohol ? 'text-white' : 'text-[#696969]'}`} />
                </button>
              )}
              
              {activeDietaryTrackers.caffeine && (
                <button
                  onClick={(e) => { e.stopPropagation(); e.preventDefault(); toggleDietary(period, 'caffeine', e); }}
                  onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); }}
                  onTouchStart={(e) => { e.stopPropagation(); e.preventDefault(); }}
                  onPointerDown={(e) => { e.stopPropagation(); e.preventDefault(); }}
                  disabled={!isEditable}
                  className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${
                    dietaryChecks[period].caffeine
                      ? 'bg-[rgb(var(--color-primary))] border-[rgb(var(--color-primary))]'
                      : isEditable
                      ? 'border-[#a7a7ae] hover:border-gray-400 cursor-pointer'
                      : 'border-gray-200 cursor-not-allowed'
                  }`}
                  title="Cafeína"
                >
                  <Coffee className={`w-6 h-6 ${dietaryChecks[period].caffeine ? 'text-white' : 'text-[#696969]'}`} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div 
      className="min-h-screen pb-24 bg-cover bg-center bg-no-repeat flex flex-col"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Header */}
      <div className="p-6 flex items-center justify-between bg-white flex-shrink-0">
        <div>
          <h1 className="text-[rgb(var(--color-text))]">
            {currentTime.getHours() < 12 ? 'Bom dia!' : 
             currentTime.getHours() < 18 ? 'Boa tarde!' : 
             'Boa noite!'}
          </h1>
          {trackWeatherTime && (
            <div className="flex items-center gap-2 mt-1">
              <WeatherIcon />
              <span className="text-[rgb(var(--color-text-secondary))]">
                {weather.temp}°C • {weather.condition === 'sunny' ? 'Ensolarado' : 
                   weather.condition === 'cloudy' ? 'Nublado' : 
                   weather.condition === 'rainy' ? 'Chuvoso' : 'Nevando'}
              </span>
            </div>
          )}
        </div>
        <button 
          onClick={onSettings}
          className="w-11 h-11 rounded-full hover:bg-[rgb(var(--color-gray-100))] flex items-center justify-center transition-colors"
        >
          <Settings className="w-6 h-6 text-[rgb(var(--color-text-secondary))]" />
        </button>
      </div>
      
      {/* Carousel Container with Fade Effect */}
      <div className="relative mb-8 flex-1 flex items-center">
        {/* Left Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-transparent to-transparent z-10 pointer-events-none" />
        
        {/* Right Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-transparent to-transparent z-10 pointer-events-none" />
        
        {/* Scrollable Cards */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide w-full"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {/* Duplicated night card for infinite scroll */}
          <PeriodCard 
            period="night" 
            mood={todayMoods.night} 
            medications={medicationsByPeriod.night}
            onClick={() => scrollToPeriod('night')}
          />
          {/* Real cards */}
          <PeriodCard 
            period="morning" 
            mood={todayMoods.morning} 
            medications={medicationsByPeriod.morning}
            onClick={() => scrollToPeriod('morning')}
          />
          <PeriodCard 
            period="afternoon" 
            mood={todayMoods.afternoon} 
            medications={medicationsByPeriod.afternoon}
            onClick={() => scrollToPeriod('afternoon')}
          />
          <PeriodCard 
            period="night" 
            mood={todayMoods.night} 
            medications={medicationsByPeriod.night}
            onClick={() => scrollToPeriod('night')}
          />
          {/* Duplicated morning card for infinite scroll */}
          <PeriodCard 
            period="morning" 
            mood={todayMoods.morning} 
            medications={medicationsByPeriod.morning}
            onClick={() => scrollToPeriod('morning')}
          />
        </div>
      </div>
      
      {/* Medication Check Modal */}
      {selectedMed && (
        <MedicationCheckModal
          medicationName={selectedMed.name}
          quantity={selectedMed.quantity}
          onClose={() => setSelectedMed(null)}
          onConfirm={(time) => {
            onMedicationCheck(selectedMed.id, time);
            setSelectedMed(null);
          }}
        />
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
}