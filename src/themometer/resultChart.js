import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Typography, Box, Grid } from '@mui/material';
import { Padding } from '@mui/icons-material';


export default function ResultChart({ value, result }) {
    return (

        Object.entries(result)
            .sort((a, b) => b[1] - a[1])
            .map(([key, value], i) => {
                return (
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2} key={`${value}` + i} display={"flex"} >
                        <Grid item md={12} justifyContent="center" margin={0}>
                            <Typography variant="body2" color="text.secondary" align="center">
                                {key} ({+(value * 100).toFixed(2)}%)
                            </Typography>
                        </Grid>
                        <Grid item md={10} sx={{ width: '80%', minHeight: "100%", marginBottom: 2 }} alignItems="center">
                            <LinearProgress variant="determinate" value={value * 100} />
                        </Grid>

                    </Grid>
                )
            }
            )
    )

}