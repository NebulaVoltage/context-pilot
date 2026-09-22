import React, { useMemo } from 'react';
import { useAnimatedValue } from '@/hooks/useAnimatedValue';

interface TelemetryValueProps {
  label: string;
  value?: number | string;
  unit?: string;
  precision?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  showSparkline?: boolean;
  sparklineData?: number[];
}

export const TelemetryValue: React.FC<TelemetryValueProps> = ({
  label,
  value = 0,
  unit = '',
  precision = 0,
  size = 'md',
  color = '#22d3ee', // cyan-400
  showSparkline = false,
  sparklineData = []
}) => {
  const isNumeric = typeof value === 'number' || (!isNaN(Number(value)) && typeof value === 'string');
  const numValue = isNumeric ? Number(value) : 0;
  
  const animatedValue = useAnimatedValue(numValue, { duration: 800 });
  const displayValue = isNumeric 
    ? (typeof animatedValue === 'number' && !isNaN(animatedValue) ? animatedValue.toFixed(precision) : String(value))
    : String(value ?? '');

  const sizeStyles = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  const sparklinePath = useMemo(() => {
    if (!showSparkline || sparklineData.length === 0) return '';
    const points = sparklineData.slice(-20);
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    
    return points.map((p, i) => {
      const x = (i / (points.length - 1)) * 60;
      const y = 20 - ((p - min) / range) * 20;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  }, [sparklineData, showSparkline]);

  return (
    <div className="flex flex-col">
      <span className="font-mono text-xs uppercase tracking-wider text-graphite-400 mb-1">
        {label}
      </span>
      <div className="flex items-baseline gap-1">
        <span className={`font-mono text-white ${sizeStyles[size]}`}>
          {displayValue}
        </span>
        {unit && (
          <span className="font-mono text-sm text-graphite-400">
            {unit}
          </span>
        )}
      </div>
      {showSparkline && sparklineData.length > 0 && (
        <svg width="60" height="20" className="mt-2" viewBox="0 -2 60 24">
          <path
            d={sparklinePath}
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};

export default TelemetryValue;
