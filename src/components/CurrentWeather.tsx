import {
  DynamicResource,
  FontWeight,
  HorizontalAlignment,
  Image,
  Span,
  StackPanel,
  TextBlock,
  UniformGrid,
} from '@ringozz/react-noesis';
import {
  CurrentWeatherDetailsModel,
  weatherDesc,
  weatherIcon,
} from '../models';

type CurrentWeatherProps = {
  data: CurrentWeatherDetailsModel;
};

export function CurrentWeather({ data }: CurrentWeatherProps) {
  return (
    <UniformGrid Margin={8} Columns={2}>
      <StackPanel Grid$Column={0}>
        <Image Width={120} Height={120} Source={weatherIcon(data)} />
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
