import React, { useState } from 'react';
import { X, Clock } from 'lucide-react';
import { Button } from './Button';

interface MedicationCheckModalProps {
  medicationName: string;
  quantity: string;
  onClose: () => void;
  onConfirm: (time: string) => void;
}

export function MedicationCheckModal({ medicationName, quantity, onClose, onConfirm }: MedicationCheckModalProps) {
  const [time, setTime] = useState(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  });
  
  const handleConfirm = () => {
    onConfirm(time);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/40 flex items-end justify-center z-[100]">
      <div className="bg-white rounded-t-3xl w-full max-w-[390px] p-6 animate-slide-up mb-[env(safe-area-inset-bottom)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2>Confirmar Tomada</h2>
          <button 
            onClick={onClose}
            className="w-11 h-11 rounded-full hover:bg-[rgb(var(--color-gray-100))] flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-[rgb(var(--color-text))]" />
          </button>
        </div>
        
        {/* Medication Info */}
        <div className="mb-6">
          <p className="mb-1">{medicationName}</p>
          <small className="text-[rgb(var(--color-text-secondary))]">{quantity}</small>
        </div>
        
        {/* Time Input */}
        <div className="mb-6">
          <label className="block mb-2 text-[rgb(var(--color-text-secondary))]">
            <small>Horário da Tomada</small>
          </label>
          <div className="relative">
            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgb(var(--color-text-secondary))]" />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full h-14 pl-12 pr-4 rounded-xl border border-[rgb(var(--color-border))] focus:outline-none focus:border-[rgb(var(--color-primary))] transition-colors"
            />
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-3">
          <Button onClick={onClose} variant="secondary" fullWidth size="large">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} fullWidth size="large">
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}
