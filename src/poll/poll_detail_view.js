import React from 'react';
import { Dialog, DialogContent, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import VotingResultsLinearChart from './voting_results_linear';

const DetailView = ({ open, onClose, data }) => {

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      {/* Dialog Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
        <Typography variant="h6">Details</Typography>
        <IconButton color="inherit" onClick={onClose} edge="end">
          <CloseIcon />
        </IconButton>
      </div>

      {/* Dialog Content */}
      <DialogContent>
        {data.map((partyData) => (
          <div style={{marginBottom: "1.5vh"}}>
            <Typography variant="body1">{partyData["fraktion"]}</Typography>
            <VotingResultsLinearChart yes={partyData["ja"]} no={partyData["nein"]} neutral={partyData["enthalten"]} not={partyData["nicht_abgegeben"]}></VotingResultsLinearChart>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default DetailView;
