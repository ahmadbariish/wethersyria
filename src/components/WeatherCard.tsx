import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Droplets, Wind } from 'lucide-react';

interface WeatherCardProps {
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  temperature,
  humidity,
  windSpeed,
  description,
  icon,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div className="text-4xl font-bold text-gray-800 rtl">
          {Math.round(temperature)}°C
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
          className="w-16 h-16"
        />
      </div>
      <p className="text-gray-600 mt-2 text-right">{description}</p>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-end gap-2">
          <span className="text-gray-700">٪{humidity}</span>
          <Droplets className="text-blue-500" size={20} />
        </div>
        <div className="flex items-center justify-end gap-2">
          <span className="text-gray-700">{windSpeed} كم/س</span>
          <Wind className="text-blue-500" size={20} />
        </div>
      </div>
    </motion.div>
  );
};