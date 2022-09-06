import {
  DynamicResource,
  FontWeight,
  HorizontalAlignment,
  Image,
  Span,
  StackPanel,
  TextBlock,
  UniformGrid
} from '@ringozz/react-noesis';
import { CurrentWeatherDetailsModel } from '../models';

type CurrentWeatherProps = {
  data: CurrentWeatherDetailsModel;
};

export function CurrentWeather({ data }: CurrentWeatherProps) {
  const weatherCode = /*data.conditionCode ||*/ '01d';
  return (
    <UniformGrid Margin={8} Columns={2}>
      <StackPanel Grid$Column={0}>
        <Image
          Width={120}
          Height={120}
          Source={`assets/icon_${weatherCode}.png`}
        />
      </StackPanel>
      <StackPanel Grid$Column={1}>
        <TextBlock
          HorizontalAlignment={HorizontalAlignment.Center}
          FontSize={64}
          FontWeight={FontWeight.Bold}
        >
          {Math.round(data.temperature)}°
        </TextBlock>
        <TextBlock HorizontalAlignment={HorizontalAlignment.Center}>
          <Span Foreground={DynamicResource('Brush.Foreground.Placeholder')}>
            Feels like:{' '}
          </Span>
          <Span>{Math.round(data.temperatureApparent)}°</Span>
        </TextBlock>
        <TextBlock HorizontalAlignment={HorizontalAlignment.Center}>
          {data.conditionCode}
        </TextBlock>
      </StackPanel>
    </UniformGrid>
  );
}
