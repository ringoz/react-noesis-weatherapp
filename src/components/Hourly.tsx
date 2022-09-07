import {
  Button,
  DynamicResource,
  FontWeight,
  HeaderedContentControl,
  Orientation,
  PanningMode,
  ScrollBarVisibility,
  ScrollViewer,
  StackPanel,
  TextBlock
} from '@ringozz/react-noesis';
import { useState } from 'react';
import {
  HourlyWeatherDetailsModel,
  HourlyWeatherModel
} from '../models';
import { HourlyItem } from './HourlyItem';

type HourlyProps = {
  data: HourlyWeatherModel;
  clickHandler: (h: HourlyWeatherDetailsModel) => void;
};

export function Hourly({ data, clickHandler }: HourlyProps) {
  const [activeIndex, setActiveIndex] = useState<string>();

  const onClickHandler = (h: HourlyWeatherDetailsModel) => {
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
      <ScrollViewer
        Margin={4}
        PanningMode={PanningMode.HorizontalOnly}
        HorizontalScrollBarVisibility={ScrollBarVisibility.Hidden}
      >
        <StackPanel Orientation={Orientation.Horizontal}>
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
                activeIndex === h.forecastStart ? FontWeight.Bold : FontWeight.Normal
              }
              onClick={() => onClickHandler(h)}
              Margin={4}
            >
              <HourlyItem data={h}></HourlyItem>
            </Button>
          ))}
        </StackPanel>
      </ScrollViewer>
    </HeaderedContentControl>
  );
}
