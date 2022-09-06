import { useEffect, useState } from "react";
import { useErrorHandler } from "react-error-boundary";
import { useLocation } from ".";
import {
  CurrentWeatherModel,
  DailyWeatherDetailsModel,
  DailyWeatherModel,
  EmptyCurrentWeather,
  EmptyDailyWeatherModel,
  EmptyHourlyWeatherModel,
  HourlyWeatherModel,
} from "../models";
import { Fetcher } from "openapi-typescript-fetch";
import { components, paths } from "../models/WeatherKit";

export const useWeather = (
  locationName: string,
  unit: string,
  useMockData: boolean
) => {
  const { location } = useLocation(locationName, useMockData);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentWeather, setCurrentWeather] =
    useState<CurrentWeatherModel>(EmptyCurrentWeather);
  const [hourlyWeather, setHourlyWeather] = useState<HourlyWeatherModel>(
    EmptyHourlyWeatherModel
  );
  const [dailyWeather, setDailyWeather] = useState<DailyWeatherModel>(
    EmptyDailyWeatherModel
  );
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

      const fetchWeather = fetcher.path("/api/v1/weather/{language}/{latitude}/{longitude}").method('get').create();
      fetchWeather({
        dataSets: ["currentWeather", "forecastHourly", "forecastDaily"],
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        latitude: location.position.latitude,
        longitude: location.position.longitude
      }).then((response) => response.data)
        .then((data) => {
          setCurrent(data.currentWeather!);
          setHourly(data.forecastHourly!);
          setDaily(data.forecastDaily!);
        })
        .catch((error) => {
          handleError(error);
        })
        .finally(() => {
          setTimeout(() => setIsLoading(false), 100);
        });
    }
  }, [location, unit, useMockData, handleError]);

  const setCurrent = (data: components["schemas"]["CurrentWeather"]) => {
    setCurrentWeather({
      dt: Date.parse(data.asOf) / 1000,
      weather: {
        icon: "01d",
        description: data.conditionCode,
      },
      temp: data.temperature,
      feels_like: data.temperatureApparent,
      details: {
        rain: 0,
        visibility: data.visibility / 1000,
        humidity: Math.round(data.humidity * 100),
        pressure: data.pressure,
        wind_speed: data.windSpeed,
      },
    });
  };

  const setHourly = (data: components["schemas"]["HourlyForecast"]) => {
    let hourly: CurrentWeatherModel[] = [];
    data.hours.forEach((item) => {
      hourly.push({
        dt: Date.parse(item.forecastStart!) / 1000,
        weather: {
          icon: "01d",
          description: item.conditionCode,
        },
        temp: item.temperature,
        feels_like: item.temperatureApparent,
        details: {
          rain: Math.round(item.precipitationChance * 100),
          visibility: item.visibility / 1000,
          humidity: Math.round(item.humidity * 100),
          pressure: item.pressure,
          wind_speed: item.windSpeed,
        },
      });
    });
    setHourlyWeather({ hourly: hourly });
  };

  const setDaily = (data: components["schemas"]["DailyForecast"]) => {
    let daily: DailyWeatherDetailsModel[] = [];
    data.days.forEach((item) => {
      daily.push({
        dt: Date.parse(item.forecastStart!) / 1000,
        clouds: Math.round(item.daytimeForecast!.cloudCover * 100),
        humidity: Math.round(item.daytimeForecast!.humidity * 100),
        pressure: 0,
        sunrise:  Date.parse(item.sunrise!) / 1000,
        sunset: Date.parse(item.sunset!) / 1000,
        minTemp: item.temperatureMin,
        maxTemp: item.temperatureMax,
        uvi: item.maxUvIndex,
        weather: {
          icon: "01d",
          description: item.conditionCode,
        },
        wind_speed: item.daytimeForecast!.windSpeed,
        rain: Math.round(item.precipitationChance * 100),
      });
    });
    setDailyWeather({ daily: daily });
  };

  return {
    isLoading,
    location,
    currentWeather,
    hourlyWeather,
    dailyWeather,
  };
};
