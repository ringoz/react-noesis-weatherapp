import { useState } from 'react';
import DailyItem from './DailyItem';
import { DailyWeatherDetailsModel, DailyWeatherModel, SettingsModel } from '../models';
import { DailyItemDetails } from './DailyItemDetails';
import {
  FontWeight,
  HeaderedContentControl,
  StackPanel,
  TextBlock,
  Visibility,
} from '@ringozz/react-noesis';

type DailyProps = {
  settings: SettingsModel;
  data: DailyWeatherModel;
};

export const Daily = ({ settings, data }: DailyProps) => {
  const [activeIndex, setActiveIndex] = useState<string>();

  const clickHandler = (d: DailyWeatherDetailsModel) => {
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
            <DailyItem
              settings={settings}
              data={d}
              onClick={() => clickHandler(d)}
            />
            <StackPanel
              Visibility={
                activeIndex === d.forecastStart ? Visibility.Visible : Visibility.Collapsed
              }
            >
              <DailyItemDetails data={d} />
            </StackPanel>
          </StackPanel>
        ))}
      </StackPanel>
    </HeaderedContentControl>
  );
};

export default Daily;
