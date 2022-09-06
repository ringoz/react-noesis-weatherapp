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
  TextBlock,
} from '@ringozz/react-noesis';
import { useState } from 'react';
import {
  HourlyWeatherDetailsModel,
  HourlyWeatherModel,
  SettingsModel,
} from '../models';
import HourlyItem from './HourlyItem';

type HourlyProps = {
  settings: SettingsModel;
  data: HourlyWeatherModel;
  clickHandler: (h: HourlyWeatherDetailsModel) => void;
};

export const Hourly = ({ settings, data, clickHandler }: HourlyProps) => {
  const [activeIndex, setActiveIndex] = useState(
    data && data.hours[0] ? data.hours[0].forecastStart : 0
  );

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
              <HourlyItem settings={settings} data={h}></HourlyItem>
            </Button>
          ))}
        </StackPanel>
      </ScrollViewer>
    </HeaderedContentControl>
  );
};

export default Hourly;
