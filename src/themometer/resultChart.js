import LinearProgress from '@mui/material/LinearProgress';
import { Typography, Box, Grid } from '@mui/material';
import { Padding } from '@mui/icons-material';


export default function ResultChart({ value, result }) {
    return (

        Object.entries(result)
            .sort((a, b) => b[1] - a[1])
            .map(([key, value], i) => {
                return (
                    <>
                        <Grid item md={12}>
                            <Typography variant="body1" color="text.primary">
                                {key} ({+(value * 100).toFixed(2)}%)
                            </Typography>
                        </Grid>
                        <Grid item md={12} alignItems="center">
                            <LinearProgress variant="determinate" value={value * 100} sx={{ 'height': 15, borderRadius: 20 }} />
                        </Grid>
                    </>
                )
            }
            )
    )

}