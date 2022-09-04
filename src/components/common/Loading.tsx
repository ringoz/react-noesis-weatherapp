import { HorizontalAlignment, TextBlock } from '@ringozz/react-noesis';
import { ReactElement } from 'react';

type LoadingProps = {
  children: ReactElement;
  isLoading: boolean;
};

export const Loading = ({ children, isLoading }: LoadingProps) => {
  return (
    <>
      {isLoading ? (
        <TextBlock HorizontalAlignment={HorizontalAlignment.Center}>
          Loading...
        </TextBlock>
      ) : (
        children
      )}
    </>
  );
};

export default Loading;
