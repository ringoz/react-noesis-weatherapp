import { Container } from './components/Container';
import { ErrorBoundary } from 'react-error-boundary';
import { Error, ErrorHandler } from './components/common/Error';
import { useSettings } from './hooks';
import { DynamicResource, Grid } from '@ringozz/react-noesis';

export const App = () => {
  const { settings, changeSettings } = useSettings();

  return (
    <ErrorBoundary FallbackComponent={Error} onError={ErrorHandler}>
      <Grid Background={DynamicResource('Brush.Window.Background')}>
        <Container
          settings={settings}
          changeSettings={changeSettings}
        ></Container>
      </Grid>
    </ErrorBoundary>
  );
};
