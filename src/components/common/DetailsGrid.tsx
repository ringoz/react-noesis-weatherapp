import {
  ColumnDefinition,
  DynamicResource,
  Grid,
  HorizontalAlignment,
  TextBlock,
  UniformGrid
} from '@ringozz/react-noesis';

type DetailsGridProps = {
  details: string[];
};

export const DetailsGrid = ({ details }: DetailsGridProps) => {
  const cols = 2;
  const rows = Math.ceil(details.length / cols);
  return (
    <UniformGrid Margin={8} Columns={cols} Rows={rows}>
      {details.map((val, idx) => (
        <Grid
          key={idx}
          Grid$Column={idx % cols}
          Grid$Row={idx / cols}
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
    </UniformGrid>
  );
};
