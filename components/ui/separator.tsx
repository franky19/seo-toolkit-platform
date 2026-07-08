import React from 'react';

interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

const Separator: React.FC<SeparatorProps> = ({ orientation = 'horizontal', className = '' }) => {
  const baseClasses = orientation === 'horizontal' ? 'w-full h-px' : 'h-full w-px';
  return <div className={`bg-gray-200 ${baseClasses} ${className}`} />;
};

export default Separator;
