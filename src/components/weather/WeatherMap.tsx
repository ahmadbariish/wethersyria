import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { syrianCities } from '../../data/cities';

export const WeatherMap: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState(syrianCities[0]);

  const filteredCities = syrianCities.filter((city) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.nameAr.includes(searchQuery)
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('weather.search')}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="relative h-[400px] bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
        {/* TODO: Implement actual map integration */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {selectedCity.nameAr}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {selectedCity.name}
            </p>
          </div>
        </div>
      </div>

      {searchQuery && (
        <div className="mt-4 max-h-48 overflow-y-auto">
          {filteredCities.map((city) => (
            <button
              key={city.id}
              onClick={() => {
                setSelectedCity(city);
                setSearchQuery('');
              }}
              className="w-full text-right px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <div className="font-medium text-gray-900 dark:text-white">
                {city.nameAr}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {city.name}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}; 