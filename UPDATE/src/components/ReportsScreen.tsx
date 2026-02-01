import React, { useState, useMemo } from 'react';
import { Pill, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
}

// Map mood names to numeric values for the chart
const moodToValue: { [key: string]: number } = {
  'Sad': 1,
  'Angry': 2,
  'Anxious': 2,
  'Apathetic': 3,
  'Happy': 4,
  // Portuguese support
  'triste': 1,
  'irritado': 2,
  'ansioso': 2,
  'apático': 3,
  'feliz': 4
};

// Generate chart data from localStorage mood history
const generateChartData = (
  days: number, 
  selectedMedIds: string[]
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
    
    // Calculate average mood for the day
    let moodValue: number | null = null;
    if (entry) {
      const moods = [entry.morning, entry.afternoon, entry.night].filter(m => m);
      if (moods.length > 0) {
        const total = moods.reduce((sum, mood) => sum + (moodToValue[mood!] || 0), 0);
        moodValue = total / moods.length;
      }
    }
    
    // Check which medications were taken
    const medicationTakenIds = entry?.medicationTaken || [];
    const hasMedication = selectedMedIds.some(id => medicationTakenIds.includes(id));
    
    const displayMood = moodValue !== null ? Number(moodValue.toFixed(1)) : null;

    data.push({
      date: displayDate,
      fullDate: dateStr,
      mood: displayMood,
      medication: hasMedication
    });
  }
  
  return data;
};

export function ReportsScreen({ medications = [] }: ReportsScreenProps) {
  const [period, setPeriod] = useState('7 dias');
  
  // Selected medication IDs (all selected by default)
  const [selectedMedIds, setSelectedMedIds] = useState<string[]>(medications.map(m => m.id));
  
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
  
  // Generate chart data based on selected period
  const chartData = useMemo(() => {
    const days = period === '7 dias' ? 7 : period === '30 dias' ? 30 : 90;
    return generateChartData(days, selectedMedIds);
  }, [period, selectedMedIds]);
  
  // Check if there's sufficient data
  const hasInsufficientData = useMemo(() => {
    const validDataPoints = chartData.filter(d => d.mood !== null && d.mood !== undefined);
    return validDataPoints.length < 2;
  }, [chartData]);
  
  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    
    const yOffset = -25;
    
    return (
      <g>
        <circle cx={cx} cy={cy} r={4} fill="rgb(var(--color-primary))" />
        
        {/* Medication overlay */}
        {payload.medication && (
          <g>
            <circle cx={cx} cy={cy + yOffset} r={8} fill="rgb(var(--color-accent))" opacity={0.9} />
            <circle cx={cx} cy={cy + yOffset} r={3} fill="white" />
          </g>
        )}
      </g>
    );
  };
  
  return (
    <div className="min-h-screen pb-24 bg-white">
      {/* Header */}
      <div className="p-6">
        <h1>Relatórios</h1>
      </div>
      
      {/* Filters */}
      <div className="px-6 mb-6">
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
      </div>
      
      {/* Medication Filter */}
      {medications.length > 0 && (
        <div className="px-6 mb-6">
          <label className="block text-[rgb(var(--color-text-secondary))] mb-2">
            Filtrar Medicamentos
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
                <div className="w-3 h-3 rounded-full bg-[rgb(var(--color-accent))]" />
                <small className="text-[rgb(var(--color-text-secondary))]">Medicamento tomado</small>
              </div>
            </div>
          </div>
          
          {hasInsufficientData ? (
            <div className="flex items-center justify-center h-[250px]">
              <p className="text-[rgb(var(--color-text-secondary))] text-center">
                Dados insuficientes. Continue registrando seu humor diário.
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
