import {
  Button,
  ColumnDefinition,
  DynamicResource,
  FontWeight,
  Grid,
  HorizontalAlignment,
  Image,
  TextBlock,
  VerticalAlignment
} from '@ringozz/react-noesis';
import { DailyWeatherDetailsModel } from '../models';

type DailyItemProps = {
  data: DailyWeatherDetailsModel;
  onClick: () => void;
};

export const DailyItem = ({ data, onClick }: DailyItemProps) => {
  const weatherCode = /*data.conditionCode ||*/ '01d';
  return (
    <Button
      Margin={4}
      onClick={onClick}
      HorizontalContentAlignment={HorizontalAlignment.Stretch}
      Background={DynamicResource('Brush.Track.Normal')}
    >
      <Grid>
        <Grid.ColumnDefinitions>
          <ColumnDefinition Width={50} />
          <ColumnDefinition Width="1*" />
          <ColumnDefinition Width="2*" />
          <ColumnDefinition Width={100} />
        </Grid.ColumnDefinitions>
        <Image
          Grid$Column={0}
          HorizontalAlignment={HorizontalAlignment.Left}
          Width={40}
          Height={40}
          Source={`assets/icon_${weatherCode}.png`}
        />
        <TextBlock
          Grid$Column={1}
          VerticalAlignment={VerticalAlignment.Center}
          FontWeight={FontWeight.Bold}
        >
          {new Date(data.forecastStart).toLocaleString('en-GB', {
            weekday: 'long',
          })}
        </TextBlock>
        <TextBlock
          Grid$Column={2}
          VerticalAlignment={VerticalAlignment.Center}
          HorizontalAlignment={HorizontalAlignment.Right}
        >
          {data.conditionCode}
        </TextBlock>
        <TextBlock
          Grid$Column={3}
          VerticalAlignment={VerticalAlignment.Center}
          HorizontalAlignment={HorizontalAlignment.Right}
        >
          {Math.round(data.temperatureMin)}° / {Math.round(data.temperatureMax)}°
        </TextBlock>
      </Grid>
    </Button>
  );
};
