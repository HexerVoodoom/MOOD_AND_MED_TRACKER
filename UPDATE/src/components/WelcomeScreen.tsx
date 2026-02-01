import React from 'react';
import { Pill, Smile } from 'lucide-react';
import { Button } from './Button';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(var(--color-surface))] to-white flex flex-col p-6">
      {/* Logo */}
      <div className="flex justify-center items-center gap-2 mt-16 mb-12">
        <div className="relative">
          <Smile className="w-10 h-10 text-[rgb(var(--color-primary))]" />
          <Pill className="w-6 h-6 text-[rgb(var(--color-accent))] absolute -bottom-1 -right-1" />
        </div>
      </div>
      
      {/* Title and Description */}
      <div className="text-center mb-12">
        <h1 className="mb-4">Monitore seu humor e sua medicação.</h1>
        <p className="text-[rgb(var(--color-text-secondary))] max-w-sm mx-auto">
          Registre diariamente seu humor e horários de medicação. Entenda padrões e acompanhe sua evolução de forma simples.
        </p>
      </div>
      
      {/* Illustration */}
      <div className="flex-1 flex items-center justify-center mb-12">
        <div className="w-64 h-64 rounded-full bg-gradient-to-br from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] opacity-10 flex items-center justify-center">
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[rgb(var(--color-secondary))] to-[rgb(var(--color-primary))] opacity-30"></div>
        </div>
      </div>
      
      {/* CTA Button */}
      <Button onClick={onGetStarted} fullWidth size="large">
        Começar
      </Button>
    </div>
  );
}