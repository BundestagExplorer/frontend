import React from 'react';
import { VictoryPie, VictoryLabel } from 'victory';

const VotingResultsChart = ({ yesVotes, noVotes, neutralVotes }) => {
  const data = [
    { x: 'Yes', y: yesVotes },
    { x: 'No', y: noVotes },
    { x: 'Neutral', y: neutralVotes },
  ];

  return (
    <svg width={400} height={400}>
      <VictoryPie
        standalone={false}
        width={400}
        height={400}
        data={data}
        innerRadius={100}
        colorScale={['#36A2EB', '#FF6384', '#FFCE56']}
        labelComponent={<VictoryLabel textAnchor="middle" verticalAnchor="middle" />}
      />
    </svg>
  );
};

export default VotingResultsChart;