import {
  Button,
  ColumnDefinition,
  FontWeight,
  Grid,
  HorizontalAlignment,
  Image,
  RowDefinition,
  StackPanel,
  TextBlock,
  VerticalAlignment,
} from '@ringozz/react-noesis';
import { SettingsModel } from '../models';
import { DailyWeatherDetailsModel } from '../models/DailyWeatherDetailsModel';

type DailyItemProps = {
  settings: SettingsModel;
  data: DailyWeatherDetailsModel;
  onClick: () => void;
};

export const DailyItem = ({ settings, data, onClick }: DailyItemProps) => {
  const weatherCode =
    settings.theme === 'dark'
      ? `${data.weather.icon}_n`
      : `${data.weather.icon}`;
  const unitSymbol = settings.unit === 'metric' ? 'C' : 'F';
  return (
    <Button
      Margin={4}
      onClick={onClick}
      HorizontalContentAlignment={HorizontalAlignment.Stretch}
    >
      <Grid>
        <Grid.ColumnDefinitions>
          <ColumnDefinition Width={50} />
          <ColumnDefinition Width="1*" />
          <ColumnDefinition Width="2*" />
          <ColumnDefinition Width={100} />
        </Grid.ColumnDefinitions>
        <Image Grid$Column={0} Height={40} Source={`icon_${weatherCode}.png`} />
        <TextBlock
          Grid$Column={1}
          VerticalAlignment={VerticalAlignment.Center}
          FontWeight={FontWeight.Bold}
        >
          {new Date(data.dt * 1000).toLocaleString('en-GB', {
            weekday: 'long',
          })}
        </TextBlock>
        <TextBlock
          Grid$Column={2}
          VerticalAlignment={VerticalAlignment.Center}
          HorizontalAlignment={HorizontalAlignment.Right}
        >
          {data.weather.description}
        </TextBlock>
        <TextBlock
          Grid$Column={3}
          VerticalAlignment={VerticalAlignment.Center}
          HorizontalAlignment={HorizontalAlignment.Right}
        >
          {Math.round(data.minTemp)}°{unitSymbol} / {Math.round(data.maxTemp)}°
          {unitSymbol}
        </TextBlock>
      </Grid>
    </Button>
  );
};

export default DailyItem;
