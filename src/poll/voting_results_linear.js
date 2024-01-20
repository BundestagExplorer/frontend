import React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip'

const VotingResultsLinearChart = ({ yes, no, neutral, not }) => {
    // Calculate the percentages for each category
    const totalVotes = yes + no + neutral + not;
    const yesPercentage = (yes / totalVotes) * 100;
    const noPercentage = (no / totalVotes) * 100;
    const neutralPercentage = (neutral / totalVotes) * 100;

    return (
        <Tooltip title={`Ja: ${yes}, Nein: ${no}, Neutral: ${neutral}, Nicht abgestimmt: ${not}`} placement="top" arrow followCursor>
            <div>
                <Box
                    sx={{
                        display: 'flex',
                        height: '15px',
                        background: `linear-gradient(to right, #4CAF50 ${yesPercentage}%, #F44336 ${yesPercentage}% ${yesPercentage + noPercentage}%, #FFC107 ${yesPercentage + noPercentage}% ${yesPercentage + noPercentage + neutralPercentage}%, #9E9E9E ${yesPercentage + noPercentage + neutralPercentage}% 100%)`,
                        borderRadius: '5px',
                    }}
                />
            </div>
        </Tooltip>
    );
};

export default VotingResultsLinearChart;
