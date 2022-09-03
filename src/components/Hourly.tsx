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
  CurrentWeatherModel,
  HourlyWeatherModel,
  SettingsModel,
} from '../models';
import HourlyItem from './HourlyItem';

type HourlyProps = {
  settings: SettingsModel;
  data: HourlyWeatherModel;
  clickHandler: (h: CurrentWeatherModel) => void;
};

export const Hourly = ({ settings, data, clickHandler }: HourlyProps) => {
  const [activeIndex, setActiveIndex] = useState(
    data && data.hourly[0] ? data.hourly[0].dt : 0
  );

  const onClickHandler = (h: CurrentWeatherModel) => {
    setActiveIndex(h.dt);
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
          {data.hourly.map((h) => (
            <Button
              key={h.dt}
              IsEnabled={activeIndex !== h.dt}
              Background={DynamicResource(
                activeIndex === h.dt
                  ? 'Brush.TextBox.Focused'
                  : 'Brush.Track.Normal'
              )}
              TextBlock$Foreground={DynamicResource('Brush.Foreground.Normal')}
              TextBlock$FontWeight={
                activeIndex === h.dt ? FontWeight.Bold : FontWeight.Normal
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
