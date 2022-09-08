import {
  DynamicResource, Grid, PanningMode, ScrollBarVisibility,
  ScrollViewer
} from '@ringozz/react-noesis';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Weather } from './components';
import { Error, ErrorHandler, Loading } from './components/common';

export function App() {
  return (
    <ErrorBoundary FallbackComponent={Error} onError={ErrorHandler}>
      <ScrollViewer
        Background={DynamicResource('Brush.TextBox.Normal')}
        PanningMode={PanningMode.VerticalOnly}
        VerticalScrollBarVisibility={ScrollBarVisibility.Hidden}
      >
        <Grid Margin={8}>
          <Suspense fallback={<Loading />}>
            <Weather />
          </Suspense>
        </Grid>
      </ScrollViewer>
    </ErrorBoundary>
  );
}
