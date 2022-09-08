import {
  HorizontalAlignment,
  TextBlock,
  VerticalAlignment,
} from '@ringozz/react-noesis';

export function Loading() {
  return (
    <TextBlock
      VerticalAlignment={VerticalAlignment.Center}
      HorizontalAlignment={HorizontalAlignment.Center}
    >
      Loading...
    </TextBlock>
  );
}
