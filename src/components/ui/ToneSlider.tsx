import React from "react";

interface ToneSliderProps {
  leftLabel: string;
  rightLabel: string;
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export function ToneSlider({
  leftLabel,
  rightLabel,
  value,
  onChange,
  className = "",
}: ToneSliderProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex justify-between items-center">
        <span
          className={`transition-all ${value < 50 ? "text-slate-900 dark:text-slate-100" : "text-slate-400"}`}
        >
          {leftLabel}
        </span>
        <span
          className={`transition-all ${value >= 50 ? "text-slate-900 dark:text-slate-100" : "text-slate-400"}`}
        >
          {rightLabel}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-6
            [&::-webkit-slider-thumb]:h-6
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-indigo-600
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:hover:bg-indigo-700
            [&::-webkit-slider-thumb]:transition-all
            [&::-moz-range-thumb]:w-6
            [&::-moz-range-thumb]:h-6
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-indigo-600
            [&::-moz-range-thumb]:cursor-pointer
            [&::-moz-range-thumb]:border-0
            [&::-moz-range-thumb]:shadow-lg
            [&::-moz-range-thumb]:hover:bg-indigo-700
            [&::-moz-range-thumb]:transition-all
          "
          style={{
            background: `linear-gradient(to right, rgb(99 102 241) 0%, rgb(99 102 241) ${value}%, rgb(226 232 240) ${value}%, rgb(226 232 240) 100%)`,
          }}
        />
      </div>
      <div className="flex justify-center">
        <div className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full">
          <span className="text-slate-700 dark:text-slate-300">
            {value}%
          </span>
        </div>
      </div>
    </div>
  );
}

interface ToneSliderGroupProps {
  sliders: Array<{
    leftLabel: string;
    rightLabel: string;
    value: number;
    onChange: (value: number) => void;
  }>;
  className?: string;
}

export function ToneSliderGroup({
  sliders,
  className = "",
}: ToneSliderGroupProps) {
  return (
    <div className={`space-y-8 ${className}`}>
      {sliders.map((slider, index) => (
        <ToneSlider
          key={index}
          leftLabel={slider.leftLabel}
          rightLabel={slider.rightLabel}
          value={slider.value}
          onChange={slider.onChange}
        />
      ))}
    </div>
  );
}