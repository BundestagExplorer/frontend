import React, { useEffect } from "react";
import { Typography, Grid, Tab, Tabs, Paper, Box, Accordion, AccordionSummary, AccordionDetails, Button, Slide } from "@mui/material";
import ResultChart from "./resultChart";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import IconSelector from "../common/iconSelector";


function getResults(votingData, answers) {


  if (answers.length === 0 || votingData.length === 0) {
    return {};
  }

  let similarityByFraktion = {};
  let countByFraktion = {};



  answers.forEach((answer) => {
    var voting = votingData[answer.questionIndex]
    if (voting === undefined || voting.fraktionen === undefined) {
      return;
    }

    voting.fraktionen.forEach((fraktion) => {
      if (!(answer.answer in fraktion)) {
        return;
      }
      if (fraktion.fraktion in similarityByFraktion) {
        similarityByFraktion[fraktion.fraktion] += fraktion[answer.answer] / (fraktion["ja"] + fraktion["nein"] + fraktion["enthalten"])
        countByFraktion[fraktion.fraktion] += 1
      } else {
        similarityByFraktion[fraktion.fraktion] = fraktion[answer.answer] / (fraktion["ja"] + fraktion["nein"] + fraktion["enthalten"])
        countByFraktion[fraktion.fraktion] = 1;
      }
    });
  });

  let normalizedSimilarityByFraktion = {};


  for (const [key, value] of Object.entries(similarityByFraktion)) {
    normalizedSimilarityByFraktion[key] = value / countByFraktion[key];
  }

  return normalizedSimilarityByFraktion;
}

export default function ResultPage({ restartQuestionnaireCallback, votingData, answers, selectedRessorts }) {
  const tab_names = ["Gesamt", "Nach Ressort", "Nach Abstimmung"];

  const containerRef = React.useRef(null);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [totalResults, setTotalResults] = React.useState({});
  const [ressortResults, setRessortResults] = React.useState({});
  const [abstimmungResults, setAbstimmungResults] = React.useState({});


  useEffect(() => {
    setTotalResults(getResults(votingData, answers));

    var ressortResults = {};
    var abstimmungResults = {};

    selectedRessorts.forEach((ressort) => {
      ressortResults[ressort.name] = getResults(votingData.filter((voting) => voting.dachzeile === ressort.name), answers)
    });

    setRessortResults(ressortResults);


    answers.forEach((answer) => {
      abstimmungResults[answer.questionIndex] = getResults(votingData, [answer])
    });


    setAbstimmungResults(abstimmungResults);
  }, [votingData, answers, selectedRessorts]);

  return (
    answers.length > 0 && votingData.length > 0 ? (

      <Grid item container md={12} display={"flex"} justifyContent={"center"} spacing={3}>
        <Grid item md={12} display={"flex"} justifyContent={"center"}>
          <Typography variant="h4" align="center" color={"primary"}>
            Ergebnisse
          </Typography>
        </Grid>
        <Grid item container md={12} justifyContent={"center"}>
          <Slide direction="left" in={true} container={containerRef.current} >
            <Paper elevation={10} sx={{ width: '80%', justifyContent: 'center' }}>
              <Grid container direction="row" sx={{ justifyContent: "center" }} spacing={3}>
                <Grid
                  item
                  md={12}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="secondary"
                    centered
                  >
                    <Tab label={tab_names[0]} value={0} />
                    <Tab label={tab_names[1]} value={1} />
                    <Tab label={tab_names[2]} value={2} />
                  </Tabs>
                </Grid>
                <Grid item container md={12} padding={2} justifyContent={"center"}>
                  {
                    value === 0 && totalResults !== undefined ? (
                      <Grid item container direction="row" spacing={2} display={"flex"} width={"100%"} justifyContent={'center'}>
                        <ResultChart value={0} result={totalResults} />
                      </Grid>
                    ) : value === 1 ? (
                      Object.entries(
                        ressortResults
                      ).map(([key, value], i) => {
                        return (
                          <Accordion sx={{ width: '100%' }}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1-content"
                              id="panel1-header"
                              sx={{
                                '& .MuiAccordionSummary-content': { alignItems: 'center' },
                              }}
                            >
                              <Typography variant="h6" align="center" paddingRight={1}>
                                {key}
                              </Typography>
                              <IconSelector iconName={key} />

                            </AccordionSummary>
                            <AccordionDetails sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                              <Grid item container direction="row" spacing={2} key={`${value}` + i} display={"flex"} width={"100%"} justifyContent={'center'}>
                                {
                                  Object.keys(value).length !== 0 ? (
                                    <ResultChart result={value} key={key} />
                                  ) : (
                                    <Typography variant="h6" align="center">
                                      Zu diesem Ressort gab es keine Abstimmungen
                                    </Typography>
                                  )
                                }
                              </Grid>
                            </AccordionDetails>
                          </Accordion>
                        )
                      })
                    )
                      : (
                        Object.entries(
                          abstimmungResults
                        ).map(([key, value], i) => {
                          return (
                            <Accordion sx={{ width: '100%' }}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                              >

                                <Typography variant="h6" align="center">
                                  {votingData[key].title}
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails display={'flex'}>
                                <Grid item container direction="row" spacing={2} key={`${value}` + i} display={"flex"} width={"100%"} justifyContent={'center'}>
                                  {
                                    Object.keys(value).length !== 0 ? (
                                      <ResultChart result={value} key={key} />
                                    ) : (
                                      <Typography variant="h6" align="center">
                                        Zu dieser Abstimmung konnte kein Ergebnis gefunden werden
                                      </Typography>
                                    )
                                  }
                                </Grid>
                              </AccordionDetails>
                            </Accordion>
                          )
                        })
                      )
                  }
                </Grid>
                <Grid item container md={12} justifyContent={"center"} p={3}>
                  <Button variant="contained" onClick={restartQuestionnaireCallback} startIcon={<RestartAltIcon />} color="secondary"> Erneut ausfüllen </Button>
                </Grid>
              </Grid>
            </Paper >
          </Slide>
        </Grid >
      </Grid >
    ) : (
      <Typography variant="h3" align="center">
        {" "}
        Du hast noch nicht abgestimmt
      </Typography>
    )
  );
}
