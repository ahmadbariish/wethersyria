import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { WeatherCard } from '../components/weather/WeatherCard';
import { WeatherForecast } from '../components/weather/WeatherForecast';
import { WeatherMap } from '../components/weather/WeatherMap';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { weatherService } from '../services/weatherService';
import { locationService, Location } from '../services/locationService';
import { WeatherData } from '../services/weatherService';

export const WeatherPage: React.FC = () => {
  const { t } = useTranslation();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const location = await locationService.getLocationName(latitude, longitude);
              setCurrentLocation(location);
              await fetchWeatherData(location);
            } catch (error) {
              console.error('Error getting location:', error);
              setError(t('errors.locationError', 'خطأ في تحديد الموقع'));
            }
          },
          (error) => {
            console.error('Geolocation error:', error);
            setError(t('errors.geolocationError', 'لم نتمكن من الوصول إلى موقعك'));
            // استخدم دمشق كموقع افتراضي
            const defaultLocation = {
              name: 'دمشق',
              country: 'سوريا',
              lat: 33.5138,
              lon: 36.2765
            };
            setCurrentLocation(defaultLocation);
            fetchWeatherData(defaultLocation);
          }
        );
      } else {
        setError(t('errors.geolocationNotSupported', 'متصفحك لا يدعم تحديد الموقع'));
        // استخدم دمشق كموقع افتراضي
        const defaultLocation = {
          name: 'دمشق',
          country: 'سوريا',
          lat: 33.5138,
          lon: 36.2765
        };
        setCurrentLocation(defaultLocation);
        fetchWeatherData(defaultLocation);
      }
    };

    getCurrentLocation();
  }, []);

  const fetchWeatherData = async (location: Location) => {
    try {
      setLoading(true);
      setError(null);
      const data = await weatherService.getCurrentWeather(location.lat, location.lon);
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError(t('errors.weatherDataError', 'خطأ في جلب بيانات الطقس'));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white dark:bg-gray-900">
        <div className="text-red-500 text-xl mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {t('common.retry', 'إعادة المحاولة')}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <ThemeToggle />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            {t('weather.title', 'الطقس في سوريا')}
          </h1>

          {weatherData && currentLocation && (
            <>
              <WeatherCard weatherData={weatherData} location={currentLocation} />
              
              <div className="mt-8">
                <WeatherForecast lat={currentLocation.lat} lon={currentLocation.lon} />
              </div>

              <div className="mt-8">
                <WeatherMap lat={currentLocation.lat} lon={currentLocation.lon} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}; 