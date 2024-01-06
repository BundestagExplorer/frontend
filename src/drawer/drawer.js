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


export default function TemporaryDrawer({drawerExtended, setDrawerState, setYear, setMonth}) {


  const sliderDefaultValue = 100;
  const marks_spanne = [
    {
      value: 0,
      label: 'Jan 23',
    },
    {
      value: 10,
      label: 'Feb 23',
    },
    {
      value: 20,
      label: 'Mär 23',
    },
    {
      value: 30,
      label: 'Apr 23',
    },
    {
      value: 40,
      label: 'Mai 23',
    },
    {
      value: 50,
      label: 'Jun 23',
    },
    {
      value: 60,
      label: 'Jul 23',
    },
    {
      value: 70,
      label: 'Aug 23',
    },
    {
      value: 80,
      label: 'Sep 23',
    },
    {
      value: 90,
      label: 'Okt 23',
    },
    {
      value: 100,
      label: 'Nov 23',
    }
  ]

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"

    >

      
      

     <Box sx={{ display:'flex', paddingRight: 10, flexDirection: 'row'}}>
        <h5>Aggregationslevel</h5>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="Monat" control={<Radio />} label="Monat" checked />
            <FormControlLabel value="Jahr" control={<Radio />} label="Jahr" disabled />
          </RadioGroup>
        </FormControl>
        <h5>Zeitraum</h5>
        <Slider
          aria-label="Custom marks"
          defaultValue={sliderDefaultValue}
          step={10}
          valueLabelDisplay="off"
          marks={marks_spanne}
          onChangeCommitted={(event, value) => {setYear(value); setMonth(value);}}
        />
      </Box> 
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
