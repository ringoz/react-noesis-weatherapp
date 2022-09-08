import { Fetcher } from 'openapi-typescript-fetch';
import { useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useLocation } from './useLocation';
import { WeatherKit } from '../models';
import { paths } from '../models/WeatherKit';

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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [weather, setWeather] = useState<WeatherKit.Weather>();
  const handleError = useErrorHandler();

  useEffect(() => {
    setIsLoading(true);
    if (location) {
      const oneHour = 60 * 60 * 1000;
      const oneDay = 24 * oneHour;
      const tomorrow = Date.now() + oneDay;
      fetchWeather({
        dataSets: ['currentWeather', 'forecastHourly', 'forecastDaily'],
        language: 'en-US',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        latitude: location.coordinate.latitude,
        longitude: location.coordinate.longitude,
        dailyStart: new Date(tomorrow).toISOString(),
        dailyEnd: new Date(tomorrow + 7 * oneDay).toISOString(),
        hourlyStart: new Date(Date.now() + oneHour).toISOString(),
        hourlyEnd: new Date(tomorrow).toISOString(),
      })
        .then((response) => setWeather(response.data))
        .catch(handleError)
        .finally(() => {
          setTimeout(() => setIsLoading(false));
        });
    }
  }, [location, handleError]);

  return {
    isLoading,
    location,
    weather,
    isMockData: isMockData || !baseUrl,
  };
}
