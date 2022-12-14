import {
  Button,
  DynamicResource,
  FontWeight,
  HeaderedContentControl,
  Orientation,
  StackPanel,
  TextBlock,
} from '@ringozz/react-noesis';
import { useState } from 'react';
import { WeatherKit } from '../models';
import { HourlyItem } from './HourlyItem';

type HourlyProps = {
  data: WeatherKit.HourlyForecast;
  clickHandler: (h: WeatherKit.HourWeatherConditions) => void;
};

export function Hourly({ data, clickHandler }: HourlyProps) {
  const [activeIndex, setActiveIndex] = useState<string>();

  const onClickHandler = (h: WeatherKit.HourWeatherConditions) => {
    setActiveIndex(h.forecastStart);
    clickHandler(h);
  };

  return (
    <HeaderedContentControl Margin={8}>
      <HeaderedContentControl.Header>
        <TextBlock FontSize={24} FontWeight={FontWeight.Bold}>
          Hourly
        </TextBlock>
      </HeaderedContentControl.Header>
      <StackPanel Margin={4} Orientation={Orientation.Horizontal}>
        {data.hours.map((h) => (
          <Button
            key={h.forecastStart}
            IsEnabled={activeIndex !== h.forecastStart}
            Background={DynamicResource(
              activeIndex === h.forecastStart
                ? 'Brush.TextBox.Focused'
                : 'Brush.Track.Normal'
            )}
            TextBlock$Foreground={DynamicResource('Brush.Foreground.Normal')}
            TextBlock$FontWeight={
              activeIndex === h.forecastStart
                ? FontWeight.Bold
                : FontWeight.Normal
            }
            onClick={() => onClickHandler(h)}
            Margin={4}
          >
            <HourlyItem data={h}></HourlyItem>
          </Button>
        ))}
      </StackPanel>
    </HeaderedContentControl>
  );
}
