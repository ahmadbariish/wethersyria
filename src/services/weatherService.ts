import axios from 'axios';

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
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

export interface WeatherAlert {
  id: string;
  type: 'warning' | 'info' | 'danger';
  title: string;
  description: string;
  timestamp: string;
  location: string;
  severity: 'low' | 'medium' | 'high';
}

export const weatherService = {
  async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    try {
      const [currentResponse, forecastResponse] = await Promise.all([
        axios.get(`${OPENWEATHER_BASE_URL}/weather`, {
          params: {
            lat,
            lon,
            appid: OPENWEATHER_API_KEY,
            units: 'metric',
          },
        }),
        axios.get(`${OPENWEATHER_BASE_URL}/forecast`, {
          params: {
            lat,
            lon,
            appid: OPENWEATHER_API_KEY,
            units: 'metric',
          },
        }),
      ]);

      const current = currentResponse.data;
      const forecast = forecastResponse.data.list
        .filter((item: any, index: number) => index % 8 === 0)
        .slice(0, 3)
        .map((item: any) => ({
          date: new Date(item.dt * 1000).toISOString(),
          temperature: Math.round(item.main.temp),
          condition: item.weather[0].main,
        }));

      return {
        temperature: Math.round(current.main.temp),
        condition: current.weather[0].main,
        humidity: current.main.humidity,
        windSpeed: current.wind.speed,
        location: current.name,
        forecast,
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  },

  async getWeatherAlerts(lat: number, lon: number): Promise<WeatherAlert[]> {
    try {
      // TODO: Implement AI-powered alert generation
      // For now, return mock data
      return [
        {
          id: '1',
          type: 'warning',
          title: 'High Temperature Alert',
          description: 'Temperatures are expected to reach 35°C. Stay hydrated and avoid outdoor activities during peak hours.',
          timestamp: new Date().toISOString(),
          location: 'Damascus',
          severity: 'high',
        },
        {
          id: '2',
          type: 'info',
          title: 'Air Quality Update',
          description: 'Moderate air quality. Sensitive groups should limit outdoor activities.',
          timestamp: new Date().toISOString(),
          location: 'Aleppo',
          severity: 'medium',
        },
      ];
    } catch (error) {
      console.error('Error fetching weather alerts:', error);
      throw error;
    }
  },

  async getAIWeatherResponse(message: string): Promise<string> {
    try {
      // TODO: Implement actual AI integration
      // For now, return mock responses
      const responses = [
        "I can help you with weather information. What would you like to know?",
        "The current temperature is 25°C with sunny conditions.",
        "There's a 30% chance of rain tomorrow.",
        "The air quality is moderate today.",
        "Wind speeds are expected to increase in the evening.",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    } catch (error) {
      console.error('Error getting AI response:', error);
      throw error;
    }
  },
}; 