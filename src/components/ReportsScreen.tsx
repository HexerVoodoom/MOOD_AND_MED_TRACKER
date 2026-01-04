import React, { useState, useMemo } from 'react';
import { Droplet, Moon, Coffee, Pill, Cloud, Thermometer, Utensils, ChevronRight, Sun, X, Candy, Wheat, Wine } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import bgImage from 'figma:asset/b518b9f4b297cc8b217716933a81b1d2f0c00236.png';

interface Medication {
  id: string;
  name: string;
}

interface ReportsScreenProps {
  medications?: Medication[];
}

interface MoodHistoryEntry {
  date: string; // YYYY-MM-DD format
  morning?: string;
  afternoon?: string;
  night?: string;
  medicationTaken?: string[];
  sleep?: number;
  dietary?: {
    morning?: { sugar?: boolean; gluten?: boolean; alcohol?: boolean; caffeine?: boolean };
    afternoon?: { sugar?: boolean; gluten?: boolean; alcohol?: boolean; caffeine?: boolean };
    night?: { sugar?: boolean; gluten?: boolean; alcohol?: boolean; caffeine?: boolean };
  };
  weather?: {
    temp?: number;
    condition?: string;
  };
}

// Map mood names to numeric values for the chart
const moodToValue: { [key: string]: number } = {
  'Sad': 1,
  'Angry': 2,
  'Anxious': 2,
  'Apathetic': 3,
  'Happy': 4
};

type DietaryItem = 'sugar' | 'gluten' | 'alcohol' | 'caffeine';

// Generate chart data from localStorage mood history
const generateChartData = (
  days: number, 
  selectedMedIds: string[],
  selectedDietaryItems: DietaryItem[]
) => {
  const historyStr = localStorage.getItem('moodHistory');
  const history: MoodHistoryEntry[] = historyStr ? JSON.parse(historyStr) : [];
  
  const data = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD
    const displayDate = date.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' });
    
    // Find entry for this date
    const entry = history.find(e => e.date === dateStr);
    
    // Calculate average mood for the day (if multiple periods recorded)
    let moodValue: number | null = null;
    if (entry) {
      const moods = [entry.morning, entry.afternoon, entry.night].filter(m => m);
      if (moods.length > 0) {
        const total = moods.reduce((sum, mood) => sum + (moodToValue[mood!] || 0), 0);
        moodValue = total / moods.length;
      }
    }
    
    // Check which medications were taken (filtered by selected)
    const medicationTakenIds = entry?.medicationTaken || [];
    const hasMedication = selectedMedIds.some(id => medicationTakenIds.includes(id));
    
    // Check dietary items for the day (filtered by selected)
    const dietary = entry?.dietary;
    const hasSugar = selectedDietaryItems.includes('sugar') && 
      (dietary?.morning?.sugar || dietary?.afternoon?.sugar || dietary?.night?.sugar);
    const hasGluten = selectedDietaryItems.includes('gluten') && 
      (dietary?.morning?.gluten || dietary?.afternoon?.gluten || dietary?.night?.gluten);
    const hasAlcohol = selectedDietaryItems.includes('alcohol') && 
      (dietary?.morning?.alcohol || dietary?.afternoon?.alcohol || dietary?.night?.alcohol);
    const hasCaffeine = selectedDietaryItems.includes('caffeine') && 
      (dietary?.morning?.caffeine || dietary?.afternoon?.caffeine || dietary?.night?.caffeine);
    
    data.push({
      date: displayDate,
      fullDate: dateStr,
      mood: moodValue,
      medication: hasMedication,
      temp: entry?.weather?.temp || null,
      weather: entry?.weather?.condition || null,
      sleep: entry?.sleep || null,
      sugar: hasSugar,
      gluten: hasGluten,
      alcohol: hasAlcohol,
      caffeine: hasCaffeine
    });
  }
  
  return data;
};

type SecondaryVariable = 'medication' | 'temperature' | 'weather' | 'sleep' | 'food';

