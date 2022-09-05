import {
  Button,
  ColumnDefinition,
  DynamicResource,
  FontWeight,
  Grid,
  HorizontalAlignment,
  Key,
  Orientation,
  StackPanel,
  TextBlock,
  TextBox,
  ThemeContext,
} from '@ringozz/react-noesis';
import { CurrentWeatherModel, SettingsModel } from '../models';

const faSun = 'Sun';
const faMoon = 'Moon';
const FontAwesomeIcon = ({ icon }: { icon: string }) => (
  <TextBlock>${icon}</TextBlock>
);

type HeaderProps = {
  locality?: string;
  country?: string;
  data: CurrentWeatherModel;
  settings: SettingsModel;
  changeSettings: (newSettings: object) => void;
  changeLocation: (location: string) => void;
};

export const Header = ({
  locality,
  country,
  data,
  settings,
  changeSettings,
  changeLocation,
}: HeaderProps) => {
  const getFormatedDate = () => {
    const selectedDate = new Date(data.dt * 1000);
    var date = selectedDate.toLocaleString('en-GB', {
      day: 'numeric',
      weekday: 'long',
      month: 'long',
    });
    var year = selectedDate.toLocaleString('en-GB', {
      year: 'numeric',
    });
    var hour = selectedDate.toLocaleString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    return `${date} ${year} ${hour}`;
  };

  return (
    <Grid Margin={8}>
      <Grid.ColumnDefinitions>
        <ColumnDefinition />
        <ColumnDefinition />
      </Grid.ColumnDefinitions>
      <StackPanel Grid$Column={0}>
        <Grid MinHeight={8}></Grid>
        <TextBlock FontSize={40} FontWeight={FontWeight.Bold}>
          {locality}
        </TextBlock>
        <TextBlock FontSize={20}>{country}</TextBlock>
        <TextBlock Foreground={DynamicResource('Brush.Foreground.Placeholder')}>
          {getFormatedDate()}
        </TextBlock>
      </StackPanel>
      <StackPanel Grid$Column={1}>
        <StackPanel
          Orientation={Orientation.Horizontal}
          HorizontalAlignment={HorizontalAlignment.Right}
        >
          <Button
            IsEnabled={settings.unit !== 'metric'}
            onClick={() => {
              changeSettings({ unit: 'metric' });
            }}
          >
            °C
          </Button>
          <Button
            IsEnabled={settings.unit !== 'imperial'}
            onClick={() => {
              changeSettings({ unit: 'imperial' });
            }}
          >
            °F
          </Button>
          <ThemeContext.Consumer>
            {([theme, setTheme]) => (
              <Button
                onClick={() => {
                  setTheme({ ...theme, mode: (theme.mode === 'Dark') ? 'Light' : 'Dark' });
                }}
              >
                <FontAwesomeIcon
                  icon={theme.mode === 'Dark' ? faSun : faMoon}
                ></FontAwesomeIcon>
              </Button>
            )}
          </ThemeContext.Consumer>
        </StackPanel>
        <TextBox
          Placeholder="Enter your location"
          onKeyDown={(e) => {
            if (e.Key === (6 as Key)) {
              changeLocation((e.Source as TextBox).Text);
            }
          }}
        ></TextBox>
      </StackPanel>
    </Grid>
  );
};

export default Header;
