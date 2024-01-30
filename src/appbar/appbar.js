import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function DenseAppBar({displayYear, displayMonth, showDrawer, aggregationLevel, expertModeActive, setExpertModeActive}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="grey">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={showDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Ausgewählter Zeitraum: {aggregationLevel === "Monat" ? `${displayMonth}/${displayYear}` : displayYear}
          </Typography>
          <FormControlLabel
                control={
                    <Switch 
                    checked={expertModeActive} 
                    onChange={(event, value) => { setExpertModeActive(value) }} 
                    inputProps={{ 'aria-label': 'controlled' }} 
                    sx={{
                      '& .MuiSwitch-thumb': {
                        color: 'secondary.main', // Set the color for the slider (thumb)
                      }
                    }}
                    />
                }
                label={expertModeActive ? 'Standardmodus' : 'Expertenmodus'}
                style={{ marginLeft: 'auto' }}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}