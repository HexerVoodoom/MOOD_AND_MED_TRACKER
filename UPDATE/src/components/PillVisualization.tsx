import React from 'react';

interface PillVisualizationProps {
  shape: 'capsule' | 'round' | 'square' | 'triangular';
  size: 'S' | 'M' | 'L';
  color1: string;
  color2: string;
  className?: string;
}

export function PillVisualization({ shape, size, color1, color2, className = '' }: PillVisualizationProps) {
  const sizeMap = {
    S: { capsule: 'w-3 h-6', round: 'w-5 h-5', square: 'w-5 h-5', triangular: 'w-6 h-6' },
    M: { capsule: 'w-16 h-24', round: 'w-20 h-20', square: 'w-20 h-20', triangular: 'w-20 h-20' },
    L: { capsule: 'w-20 h-28', round: 'w-24 h-24', square: 'w-24 h-24', triangular: 'w-24 h-24' }
  };
  
  const sizeClass = sizeMap[size][shape];
  
  if (shape === 'capsule') {
    return (
      <div className={`${sizeClass} rounded-full overflow-hidden flex flex-col border border-black/20 flex-shrink-0 ${className}`}>
        <div className="flex-1" style={{ backgroundColor: color1 }} />
        <div className="flex-1" style={{ backgroundColor: color2 }} />
      </div>
    );
  }
  
  if (shape === 'round') {
    return (
      <div className={`${sizeClass} rounded-full overflow-hidden flex border border-black/20 flex-shrink-0 ${className}`}>
        <div className="flex-1" style={{ backgroundColor: color1 }} />
        <div className="flex-1" style={{ backgroundColor: color2 }} />
      </div>
    );
  }
  
  if (shape === 'square') {
    return (
      <div className={`${sizeClass} rounded-lg overflow-hidden flex border border-black/20 flex-shrink-0 ${className}`}>
        <div className="flex-1" style={{ backgroundColor: color1 }} />
        <div className="flex-1" style={{ backgroundColor: color2 }} />
      </div>
    );
  }
  
  // triangular
  return (
    <div className={`${sizeClass} relative flex-shrink-0 ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <clipPath id="leftHalf">
            <rect x="0" y="0" width="50" height="100" />
          </clipPath>
          <clipPath id="rightHalf">
            <rect x="50" y="0" width="50" height="100" />
          </clipPath>
        </defs>
        {/* Triângulo com cantos arredondados usando path */}
        <path 
          d="M 50 15 L 15 85 Q 15 90 20 90 L 80 90 Q 85 90 85 85 L 50 15 Z" 
          fill={color1} 
          clipPath="url(#leftHalf)"
        />
        <path 
          d="M 50 15 L 15 85 Q 15 90 20 90 L 80 90 Q 85 90 85 85 L 50 15 Z" 
          fill={color2} 
          clipPath="url(#rightHalf)"
        />
        {/* Stroke preto no formato triangular */}
        <path 
          d="M 50 15 L 15 85 Q 15 90 20 90 L 80 90 Q 85 90 85 85 L 50 15 Z" 
          fill="none"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}