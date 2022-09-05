import {
  DynamicResource,
  Hyperlink,
  StackPanel,
  TextBlock,
} from '@ringozz/react-noesis';
import { ReactElement } from 'react';

type MockDataProps = {
  children: ReactElement;
  useMockData: boolean;
};

export const MockData = ({ children, useMockData }: MockDataProps) => {
  return (
    <>
      {useMockData ? (
        <StackPanel>
          <TextBlock TextWrapping="Wrap" TextAlignment="Center" Margin="8">
            The application is running in demo mode. To run the application with
            real data please check the{' '}
            <Hyperlink NavigateUri="https://github.com/ringoz/react-noesis-weatherapp">
              documentation
            </Hyperlink>
            .
          </TextBlock>
          {children}
        </StackPanel>
      ) : (
        children
      )}
    </>
  );
};

export default MockData;
