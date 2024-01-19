import { List, ListItemButton, ListItemText } from '@mui/material';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import * as React from 'react';



export default function CustomListText({ display_text, value }) {


  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '0.1vw', marginRight: '0.1vw'}}>
        <ListItemText
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          {display_text}
        </ListItemText>
        <ListItemText style={{ alignSelf: "flex-end" , position:'absolute' , right:5 }}>{value}{value ? "%" : ""}</ListItemText>
      </div>

      {/*<Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>Hier könnten weitere Informationen zu dem Card stehen.</Typography>
      </Popover>*/}

    </div>
  )
}
