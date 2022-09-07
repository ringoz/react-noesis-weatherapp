import {
  DynamicResource,
  Grid,
  PanningMode,
  ScrollBarVisibility,
  ScrollViewer,
  StackPanel,
} from '@ringozz/react-noesis';
import { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  CurrentWeather,
  CurrentWeatherDetails,
  Daily,
  Header,
  Hourly,
} from './components';
import { Error, ErrorHandler, Loading, MockData } from './components/common';
import { useWeather } from './hooks';
import { WeatherKit } from './models';

export function App() {
  const [currentWeatherSelectedItem, setCurrentWeatherSelectedItem] =
    useState<WeatherKit.CurrentWeatherConditions>();
  const [currentLocationName, setCurrentLocationName] = useState<string>('');
  const {
    isLoading,
    location,
    currentWeather,
    hourlyWeather,
    dailyWeather,
    isMockData,
  } = useWeather(currentLocationName);

  useEffect(() => {
    setCurrentWeatherSelectedItem(currentWeather);
  }, [currentWeather]);

  const hourlyItemClickHandler = (
    current: WeatherKit.CurrentWeatherConditions
  ) => {
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
            <MockData isMockData={isMockData}>
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
