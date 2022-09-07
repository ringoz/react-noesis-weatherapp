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
import { DailyWeatherDetailsModel, weatherConditionDescription, weatherIcon } from '../models';

type DailyItemProps = {
  data: DailyWeatherDetailsModel;
  onClick: () => void;
};

export function DailyItem({ data, onClick }: DailyItemProps) {
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
          <ColumnDefinition Width={70} />
        </Grid.ColumnDefinitions>
        <Image
          Grid$Column={0}
          HorizontalAlignment={HorizontalAlignment.Left}
          Width={40}
          Height={40}
          Source={weatherIcon(data)}
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
          Foreground={DynamicResource('Brush.Foreground.Placeholder')}
        >
          {weatherConditionDescription(data.conditionCode)}
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
}
