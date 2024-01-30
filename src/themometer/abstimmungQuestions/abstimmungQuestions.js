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
  Slide
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
const BT_ABSTIMMUNG_REDNER_ENDPOINT = "abstimmung_redner";


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
                <Typography variant="body1">
                  Lorem ipsum odor amet, consectetuer adipiscing elit. Netus risus
                  parturient sodales taciti eget turpis in mus. Amet arcu platea
                  porttitor sollicitudin faucibus ligula. Eros hendrerit metus metus
                  ullamcorper orci bibendum lobortis vehicula. Ligula proin ligula
                  vulputate quis adipiscing nascetur blandit diam consectetur.
                  Convallis est non facilisi vitae potenti. Nibh curabitur imperdiet
                  potenti suscipit libero urna pulvinar augue. Euismod tempor
                  maximus pulvinar lobortis ac conubia fames. Integer torquent nunc
                  ipsum nascetur erat per..
                </Typography>
              </CardContent>
              <Divider />
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  Redner
                </AccordionSummary>
                <AccordionDetails sx={{ display: "flex", justifyContent: "center" }}>
                  <Grid item container direction="row" spacing={2} display="flex" width={"100%"} >
                    {
                      rednerData.slice(0, allRedner ? rednerData.length : 4).map((item) => {
                        return (
                          <Grid item container md={3} justifyContent={"center"} spacing={2}>
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
      </Grid>
      <Grid item container md={3} row sx={{
        justifyContent: "space-evenly",
        display: 'flex',
        position: 'fixed',
        bottom: (theme) => theme.spacing(10),
      }}>
        <Grid item md={4}>
          <Fab
            size="large"
            color="success"
            onClick={() => onStepForward("ja")}
            sx={{ height: "100px", width: "100px" }}
          >
            <CheckIcon fontSize="large" />
          </Fab >
        </Grid>
        <Grid item md={4}>
          <Fab color="grey" onClick={() => onStepForward("enthalten")} sx={{ height: "100px", width: "100px" }}>
            <NavigateNextIcon fontSize="large" />
          </Fab>
        </Grid>
        <Grid item md={4}>
          <Fab onClick={() => onStepForward("nein")} color="error" sx={{ height: "100px", width: "100px" }}>
            <ClearIcon fontSize="large" />
          </Fab>
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
