// InfoButton.js
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useTheme } from '@mui/material/styles';

const InfoButton = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        style={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          borderRadius: '50%',
          backgroundColor: theme.palette.secondary.main,
          color: '#fff',
        }}
        onClick={handleOpenDialog}
      >
        <HelpOutlineIcon />
      </IconButton>
      <Dialog open={open} onClose={handleCloseDialog} maxWidth="md">
        <DialogTitle>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5">Info</Typography>
            <IconButton color="inherit" onClick={handleCloseDialog} edge="end">
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ textAlign: 'justify' }}>
            Diese Übersicht stellt die am intensivsten diskutierten Themen im Bundestag dar, 
            basierend auf der Häufigkeit der Wörter in den Debatten. Mithilfe statistischer Methoden werden die Themen 
            den entsprechenden Ministerien zugeordnet, um ihre Relevanz im gewählten Zeitraum zu analysieren. Die Bedeutung der 
            Ministerien wird durch die Größe der dazugehörigen Textabschnitte verdeutlicht. <br/>
            Es ist zu beachten, dass die Hauptübersicht sich auf die Themen der Plenardebatten konzentriert, 
            während die Abstimmungsübersicht die Umsetzung dieser Themen in Abstimmungen darstellt.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InfoButton;
