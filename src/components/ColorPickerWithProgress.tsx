import React, { useState } from "react";

interface ColorPickerProps {
  label: string;
  color: string;
  setColor: (color: string) => void;
}

const ColorPickerWithProgress: React.FC<ColorPickerProps> = ({
  label,
  color,
  setColor,
}) => {
  const [progress, setProgress] = useState(0);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
    setProgress(Math.floor(Math.random() * 100)); // Simulated progress
  };

  // Progress Bar Size & Stroke Configuration
  const size = 120; // Circle Size
  const strokeWidth = 20; // Border Thickness
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="border-4 border-crimson-400 rounded-lg p-4 shadow-md">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative flex items-center gap-2">
        {/* Circular Color Indicator */}
        <div
          className="w-10 h-10 rounded-full border border-gray-400 shadow"
          style={{ backgroundColor: color }}
        ></div>

        {/* Hidden Color Picker */}
        <input
          type="color"
          value={color}
          onChange={handleColorChange}
          className="w-10 h-10 opacity-0 absolute cursor-pointer"
        />
      </div>

      {/* Circular Progress Indicator Inside Box */}
      <div className="flex items-center justify-center relative mt-4">
        <div className="w-[90px] h-[90px] flex items-center justify-center">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Background Circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
              className="stroke-gray-300"
              fill="transparent"
            />
            {/* Progress Circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
              className="stroke-blue-500 transition-all duration-500"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          </svg>
          {/* Progress Percentage */}
          <span className="absolute text-md font-bold text-gray-700">{progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default ColorPickerWithProgress;
