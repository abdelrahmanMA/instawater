export const BASE_URL = 'https://api.darksky.net/forecast';
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';
export const API_URL = `${BASE_URL}/${API_KEY}`;
export const OPEN_WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
export const OPEN_WEATHER_API_KEY = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY || '';
