import {
  ColumnDefinition,
  DynamicResource,
  FontWeight,
  Grid,
  HorizontalAlignment,
  Image,
  Span,
  StackPanel,
  TextBlock,
} from '@ringozz/react-noesis';
import { CurrentWeatherModel, SettingsModel } from '../models';

type CurrentWeatherProps = {
  settings: SettingsModel;
  data: CurrentWeatherModel;
};

export const CurrentWeather = ({ settings, data }: CurrentWeatherProps) => {
  const weatherCode = data.weather.icon || '01d';
  const unitSymbol = settings.unit === 'metric' ? 'C' : 'F';
  return (
    <Grid Margin={8}>
      <Grid.ColumnDefinitions>
        <ColumnDefinition />
        <ColumnDefinition />
      </Grid.ColumnDefinitions>
      <StackPanel Grid$Column={0}>
        <Image Width={120} Height={120} Source={`assets/icon_${weatherCode}.png`} />
      </StackPanel>
      <StackPanel Grid$Column={1}>
        <TextBlock
          HorizontalAlignment={HorizontalAlignment.Center}
          FontSize={64}
          FontWeight={FontWeight.Bold}
        >
          {Math.round(data.temp)}°<Span>{unitSymbol}</Span>
        </TextBlock>
        <TextBlock HorizontalAlignment={HorizontalAlignment.Center}>
          <Span Foreground={DynamicResource('Brush.Foreground.Placeholder')}>
            Feels like:{' '}
          </Span>
          <Span>{Math.round(data.feels_like)}°</Span>
        </TextBlock>
        <TextBlock HorizontalAlignment={HorizontalAlignment.Center}>
          {data.weather.description}
        </TextBlock>
      </StackPanel>
    </Grid>
  );
};

export default CurrentWeather;
