import { Container } from './components/Container';
import { ErrorBoundary } from 'react-error-boundary';
import { Error, ErrorHandler } from './components/common/Error';
import { useSettings } from './hooks';
import {
  DynamicResource,
  PanningMode,
  ScrollBarVisibility,
  ScrollViewer,
} from '@ringozz/react-noesis';

export const App = () => {
  const { settings, changeSettings } = useSettings();

  return (
    <ErrorBoundary FallbackComponent={Error} onError={ErrorHandler}>
      <ScrollViewer
        Background={DynamicResource('Brush.TextBox.Normal')}
        PanningMode={PanningMode.VerticalOnly}
        VerticalScrollBarVisibility={ScrollBarVisibility.Hidden}
      >
        <Container
          settings={settings}
          changeSettings={changeSettings}
        ></Container>
      </ScrollViewer>
    </ErrorBoundary>
  );
};
