export interface WeatherData {
  current: {
    temp: number;
    humidity: number;
    wind_speed: number;
    weather: Array<{
      description: string;
      icon: string;
    }>;
  };
  daily: Array<{
    dt: number;
    temp: {
      min: number;
      max: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
  }>;
}

export interface City {
  name: string;
  nameAr: string;
  lat: number;
  lon: number;
}