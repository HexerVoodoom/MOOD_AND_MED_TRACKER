import React, { useState, useRef } from 'react';
import { ChevronLeft, Clock, X, Camera } from 'lucide-react';
import { PillVisualization } from './PillVisualization';
import { Button } from './Button';

// Mock database de medicamentos comuns (apenas para simulação de foto)
const MEDICATION_DATABASE = [
  { name: 'Aspirina', type: 'comprimido' },
  { name: 'Paracetamol', type: 'comprimido' },
  { name: 'Ibuprofeno', type: 'comprimido' },
  { name: 'Dipirona', type: 'comprimido' },
  { name: 'Amoxicilina', type: 'cápsula' },
  { name: 'Omeprazol', type: 'cápsula' },
  { name: 'Losartana', type: 'comprimido' },
  { name: 'Rivotril', type: 'comprimido' },
  { name: 'Fluoxetina', type: 'cápsula' },
  { name: 'Sertralina', type: 'comprimido' },
];

interface AddMedicationScreenProps {
  onBack: () => void;
  onSave: (medication: any) => void;
}

export function AddMedicationScreen({ onBack, onSave }: AddMedicationScreenProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [unit, setUnit] = useState('comprimido');
  const [pillMode, setPillMode] = useState<'photo' | 'generated'>('photo');
  const [shape, setShape] = useState<'capsule' | 'round' | 'square' | 'triangular'>('round');
  const [size, setSize] = useState<'S' | 'M' | 'L'>('M');
  const [color1, setColor1] = useState('#B8E6B8');
  const [color2, setColor2] = useState('#D4F1D4');
  const [doseTimes, setDoseTimes] = useState(['08:00']);
  const [selectedDays, setSelectedDays] = useState([true, true, true, true, true, true, true]);
  const [isProcessingPhoto, setIsProcessingPhoto] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  
  // Cores pré-definidas em tons pastel
  const colorOptions = [
    { name: 'Verde', light: '#D4F1D4', dark: '#B8E6B8' },
    { name: 'Azul', light: '#D4E4F7', dark: '#B8D4F1' },
    { name: 'Amarelo', light: '#FFF4D4', dark: '#FFE8B8' },
    { name: 'Vermelho', light: '#FFD4D4', dark: '#FFB8B8' },
    { name: 'Verde-Água', light: '#D4F7F7', dark: '#B8ECEC' },
    { name: 'Branco', light: '#FFFFFF', dark: '#F5F5F5' },
  ];
  
  // Determinar se pode usar "gerado" baseado no tipo de dosagem
  const canUseGenerated = unit === 'comprimido' || unit === 'cápsula';
  
  // Get display unit based on type
  const getDisplayUnit = () => {
    switch (unit) {
      case 'comprimido':
        return 'unidade';
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
  
  const addDoseTime = () => {
    setDoseTimes([...doseTimes, '12:00']);
  };
  
  const removeDoseTime = (index: number) => {
    setDoseTimes(doseTimes.filter((_, i) => i !== index));
  };
  
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
        color2
      }
    });
  };
  
  const handlePhotoCapture = () => {
    setIsProcessingPhoto(true);
    
    // Simular processamento de foto com OCR/identificação
    setTimeout(() => {
      // Simular identificação de um medicamento aleatório
      const randomMed = MEDICATION_DATABASE[Math.floor(Math.random() * MEDICATION_DATABASE.length)];
      setName(randomMed.name);
      setUnit(randomMed.type);
      setPillMode('photo');
      setIsProcessingPhoto(false);
    }, 2000);
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result as string);
        handlePhotoCapture();
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
        {/* Photo Capture Button - Outside cards, above everything */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isProcessingPhoto}
          className="flex items-center gap-3 text-[rgb(var(--color-primary))] hover:text-[rgb(var(--color-primary-dark))] transition-colors disabled:opacity-50"
        >
          <div className="w-11 h-11 rounded-full bg-[rgb(var(--color-primary))] flex items-center justify-center">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <p className="font-normal">
              {isProcessingPhoto ? 'Identificando medicamento...' : 'Tire uma foto da caixa'}
            </p>
            {!isProcessingPhoto && (
              <small className="text-[rgb(var(--color-text-secondary))] font-normal">
                Identificação automática de nome e tipo
              </small>
            )}
          </div>
        </button>
        
        {/* Card 1: Nome, Tipo e Quantidade */}
        <div className="bg-white rounded-2xl border border-[rgb(var(--color-border))] p-6 space-y-4">
          {/* Medication Name */}
          <div>
            <label className="block text-[rgb(var(--color-gray-900))] mb-2">
              Nome do Medicamento
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ex: Aspirina"
              className="w-full px-4 py-3 rounded-lg border border-[rgb(var(--color-border))] bg-white min-h-[48px]"
            />
          </div>
          
          {/* Type and Quantity */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-[rgb(var(--color-gray-900))] mb-2">
                Tipo
              </label>
              <select
                value={unit}
                onChange={(e) => {
                  setUnit(e.target.value);
                  // Se mudar para algo que não é comprimido/cápsula, mudar para foto
                  if (e.target.value !== 'comprimido' && e.target.value !== 'cápsula') {
                    setPillMode('photo');
                  }
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
              <label className="block text-[rgb(var(--color-gray-900))] mb-2">
                Quantidade
              </label>
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
        
        {/* Card 2: Horários e Dias */}
        <div className="bg-white rounded-2xl border border-[rgb(var(--color-border))] p-6 space-y-6">
          {/* Dose Times */}
          <div>
            <h3 className="mb-4 text-[rgb(var(--color-gray-900))]">Horários de Dose</h3>
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
                    <button
                      onClick={() => removeDoseTime(index)}
                      className="w-11 h-11 rounded-full hover:bg-[rgb(var(--color-gray-100))] flex items-center justify-center transition-colors"
                    >
                      <X className="w-5 h-5 text-[rgb(var(--color-gray-500))]" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={addDoseTime}
              className="text-[rgb(var(--color-primary))] hover:underline font-normal"
            >
              + Adicionar horário
            </button>
          </div>
          
          {/* Days of Week */}
          <div>
            <label className="block text-[rgb(var(--color-gray-900))] mb-3">
              Dias da semana
            </label>
            <div className="flex gap-2">
              {days.map((day, index) => (
                <button
                  key={index}
                  onClick={() => toggleDay(index)}
                  className={`flex-1 rounded-lg border-2 transition-all min-h-[44px] py-2 font-normal ${
                    selectedDays[index]
                      ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))] text-white'
                      : 'border-[rgb(var(--color-border))]'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Card 3: Aparência */}
        <div className="bg-white rounded-2xl border border-[rgb(var(--color-border))] p-6">
          <h3 className="mb-2 text-[rgb(var(--color-gray-900))]">Aparência do Medicamento</h3>
          <p className="text-[rgb(var(--color-text-secondary))] mb-4 font-normal">
            Ajude a identificar este medicamento visualmente.
          </p>
          
          {canUseGenerated ? (
            <>
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setPillMode('photo')}
                  className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all min-h-[48px] font-normal ${
                    pillMode === 'photo'
                      ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))] bg-opacity-5'
                      : 'border-[rgb(var(--color-border))]'
                  }`}
                >
                  Foto
                </button>
                <button
                  onClick={() => setPillMode('generated')}
                  className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all min-h-[48px] font-normal ${
                    pillMode === 'generated'
                      ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))] bg-opacity-5'
                      : 'border-[rgb(var(--color-border))]'
                  }`}
                >
                  Gerado
                </button>
              </div>
              
              {pillMode === 'photo' ? (
                <button className="w-full h-40 rounded-2xl border-2 border-dashed border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-primary))] transition-colors flex flex-col items-center justify-center gap-2">
                  <Camera className="w-8 h-8 text-[rgb(var(--color-gray-400))]" />
                  <span className="text-[rgb(var(--color-text-secondary))] font-normal">Adicionar Foto</span>
                </button>
              ) : (
                <div className="space-y-4">
                  {/* Tipo - Visual com todos os formatos */}
                  <div>
                    <label className="block text-[rgb(var(--color-gray-900))] mb-3">Tipo</label>
                    <div className="grid grid-cols-4 gap-2">
                      <button
                        onClick={() => setShape('round')}
                        className={`px-3 py-4 rounded-lg border-2 transition-all min-h-[80px] flex flex-col items-center justify-center gap-2 ${
                          shape === 'round'
                            ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))] bg-opacity-5'
                            : 'border-[rgb(var(--color-border))]'
                        }`}
                      >
                        <PillVisualization 
                          shape="round"
                          size="S"
                          color1={color1}
                          color2={color2}
                        />
                        <span className="text-xs font-normal">Redondo</span>
                      </button>
                      <button
                        onClick={() => setShape('capsule')}
                        className={`px-3 py-4 rounded-lg border-2 transition-all min-h-[80px] flex flex-col items-center justify-center gap-2 ${
                          shape === 'capsule'
                            ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))] bg-opacity-5'
                            : 'border-[rgb(var(--color-border))]'
                        }`}
                      >
                        <PillVisualization 
                          shape="capsule"
                          size="S"
                          color1={color1}
                          color2={color2}
                        />
                        <span className="text-xs font-normal">Cápsula</span>
                      </button>
                      <button
                        onClick={() => setShape('square')}
                        className={`px-3 py-4 rounded-lg border-2 transition-all min-h-[80px] flex flex-col items-center justify-center gap-2 ${
                          shape === 'square'
                            ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))] bg-opacity-5'
                            : 'border-[rgb(var(--color-border))]'
                        }`}
                      >
                        <PillVisualization 
                          shape="square"
                          size="S"
                          color1={color1}
                          color2={color2}
                        />
                        <span className="text-xs font-normal">Quadrado</span>
                      </button>
                      <button
                        onClick={() => setShape('triangular')}
                        className={`px-3 py-4 rounded-lg border-2 transition-all min-h-[80px] flex flex-col items-center justify-center gap-2 ${
                          shape === 'triangular'
                            ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))] bg-opacity-5'
                            : 'border-[rgb(var(--color-border))]'
                        }`}
                      >
                        <PillVisualization 
                          shape="triangular"
                          size="S"
                          color1={color1}
                          color2={color2}
                        />
                        <span className="text-xs font-normal">Triangular</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Tamanho */}
                  <div>
                    <label className="block text-[rgb(var(--color-gray-900))] mb-2">Tamanho</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSize('S')}
                        className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all min-h-[48px] font-normal ${
                          size === 'S'
                            ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))] bg-opacity-5'
                            : 'border-[rgb(var(--color-border))]'
                        }`}
                      >
                        Pequeno
                      </button>
                      <button
                        onClick={() => setSize('M')}
                        className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all min-h-[48px] font-normal ${
                          size === 'M'
                            ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))] bg-opacity-5'
                            : 'border-[rgb(var(--color-border))]'
                        }`}
                      >
                        Médio
                      </button>
                      <button
                        onClick={() => setSize('L')}
                        className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all min-h-[48px] font-normal ${
                          size === 'L'
                            ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))] bg-opacity-5'
                            : 'border-[rgb(var(--color-border))]'
                        }`}
                      >
                        Grande
                      </button>
                    </div>
                  </div>
                  
                  {/* Cores */}
                  <div>
                    <label className="block text-[rgb(var(--color-gray-900))] mb-3">Cores</label>
                    <div className="space-y-3">
                      {/* Cor 1 */}
                      <div>
                        <label className="block text-[rgb(var(--color-gray-900))] text-sm mb-2">Cor 1</label>
                        <div className="grid grid-cols-6 gap-2">
                          {colorOptions.map((colorOpt) => (
                            <button
                              key={`color1-${colorOpt.name}`}
                              onClick={() => setColor1(colorOpt.dark)}
                              className={`px-2 py-2 rounded-lg border-2 transition-all min-h-[44px] flex items-center justify-center ${
                                color1 === colorOpt.dark
                                  ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))] bg-opacity-5'
                                  : 'border-[rgb(var(--color-border))]'
                              }`}
                            >
                              <div 
                                className="w-6 h-6 rounded-full border-2 border-black" 
                                style={{ backgroundColor: colorOpt.dark }}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {/* Cor 2 */}
                      <div>
                        <label className="block text-[rgb(var(--color-gray-900))] text-sm mb-2">Cor 2</label>
                        <div className="grid grid-cols-6 gap-2">
                          {colorOptions.map((colorOpt) => (
                            <button
                              key={`color2-${colorOpt.name}`}
                              onClick={() => setColor2(colorOpt.light)}
                              className={`px-2 py-2 rounded-lg border-2 transition-all min-h-[44px] flex items-center justify-center ${
                                color2 === colorOpt.light
                                  ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))] bg-opacity-5'
                                  : 'border-[rgb(var(--color-border))]'
                              }`}
                            >
                              <div 
                                className="w-6 h-6 rounded-full border-2 border-black" 
                                style={{ backgroundColor: colorOpt.light }}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Preview */}
                  <div>
                    <label className="block text-[rgb(var(--color-gray-900))] mb-2">Pré-visualização</label>
                    <div className="w-full h-48 rounded-2xl bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-border))] flex items-center justify-center">
                      <PillVisualization 
                        shape={shape}
                        size={size}
                        color1={color1}
                        color2={color2}
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <button className="w-full h-40 rounded-2xl border-2 border-dashed border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-primary))] transition-colors flex flex-col items-center justify-center gap-2">
              <Camera className="w-8 h-8 text-[rgb(var(--color-gray-400))]" />
              <span className="text-[rgb(var(--color-text-secondary))] font-normal">Adicionar Foto</span>
            </button>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[rgb(var(--color-border))] p-6">
        <Button onClick={handleSave} fullWidth size="large">
          Salvar Medicamento
        </Button>
        <button
          onClick={onBack}
          className="w-full text-center text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text))] mt-3"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}