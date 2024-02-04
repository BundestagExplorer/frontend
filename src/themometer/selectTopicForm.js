import React from 'react';
import { FormControlLabel, FormGroup, FormControl, Checkbox, Grid, Container, Box, Paper, MenuItem, Typography, useTheme, Button, Stepper, Step, StepLabel, FormHelperText, Select, InputLabel, Divider } from '@mui/material';
import { ressorts } from '../common/ressorts';
import { Form } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import InfoButton from "../common/infoButton";

const infoButtonText = <Typography variant="body1">
    Wähle Ressorts aus, die dich interessieren, indem du die entsprechenden Boxen anklickst. <br />
    Anschließend kannst du noch die Anzahl der Fragen auswählen, welche du beantworten möchtest. <br />
    Um mit dem Them-o-meter zu starten, klicke auf "Themen bestätigen". <br />
    Viel Spaß!
</Typography>
export default function SelectTopicForm({ setActiveStep, setSelectedRessorts, setTotalQuestions }) {
    const theme = useTheme();

    const [selectValueState, setSelectValueState] = React.useState(
        10
    )

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
        setTotalQuestions(
            selectValueState
        )
        setActiveStep(1);
    }

    const handleSelectChange = (event) => {
        setSelectValueState(event.target.value)
    };

    const atLeastOneRessortSelected = ressortCheckboxState.some(
        (ressort, _) => {
            return ressort.checked
        }
    )

    return (
        <Grid container md={12} justifyContent='center'>
            <Grid item md={12}>
                <Container >
                    <Typography variant="h3" align='center'> Willkommen beim <span style={{ color: theme.palette.secondary.light }}> Them-o-meter</span></Typography>
                    <Typography variant="h5" align='center' color="primary"> Wähle die <span style={{ color: theme.palette.secondary.main }}>Themen </span> die dich interessieren.</Typography>
                    <Typography variant="h6" align='center' color="primary"> Wir zeigen dir dann die  Parteien die dich am besten vertreten.</Typography>
                </Container>
            </Grid>
            <Grid item container md={7} alignContent="center" justifyContent="center">
                <FormControl error={!atLeastOneRessortSelected} component="fieldset">
                    <FormGroup sx={{ alignContent: 'center', alignItems: 'center' }}>
                        <Grid item container md={12} direction="row" spacing={1} alignContent="center" alignItems={'center'} sx={{ paddingLeft: "100px" }}>
                            {
                                ressortCheckboxState.map(
                                    (ressort, _) => {
                                        return (
                                            <Grid item md={4} xs={6} key={ressort.id}>
                                                <FormControlLabel key={ressort.id}
                                                    control={<Checkbox checked={ressort.checked}
                                                        onChange={handleCheckboxChange}
                                                        name={ressort.name} />
                                                    }
                                                    label={ressort.name}
                                                    sx={{ alignItems: 'center' }}

                                                />
                                            </Grid>
                                        )
                                    }
                                )
                            }
                        </Grid>
                    </FormGroup>
                    <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                    <Grid item container md={12} justifyContent='center'>
                        <FormControl sx={{ minWidth: 100, textAlign: 'center' }}>
                            <InputLabel id="demo-simple-select-label">Fragenanzahl</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                value={selectValueState}
                                label="Fragenanzahl"
                                sx={{ minWidth: 100 }}
                                onChange={handleSelectChange}
                            >
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={15}>15</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                            </Select>

                        </FormControl>
                    </Grid>
                    <Grid item container md={12} justifyContent='center'>
                        <FormHelperText>Bitte wähle mindestens ein Thema aus.</FormHelperText>
                    </Grid>
                </FormControl >
            </Grid >
            <Grid item container md={12} justifyContent='center' paddingBottom={3}>
                <FormControl>
                    <FormGroup sx={{ alignItems: 'center' }}>
                        <FormControlLabel control={<Checkbox onChange={handleSetAll} />} label="Alle Themen" />
                    </FormGroup>
                    <Button disabled={!atLeastOneRessortSelected} variant="contained" color="secondary" align='center' onClick={handleButton} endIcon={<SendIcon />}>Themen bestätigen</Button>
                </FormControl>

            </Grid >
            <InfoButton infoButtonText={infoButtonText} />
        </Grid >
    )
};

