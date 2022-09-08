import {
  FontWeight,
  HeaderedContentControl,
  StackPanel,
  TextBlock,
  Visibility,
} from '@ringozz/react-noesis';
import { useState } from 'react';
import { WeatherKit } from '../models';
import { DetailsGrid } from './common';
import { DailyItem } from './DailyItem';

type DailyProps = {
  data: WeatherKit.DailyForecast;
};

export function Daily({ data }: DailyProps) {
  const [activeIndex, setActiveIndex] = useState<string>();

  const clickHandler = (d: WeatherKit.DayWeatherConditions) => {
    if (d.forecastStart === activeIndex) {
      setActiveIndex(undefined);
    } else {
      setActiveIndex(d.forecastStart);
    }
  };

  return (
    <HeaderedContentControl Margin={8}>
      <HeaderedContentControl.Header>
        <TextBlock FontSize={24} FontWeight={FontWeight.Bold}>
          Daily
        </TextBlock>
      </HeaderedContentControl.Header>
      <StackPanel Margin={4}>
        {data.days.map((d) => (
          <StackPanel key={d.forecastStart}>
            <DailyItem data={d} onClick={() => clickHandler(d)} />
            <StackPanel
              Visibility={
                activeIndex === d.forecastStart
                  ? Visibility.Visible
                  : Visibility.Collapsed
              }
            >
              <DetailsGrid
                details={[
                  `Rain: ${Math.round(d.precipitationChance * 100)}%`,
                  `Pressure: ${0}hPa`,
                  `Humidity: ${Math.round(d.daytimeForecast!.humidity * 100)}%`,
                  `Clouds: ${Math.round(d.daytimeForecast!.cloudCover * 100)}%`,
                  `Wind speed: ${d.daytimeForecast!.windSpeed} m/s`,
                  `UV Index: ${d.maxUvIndex}`,
                  `Sunrise: ${new Date(d.sunrise!).toLocaleString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}`,
                  `Sunset: ${new Date(d.sunset!).toLocaleString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}`,
                ]}
              />
            </StackPanel>
          </StackPanel>
        ))}
      </StackPanel>
    </HeaderedContentControl>
  );
}