export function ReportsScreen({ medications = [] }: ReportsScreenProps) {
  const [period, setPeriod] = useState('7 dias');
  const [secondaryVariable, setSecondaryVariable] = useState<SecondaryVariable>('medication');
  
  // Selected medication IDs (all selected by default)
  const [selectedMedIds, setSelectedMedIds] = useState<string[]>(medications.map(m => m.id));
  
  // Selected dietary items (all selected by default)
  const [selectedDietaryItems, setSelectedDietaryItems] = useState<DietaryItem[]>([
    'sugar', 'gluten', 'alcohol', 'caffeine'
  ]);
  
  // Update selected medications when medications prop changes
  React.useEffect(() => {
    setSelectedMedIds(medications.map(m => m.id));
  }, [medications]);
  
  // Toggle medication selection
  const toggleMedication = (id: string) => {
    setSelectedMedIds(prev => 
      prev.includes(id) ? prev.filter(mid => mid !== id) : [...prev, id]
    );
  };
  
  // Toggle dietary item selection
  const toggleDietaryItem = (item: DietaryItem) => {
    setSelectedDietaryItems(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };
  
  // Generate chart data based on selected period and filters
  const chartData = useMemo(() => {
    const days = period === '7 dias' ? 7 : period === '30 dias' ? 30 : 90;
    return generateChartData(days, selectedMedIds, selectedDietaryItems);
  }, [period, selectedMedIds, selectedDietaryItems]);
  
  // Check if there's sufficient data (at least 2 data points with mood)
  const hasInsufficientData = useMemo(() => {
    const validDataPoints = chartData.filter(d => d.mood !== null && d.mood !== undefined);
    return validDataPoints.length < 2;
  }, [chartData]);
  
  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    
    let yOffset = -25;
    
    return (
      <g>
        <circle cx={cx} cy={cy} r={4} fill="rgb(var(--color-primary))" />
        
        {/* Medication overlay */}
        {secondaryVariable === 'medication' && payload.medication && (
          <g>
            <circle cx={cx} cy={cy + yOffset} r={8} fill="rgb(var(--color-accent))" opacity={0.9} />
            <circle cx={cx} cy={cy + yOffset} r={3} fill="white" />
          </g>
        )}
        
        {/* Sleep overlay */}
        {secondaryVariable === 'sleep' && payload.sleep && payload.sleep < 6 && (
          <g>
            <circle cx={cx} cy={cy + yOffset} r={8} fill="rgb(var(--color-secondary))" opacity={0.9} />
            <text 
              x={cx} 
              y={cy + yOffset + 3} 
              textAnchor="middle" 
              fontSize="10" 
              fill="white"
            >
              Z
            </text>
          </g>
        )}
        
        {/* Food overlays with stacking */}
        {secondaryVariable === 'food' && (
          <>
            {payload.sugar && (
              <g>
                <circle cx={cx} cy={cy + yOffset} r={8} fill="#FF6B9D" opacity={0.9} />
                <text 
                  x={cx} 
                  y={cy + yOffset + 4} 
                  textAnchor="middle" 
                  fontSize="10" 
                  fill="white"
                >
                  🍬
                </text>
              </g>
            )}
            {payload.caffeine && (
              <g>
                <circle cx={cx} cy={cy + yOffset - 20} r={8} fill="#6F4E37" opacity={0.9} />
                <text 
                  x={cx} 
                  y={cy + yOffset - 16} 
                  textAnchor="middle" 
                  fontSize="10" 
                  fill="white"
                >
                  ☕
                </text>
              </g>
            )}
            {payload.alcohol && (
              <g>
                <circle cx={cx} cy={cy + yOffset - 40} r={8} fill="#7C3AED" opacity={0.9} />
                <text 
                  x={cx} 
                  y={cy + yOffset - 36} 
                  textAnchor="middle" 
                  fontSize="10" 
                  fill="white"
                >
                  🍷
                </text>
              </g>
            )}
            {payload.gluten && (
              <g>
                <circle cx={cx} cy={cy + yOffset - 60} r={8} fill="#D97706" opacity={0.9} />
                <text 
                  x={cx} 
                  y={cy + yOffset - 56} 
                  textAnchor="middle" 
                  fontSize="10" 
                  fill="white"
                >
                  🌾
                </text>
              </g>
            )}
          </>
        )}
        
        {/* Temperature overlay */}
        {secondaryVariable === 'temperature' && payload.temp && payload.temp > 30 && (
          <g>
            <circle cx={cx} cy={cy + yOffset} r={8} fill="#FFA474" opacity={0.9} />
            <text 
              x={cx} 
              y={cy + yOffset + 4} 
              textAnchor="middle" 
              fontSize="10" 
              fill="white"
            >
              🌡️
            </text>
          </g>
        )}
        
        {/* Weather overlay */}
        {secondaryVariable === 'weather' && (
          <g>
            {payload.weather === 'sunny' && (
              <>
                <circle cx={cx} cy={cy + yOffset} r={8} fill="#FFD93D" opacity={0.9} />
                <text 
                  x={cx} 
                  y={cy + yOffset + 4} 
                  textAnchor="middle" 
                  fontSize="10" 
                  fill="white"
                >
                  ☀️
                </text>
              </>
            )}
            {payload.weather === 'cloudy' && (
              <>
                <circle cx={cx} cy={cy + yOffset} r={8} fill="#9CA3AF" opacity={0.9} />
                <text 
                  x={cx} 
                  y={cy + yOffset + 4} 
                  textAnchor="middle" 
                  fontSize="10" 
                  fill="white"
                >
                  ☁️
                </text>
              </>
            )}
            {payload.weather === 'rainy' && (
              <>
                <circle cx={cx} cy={cy + yOffset} r={8} fill="#60A5FA" opacity={0.9} />
                <text 
                  x={cx} 
                  y={cy + yOffset + 4} 
                  textAnchor="middle" 
                  fontSize="10" 
                  fill="white"
                >
                  🌧️
                </text>
              </>
            )}
          </g>
        )}
      </g>
    );
  };
  
  const getSecondaryVariableLabel = () => {
    const labels: Record<SecondaryVariable, string> = {
      medication: 'Medicamento tomado',
      temperature: 'Temp. alta (>30°C)',
      weather: 'Clima ensolarado',
      sleep: 'Sono baixo (<6h)',
      food: 'Alimento consumido'
    };
    return labels[secondaryVariable];
  };
  
  const getSecondaryVariableColor = () => {
    const colors: Record<SecondaryVariable, string> = {
      medication: 'rgb(var(--color-accent))',
      temperature: '#FFA474',
      weather: '#FFD93D',
      sleep: 'rgb(var(--color-secondary))',
      food: '#FF6B9D'
    };
    return colors[secondaryVariable];
  };
  
  const dietaryItemLabels: Record<DietaryItem, { label: string; icon: any; color: string }> = {
    sugar: { label: 'Açúcar', icon: Candy, color: '#FF6B9D' },
    caffeine: { label: 'Cafeína', icon: Coffee, color: '#6F4E37' },
    alcohol: { label: 'Álcool', icon: Wine, color: '#7C3AED' },
    gluten: { label: 'Glúten', icon: Wheat, color: '#D97706' }
  };
  
  return (
    <div className="min-h-screen pb-24 bg-white">
      {/* Header */}
      <div className="p-6">
        <h1>Relatórios</h1>
      </div>
      
      {/* Filters */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[rgb(var(--color-text-secondary))] mb-2">
              Período
            </label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[rgb(var(--color-border))] bg-white min-h-[48px]"
            >
              <option value="7 dias">7 dias</option>
              <option value="30 dias">30 dias</option>
              <option value="90 dias">90 dias</option>
            </select>
          </div>
          
          <div>
            <label className="block text-[rgb(var(--color-text-secondary))] mb-2">
              Comparar com
            </label>
            <select
              value={secondaryVariable}
              onChange={(e) => setSecondaryVariable(e.target.value as SecondaryVariable)}
              className="w-full px-4 py-3 rounded-lg border border-[rgb(var(--color-border))] bg-white min-h-[48px]"
            >
              <option value="medication">Medicamento</option>
              <option value="temperature">Temperatura</option>
              <option value="weather">Clima</option>
              <option value="sleep">Sono</option>
              <option value="food">Alimentação</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Medication Pills Filter */}
      {secondaryVariable === 'medication' && medications.length > 0 && (
        <div className="px-6 mb-6">
          <label className="block text-[rgb(var(--color-text-secondary))] mb-2">
            Medicamentos
          </label>
          <div className="flex flex-wrap gap-2">
            {medications.map(med => {
              const isSelected = selectedMedIds.includes(med.id);
              return (
                <button
                  key={med.id}
                  onClick={() => toggleMedication(med.id)}
                  className={`px-4 py-2 rounded-full border-2 transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'border-[rgb(var(--color-accent))] bg-[rgb(var(--color-accent))] text-white'
                      : 'border-[rgb(var(--color-border))] bg-white text-[rgb(var(--color-text-secondary))]'
                  }`}
                >
                  <Pill className="w-4 h-4" />
                  <span className="text-sm">{med.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Dietary Pills Filter */}
      {secondaryVariable === 'food' && (
        <div className="px-6 mb-6">
          <label className="block text-[rgb(var(--color-text-secondary))] mb-2">
            Alimentação
          </label>
          <div className="flex flex-wrap gap-2">
            {(['sugar', 'caffeine', 'alcohol', 'gluten'] as DietaryItem[]).map(item => {
              const isSelected = selectedDietaryItems.includes(item);
              const { label, icon: Icon, color } = dietaryItemLabels[item];
              return (
                <button
                  key={item}
                  onClick={() => toggleDietaryItem(item)}
                  className={`px-4 py-2 rounded-full border-2 transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'text-white'
                      : 'border-[rgb(var(--color-border))] bg-white text-[rgb(var(--color-text-secondary))]'
                  }`}
                  style={isSelected ? { 
                    borderColor: color,
                    backgroundColor: color
                  } : {}}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Chart */}
      <div className="px-6 mb-6">
        <div className="bg-[rgb(var(--color-surface))] rounded-2xl p-4 border border-[rgb(var(--color-border))]">
          <div className="mb-4">
            <h3 className="mb-3">Tendência de Humor</h3>
            
            {/* Legend */}
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[rgb(var(--color-primary))]" />
                <small className="text-[rgb(var(--color-text-secondary))]">Humor</small>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getSecondaryVariableColor() }} />
                <small className="text-[rgb(var(--color-text-secondary))]">{getSecondaryVariableLabel()}</small>
              </div>
            </div>
          </div>
          
          {hasInsufficientData ? (
            <div className="flex items-center justify-center h-[250px]">
              <p className="text-[rgb(var(--color-text-secondary))] text-center">
                Dados insuficientes
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--color-gray-200))" />
                <XAxis 
                  dataKey="date" 
                  stroke="rgb(var(--color-text-secondary))"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  hide 
                  domain={[0, 5]} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid rgb(var(--color-border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="rgb(var(--color-primary))" 
                  strokeWidth={3}
                  dot={<CustomDot />}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}