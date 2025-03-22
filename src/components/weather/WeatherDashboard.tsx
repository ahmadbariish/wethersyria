import React, { useState, useEffect } from 'react';
import { CloudIcon, SunIcon, CloudRainIcon, CloudLightningIcon } from '@heroicons/react/24/outline';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  location: string;
  forecast: Array<{
    date: string;
    temperature: number;
    condition: string;
  }>;
}

export const WeatherDashboard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchWeatherData = async () => {
      try {
        // Simulated data for now
        const mockData: WeatherData = {
          temperature: 25,
          condition: 'Sunny',
          humidity: 65,
          windSpeed: 12,
          location: 'Damascus',
          forecast: [
            { date: '2024-03-23', temperature: 26, condition: 'Sunny' },
            { date: '2024-03-24', temperature: 24, condition: 'Partly Cloudy' },
            { date: '2024-03-25', temperature: 22, condition: 'Rainy' },
          ],
        };
        setWeatherData(mockData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="text-center text-red-500">
        Failed to load weather data. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Weather */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {weatherData.location}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-gray-900 dark:text-white">
              {weatherData.temperature}°C
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              {weatherData.condition}
            </p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {weatherData.humidity}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Wind Speed</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {weatherData.windSpeed} km/h
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Feels Like</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {weatherData.temperature}°C
            </p>
          </div>
        </div>
      </div>

      {/* Forecast */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          3-Day Forecast
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {weatherData.forecast.map((day, index) => (
            <div
              key={index}
              className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(day.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                })}
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {day.temperature}°C
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {day.condition}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 