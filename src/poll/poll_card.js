import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VotingResultsChart from './voting_results';
import Button from '@mui/material/Button';

const PollCard = ({ date, title, yesVotes, noVotes, neutralVotes, notVoted, result, parties, additionalInfo, category, openDetailView}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOpenDetailView = () => {
    openDetailView(parties)
  }

  return (
    <Card style={{ display: 'flex', width: '100%', margin: '0 auto', marginBottom: '1vh' }}>
      {/* Voting Chart */}
      <Tooltip title={`Ja: ${yesVotes}, Nein: ${noVotes}, Neutral: ${neutralVotes}, Nicht abgestimmt: ${notVoted}`} placement="top" arrow followCursor>
        <div>
          <VotingResultsChart
            yesVotes={yesVotes}
            noVotes={noVotes}
            neutralVotes={neutralVotes}
            notVoted={notVoted}
            style={{ width: '20vw', marginRight: '16px' }}
          />
        </div>
      </Tooltip>

      {/* Card Content */}
      <div style={{ flex: 1 }}>
        <CardContent>
          <Typography variant="body2" color="textSecondary" align="right">
            {date}
          </Typography>
          <Typography variant="h5" component="div" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" color={result === 'accepted' ? 'green' : 'error'} gutterBottom>
            Ergebnis: {result === 'accepted' ? 'angenommen' : 'abgelehnt'}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Ministerium: {category}
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
            onClick={handleOpenDetailView}
          >
            Details zur Abstimmung
          </Button>
          <IconButton
            style={{ marginLeft: 'auto', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Mehr anzeigen"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
      </div>
    </Card>
  );
};

export default PollCard;
