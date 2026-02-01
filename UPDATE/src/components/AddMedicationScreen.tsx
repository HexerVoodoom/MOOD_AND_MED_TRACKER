import React, { useState, useRef } from 'react';
import { ChevronLeft, Clock, X, Camera } from 'lucide-react';
import { PillVisualization } from './PillVisualization';
import { Button } from './Button';

interface AddMedicationScreenProps {
  onBack: () => void;
  onSave: (medication: any) => void;
  isFirstSetup?: boolean;
}

export function AddMedicationScreen({ onBack, onSave }: AddMedicationScreenProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [unit, setUnit] = useState('comprimido');
  const [pillMode, setPillMode] = useState<'photo' | 'generated'>('generated');
  const [shape, setShape] = useState<'capsule' | 'round' | 'square' | 'triangular'>('round');
  const [size, setSize] = useState<'S' | 'M' | 'L'>('M');
  const [color1, setColor1] = useState('#B8E6B8');
  const [color2, setColor2] = useState('#D4F1D4');
  const [doseTimes, setDoseTimes] = useState(['08:00']);
  const [selectedDays, setSelectedDays] = useState([true, true, true, true, true, true, true]);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  
  const colorOptions = [
    { name: 'Verde', light: '#D4F1D4', dark: '#B8E6B8' },
    { name: 'Azul', light: '#D4E4F7', dark: '#B8D4F1' },
    { name: 'Amarelo', light: '#FFF4D4', dark: '#FFE8B8' },
    { name: 'Vermelho', light: '#FFD4D4', dark: '#FFB8B8' },
    { name: 'Verde-Água', light: '#D4F7F7', dark: '#B8ECEC' },
    { name: 'Branco', light: '#FFFFFF', dark: '#F5F5F5' },
  ];
  
  const canUseGenerated = unit === 'comprimido' || unit === 'cápsula';
  
  const getDisplayUnit = () => {
    switch (unit) {
      case 'comprimido':
      case 'cápsula':
        return 'unidade';
      case 'gota':
        return 'gota(s)';
      case 'ml':
        return 'ml';
      default:
        return '';
    }
  };
  
  const addDoseTime = () => setDoseTimes([...doseTimes, '12:00']);
  const removeDoseTime = (index: number) => setDoseTimes(doseTimes.filter((_, i) => i !== index));
  const updateDoseTime = (index: number, value: string) => {
    const newTimes = [...doseTimes];
    newTimes[index] = value;
    setDoseTimes(newTimes);
  };
  
  const toggleDay = (index: number) => {
    const newDays = [...selectedDays];
    newDays[index] = !newDays[index];
    setSelectedDays(newDays);
  };
  
  const handleSave = () => {
    onSave({
      name,
      quantity,
      unit,
      doseTimes,
      selectedDays,
      pill: {
        mode: pillMode,
        shape,
        size,
        color1,
        color2,
        image: capturedImage
      }
    });
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result as string);
        setPillMode('photo');
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <div className="min-h-screen bg-white pb-48">
      {/* Header */}
      <div className="p-6 flex items-center gap-4 border-b border-[rgb(var(--color-border))]">
        <button 
          onClick={onBack}
          className="w-11 h-11 rounded-full hover:bg-[rgb(var(--color-gray-100))] flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1>Adicionar Medicamento</h1>
      </div>
      
      <div className="p-6 space-y-4">
        {/* Basic Info Card */}
        <div className="bg-white rounded-2xl border border-[rgb(var(--color-border))] p-6 space-y-4">
          <div>
            <label className="block text-[rgb(var(--color-gray-900))] mb-2">Nome do Medicamento</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ex: Aspirina"
              className="w-full px-4 py-3 rounded-lg border border-[rgb(var(--color-border))] bg-white min-h-[48px]"
            />
          </div>
          
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-[rgb(var(--color-gray-900))] mb-2">Tipo</label>
              <select
                value={unit}
                onChange={(e) => {
                  setUnit(e.target.value);
                  if (e.target.value !== 'comprimido' && e.target.value !== 'cápsula') setPillMode('photo');
                }}
                className="w-full px-4 py-3 rounded-lg border border-[rgb(var(--color-border))] bg-white min-h-[48px]"
              >
                <option value="cápsula">cápsula</option>
                <option value="comprimido">comprimido</option>
                <option value="gota">gota</option>
                <option value="ml">ml</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-[rgb(var(--color-gray-900))] mb-2">Quantidade</label>
              <div className="relative">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="1"
                  className="w-full px-4 py-3 rounded-lg border border-[rgb(var(--color-border))] bg-white min-h-[48px]"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgb(var(--color-text-secondary))] pointer-events-none">
                  {getDisplayUnit()}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Schedule Card */}
        <div className="bg-white rounded-2xl border border-[rgb(var(--color-border))] p-6 space-y-6">
          <div>
            <h3 className="mb-4 text-[rgb(var(--color-gray-900))] font-bold">Horários de Dose</h3>
            <div className="space-y-3 mb-3">
              {doseTimes.map((time, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[rgb(var(--color-primary))]" />
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => updateDoseTime(index, e.target.value)}
                    className="flex-1 px-4 py-3 rounded-lg border border-[rgb(var(--color-border))] bg-white min-h-[48px]"
                  />
                  {doseTimes.length > 1 && (
                    <button onClick={() => removeDoseTime(index)} className="w-11 h-11 flex items-center justify-center">
                      <X className="w-5 h-5 text-gray-400" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button onClick={addDoseTime} className="text-[rgb(var(--color-primary))] font-medium text-sm">+ Adicionar horário</button>
          </div>
          
          <div>
            <label className="block text-[rgb(var(--color-gray-900))] mb-3">Dias da semana</label>
            <div className="flex gap-2">
              {days.map((day, index) => (
                <button
                  key={index}
                  onClick={() => toggleDay(index)}
                  className={`flex-1 rounded-lg border-2 transition-all min-h-[44px] py-2 font-bold ${
                    selectedDays[index]
                      ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))] text-black'
                      : 'border-[rgb(var(--color-border))] text-gray-400'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Appearance Card */}
        <div className="bg-white rounded-2xl border border-[rgb(var(--color-border))] p-6">
          <h3 className="mb-2 text-[rgb(var(--color-gray-900))] font-bold">Aparência do Medicamento</h3>
          <p className="text-[rgb(var(--color-text-secondary))] mb-4 text-sm">Ajude a identificar este medicamento visualmente.</p>
          
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setPillMode('photo')}
              className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all font-bold ${
                pillMode === 'photo' ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))]/10 text-black' : 'border-gray-100 text-gray-400'
              }`}
            >
              Foto
            </button>
            <button
              disabled={!canUseGenerated}
              onClick={() => setPillMode('generated')}
              className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all font-bold disabled:opacity-30 ${
                pillMode === 'generated' ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))]/10 text-black' : 'border-gray-100 text-gray-400'
              }`}
            >
              Gerado
            </button>
          </div>
          
          {pillMode === 'photo' ? (
            <div className="space-y-4">
              <input ref={fileInputRef} type="file" accept="image/*" capture="environment" onChange={handleFileChange} className="hidden" />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-40 rounded-2xl border-2 border-dashed border-[rgb(var(--color-border))] flex flex-col items-center justify-center gap-2 overflow-hidden"
              >
                {capturedImage ? (
                  <img src={capturedImage} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <Camera className="w-8 h-8 text-gray-300" />
                    <span className="text-gray-400 text-sm">Tirar/Adicionar Foto</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-3">Formato</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['round', 'capsule', 'square', 'triangular'] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => setShape(s)}
                      className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 ${shape === s ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))]/5' : 'border-gray-50'}`}
                    >
                      <PillVisualization shape={s} size="S" color1={color1} color2={color2} />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-3">Cores</label>
                <div className="space-y-4">
                  {/* Color 1 */}
                  <div>
                    <label className="block text-xs text-gray-400 mb-2">Cor 1 (Principal)</label>
                    <div className="grid grid-cols-6 gap-2">
                      {colorOptions.map(c => (
                        <button 
                          key={`c1-${c.name}`} 
                          onClick={() => setColor1(c.dark)} 
                          className={`w-10 h-10 rounded-full border-2 ${color1 === c.dark ? 'border-black' : 'border-transparent'}`} 
                          style={{ backgroundColor: c.dark }} 
                        />
                      ))}
                    </div>
                  </div>
                  {/* Color 2 */}
                  <div>
                    <label className="block text-xs text-gray-400 mb-2">Cor 2 (Secundária)</label>
                    <div className="grid grid-cols-6 gap-2">
                      {colorOptions.map(c => (
                        <button 
                          key={`c2-${c.name}`} 
                          onClick={() => setColor2(c.light)} 
                          className={`w-10 h-10 rounded-full border-2 ${color2 === c.light ? 'border-black' : 'border-transparent'}`} 
                          style={{ backgroundColor: c.light }} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-32 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100">
                <PillVisualization shape={shape} size={size} color1={color1} color2={color2} />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[rgb(var(--color-border))] p-6 z-10">
        <Button onClick={handleSave} fullWidth size="large">
          Salvar Medicamento
        </Button>
      </div>
    </div>
  );
}
