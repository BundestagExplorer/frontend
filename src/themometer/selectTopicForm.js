import React from 'react';
import { FormControlLabel, FormGroup, FormControl, Checkbox, Grid, Container, Box, Paper, Typography, useTheme, Button, Stepper, Step, StepLabel, FormHelperText } from '@mui/material';
import { ressorts } from '../common/ressorts';

export default function SelectTopicForm({ setActiveStep, setSelectedRessorts }) {
    const theme = useTheme();

    const [ressortCheckboxState, setRessortCheckboxState] = React.useState(
        ressorts.map(
            (ressort, _) => {
                return (
                    { id: ressort.id, name: ressort.name, checked: false }
                )
            }
        )
    );

    const handleCheckboxChange = (event) => {
        setRessortCheckboxState(
            ressortCheckboxState.map(
                (ressort, _) => {
                    if (ressort.name === event.target.name) {
                        return (
                            { ...ressort, checked: event.target.checked }
                        )
                    }
                    else {
                        return ressort
                    }
                }
            )
        );
    }

    const handleSetAll = (event) => {
        setRessortCheckboxState(
            ressortCheckboxState.map(
                (ressort, _) => {
                    return (
                        { ...ressort, checked: event.target.checked }
                    )
                }
            )
        );
    }

    const handleButton = () => {
        setSelectedRessorts(
            ressortCheckboxState.filter(
                (ressort, _) => {
                    return ressort.checked
                }
            )
        );
        setActiveStep(1);
    }

    const atLeastOneRessortSelected = ressortCheckboxState.some(
        (ressort, _) => {
            return ressort.checked
        }
    )

    return <>
        <Grid item md={12}>
            <Container >
                <Typography variant="h3" align='center'> Willkommen beim <span style={{ color: theme.palette.primary.dark }}> Them-o-meter</span></Typography>
                <Typography variant="h5" align='center' color="primary"> Hier kannst du die Themen wählen die <span style={{ color: theme.palette.secondary.main }}>dich</span> interessieren.</Typography>
                <Typography variant="h6" align='center' color="primary"> Wir zeigen dir dann die <span style={{ color: theme.palette.secondary.main }}> Parteien </span> die dich  am besten vertreten.</Typography>
            </Container>
        </Grid>
        <Grid item container md={12}>
            <Grid item md={12} sx={{ justifyContent: 'center', display: 'flex' }}>
                <FormControl error={!atLeastOneRessortSelected} component="fieldset" sx={{ marginLeft: '5%' }}>
                    <FormGroup>
                        {
                            ressortCheckboxState.map(
                                (ressort, _) => {
                                    return (
                                        <FormControlLabel key={ressort.id}
                                            control={<Checkbox checked={ressort.checked}
                                                onChange={handleCheckboxChange}
                                                name={ressort.name} />
                                            }
                                            label={ressort.name}
                                        />
                                    )
                                }
                            )
                        }
                    </FormGroup>
                    <FormHelperText>Bitte wähle mindestens ein Thema aus.</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item md={12} padding={3}>
                <Box textAlign={'center'} sx={{ justifyContent: 'center' }}>
                    <FormControl>
                        <FormGroup sx={{ alignItems: 'center' }}>
                            <FormControlLabel control={<Checkbox onChange={handleSetAll} />} label="Alle Themen" />
                        </FormGroup>
                        <Button disabled={!atLeastOneRessortSelected} variant="contained" color="primary" align='center' onClick={handleButton}>Themen bestätigen</Button>
                    </FormControl>
                </Box>

            </Grid >
        </Grid >
    </>
};

