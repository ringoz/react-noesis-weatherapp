import {
  ColumnDefinition,
  DynamicResource,
  Grid,
  Orientation,
  RowDefinition,
  StackPanel,
  TextBlock,
} from '@ringozz/react-noesis';

type DetailsGridProps = {
  details: string[];
};

export const DetailsGrid = ({ details }: DetailsGridProps) => {
  const columns = 2;
  return (
    <Grid Margin={8}>
      <Grid.ColumnDefinitions>
        {Array.from({ length: columns }, () => (
          <ColumnDefinition />
        ))}
      </Grid.ColumnDefinitions>
      <Grid.RowDefinitions>
        {Array.from({ length: Math.ceil(details.length / columns) }, () => (
          <RowDefinition />
        ))}
      </Grid.RowDefinitions>
      {details.map((val, idx) => (
        <StackPanel
          Grid$Column={idx % columns}
          Grid$Row={idx / columns}
          Orientation={Orientation.Horizontal}
        >
          <TextBlock
            Foreground={DynamicResource('Brush.Foreground.Placeholder')}
          >
            {val.substring(0, val.indexOf(':') + 1)}
          </TextBlock>
          <TextBlock>{val.substring(val.indexOf(':') + 1)}</TextBlock>
        </StackPanel>
      ))}
    </Grid>
  );
};

export default DetailsGrid;
