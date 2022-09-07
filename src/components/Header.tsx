import {
  Button,
  ColumnDefinition,
  DynamicResource,
  FontWeight,
  Grid,
  HorizontalAlignment,
  Key,
  Orientation,
  RowDefinition,
  StackPanel,
  TextBlock,
  TextBox,
  ThemeContext,
  VerticalAlignment,
} from '@ringozz/react-noesis';
import { WeatherKit } from '../models';

type HeaderProps = {
  locality?: string;
  country?: string;
  data: WeatherKit.CurrentWeatherDetailsModel;
  changeLocation: (location: string) => void;
};

export function Header({
  locality,
  country,
  data,
  changeLocation,
}: HeaderProps) {
  const getFormattedDate = () => {
    const selectedDate = new Date(
      (data as WeatherKit.CurrentWeatherModel).asOf ??
        (data as WeatherKit.HourlyWeatherDetailsModel).forecastStart
    );
    const date = selectedDate.toLocaleString('en-US', {
      day: 'numeric',
      weekday: 'long',
      month: 'long',
    });
    const year = selectedDate.toLocaleString('en-US', {
      year: 'numeric',
    });
    const hour = selectedDate.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    return `${date} ${year}, ${hour}`;
  };

  return (
    <Grid Margin={8}>
      <Grid.ColumnDefinitions>
        <ColumnDefinition Width="Auto" />
        <ColumnDefinition />
      </Grid.ColumnDefinitions>
      <Grid.RowDefinitions>
        <RowDefinition />
        <RowDefinition />
      </Grid.RowDefinitions>
      <StackPanel Grid$Column={0} Grid$RowSpan={2}>
        <TextBlock FontSize={40} FontWeight={FontWeight.Bold}>
          {locality}
        </TextBlock>
        <TextBlock FontSize={20}>{country}</TextBlock>
        <TextBlock Foreground={DynamicResource('Brush.Foreground.Placeholder')}>
          {getFormattedDate()}
        </TextBlock>
      </StackPanel>
      <StackPanel
        Grid$Column={1}
        Orientation={Orientation.Horizontal}
        HorizontalAlignment={HorizontalAlignment.Right}
      >
        <ThemeContext.Consumer>
          {([theme, setTheme]) => (
            <Button
              Background={null!}
              onClick={() => {
                setTheme({
                  ...theme,
                  mode: theme.mode === 'Dark' ? 'Light' : 'Dark',
                });
              }}
            >
              <TextBlock>☻</TextBlock>
            </Button>
          )}
        </ThemeContext.Consumer>
      </StackPanel>
      <TextBox
        Grid$Column={1}
        Grid$Row={1}
        HorizontalAlignment={HorizontalAlignment.Right}
        VerticalAlignment={VerticalAlignment.Bottom}
        Placeholder="Enter your location"
        onKeyDown={(e) => {
          if (e.Key === (6 as Key)) {
            changeLocation((e.Source as TextBox).Text);
          }
        }}
      ></TextBox>
    </Grid>
  );
}
