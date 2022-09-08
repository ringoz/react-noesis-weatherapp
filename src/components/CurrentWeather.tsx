import {
  Border,
  DynamicResource,
  FontWeight,
  HorizontalAlignment,
  Span,
  StackPanel,
  TextBlock,
  UniformGrid,
} from '@ringozz/react-noesis';
import { WeatherKit } from '../models';
import { DetailsGrid } from './common';
import { weatherDesc, WeatherIcon } from './common/WeatherIcon';

type CurrentWeatherProps = {
  data: WeatherKit.CurrentWeatherConditions;
};

export function CurrentWeather({ data }: CurrentWeatherProps) {
  const rainChance = (data as WeatherKit.HourWeatherConditions)
    .precipitationChance;
  const rainIntensity =
    (data as WeatherKit.CurrentWeather).precipitationIntensity ?? 0;
  return (
    <>
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
      <Border Margin={8} Background={DynamicResource('Brush.TextBox.Focused')}>
        <DetailsGrid
          details={[
            rainChance !== undefined
              ? `Rain: ${Math.round(rainChance * 100)}%`
              : `Rain: ${rainIntensity} mm/h`,
            `Pressure: ${data.pressure}hPa`,
            `Humidity: ${Math.round(data.humidity * 100)}%`,
            `Visibility: ${data.visibility} km`,
            `Wind speed: ${Math.round(data.windSpeed)} m/s`,
          ]}
        />
      </Border>
    </>
  );
}
