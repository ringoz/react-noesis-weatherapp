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
  const cols = 2;
  const rows = Math.ceil(details.length / cols);
  return (
    <Grid Margin={8}>
      <Grid.ColumnDefinitions>
        {Array.from({ length: cols }, (_, idx) => (
          <ColumnDefinition key={idx} />
        ))}
      </Grid.ColumnDefinitions>
      <Grid.RowDefinitions>
        {Array.from({ length: rows }, (_, idx) => (
          <RowDefinition key={idx} />
        ))}
      </Grid.RowDefinitions>
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
    </Grid>
  );
};

export default DetailsGrid;
