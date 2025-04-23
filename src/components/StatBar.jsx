import React from 'react';
import { motion } from 'framer-motion';
import { getStatColor, getStatIcon } from '../utils/gameUtils';

const StatBar = ({
  label,
  value,
  highlighted = false,
  showIcon = true,
}) => {
  const statColor = getStatColor(value);
  const maxValue = 10; // Maximum possible stat value
  
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
        <motion.div
          className={`h-full ${statColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${(value / maxValue) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default StatBar; 