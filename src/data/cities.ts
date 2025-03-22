export interface City {
  id: string;
  name: string;
  nameAr: string;
  lat: number;
  lon: number;
  population: number;
}

export const syrianCities: City[] = [
  {
    id: 'damascus',
    name: 'Damascus',
    nameAr: 'دمشق',
    lat: 33.5138,
    lon: 36.2765,
    population: 2070000,
  },
  {
    id: 'aleppo',
    name: 'Aleppo',
    nameAr: 'حلب',
    lat: 36.2021,
    lon: 37.1343,
    population: 1900000,
  },
  {
    id: 'homs',
    name: 'Homs',
    nameAr: 'حمص',
    lat: 34.7324,
    lon: 36.7137,
    population: 775404,
  },
  {
    id: 'latakia',
    name: 'Latakia',
    nameAr: 'اللاذقية',
    lat: 35.5407,
    lon: 35.7956,
    population: 700000,
  },
  {
    id: 'hama',
    name: 'Hama',
    nameAr: 'حماة',
    lat: 35.1333,
    lon: 36.7500,
    population: 696863,
  },
  {
    id: 'raqqa',
    name: 'Raqqa',
    nameAr: 'الرقة',
    lat: 35.9500,
    lon: 39.0167,
    population: 220488,
  },
  {
    id: 'deir-ez-zor',
    name: 'Deir ez-Zor',
    nameAr: 'دير الزور',
    lat: 35.3333,
    lon: 40.1500,
    population: 239196,
  },
  {
    id: 'hasakah',
    name: 'Hasakah',
    nameAr: 'الحسكة',
    lat: 36.4833,
    lon: 40.7500,
    population: 188160,
  },
  {
    id: 'qamishli',
    name: 'Qamishli',
    nameAr: 'القامشلي',
    lat: 37.0500,
    lon: 41.2167,
    population: 184231,
  },
  {
    id: 'tartus',
    name: 'Tartus',
    nameAr: 'طرطوس',
    lat: 34.8833,
    lon: 35.8833,
    population: 115769,
  },
];