import { Grid, StackPanel } from '@ringozz/react-noesis';
import { useEffect, useState } from 'react';
import { useWeather } from '../hooks';
import {
  CurrentWeatherModel,
  EmptyCurrentWeather,
  SettingsModel,
} from '../models';
import { Loading } from './common/Loading';
import MockData from './common/MockData';
import CurrentWeather from './CurrentWeather';
import CurrentWeatherDetails from './CurrentWeatherDetails';
import Daily from './Daily';
import Header from './Header';
import Hourly from './Hourly';

type ContainerProps = {
  settings: SettingsModel;
  changeSettings: (newSettings: object) => void;
};

export const Container = ({ settings, changeSettings }: ContainerProps) => {
  const useMockData: boolean = true;
  const [currentWeatherSelectedItem, setCurrentWeatherSelectedItem] =
    useState(EmptyCurrentWeather);
  const [currentLocationName, setCurrentLocationName] = useState<string>('');

  const { isLoading, location, currentWeather, hourlyWeather, dailyWeather } =
    useWeather(currentLocationName, settings.unit, useMockData);

  useEffect(() => {
    setCurrentWeatherSelectedItem(currentWeather);
  }, [currentWeather]);

  const hourlyItemClickHandler = (current: CurrentWeatherModel) => {
    setCurrentWeatherSelectedItem(current);
  };

  const changeLocationHandler = (location: string) => {
    setCurrentLocationName(location);
  };

  return (
    <MockData useMockData={useMockData}>
      <Grid Margin={8}>
        <Loading isLoading={isLoading}>
          <StackPanel>
            <Header
              locality={location.locality}
              country={location.country}
              data={currentWeatherSelectedItem}
              settings={settings}
              changeSettings={changeSettings}
              changeLocation={changeLocationHandler}
            ></Header>
            <CurrentWeather
              settings={settings}
              data={currentWeatherSelectedItem}
            ></CurrentWeather>
            <CurrentWeatherDetails
              data={currentWeatherSelectedItem.details}
            ></CurrentWeatherDetails>
            <Hourly
              settings={settings}
              data={hourlyWeather}
              clickHandler={hourlyItemClickHandler}
            ></Hourly>
            <Daily settings={settings} data={dailyWeather}></Daily>
          </StackPanel>
        </Loading>
      </Grid>
    </MockData>
  );
};
