import {
  Border,
  ColumnDefinition,
  DynamicResource,
  Grid,
  HorizontalAlignment,
  LineBreak,
  Orientation,
  RowDefinition,
  Span,
  StackPanel,
  TextAlignment,
  TextBlock,
} from '@ringozz/react-noesis';
import { CurrentWeatherDetailsModel } from '../models';

type CurrentWeatherProps = {
  data?: CurrentWeatherDetailsModel;
};

export const CurrentWeatherDetails = ({ data }: CurrentWeatherProps) => {
  return (
    <Border Margin={8} Background={DynamicResource('Brush.TextBox.Focused')}>
      <Grid Margin={8}>
        <Grid.ColumnDefinitions>
          <ColumnDefinition />
          <ColumnDefinition />
        </Grid.ColumnDefinitions>
        <Grid.RowDefinitions>
          <RowDefinition />
          <RowDefinition />
          <RowDefinition />
        </Grid.RowDefinitions>
        <StackPanel
          Grid$Column={0}
          Grid$Row={0}
          Orientation={Orientation.Horizontal}
        >
          <TextBlock
            Foreground={DynamicResource('Brush.Foreground.Placeholder')}
          >
            Rain:
          </TextBlock>
          <TextBlock>{data?.rain.toFixed(2)}%</TextBlock>
        </StackPanel>
        <StackPanel
          Grid$Column={1}
          Grid$Row={0}
          Orientation={Orientation.Horizontal}
        >
          <TextBlock
            Foreground={DynamicResource('Brush.Foreground.Placeholder')}
          >
            Pressure:
          </TextBlock>
          <TextBlock>{data?.pressure}hPa</TextBlock>
        </StackPanel>
        <StackPanel
          Grid$Column={0}
          Grid$Row={1}
          Orientation={Orientation.Horizontal}
        >
          <TextBlock
            Foreground={DynamicResource('Brush.Foreground.Placeholder')}
          >
            Humidity:
          </TextBlock>
          <TextBlock>{data?.humidity}%</TextBlock>
        </StackPanel>
        <StackPanel
          Grid$Column={1}
          Grid$Row={1}
          Orientation={Orientation.Horizontal}
        >
          <TextBlock
            Foreground={DynamicResource('Brush.Foreground.Placeholder')}
          >
            Visibility:
          </TextBlock>
          <TextBlock>{data?.visibility} km</TextBlock>
        </StackPanel>
        <StackPanel
          Grid$Column={0}
          Grid$Row={2}
          Orientation={Orientation.Horizontal}
        >
          <TextBlock
            Foreground={DynamicResource('Brush.Foreground.Placeholder')}
          >
            Wind speed:
          </TextBlock>
          <TextBlock>{data ? Math.round(data.wind_speed) : ''} m/s</TextBlock>
        </StackPanel>
      </Grid>
    </Border>
  );
};

export default CurrentWeatherDetails;
