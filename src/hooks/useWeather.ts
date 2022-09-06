import { Fetcher } from "openapi-typescript-fetch";
import { useEffect, useState } from "react";
import { useErrorHandler } from "react-error-boundary";
import { useLocation } from ".";
import { CurrentWeatherModel, DailyWeatherModel, HourlyWeatherModel } from "../models";
import { paths } from "../models/WeatherKit";

export function useWeather(locationName: string, useMockData: boolean) {
  const { location } = useLocation(locationName, useMockData);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherModel>();
  const [hourlyWeather, setHourlyWeather] = useState<HourlyWeatherModel>();
  const [dailyWeather, setDailyWeather] = useState<DailyWeatherModel>();
  const handleError = useErrorHandler();

  useEffect(() => {
    setIsLoading(true);
    if (location) {
      const fetcher = Fetcher.for<paths>();
      fetcher.configure(useMockData ? {
        baseUrl: "assets/mock-data/weather.json?"
      } : {
        baseUrl: import.meta.env.VITE_APP_WEATHERKIT_BASEURL,
        init: {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_APP_WEATHERKIT_TOKEN}`
          }
        }
      });

      const oneDay = 24 * 60 * 60 * 1000;
      const tomorrow = Date.now() + oneDay;

      const fetchWeather = fetcher.path("/api/v1/weather/{language}/{latitude}/{longitude}").method('get').create();
      fetchWeather({
        dataSets: ["currentWeather", "forecastHourly", "forecastDaily"],
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        latitude: location.position.latitude,
        longitude: location.position.longitude,
        dailyStart: new Date(tomorrow).toISOString(),
        dailyEnd: new Date(tomorrow + 7 * oneDay).toISOString(),
        hourlyStart: new Date().toISOString(),
        hourlyEnd: new Date(tomorrow).toISOString()
      }).then((response) => response.data)
        .then((data) => {
          setCurrentWeather(data.currentWeather!);
          setHourlyWeather(data.forecastHourly!);
          setDailyWeather(data.forecastDaily!);
        })
        .catch((error) => {
          handleError(error);
        })
        .finally(() => {
          setTimeout(() => setIsLoading(false), 100);
        });
    }
  }, [location, useMockData, handleError]);

  return {
    isLoading,
    location,
    currentWeather,
    hourlyWeather,
    dailyWeather,
  };
}
