import {
  DynamicResource, Grid, PanningMode,
  ScrollBarVisibility,
  ScrollViewer, StackPanel
} from "@ringozz/react-noesis";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { CurrentWeather, CurrentWeatherDetails, Daily, Header, Hourly } from "./components";
import { Error, ErrorHandler, Loading, MockData } from "./components/common";
import { useWeather } from "./hooks";
import { CurrentWeatherDetailsModel } from "./models";

export function App() {
  const useMockData = !import.meta.env.VITE_APP_MAPKIT_BASEURL || !import.meta.env.VITE_APP_WEATHERKIT_BASEURL;
  const [currentWeatherSelectedItem, setCurrentWeatherSelectedItem] = useState<CurrentWeatherDetailsModel>();
  const [currentLocationName, setCurrentLocationName] = useState<string>('');

  const { isLoading, location, currentWeather, hourlyWeather, dailyWeather } =
    useWeather(currentLocationName, useMockData);

  useEffect(() => {
    setCurrentWeatherSelectedItem(currentWeather);
  }, [currentWeather]);

  const hourlyItemClickHandler = (current: CurrentWeatherDetailsModel) => {
    setCurrentWeatherSelectedItem(current);
  };

  const changeLocationHandler = (location: string) => {
    setCurrentLocationName(location);
  };

  return (
    <ErrorBoundary FallbackComponent={Error} onError={ErrorHandler}>
      <ScrollViewer
        Background={DynamicResource('Brush.TextBox.Normal')}
        PanningMode={PanningMode.VerticalOnly}
        VerticalScrollBarVisibility={ScrollBarVisibility.Hidden}
      >
        <Grid Margin={8}>
          <Loading isLoading={isLoading}>
            <MockData useMockData={useMockData}>
              <StackPanel>
                <Header
                  locality={location?.structuredAddress.locality}
                  country={location?.country}
                  data={currentWeatherSelectedItem!}
                  changeLocation={changeLocationHandler}
                ></Header>
                <CurrentWeather
                  data={currentWeatherSelectedItem!}
                ></CurrentWeather>
                <CurrentWeatherDetails
                  data={currentWeatherSelectedItem!}
                ></CurrentWeatherDetails>
                <Hourly
                  data={hourlyWeather!}
                  clickHandler={hourlyItemClickHandler}
                ></Hourly>
                <Daily data={dailyWeather!}></Daily>
              </StackPanel>
            </MockData>
          </Loading>
        </Grid>
      </ScrollViewer>
    </ErrorBoundary>
  );
}
