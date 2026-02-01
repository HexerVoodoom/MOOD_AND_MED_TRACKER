import React, { useState } from 'react';
import { ChevronLeft, Trash2, Calendar } from 'lucide-react';
import { Button } from './Button';
import { PillVisualization } from './PillVisualization';

interface MedicationDetailScreenProps {
  medication: {
    id: string;
    name: string;
    nextDose: string;
    adherence: number;
    startDate: string;
    endDate?: string;
    daysTaken: number;
    last7Days: boolean[];
    doseTimes: string[];
    pill?: {
      shape: 'capsule' | 'round' | 'square' | 'triangular';
      size: 'S' | 'M' | 'L';
      color1: string;
      color2: string;
    };
  };
  onBack: () => void;
  onEdit: () => void;
  onDelete: (id: string, deleteHistory: boolean) => void;
}

export function MedicationDetailScreen({ medication, onBack, onEdit, onDelete }: MedicationDetailScreenProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showHistoryOption, setShowHistoryOption] = useState(false);
  
  const handleDeleteClick = () => {
    if (medication.daysTaken > 0) {
      setShowHistoryOption(true);
    } else {
      setShowDeleteConfirm(true);
    }
  };

  const handleFinalDelete = (deleteHistory: boolean) => {
    onDelete(medication.id, deleteHistory);
    setShowDeleteConfirm(false);
    setShowHistoryOption(false);
  };
  
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (6 - i));
    return date.getDate();
  });
  
  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-11 h-11 rounded-full hover:bg-[rgb(var(--color-gray-100))] flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1>Detalhes do Medicamento</h1>
        </div>
        
        <button 
          onClick={handleDeleteClick}
          className="w-11 h-11 rounded-full hover:bg-red-50 flex items-center justify-center transition-colors"
        >
          <Trash2 className="w-6 h-6 text-red-500" />
        </button>
      </div>
      
      {/* Pill Visualization */}
      <div className="px-6 mb-6">
        <div className="bg-[rgb(var(--color-surface))] rounded-2xl p-8 border border-[rgb(var(--color-border))] flex flex-col items-center">
          {medication.pill && (
            <PillVisualization 
              shape={medication.pill.shape}
              size="L"
              color1={medication.pill.color1}
              color2={medication.pill.color2}
              className="mb-4"
            />
          )}
          <h2 className="text-center">{medication.name}</h2>
        </div>
      </div>
      
      {/* Treatment Info */}
      <div className="px-6 mb-6">
        <div className="bg-[rgb(var(--color-surface))] rounded-2xl p-6 border border-[rgb(var(--color-border))]">
          <h3 className="mb-4">Período de Tratamento</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[rgb(var(--color-text-secondary))]" />
              <div>
                <small className="text-[rgb(var(--color-text-secondary))] block">Data de Início</small>
                <p>{medication.startDate}</p>
              </div>
            </div>
            
            {medication.endDate && (
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[rgb(var(--color-text-secondary))]" />
                <div>
                  <small className="text-[rgb(var(--color-text-secondary))] block">Data de Término</small>
                  <p>{medication.endDate}</p>
                </div>
              </div>
            )}
            
            <div className="pt-3 border-t border-[rgb(var(--color-border))]">
              <small className="text-[rgb(var(--color-text-secondary))] block mb-1">Dias Tomados</small>
              <p className="text-[rgb(var(--color-primary))]">{medication.daysTaken} dias</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Last 7 Days */}
      <div className="px-6 mb-6">
        <div className="bg-[rgb(var(--color-surface))] rounded-2xl p-6 border border-[rgb(var(--color-border))]">
          <h3 className="mb-4">Últimos 7 Dias</h3>
          
          <div className="flex justify-between">
            {medication.last7Days.map((taken, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <small className="text-[rgb(var(--color-text-secondary))]">{days[index]}</small>
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    taken 
                      ? 'bg-[rgb(var(--color-primary))] text-white' 
                      : 'bg-[rgb(var(--color-gray-100))] text-[rgb(var(--color-text-secondary))]'
                  }`}
                >
                  <small>{dates[index]}</small>
                </div>
                <div className={`w-2 h-2 rounded-full ${taken ? 'bg-[rgb(var(--color-primary))]' : 'bg-[rgb(var(--color-gray-300))]'}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Dose Times */}
      <div className="px-6 mb-6">
        <div className="bg-[rgb(var(--color-surface))] rounded-2xl p-6 border border-[rgb(var(--color-border))]">
          <h3 className="mb-4">Horário Diário</h3>
          
          <div className="space-y-2">
            {medication.doseTimes.map((time, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-[rgb(var(--color-border))]">
                <span>{time}</span>
                <span className="text-[rgb(var(--color-text-secondary))]">Dose {index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Adherence */}
      <div className="px-6 mb-6">
        <div className="bg-[rgb(var(--color-surface))] rounded-2xl p-6 border border-[rgb(var(--color-border))]">
          <div className="flex items-center justify-between mb-3">
            <h3>Adesão</h3>
            <span className="text-[rgb(var(--color-primary))]">{medication.adherence}%</span>
          </div>
          
          <div className="w-full h-3 bg-[rgb(var(--color-gray-100))] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[rgb(var(--color-primary))] rounded-full transition-all"
              style={{ width: `${medication.adherence}%` }}
            />
          </div>
        </div>
      </div>
      
      {/* Edit Button */}
      <div className="px-6">
        <Button onClick={onEdit} fullWidth size="large">
          Editar Medicamento
        </Button>
      </div>
      
      {/* Simple Delete Confirmation (for never taken) */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-[60]">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h2 className="text-xl font-bold mb-3">Excluir Medicamento?</h2>
            <p className="text-[rgb(var(--color-text-secondary))] mb-6">
              Deseja remover <strong>{medication.name}</strong> da sua lista?
            </p>
            
            <div className="flex flex-col gap-3">
              <Button 
                onClick={() => handleFinalDelete(false)} 
                fullWidth
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Excluir
              </Button>
              <Button 
                onClick={() => setShowDeleteConfirm(false)} 
                variant="secondary"
                fullWidth
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* History Option Modal (for already taken) */}
      {showHistoryOption && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-[60]">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-bold mb-2">Excluir do histórico?</h2>
            <p className="text-[rgb(var(--color-text-secondary))] mb-6 text-sm">
              Você já registrou tomadas deste medicamento. Deseja excluir esses dados dos relatórios também?
            </p>
            
            <div className="flex flex-col gap-3">
              <Button 
                onClick={() => handleFinalDelete(true)} 
                fullWidth
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Sim, excluir tudo
              </Button>
              <Button 
                onClick={() => handleFinalDelete(false)} 
                variant="secondary"
                fullWidth
              >
                Não, manter nos relatórios
              </Button>
              <button 
                onClick={() => setShowHistoryOption(false)}
                className="text-gray-400 text-sm mt-2 hover:text-gray-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}