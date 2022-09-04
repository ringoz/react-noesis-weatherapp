import {
  ColumnDefinition,
  DynamicResource,
  Grid,
  HorizontalAlignment,
  RowDefinition,
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
        {Array.from({ length: columns }, (_, idx) => (
          <ColumnDefinition key={idx} />
        ))}
      </Grid.ColumnDefinitions>
      <Grid.RowDefinitions>
        {Array.from(
          { length: Math.ceil(details.length / columns) },
          (_, idx) => (
            <RowDefinition key={idx} />
          )
        )}
      </Grid.RowDefinitions>
      {details.map((val, idx) => (
        <Grid
          key={idx}
          Grid$Column={idx % columns}
          Grid$Row={idx / columns}
          Margin={[8, 0]}
        >
          <Grid.ColumnDefinitions>
            <ColumnDefinition />
            <ColumnDefinition Width="Auto" />
          </Grid.ColumnDefinitions>
          <TextBlock
            Grid$Column={0}
            Foreground={DynamicResource('Brush.Foreground.Placeholder')}
          >
            {val.substring(0, val.indexOf(':') + 1)}
          </TextBlock>
          <TextBlock
            Grid$Column={1}
            HorizontalAlignment={HorizontalAlignment.Right}
          >
            {val.substring(val.indexOf(':') + 1)}
          </TextBlock>
        </Grid>
      ))}
    </Grid>
  );
};

export default DetailsGrid;
