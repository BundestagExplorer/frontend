import React, { useEffect } from "react";
import { Typography, Grid, Tab, Tabs, Paper, Box, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import ResultChart from "./resultChart";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function getResults(votingData, answers) {


  if (answers.length === 0 || votingData.length === 0) {
    return {};
  }

  let similarityByFraktion = {};
  let countByFraktion = {};



  answers.forEach((answer) => {
    var voting = votingData[answer.questionIndex]
    console.log(voting, answer.questionIndex)
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

  console.log(similarityByFraktion, countByFraktion)

  for (const [key, value] of Object.entries(similarityByFraktion)) {
    normalizedSimilarityByFraktion[key] = value / countByFraktion[key];
  }

  return normalizedSimilarityByFraktion;
}

export default function ResultPage({ votingData, answers, selectedRessorts }) {

  console.log(votingData, answers, selectedRessorts)

  const tab_names = ["Gesamt", "Nach Ressort", "Nach Abstimmung"];

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

    console.log(abstimmungResults);

    setAbstimmungResults(abstimmungResults);
  }, [votingData, answers]);

  return (
    answers.length > 0 && votingData.length > 0 ? (

      <Grid item container md={12} display={"flex"} justifyContent={"center"}>
        <Grid item md={12} display={"flex"} justifyContent={"center"}>
          <Typography variant="h6" align="center">
            Ergebnisse
          </Typography>
        </Grid>
        <Grid item md={12} display={"flex"} justifyContent={"center"}>
          <Paper sx={{ width: '80%', justifyContent: 'center' }}>
            <Grid container direction="row" sx={{ display: "flex", justifyContent: "center" }}>
              <Grid
                item
                md={12}
                sx={{ display: "flex" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <Tab label={tab_names[0]} value={0} />
                  <Tab label={tab_names[1]} value={1} />
                  <Tab label={tab_names[2]} value={2} />
                </Tabs>
              </Grid>
              <Grid item md={12} padding={2}>
                {
                  value === 0 && totalResults !== undefined ? (
                    <ResultChart value={0} result={totalResults} />
                  ) : value === 1 ? (
                    Object.entries(
                      ressortResults
                    ).map(([key, value], i) => {
                      return (
                        <Grid item container>
                          <Accordion sx={{ width: '100%' }}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1-content"
                              id="panel1-header"
                            >

                              <Typography variant="h6" align="center">
                                {key}
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              {
                                Object.keys(value).length !== 0 ? (
                                  <ResultChart result={value} key={key} />
                                ) : (
                                  <Typography variant="h6" align="center">
                                    Zu diesem Ressort gab es keine Abstimmungen
                                  </Typography>
                                )
                              }
                            </AccordionDetails>
                          </Accordion>
                        </Grid>
                      )
                    })
                  )
                    : (
                      Object.entries(
                        abstimmungResults
                      ).map(([key, value], i) => {
                        return (
                          <Grid item container>
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
                              <AccordionDetails>
                                {
                                  Object.keys(value).length !== 0 ? (
                                    <ResultChart result={value} key={key} />
                                  ) : (
                                    <Typography variant="h6" align="center">
                                      Zu diesem Ressort gab es keine Abstimmungen
                                    </Typography>
                                  )
                                }
                              </AccordionDetails>
                            </Accordion>
                          </Grid>
                        )
                      })
                    )
                }
              </Grid>
            </Grid>
          </Paper >
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
