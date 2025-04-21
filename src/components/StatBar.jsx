import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { getStatColor, getStatIcon } from '../utils/gameUtils';

const StatBar = ({
  label,
  value,
  highlighted = false,
  showIcon = true,
}) => {
  const barRef = useRef(null);
  const statColor = getStatColor(value);
  const maxValue = 10; // Maximum possible stat value
  
  useEffect(() => {
    if (barRef.current) {
      anime({
        targets: barRef.current,
        width: `${(value / maxValue) * 100}%`,
        duration: 1000,
        easing: 'easeOutElastic(1, .5)',
      });
    }
  }, [value]);

  return (
    <div className={`mb-2 ${highlighted ? 'bg-primary-100 p-2 rounded-md' : ''}`}>
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center">
          {showIcon && (
            <span className="mr-1 text-lg">{getStatIcon(label)}</span>
          )}
          <span className="text-sm font-medium capitalize">{label}</span>
        </div>
        <span className="text-sm font-bold">{value}/10</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className={`h-full ${statColor}`}
          style={{ width: '0%' }}
        />
      </div>
    </div>
  );
};

export default StatBar; 