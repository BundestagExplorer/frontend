import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from "react-router-dom";

import FinanzenImage from './images/finanzenimage.jpg'; // Import using relative path
import { wrap } from 'highcharts';

// var Item = styled(Paper)(({ theme, ressort_name, diameter }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     backgroundImage:  `url(${FinanzenImage})`,
//     backgroundSize: 'cover',
//     backgroundRepeat: 'no-repeat',
//     ...theme.typography.body1,
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//     borderRadius: '50%',
//     width: 300,
//     height: 300

//   }));

export default function CustomCard({children, importance_val}){


    return(
        <div style={{
            backgroundColor: '#e0f7fa',
            // backgroundImage:  `url(${FinanzenImage})`,
            // backgroundSize: 'cover',
            // backgroundRepeat: 'no-repeat',
            //...theme.typography.body1,
            textAlign: 'center',
            //color: theme.palette.text.secondary,
            width:  importance_val,
            height: importance_val,
            borderRadius: '50%',
            left: '10%',
            top: '10%',
            position: 'absolute',
            zIndex: 0
        
          }}>
            {children}
        
        </div>
    )
}
