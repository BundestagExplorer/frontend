import { grey, yellow } from '@mui/material/colors';
import React from 'react';
import { VictoryPie, VictoryLabel } from 'victory';

const VotingResultsChart = ({ yesVotes, noVotes, neutralVotes, notVoted }) => {
  const data = [
    { x: 'Ja', y: yesVotes },
    { x: 'Nein', y: noVotes },
    { x: 'Neutral', y: neutralVotes },
    { x: 'Nicht abgegeben', y: notVoted }
  ].filter(Boolean);

  return (
    <svg width={300} height={300}>
      <VictoryPie
        standalone={false}
        width={300}
        height={300}
        data={data}
        innerRadius={65} 
        colorScale={['#4CAF50', '#F44336',yellow[800], grey[600]]}
        labelRadius={({ innerRadius }) => innerRadius + 62 }
        labelComponent={<VictoryLabel textAnchor="middle" verticalAnchor="middle" />}
      />
    </svg>
  );
};

export default VotingResultsChart;