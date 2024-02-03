import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  CardHeader,
  Divider,
  Fab,
  AccordionActions,
  CircularProgress,
  Slide,
  Tooltip
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RednerCard from "./rednerCard";
import { Config } from "../../config";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ClickableMobileStepper from "./clickableMobileStepper";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from "@mui/material/styles";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DrucksachenCards from "./drucksachenCards";
import QuestionContent from "./questionContent";
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import DescriptionIcon from '@mui/icons-material/Description';

const BT_ABSTIMMUNG_REDNER_ENDPOINT = "abstimmung_redner/";
const BT_DRUCKSACHEN_ENDPOINT = "drucksache/";

export default function AbstimmungQuestions({
  stepBackCallback,
  questionAnswers,
  questionIndex,
  totalQuestions,
  votingData,
  answerQuestionCallback,
}) {
  const theme = useTheme();
  const [rednerData, setRednerData] = React.useState([]);

  const [allRedner, setAllRedner] = React.useState(false);
  const [allDrucksache, setAllDrucksache] = React.useState(false);

  const [slideDirection, setSlideDirection] = React.useState("right");

  const [inState, setInState] = React.useState(true);

  const getRednerData = async (abstimmung_id) => {
    let params = new URLSearchParams({
      "abstimmung_id": abstimmung_id,
    });

    fetch(Config.API_URL + BT_ABSTIMMUNG_REDNER_ENDPOINT + "?" + params, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (abstimmungJson) {
        return abstimmungJson
          .map((item) => {
            return {
              id: item.id,
              abstimmung_id: item.abstimmung_id,
              full_name: item.full_name,
              funktion: item.function,
              image_url: item.image_url,
              "reden": item.reden,
            };
          })
          .sort(
            (a, b) =>
              a.full_name.toLowerCase().localeCompare(b.full_name.toLowerCase())
          )
      })
      .then(function (data) {
        setRednerData(data);
        //console.log(data.filter( (elem) => { return elem.title === "Bundeswehreinsatz im Irak"}))
      });
  };

  const [drucksacheData, setDrucksacheData] = React.useState([]);

  const fetchDrucksachenForAbstimmung = async (abstimmungen) => {
    console.log(abstimmungen);

    let params = new URLSearchParams();

    abstimmungen.drucksachen.forEach((drucksache) => {
      params.append("drucksache_ids", drucksache.drucksache_id);
    });

    await fetch(
      Config.API_URL + BT_DRUCKSACHEN_ENDPOINT + "?" + params,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    ).then((response) =>
      response.json()
    ).then((data) => {
      setDrucksacheData(data);
    });
  }

  useEffect(() => {
    if (votingData && votingData.drucksachen.length > 0) {
      fetchDrucksachenForAbstimmung(votingData)
    }
  }
    , [votingData]
  );

  useEffect(() => {
    if (votingData) {
      getRednerData(votingData.id);
    }
    // getRednerData(votingData.id);
  }, [votingData]);

  const stepToColor = (step) => {
    if (step < questionIndex) {
      let answer = questionAnswers[step]['answer']
      return answer === "ja" ? theme.palette.success.main : answer === "nein" ? theme.palette.error.main : theme.palette.grey[500];
    } else if (step === questionIndex) {
      return theme.palette.primary.main;
    } else {
      return theme.palette.grey[500].main;
    }
  };

  const onStepBack = (step) => {
    setSlideDirection("left")
    stepBackCallback();
    setInState(false);
    setTimeout(() => {
      setSlideDirection("right")
      setInState(true);
    }, 500);
  }

  const onStepForward = (answer) => {
    answerQuestionCallback(answer);
    setInState(false);
    setTimeout(() => {
      setInState(true);
    }, 400);
  }
  const containerRef = React.useRef(null);

  return votingData ? (
    <>
      <Grid item container md={12} sx={{ display: "flex" }}>
        <Grid item md={12}>
          <ClickableMobileStepper
            variant="dots"
            steps={totalQuestions}
            activeStep={questionIndex}
            color={(step) => stepToColor(step)}
            sx={{
              maxWidth: "400"
            }}
          />
        </Grid>
        <Grid item md={12} sx={{ justifyContent: "center", p: "3em" }}>
          <Slide direction={slideDirection} in={inState} container={containerRef.current} onEntered={() => setSlideDirection("right")} onExited={() => setSlideDirection("left")} >
            <Card
              elevation={10}
              sx={{ width: "70%", margin: "0 auto", marginBottom: (theme) => theme.spacing(20) }}
            >
              <Button variant={"contained"} onClick={onStepBack} startIcon={<ArrowBackIcon />} color={"secondary"}>Zurück</Button>
              <CardHeader
                title={votingData.title}
                subheader={votingData.dachzeile}
                subheaderTypographyProps={{ color: "secondary" }}
                sx={{ textAlign: "center" }}
              />
              <CardContent>
                <QuestionContent abstimmungData={votingData} drucksachenData={drucksacheData} />
              </CardContent>
              <Divider />
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Grid item container md={12} justifyContent="flex-start" alignItems={"center"} gap={"5px"}>
                    <DescriptionIcon color="secondary" />
                    <Typography align="center" color="secondary" display='flex' marginLeft={"2px"}>

                      Drucksachen
                    </Typography>
                  </Grid>

                </AccordionSummary>
                <AccordionDetails sx={{ display: "flex", justifyContent: "center" }}>

                  <Grid item container direction="row" spacing={4} display="flex" width={"100%"} >
                    <DrucksachenCards drucksacheData={drucksacheData.slice(0, allDrucksache ? drucksacheData.length : 4)} />
                  </Grid>
                </AccordionDetails>
                {
                  drucksacheData.length > 4 &&
                  <AccordionActions sx={{ paddingBottom: 3, paddingRight: 3 }}>
                    {
                      allDrucksache &&
                      <Button size="large" color={"secondary"} variant="contained" onClick={() => setAllDrucksache(false)} endIcon={<ArrowUpwardIcon />}>Weniger Drucksachen anzeigen </Button>
                    }
                    {
                      !allDrucksache &&
                      <Button size="large" color={"secondary"} variant="contained" onClick={() => setAllDrucksache(true)} endIcon={<ArrowDownwardIcon />}>Alle Drucksachen anzeigen</Button>
                    }
                  </AccordionActions>
                }
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Grid item container md={12} justifyContent="flex-start" alignItems={"center"} gap={"5px"}>
                    <RecordVoiceOverIcon color="secondary" />
                    <Typography align="center" color="secondary" display='flex'>
                      Redner
                    </Typography>
                  </Grid>

                </AccordionSummary>
                <AccordionDetails sx={{ display: "flex", justifyContent: "center" }}>
                  <Grid item container direction="row" spacing={4} display="flex" width={"100%"} >
                    {
                      rednerData.slice(0, allRedner ? rednerData.length : 4).map((item) => {
                        return (
                          <Grid item container md={3} justifyContent={"center"} spacing={4}>
                            <RednerCard
                              key={item.id}
                              full_name={item.full_name}
                              funktion={item.funktion}
                              image_url={item.image_url}
                              reden={item.reden}
                            />
                          </Grid>
                        );


                      })
                    }

                  </Grid>
                </AccordionDetails>
                {
                  rednerData.length > 4 &&
                  <AccordionActions sx={{ paddingBottom: 3, paddingRight: 3 }}>
                    {
                      allRedner &&
                      <Button size="large" color={"secondary"} variant="contained" onClick={() => setAllRedner(false)} endIcon={<ArrowUpwardIcon />}>Weniger Redner anzeigen </Button>
                    }
                    {
                      !allRedner &&
                      <Button size="large" color={"secondary"} variant="contained" onClick={() => setAllRedner(true)} endIcon={<ArrowDownwardIcon />}>Alle Redner anzeigen</Button>
                    }
                  </AccordionActions>
                }
              </Accordion>
            </Card>
          </Slide>
        </Grid>
      </Grid >
      <Grid item container md={3} row sx={{
        justifyContent: "space-evenly",
        display: 'flex',
        position: 'fixed',
        bottom: (theme) => theme.spacing(10),
      }}>
        <Grid item md={4}>
          <Tooltip title="Dafür">
            <Fab
              color="success"
              onClick={() => onStepForward("ja")}
              sx={{ height: "100px", width: "100px" }}
            >
              <CheckIcon fontSize="large" />
            </Fab >
          </Tooltip>
        </Grid>
        <Grid item md={4}>
          <Tooltip title="Diese Frage überspringen">
            <Fab color="grey" onClick={() => onStepForward("enthalten")} sx={{ height: "100px", width: "100px" }}>
              <NavigateNextIcon fontSize="large" />
            </Fab>
          </Tooltip>
        </Grid>
        <Grid item md={4}>
          <Tooltip title="Dagegen">
            <Fab onClick={() => onStepForward("nein")} color="error" sx={{ height: "100px", width: "100px" }}>
              <ClearIcon fontSize="large" />
            </Fab>
          </Tooltip>
        </Grid>

      </Grid >

    </>
  ) : (
    <Grid item container md={12} justifyContent="center">
      <Grid item md={12}>
        <Typography variant="h3" align="center">
          Fragen werden geladen
        </Typography>
      </Grid>
      <CircularProgress />
    </Grid>
  );
}
