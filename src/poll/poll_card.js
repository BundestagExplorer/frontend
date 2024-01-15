import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VotingResultsChart from './voting_results';
import Button from '@mui/material/Button';

const PollCard = ({ date, title, yesVotes, noVotes, neutralVotes, notVoted, result, party, additionalInfo, category }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card style={{ display: 'flex', width: '100%', margin: '0 auto', marginBottom: '1vh' }}>
    {/* Voting Chart */}
    <VotingResultsChart yesVotes={yesVotes} noVotes={noVotes} neutralVotes={neutralVotes} notVoted={notVoted} style={{ width: '20vw', marginRight: '16px' }} />

    {/* Card Content */}
    <div style={{ flex: 1 }}>
      <CardContent>
        <Typography variant="body2" color="textSecondary" align="right">
          {date}
        </Typography>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color={result === 'accepted' ? 'primary' : 'error'} gutterBottom>
          Result: {result}
        </Typography>
        {/*<Typography variant="body2" color="textSecondary" gutterBottom>
          Proposed by: {party}
        </Typography>*/}
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Resort: {category}
        </Typography>
      </CardContent>
      {expanded && (
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {additionalInfo}
          </Typography>
        </CardContent>
      )}
      <CardActions disableSpacing>
        <Button
          variant="outlined"
          color="primary"
          style={{ marginRight: 'auto', marginLeft: '.5vw', marginBottom: '1vh' }}
          onClick={() => alert('Read More Clicked')}
        >
          Read More
        </Button>
        <IconButton
          style={{ marginLeft: 'auto', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </div>
  </Card>
  );
};

export default PollCard;
