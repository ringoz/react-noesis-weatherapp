import { Fetcher } from 'openapi-typescript-fetch';
import { suspend } from 'suspend-react';
import { paths } from '../models/WeatherKit';
import { useLocation } from './useLocation';

const baseUrl = import.meta.env.VITE_APP_WEATHERKIT_BASEURL;
const authKey = import.meta.env.VITE_APP_WEATHERKIT_TOKEN;

const fetcher = Fetcher.for<paths>();
fetcher.configure({
  baseUrl: baseUrl ?? 'assets/mock-data/weather.json?',
  init: {
    headers: {
      Authorization: `Bearer ${authKey}`,
    },
  },
});

const fetchWeather = fetcher
  .path('/api/v1/weather/{language}/{latitude}/{longitude}')
  .method('get')
  .create();

export function useWeather(locationName: string) {
  const { location, isMockData } = useLocation(locationName);
  const response = suspend(() => {
    const oneHour = 60 * 60 * 1000;
    const oneDay = 24 * oneHour;
    const tomorrow = Date.now() + oneDay;
    return fetchWeather({
      dataSets: ['currentWeather', 'forecastHourly', 'forecastDaily'],
      language: 'en-US',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      latitude: location.coordinate.latitude,
      longitude: location.coordinate.longitude,
      dailyStart: new Date(tomorrow).toISOString(),
      dailyEnd: new Date(tomorrow + 7 * oneDay).toISOString(),
      hourlyStart: new Date(Date.now() + oneHour).toISOString(),
      hourlyEnd: new Date(tomorrow).toISOString(),
    });
  }, [location]);

  return {
    location,
    weather: response.data,
    isMockData: isMockData || !baseUrl,
  };
}
