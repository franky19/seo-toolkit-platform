import React, { useState } from 'react';

interface ToggleProps {
  initialState?: boolean;
  onToggle?: (state: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ initialState = false, onToggle }) => {
  const [isOn, setIsOn] = useState(initialState);

  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    if (onToggle) onToggle(newState);
  };

  return (
    <button
      onClick={handleToggle}
      className={`w-12 h-6 rounded-full transition-colors ${isOn ? 'bg-blue-600' : 'bg-gray-300'}`}
    >
      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${isOn ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );
};

export default Toggle;
