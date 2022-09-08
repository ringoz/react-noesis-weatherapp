import { DynamicResource, FontWeight, HorizontalAlignment, Hyperlink, Orientation, Path, StackPanel, TextAlignment, TextBlock, TextWrapping, VerticalAlignment, Viewbox } from '@ringozz/react-noesis';
import { useEffect, useState } from 'react';
import { useWeather } from '../hooks';
import { WeatherKit } from '../models';
import { CurrentWeather } from './CurrentWeather';
import { Daily } from './Daily';
import { CurrentLocation } from './CurrentLocation';
import { Hourly } from './Hourly';

export function Weather() {
  const [currentLocationName, setCurrentLocationName] = useState<string>('');
  const { location, weather, isMockData } = useWeather(currentLocationName);

  const [currentConditions, setCurrentConditions] = useState<WeatherKit.CurrentWeatherConditions>(weather.currentWeather!);
  useEffect(() => {
    setCurrentConditions(weather.currentWeather!);
  }, [weather]);

  const hourlyItemClickHandler = (hourly: WeatherKit.HourWeatherConditions) => {
    setCurrentConditions(hourly);
  };

  const changeLocationHandler = (location: string) => {
    setCurrentLocationName(location);
  };

  const selectedDate = new Date(
    (currentConditions as WeatherKit.CurrentWeather).asOf ??
    (currentConditions as WeatherKit.HourWeatherConditions).forecastStart
  );

  return (
    <StackPanel Margin={8}>
      {isMockData && <MockDataHeader />}
      <CurrentLocation
        locality={location.structuredAddress.locality}
        country={location.country}
        datetime={selectedDate}
        changeLocation={changeLocationHandler}
      />
      <CurrentWeather data={currentConditions} />
      <Hourly data={weather.forecastHourly!} clickHandler={hourlyItemClickHandler} />
      <Daily data={weather.forecastDaily!} />
      {!isMockData && <RealDataFooter />}
    </StackPanel>
  );
}

const MockDataHeader = () => (
  <TextBlock
    TextWrapping={TextWrapping.Wrap}
    TextAlignment={TextAlignment.Center}
  >
    The application is running in demo mode. To run the application with
    real data please check the{' '}
    <Hyperlink NavigateUri="https://github.com/ringoz/react-noesis-weatherapp">
      documentation
    </Hyperlink>
    .
  </TextBlock>
);

const RealDataFooter = () => (
  <StackPanel>
    <StackPanel
      HorizontalAlignment={HorizontalAlignment.Center}
      Orientation={Orientation.Horizontal}
    >
      <Viewbox Width={16} Height={16} Margin={[0, 2, 4, 4]}>
        <Path
          Fill={DynamicResource('Brush.Foreground.Normal')}
          Data="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"
        />
      </Viewbox>
      <TextBlock
        VerticalAlignment={VerticalAlignment.Center}
        FontWeight={FontWeight.Bold}
      >
        Weather
      </TextBlock>
    </StackPanel>
    <TextBlock HorizontalAlignment={HorizontalAlignment.Center}>
      <Hyperlink NavigateUri="https://weatherkit.apple.com/legal-attribution.html">
        Data Sources
      </Hyperlink>
    </TextBlock>
  </StackPanel>
);
