import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import Slider from '@mui/material/Slider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import TimeSlider from '../timeslider/time_slider'


export default function TemporaryDrawer({drawerExtended, setDrawerState, setAggregationLevel, aggregationLevel, setExpertModeActive, expertModeActive, setYear, setMonth, year, month}) {



  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"

    >

        <TimeSlider  aggregationLevel={aggregationLevel} expertModeActive={expertModeActive} year={year} month={month} setYear={setYear} setMonth={setMonth} setAggregationLevel={setAggregationLevel} setExpertModeActive={setExpertModeActive}/>

    </Box>
  );

  return (
    <div>
        <Box sx={{ '& > :not(style)': { m: 1 } }}>x
    </Box>
  
        <React.Fragment key={'top'}>

          <Drawer
            anchor={'top'}
            open={drawerExtended}
            onClose={() => setDrawerState(false)}
            BackdropProps={{ invisible: true }}
          >
            {list('top')}
          </Drawer>
        </React.Fragment>

    </div>
  );
}
