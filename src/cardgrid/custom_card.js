import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from "react-router-dom";

import FinanzenImage from './images/finanzenimage.jpg'; // Import using relative path
import { wrap } from 'highcharts';

export default function CustomCard({ children, importance_val }) {

    const validImportanceVal = isNaN(importance_val) ? 0 : importance_val;

    return (
        <div style={{
            backgroundColor: '#e0f7fa',
            // backgroundImage:  `url(${FinanzenImage})`,
            // backgroundSize: 'cover',
            // backgroundRepeat: 'no-repeat',
            //...theme.typography.body1,
            textAlign: 'center',
            //color: theme.palette.text.secondary,
            width: validImportanceVal,
            height: validImportanceVal,
            borderRadius: '50%',
            left: '50%',
            top: '50%',
            position: 'absolute',
            zIndex: 0,
            transform: "translate(-50%, -50%)"

        }}>
            {children}

        </div>
    )
}
