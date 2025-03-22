import React from 'react';
import { format } from 'date-fns';
import { arSA } from 'date-fns/locale';

interface ForecastCardProps {
  date: number;
  minTemp: number;
  maxTemp: number;
  icon: string;
  description: string;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({
  date,
  minTemp,
  maxTemp,
  icon,
  description,
}) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md text-right">
      <p className="text-sm text-gray-600">
        {format(new Date(date * 1000), 'EEEE', { locale: arSA })}
      </p>
      <img
        src={`https://openweathermap.org/img/wn/${icon}.png`}
        alt={description}
        className="w-12 h-12 mx-auto"
      />
      <div className="flex justify-between mt-2">
        <span className="text-gray-600">{Math.round(minTemp)}°</span>
        <span className="font-semibold">{Math.round(maxTemp)}°</span>
      </div>
    </div>
  );
};