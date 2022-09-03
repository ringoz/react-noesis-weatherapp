import {
  Button,
  ColumnDefinition,
  FontWeight,
  Grid,
  HorizontalAlignment,
  Key,
  Orientation,
  StackPanel,
  TextBlock,
  TextBox,
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
        <TextBlock>{getFormatedDate()}</TextBlock>
      </StackPanel>
      <StackPanel Grid$Column={1}>
        <StackPanel
          Orientation={Orientation.Horizontal}
          HorizontalAlignment={HorizontalAlignment.Right}
        >
          <Button
            onClick={() => {
              changeSettings({ unit: 'metric' });
            }}
          >
            °C
          </Button>
          <Button
            onClick={() => {
              changeSettings({ unit: 'imperial' });
            }}
          >
            °F
          </Button>
          <Button
            onClick={() => {
              if (settings.theme === 'dark') changeSettings({ theme: 'light' });
              else changeSettings({ theme: 'dark' });
            }}
          >
            <FontAwesomeIcon
              icon={settings.theme === 'dark' ? faSun : faMoon}
            ></FontAwesomeIcon>
          </Button>
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
