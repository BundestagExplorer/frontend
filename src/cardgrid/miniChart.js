import React from 'react';
import { VictoryChart, VictoryLine, VictoryScatter, VictoryAxis } from 'victory';
import { useTheme } from '@mui/material/styles';

const MonthlyLineChart = ({ values, selectedMonth }) => {
  const data = values.map((value, index) => ({ month: index + 1, value }));
  const theme = useTheme(); // Using MUI theme

  return (
    <VictoryChart height={175} width={250}>
      <VictoryAxis
        tickCount={12} // Set the number of ticks to display
        tickFormat={(t) => `${t}`} // Optional: Display month names or any other labels
        style={{
          ticks: { size: 2 },
          tickLabels: { fontSize: 8, padding: 2, angle: 45, textAnchor: 'start' },
        }}
      />
      <VictoryAxis
        dependentAxis
        tickValues={[]}
        style={{ axis: { stroke: 'none' } }}
      />
      <VictoryLine
        data={data}
        x="month"
        y="value"
        style={{
          data: { stroke: theme.palette.primary.main },
        }}
      />
      {selectedMonth && (
        <VictoryScatter
          data={[{ month: selectedMonth, value: data[selectedMonth - 1].value }]}
          x="month"
          y="value"
          size={3} // Adjust the size of the scatter point
          style={{ data: { fill: theme.palette.secondary.main } }}
        />
      )}
    </VictoryChart>
  );
};

export default MonthlyLineChart;
