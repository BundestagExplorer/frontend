import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

export default function PreferenceSelection() {

    return (
        <React.Fragment>

            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                //sx={{ minHeight: '100vh' }}
            >
                <Grid item xs={3}>
                    <Typography variant='h4'>Zu welchen Themen möchten Sie Fragen beantworten?</Typography>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="Umweltschutz" />
                        <FormControlLabel control={<Checkbox />} label="Migration" />
                        <FormControlLabel control={<Checkbox />} label="Ernährung" />
                        <FormControlLabel control={<Checkbox />} label="Vegan" />
                        <FormControlLabel control={<Checkbox />} label="Finanzen" />
                    </FormGroup>
                </Grid>
            </Grid>

        </React.Fragment>
    );
}