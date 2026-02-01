import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

interface MoodRecordingScreenProps {
  onBack: () => void;
  onSave: (mood: string) => void;
  period?: string;
}

const moods = [
  { name: 'Sad', emoji: '😟', label: 'Triste' },
  { name: 'Apathetic', emoji: '😶', label: 'Apático' },
  { name: 'Anxious', emoji: '😫', label: 'Ansioso' },
  { name: 'Angry', emoji: '😠', label: 'Irritado' },
  { name: 'Happy', emoji: '😁', label: 'Feliz' }
];

export function MoodRecordingScreen({ onBack, onSave, period }: MoodRecordingScreenProps) {
  const getTitle = () => {
    const periodNames: { [key: string]: string } = {
      morning: 'nesta manhã',
      afternoon: 'nesta tarde',
      night: 'nesta noite'
    };
    
    if (period && periodNames[period]) {
      return `Como você se sentiu ${periodNames[period]}?`;
    }
    return 'Como você está se sentindo agora?';
  };
  
  const handleMoodSelect = (moodName: string) => {
    onSave(moodName);
  };
  
  return (
    <div className="min-h-screen bg-[#f5fdff] pb-24">
      {/* Header */}
      <div className="p-6 flex items-center gap-4 bg-white shadow-sm">
        <button 
          onClick={onBack}
          className="w-11 h-11 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-[#18181b]" />
        </button>
        <h1 className="text-xl font-bold text-[#18181b]">{getTitle()}</h1>
      </div>
      
      {/* Mood Selection Grid */}
      <div className="px-6 mt-8">
        <div className="grid grid-cols-2 gap-4">
          {moods.map((mood) => (
            <button
              key={mood.name}
              onClick={() => handleMoodSelect(mood.name)}
              className="bg-white rounded-[24px] p-6 border border-[#a7a7ae] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)] hover:border-[#18181b] hover:bg-gray-50 transition-all min-h-[140px] flex flex-col items-center justify-center gap-3"
            >
              <span className="text-5xl">{mood.emoji}</span>
              <span className="font-bold text-[#18181b]">{mood.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      <p className="px-10 text-center text-sm text-gray-500 mt-8">
        O registro do humor ajuda a identificar padrões em sua saúde mental ao longo do tempo.
      </p>
    </div>
  );
}