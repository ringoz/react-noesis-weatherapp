import {
  HorizontalAlignment,
  TextBlock,
  VerticalAlignment
} from '@ringozz/react-noesis';
import { ReactElement } from 'react';

type LoadingProps = {
  children: ReactElement;
  isLoading: boolean;
};

export function Loading({ children, isLoading }: LoadingProps) {
  return (
    <>
      {isLoading ? (
        <TextBlock
          VerticalAlignment={VerticalAlignment.Center}
          HorizontalAlignment={HorizontalAlignment.Center}
        >
          Loading...
        </TextBlock>
      ) : (
        children
      )}
    </>
  );
}
