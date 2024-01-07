import { List, ListItemButton, ListItemText } from '@mui/material';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import * as React from 'react';



export default function CustomListText({ display_text }) {


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
            <ListItemText 
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            >
                {display_text}
            </ListItemText>

            <Popover
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
            </Popover>

            </div>
    )
}
