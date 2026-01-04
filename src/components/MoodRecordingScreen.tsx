import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

interface MoodRecordingScreenProps {
  onBack: () => void;
  onSave: (mood: string) => void;
  period?: string;
}

const moods = [
  { name: 'Sad', emoji: '😢', color: 'rgb(var(--color-mood-sad))' },
  { name: 'Angry', emoji: '😡', color: 'rgb(var(--color-mood-angry))' },
  { name: 'Anxious', emoji: '😰', color: 'rgb(var(--color-mood-anxious))' },
  { name: 'Happy', emoji: '🙂', color: 'rgb(var(--color-mood-happy))' },
  { name: 'Apathetic', emoji: '😐', color: 'rgb(var(--color-mood-apathetic))' }
];

export function MoodRecordingScreen({ onBack, onSave, period }: MoodRecordingScreenProps) {
  const getTitle = () => {
    if (period) {
      return `How were you feeling this ${period}?`;
    }
    return 'How are you feeling right now?';
  };
  
  const handleMoodSelect = (moodName: string) => {
    onSave(moodName);
  };
  
  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="p-6 flex items-center gap-4">
        <button 
          onClick={onBack}
          className="w-11 h-11 rounded-full hover:bg-[rgb(var(--color-gray-100))] flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1>{getTitle()}</h1>
      </div>
      
      {/* Mood Selection Grid */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-2 gap-4">
          {moods.map((mood) => (
            <button
              key={mood.name}
              onClick={() => handleMoodSelect(mood.name)}
              className="rounded-2xl p-6 border-2 border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary))] hover:bg-opacity-5 transition-all min-h-[120px] flex flex-col items-center justify-center gap-3"
            >
              <span className="text-5xl">{mood.emoji}</span>
              <span>{mood.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
