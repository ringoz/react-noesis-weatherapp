import { useState } from 'react';
import DailyItem from './DailyItem';
import { DailyWeatherModel, SettingsModel } from '../models';
import { DailyItemDetails } from './DailyItemDetails';
import { StackPanel, TextBlock } from '@ringozz/react-noesis';

type DailyProps = {
  settings: SettingsModel;
  data: DailyWeatherModel;
};

export const Daily = ({ settings, data }: DailyProps) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const clickHandler = (d: any) => {
    if (d.dt === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(d.dt);
    }
  };
  return (
    <StackPanel>
      <TextBlock>Daily</TextBlock>
      <StackPanel>
        {data.daily.map((d) => (
          <StackPanel key={d.dt}>
            <DailyItem
              settings={settings}
              data={d}
              onClick={() => clickHandler(d)}
            ></DailyItem>
            <StackPanel>
              <DailyItemDetails data={d}></DailyItemDetails>
            </StackPanel>
          </StackPanel>
        ))}
      </StackPanel>
    </StackPanel>
  );
};

export default Daily;
