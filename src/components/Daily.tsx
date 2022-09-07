import {
  FontWeight,
  HeaderedContentControl,
  StackPanel,
  TextBlock,
  Visibility,
} from '@ringozz/react-noesis';
import { useState } from 'react';
import { DailyWeatherDetailsModel, DailyWeatherModel } from '../models';
import { DailyItem } from './DailyItem';
import { DailyItemDetails } from './DailyItemDetails';

type DailyProps = {
  data: DailyWeatherModel;
};

export function Daily({ data }: DailyProps) {
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
            <DailyItem data={d} onClick={() => clickHandler(d)} />
            <StackPanel
              Visibility={
                activeIndex === d.forecastStart
                  ? Visibility.Visible
                  : Visibility.Collapsed
              }
            >
              <DailyItemDetails data={d} />
            </StackPanel>
          </StackPanel>
        ))}
      </StackPanel>
    </HeaderedContentControl>
  );
}
