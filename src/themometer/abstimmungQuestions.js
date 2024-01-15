import React from 'react';
import { FormControlLabel, FormGroup, FormControl, Checkbox, Grid, Container, Box, Paper, Typography, useTheme, Button, Stepper, Step, StepLabel, FormHelperText } from '@mui/material';
import { ressorts } from '../common/ressorts';

export default function AbstimmungQuestions({ setActiveStep, selectedRessorts }) {
    return (
        <Grid item>
            {
                selectedRessorts.map(
                    (ressort, index) => {
                        return (
                            <div>
                                <h1>{ressort.name}</h1>
                                <h2>{ressort.id}</h2>
                            </div>
                        )
                    }
                )
            }
        </Grid>
    )
}