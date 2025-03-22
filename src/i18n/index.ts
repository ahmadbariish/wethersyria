import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ar: {
    translation: {
      weather: {
        current: 'الطقس الحالي',
        forecast: 'التوقعات',
        humidity: 'الرطوبة',
        windSpeed: 'سرعة الرياح',
        feelsLike: 'يشعر كأنه',
        alerts: 'التنبيهات',
        airQuality: 'جودة الهواء',
        uvIndex: 'مؤشر الأشعة فوق البنفسجية',
        search: 'ابحث عن مدينة',
        voiceSearch: 'البحث الصوتي',
        share: 'مشاركة',
        settings: 'الإعدادات',
        darkMode: 'الوضع الليلي',
        lightMode: 'الوضع النهاري',
      },
      alerts: {
        storm: 'عاصفة',
        rain: 'ممطر',
        heat: 'حار',
        snow: 'ثلج',
        wind: 'رياح قوية',
      },
      recommendations: {
        title: 'التوصيات اليومية',
        clothing: 'الملابس المناسبة',
        activities: 'الأنشطة المقترحة',
        health: 'نصائح صحية',
      },
      cities: {
        damascus: 'دمشق',
        aleppo: 'حلب',
        homs: 'حمص',
        latakia: 'اللاذقية',
        hama: 'حماة',
        raqqa: 'الرقة',
        deirEzZor: 'دير الزور',
        hasakah: 'الحسكة',
        qamishli: 'القامشلي',
        tartus: 'طرطوس',
      },
    },
  },
  en: {
    translation: {
      weather: {
        current: 'Current Weather',
        forecast: 'Forecast',
        humidity: 'Humidity',
        windSpeed: 'Wind Speed',
        feelsLike: 'Feels Like',
        alerts: 'Alerts',
        airQuality: 'Air Quality',
        uvIndex: 'UV Index',
        search: 'Search city',
        voiceSearch: 'Voice Search',
        share: 'Share',
        settings: 'Settings',
        darkMode: 'Dark Mode',
        lightMode: 'Light Mode',
      },
      alerts: {
        storm: 'Storm',
        rain: 'Rain',
        heat: 'Heat',
        snow: 'Snow',
        wind: 'Strong Wind',
      },
      recommendations: {
        title: 'Daily Recommendations',
        clothing: 'Appropriate Clothing',
        activities: 'Suggested Activities',
        health: 'Health Tips',
      },
      cities: {
        damascus: 'Damascus',
        aleppo: 'Aleppo',
        homs: 'Homs',
        latakia: 'Latakia',
        hama: 'Hama',
        raqqa: 'Raqqa',
        deirEzZor: 'Deir ez-Zor',
        hasakah: 'Hasakah',
        qamishli: 'Qamishli',
        tartus: 'Tartus',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 