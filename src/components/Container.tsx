import { Grid, StackPanel } from '@ringozz/react-noesis';
import { useEffect, useState } from 'react';
import { useWeather } from '../hooks';
import { CurrentWeatherDetailsModel } from '../models';
import { Loading } from './common/Loading';
import MockData from './common/MockData';
import CurrentWeather from './CurrentWeather';
import CurrentWeatherDetails from './CurrentWeatherDetails';
import Daily from './Daily';
import Header from './Header';
import Hourly from './Hourly';

type ContainerProps = {
};

export const Container = ({}: ContainerProps) => {
  const useMockData: boolean = true;
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
    <Grid Margin={8}>
      <Loading isLoading={isLoading}>
        <MockData useMockData={useMockData}>
          <StackPanel>
            <Header
              locality={location.locality}
              country={location.country}
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
  );
};
