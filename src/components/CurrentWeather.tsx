import {
  DynamicResource,
  FontWeight,
  HorizontalAlignment,
  Span,
  StackPanel,
  TextBlock,
  UniformGrid,
} from '@ringozz/react-noesis';
import { WeatherKit } from '../models';
import { weatherDesc, WeatherIcon } from './common/WeatherIcon';

type CurrentWeatherProps = {
  data: WeatherKit.CurrentWeatherDetailsModel;
};

export function CurrentWeather({ data }: CurrentWeatherProps) {
  return (
    <UniformGrid Margin={8} Columns={2}>
      <StackPanel Grid$Column={0}>
        <WeatherIcon Width={120} Height={120} data={data} />
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
          {weatherDesc(data)}
        </TextBlock>
      </StackPanel>
    </UniformGrid>
  );
}
