import { OPEN_WEATHER_BASE_URL, OPEN_WEATHER_API_KEY } from '../config';

export const getWeatherData = (lat, lon) =>
  fetch(`${OPEN_WEATHER_BASE_URL}?units=metric&lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}`).then((response) =>
    response.json()
  );
