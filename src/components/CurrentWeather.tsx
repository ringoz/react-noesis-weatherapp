import { Image, Span, StackPanel, TextBlock } from '@ringozz/react-noesis';
import { CurrentWeatherModel, SettingsModel } from '../models';

type CurrentWeatherProps = {
  settings: SettingsModel;
  data: CurrentWeatherModel;
};

export const CurrentWeather = ({ settings, data }: CurrentWeatherProps) => {
  const weatherCode =
    data.weather.icon !== ''
      ? settings.theme === 'dark'
        ? `${data.weather.icon}_n`
        : `${data.weather.icon}`
      : '01d';
  const unitSymbol = settings.unit === 'metric' ? 'C' : 'F';
  return (
    <StackPanel>
      <StackPanel>
        <Image Source={require(`../resources/icon_${weatherCode}.png`)} />
      </StackPanel>
      <StackPanel>
        <TextBlock>
          {Math.round(data.temp)}°<Span>{unitSymbol}</Span>
        </TextBlock>
        <TextBlock>
          Feels like: <Span>{Math.round(data.feels_like)}°</Span>
        </TextBlock>
        <TextBlock>{data.weather.description}</TextBlock>
      </StackPanel>
    </StackPanel>
  );
};

export default CurrentWeather;
