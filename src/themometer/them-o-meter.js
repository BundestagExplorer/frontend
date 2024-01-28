import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  useTheme,
  Stepper,
  Step,
  StepLabel,
  Divider,
} from "@mui/material";

import SelectTopicForm from "./selectTopicForm";
import AbstimmenQuestions from "./abstimmungQuestions/abstimmungQuestions";
import { Config } from "../config";
import { dachzeileToRessort } from "../common/dachzeileToRessort";
import ResultPage from "./resultPage";

const BT_ABSTIMMUNGEN_ENDPOINT = "abstimmung/";

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const ThemOMeter = () => {
  const theme = useTheme();

  const totalQuestions = 15;

  const [activeStep, setActiveStep] = React.useState(0);

  const [votingData, setVotingData] = React.useState([]);

  const [questionIndex, setQuestionIndex] = React.useState(0);

  const [questionAnswers, setQuestionAnswers] = React.useState([
  ]);

  const [selectedRessorts, setSelectedRessorts] = React.useState([
  ]);

  const getVotingData = async () => {
    let params = new URLSearchParams({
      limit: totalQuestions * 3,
    });

    selectedRessorts.forEach((ressort) => {
      params.append("dachzeile", ressort.name);
    });

    fetch(Config.API_URL + BT_ABSTIMMUNGEN_ENDPOINT + "?" + params, {
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
              abstimmungDate: item.abstimmung_date,
              title: item.titel,
              ja: item.ja,
              nein: item.nein,
              enthalten: item.enthalten,
              nichtAbgegeben: item.nicht_abgegeben,
              result: item.ja > item.nein ? "accepted" : "rejected",
              additionalInfo:
                "abstract" in item ? item.abstract : "No abstract",
              drucksachen: item.drucksachen,
              fraktionen: item.fraktionen,
              dachzeile:
                "dachzeile" in item ? dachzeileToRessort[item.dachzeile] : null,
              category:
                "dachzeile" in item
                  ? dachzeileToRessort[item.dachzeile]
                  : "keine Zuordnung",
            };
          })
          .sort((a, b) => new Date(b.date) - new Date(a.date));
      })
      .then(function (data) {
        setVotingData(shuffle(data));
        //console.log(data.filter( (elem) => { return elem.title === "Bundeswehreinsatz im Irak"}))
      });
  };

  useEffect(() => {
    getVotingData();
  }, [selectedRessorts]);

  const answerQuestion = (answer) => {
    setQuestionAnswers([...questionAnswers, { questionIndex, answer }]);
    if (
      questionIndex === totalQuestions - 1 ||
      questionIndex === votingData.length - 1
    ) {
      setActiveStep(2);
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const steps = ["Wähle deine Themen", "Stimme ab", "Vergleiche Ergebnisse"];

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
      {activeStep === 0 ? (
        <SelectTopicForm
          setActiveStep={setActiveStep}
          setSelectedRessorts={setSelectedRessorts}
        />
      ) : activeStep === 1 ? (
        <AbstimmenQuestions
          questionIndex={questionIndex}
          totalQuestions={
            totalQuestions > votingData.length
              ? votingData.length
              : totalQuestions
          }
          votingData={votingData.length > 0 ? votingData[questionIndex] : null}
          answerQuestionCallback={answerQuestion}
        />
      ) : activeStep === 2 ? (
        <ResultPage
          votingData={votingData}
          answers={questionAnswers}
          selectedRessorts={selectedRessorts}
        />
      ) : (
        <Typography variant="h3" align="center">
          {" "}
          Willkommen beim{" "}
          <span style={{ color: theme.palette.primary.dark }}>
            {" "}
            Them-o-meter
          </span>
        </Typography>
      )}
    </Grid>
  );
};

export default ThemOMeter;
