import React from 'react';
import { FormControlLabel, FormGroup, FormControl, Checkbox, Grid, Container, Box, Paper, Typography, useTheme, Button, Stepper, Step, StepLabel } from '@mui/material';
import { ressorts } from '../common/ressorts';

import SelectTopicForm from './selectTopicForm';
import AbstimmenQuestions from './abstimmungQuestions';

const ThemOMeter = () => {

    const theme = useTheme();

    const [activeStep, setActiveStep] = React.useState(1);

    const [selectedRessorts, setSelectedRessorts] = React.useState([
        { id: '1', name: 'Politik', checked: true },
        { id: '2', name: 'Wirtschaft', checked: true },
        { id: '3', name: 'Gesellschaft', checked: true },
        { id: '4', name: 'Kultur', checked: true },
    ]);



    const steps = ['Wähle deine Themen', 'Stimme ab', 'Siehe Ergebnisse'];

    return (
        <Grid container direction="row" justifyContent="center" spacing={3}>
            <Grid item md={12}>
                <Stepper activeStep={activeStep} alternativeLabel sx={{ p: 2 }}>
                    {steps.map((label, index) => {
                        return (
                            <Step key={index}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </Grid>
            {
                activeStep === 0 ? <SelectTopicForm setActiveStep={setActiveStep} setSelectedRessorts={setSelectedRessorts} />
                    : activeStep === 1 ? <AbstimmenQuestions setActiveStep={setActiveStep} selectedRessorts={selectedRessorts} />
                        :
                        <Typography variant="h3" align='center'> Willkommen beim <span style={{ color: theme.palette.primary.dark }}> Them-o-meter</span></Typography>

            }

        </Grid >
    );
};

export default ThemOMeter;