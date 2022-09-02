import {
  Button,
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
    <StackPanel>
      <TextBlock>Hourly</TextBlock>
      <ScrollViewer>
        <StackPanel>
          {data.hourly.map((h) => (
            <Button key={h.dt} onClick={() => onClickHandler(h)}>
              <HourlyItem settings={settings} data={h}></HourlyItem>
            </Button>
          ))}
        </StackPanel>
      </ScrollViewer>
    </StackPanel>
  );
};

export default Hourly;
