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
      <Grid Background={DynamicResource('Brush.TextBox.Normal')}>
        <Suspense fallback={<Loading />}>
          <ScrollViewer PanningMode={PanningMode.VerticalOnly} VerticalScrollBarVisibility={ScrollBarVisibility.Hidden}>
            <Weather />
          </ScrollViewer>
        </Suspense>
      </Grid>
    </ErrorBoundary>
  );
}
