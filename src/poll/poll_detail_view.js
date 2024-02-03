import React from 'react';
import { Dialog, DialogContent, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import VotingResultsLinearChart from './voting_results_linear';
import IconSelectorParty from '../common/iconSelectorParty';

const DetailView = ({ open, onClose, data }) => {

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      {/* Dialog Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
        <Typography variant="h5">Details</Typography>
        <IconButton color="inherit" onClick={onClose} edge="end">
          <CloseIcon />
        </IconButton>
      </div>

      {/* Dialog Content */}
      <DialogContent>
        {data.map((partyData) => (
          <div style={{marginBottom: "1.5vh"}}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconSelectorParty partyName={partyData["fraktion"]}/>
              <Typography variant="h6">{partyData["fraktion"]}</Typography>
            </div>
            <VotingResultsLinearChart yes={partyData["ja"]} no={partyData["nein"]} neutral={partyData["enthalten"]} not={partyData["nicht_abgegeben"]}></VotingResultsLinearChart>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default DetailView;
