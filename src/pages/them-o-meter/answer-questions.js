import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';





export default function AnswerQuestions() {

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
                    <h1>Bitte beantworten Sie die folgenden Fragen:</h1>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"

                        >
                            <Typography>Soll Cannabis legalisiert werden?</Typography>
                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="female" control={<Radio />} label="Ja" />
                                    <FormControlLabel value="male" control={<Radio />} label="Nein" />
                                    <FormControlLabel value="other" control={<Radio />} label="Enthaltung" />

                                </RadioGroup>
                            </FormControl>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Hier würde dann die konkrete Beschlussvorlage stehen, und weitere Kontextinformationen.
                            </Typography>
                            <Typography>
                                Wenn der Fragetext aussagekräftig genug ist, muss die Anzeige eventuell nicht ausgeklappt werden
                            </Typography>
                        </AccordionDetails>
                    </Accordion>


                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"

                        >
                            <Typography>Eintritsalter für Rente auf 99 Jahre erhöhen?</Typography>
                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="female" control={<Radio />} label="Ja" />
                                    <FormControlLabel value="male" control={<Radio />} label="Nein" />
                                    <FormControlLabel value="other" control={<Radio />} label="Enthaltung" />

                                </RadioGroup>
                            </FormControl>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                                Hier würde dann die konkrete Beschlussvorlage stehen, und weitere Kontextinformationen.
                            </Typography>
                            <Typography>
                                Wenn der Fragetext aussagekräftig genug ist, muss die Anzeige eventuell nicht ausgeklappt werden
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    


                </Grid>
            </Grid>


        </React.Fragment>
    );
}