import {
  HeaderedContentControl,
  Hyperlink,
  TextAlignment,
  TextBlock,
  TextWrapping,
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
        <HeaderedContentControl>
          <HeaderedContentControl.Header>
            <TextBlock
              TextWrapping={TextWrapping.Wrap}
              TextAlignment={TextAlignment.Center}
              Margin={[8, 8, 8, 0]}
            >
              The application is running in demo mode. To run the application
              with real data please check the{' '}
              <Hyperlink NavigateUri="https://github.com/ringoz/react-noesis-weatherapp">
                documentation
              </Hyperlink>
              .
            </TextBlock>
          </HeaderedContentControl.Header>
          {children}
        </HeaderedContentControl>
      ) : (
        children
      )}
    </>
  );
};

export default MockData;
