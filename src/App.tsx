import {
  BitmapImage,
  Bold,
  Border,
  Button,
  Canvas,
  DropShadowEffect,
  DynamicResource,
  EventArgs,
  FontWeight,
  Grid,
  HeaderedContentControl,
  Hyperlink,
  ImageBrush,
  InlineUIContainer,
  LineBreak,
  Orientation,
  RoutedEventArgs,
  RowDefinition,
  SolidColorBrush,
  Span,
  StackPanel,
  StaticResource,
  TextBlock,
  TextBox,
  Thickness,
  useRendering,
} from '@ringozz/react-noesis';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const [time, setTime] = useState(0);
  useRendering((e) => setTime(e.timeStamp));

  const textBoxRef = useRef<TextBox>(null);
  const [some, setSome] = useState(0);
  const someClicked = useCallback((e: RoutedEventArgs) => {
    setSome(e.Name);
    const textBox = textBoxRef.current;
    if (textBox) {
      textBox.Text = e.Source.toString();
      textBox.focus();
    }
    e.Handled = true;
  }, []);

  const buttonRef = useRef<Button>(null);
  useEffect(() => {
    const log = (e: EventArgs) => console.log(JSON.stringify(e));
    buttonRef.current?.addEventHandler('Click', log);
    return () => {
      buttonRef.current?.removeEventHandler('Click', log);
    };
  }, [buttonRef]);

  const margin = Math.floor(50 * Math.sin(time / 1000));
  return (
    <Grid Background="Green">
      <Grid.RowDefinitions>
        <RowDefinition Height={300 - margin} />
        <RowDefinition Height="*" />
      </Grid.RowDefinitions>
      <Canvas Grid$Row={0}>
        {time > 2000 && (
          <Button
            Canvas$Left={70 + margin}
            Canvas$Top={40 + margin}
            Content={`click me ${some}`}
            onClick={someClicked}
          >
            <DropShadowEffect $Key="Effect" BlurRadius={Math.abs(margin)} />
          </Button>
        )}
        {time < 5000 && <TextBlock Text="meow" />}
        <Border BorderBrush="Black" Canvas$Left={200}>
          <Thickness $Key="BorderThickness">1</Thickness>
          <StackPanel Orientation={Orientation.Horizontal}>
            <StackPanel
              TextBlock$FontSize={30}
              TextBlock$Stroke="Black"
              TextBlock$StrokeThickness={2}
            >
              <TextBlock FontWeight={FontWeight.Black}>meow</TextBlock>
              <TextBlock FontWeight={FontWeight.Bold}>meow</TextBlock>
              <TextBlock FontWeight={FontWeight.Regular}>meow</TextBlock>
              <TextBlock FontWeight={FontWeight.Light}>meow</TextBlock>
              <TextBlock FontWeight={FontWeight.Thin}>meow</TextBlock>
            </StackPanel>
            <StackPanel Margin={10}>
              <HeaderedContentControl>
                <HeaderedContentControl.Header>
                  <TextBlock>
                    <Hyperlink NavigateUri="https://www.noesisengine.com/">
                      hyperlink
                    </Hyperlink>
                  </TextBlock>
                </HeaderedContentControl.Header>
              </HeaderedContentControl>
              <TextBox ref={textBoxRef} Width={200}></TextBox>
            </StackPanel>
          </StackPanel>
        </Border>
      </Canvas>
      <Suspense
        fallback={
          <Grid Grid$Row="1" Background="Blue">
            <TextBlock>Loading...</TextBlock>
          </Grid>
        }
      >
        <Button ref={buttonRef} Grid$Row="1" Margin={[margin, 0]}>
          <Button.Background>
            <ImageBrush>
              <BitmapImage
                $Key="ImageSource"
                UriSource="https://source.unsplash.com/random/?fox"
              />
            </ImageBrush>
          </Button.Background>
          <Button.Resources Source="Theme/NoesisTheme.Brushes.LightBlue.xaml">
            <SolidColorBrush
              $Key="Brush.Foreground.Normal"
              Color={DynamicResource('Color.White')}
            />
          </Button.Resources>
          Hello{' '}
          <Span FontSize={30}>
            <Bold>World</Bold>
            <LineBreak />
            <InlineUIContainer>
              <Button Background={DynamicResource('Brush.Foreground.Normal')}>
                <Button.Foreground>
                  <SolidColorBrush Color={StaticResource('Color.Accent')} />
                </Button.Foreground>
                <Span FontSize={10 + Math.abs(margin)}>
                  {(time / 1000).toFixed(3)}
                </Span>
              </Button>
            </InlineUIContainer>
            !
          </Span>
        </Button>
      </Suspense>
    </Grid>
  );
}

export default App;
