import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Cloud } from 'lucide-react';
import { motion } from 'framer-motion';
import { WeatherCard } from './components/WeatherCard';
import { ForecastCard } from './components/ForecastCard';
import { syrianCities } from './data/cities';
import type { WeatherData } from './types/weather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

function App() {
  const [selectedCity, setSelectedCity] = useState(syrianCities[0]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${selectedCity.lat}&lon=${selectedCity.lon}&units=metric&appid=${API_KEY}`
        );
        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${selectedCity.lat}&lon=${selectedCity.lon}&units=metric&appid=${API_KEY}`
        );
        
        // Transform the response to match our WeatherData type
        const weatherData: WeatherData = {
          current: {
            temp: response.data.main.temp,
            humidity: response.data.main.humidity,
            wind_speed: response.data.wind.speed,
            weather: response.data.weather,
          },
          daily: forecastResponse.data.list
            .filter((item: any, index: number) => index % 8 === 0) // Get one forecast per day
            .map((item: any) => ({
              dt: item.dt,
              temp: {
                min: item.main.temp_min,
                max: item.main.temp_max,
              },
              weather: item.weather,
            })),
        };
        
        setWeather(weatherData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [selectedCity]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Cloud className="text-white" size={32} />
          <h1 className="text-3xl font-bold text-white text-right">
            الطقس في سوريا
          </h1>
        </div>

        <div className="bg-white/20 backdrop-blur-lg rounded-xl p-4 mb-8">
          <select
            value={selectedCity.name}
            onChange={(e) => {
              const city = syrianCities.find((c) => c.name === e.target.value);
              if (city) setSelectedCity(city);
            }}
            className="w-full p-2 rounded-lg bg-white/80 text-right"
            dir="rtl"
          >
            {syrianCities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.nameAr}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-center text-white">جاري التحميل...</div>
        ) : weather ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <WeatherCard
              temperature={weather.current.temp}
              humidity={weather.current.humidity}
              windSpeed={weather.current.wind_speed}
              description={weather.current.weather[0].description}
              icon={weather.current.weather[0].icon}
            />

            <div>
              <h2 className="text-xl font-semibold text-white text-right mb-4">
                توقعات الأيام القادمة
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {weather.daily.slice(1, 5).map((day) => (
                  <ForecastCard
                    key={day.dt}
                    date={day.dt}
                    minTemp={day.temp.min}
                    maxTemp={day.temp.max}
                    icon={day.weather[0].icon}
                    description={day.weather[0].description}
                  />
                ))}
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6 text-right">
              <h2 className="text-xl font-semibold text-white mb-2">
                نصائح الطقس
              </h2>
              <ul className="text-white space-y-2">
                <li>• احرص على شرب الكثير من الماء</li>
                <li>• تجنب التعرض المباشر لأشعة الشمس</li>
                <li>• راقب نشرة الطقس بشكل منتظم</li>
              </ul>
            </div>
          </motion.div>
        ) : (
          <div className="text-center text-white">
            عذراً، حدث خطأ في تحميل البيانات
          </div>
        )}
      </div>
    </div>
  );
}

export default App;