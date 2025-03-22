import axios from 'axios';

export interface Location {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

// قائمة المدن السورية الرئيسية مع إحداثياتها
const SYRIAN_CITIES: Location[] = [
  { name: 'دمشق', country: 'سوريا', lat: 33.5138, lon: 36.2765 },
  { name: 'حلب', country: 'سوريا', lat: 36.2021, lon: 37.1343 },
  { name: 'حمص', country: 'سوريا', lat: 34.7324, lon: 36.7137 },
  { name: 'اللاذقية', country: 'سوريا', lat: 35.5221, lon: 35.7926 },
  { name: 'حماة', country: 'سوريا', lat: 35.1318, lon: 36.7578 },
  { name: 'دير الزور', country: 'سوريا', lat: 35.3359, lon: 40.1408 },
  { name: 'الرقة', country: 'سوريا', lat: 35.9594, lon: 39.0024 },
  { name: 'إدلب', country: 'سوريا', lat: 35.9307, lon: 36.6337 },
  { name: 'درعا', country: 'سوريا', lat: 32.6259, lon: 36.1055 },
  { name: 'السويداء', country: 'سوريا', lat: 32.7123, lon: 36.5665 },
  { name: 'طرطوس', country: 'سوريا', lat: 34.8956, lon: 35.8867 },
  { name: 'القنيطرة', country: 'سوريا', lat: 33.1253, lon: 35.8247 },
];

export const locationService = {
  async searchLocations(query: string): Promise<Location[]> {
    try {
      // البحث في قائمة المدن المحلية أولاً
      const localResults = SYRIAN_CITIES.filter(loc => 
        loc.name.toLowerCase().includes(query.toLowerCase()) ||
        loc.country.toLowerCase().includes(query.toLowerCase())
      );

      if (localResults.length > 0) {
        return localResults;
      }

      // إذا لم يتم العثور على نتائج محلية، استخدم API OpenStreetMap
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: `${query}, Syria`,
          format: 'json',
          limit: 5,
          'accept-language': 'ar',
          countrycodes: 'sy',
        },
        headers: {
          'User-Agent': 'SyriaWeatherApp/1.0 (https://syria-weather.com)',
        },
      });

      const results = response.data.map((item: any) => ({
        name: item.display_name.split(',')[0],
        country: 'سوريا',
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
      }));

      return results.length > 0 ? results : SYRIAN_CITIES;
    } catch (error) {
      console.error('Error searching locations:', error);
      // في حالة حدوث خطأ، نعود إلى قائمة المدن المحلية
      return SYRIAN_CITIES.filter(loc => 
        loc.name.toLowerCase().includes(query.toLowerCase()) ||
        loc.country.toLowerCase().includes(query.toLowerCase())
      );
    }
  },

  async getLocationName(lat: number, lon: number): Promise<Location> {
    try {
      // البحث عن أقرب مدينة في قائمة المدن المحلية
      const nearestCity = SYRIAN_CITIES.reduce((nearest, city) => {
        const currentDistance = this.calculateDistance(lat, lon, city.lat, city.lon);
        const nearestDistance = this.calculateDistance(lat, lon, nearest.lat, nearest.lon);
        return currentDistance < nearestDistance ? city : nearest;
      });

      // إذا كانت المسافة أقل من 50 كم، نستخدم المدينة المحلية
      if (this.calculateDistance(lat, lon, nearestCity.lat, nearestCity.lon) < 50) {
        return nearestCity;
      }

      // وإلا نستخدم API OpenStreetMap
      const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
        params: {
          lat,
          lon,
          format: 'json',
          'accept-language': 'ar',
        },
        headers: {
          'User-Agent': 'SyriaWeatherApp/1.0 (https://syria-weather.com)',
        },
      });

      if (response.data && response.data.display_name) {
        return {
          name: response.data.display_name.split(',')[0],
          country: 'سوريا',
          lat,
          lon,
        };
      }

      return nearestCity;
    } catch (error) {
      console.error('Error getting location name:', error);
      // في حالة حدوث خطأ، نعود إلى أقرب مدينة في القائمة المحلية
      return SYRIAN_CITIES.reduce((nearest, city) => {
        const currentDistance = this.calculateDistance(lat, lon, city.lat, city.lon);
        const nearestDistance = this.calculateDistance(lat, lon, nearest.lat, nearest.lon);
        return currentDistance < nearestDistance ? city : nearest;
      });
    }
  },

  // دالة مساعدة لحساب المسافة بين نقطتين
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // نصف قطر الأرض بالكيلومترات
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  },

  private toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  },
}; 