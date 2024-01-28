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
} from "@mui/material";
import MobileStepper from "@mui/material/MobileStepper";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import RednerCard from "./rednerCard";
import { Config } from "../../config";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { useTheme } from "@mui/material/styles";

const BT_ABSTIMMUNG_REDNER_ENDPOINT = "abstimmung_redner";





export default function AbstimmungQuestions({
  questionIndex,
  totalQuestions,
  votingData,
  answerQuestionCallback,
}) {


  const theme = useTheme();
  const [rednerData, setRednerData] = React.useState([]);


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
        console.log(abstimmungJson);
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

  return votingData ? (
    <>
      <Grid item container md={12} sx={{ display: "flex" }}>
        <Grid item md={12} sx={{ display: "flex", justifyContent: "center" }}>
          <MobileStepper
            variant="dots"
            steps={totalQuestions}
            position="static"
            activeStep={questionIndex}
            sx={{ maxWidth: 400 }}
          />
        </Grid>
        <Grid item md={12} sx={{ justifyContent: "center", p: "3em" }}>
          <Card
            elevation={10}
            sx={{ width: "70%", margin: "0 auto", marginBottom: "1vh" }}
          >
            <CardHeader
              title={votingData.title}
              subheader={votingData.dachzeile}
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
                aria-controls="panel1-content"
                id="panel1-header"
              >
                Rednerliste
              </AccordionSummary>
              <AccordionDetails>
                <Grid container direction="row" spacing={2} display="flex">
                  {
                    rednerData.map((item) => {
                      return (
                        <Grid item container md={3} justifyContent={"center"} flexBasis={0} flexGrow={1} >
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
            </Accordion>
          </Card>
        </Grid>
      </Grid>
      <Grid item md={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Fab
          sx={{
            position: "fixed",
            bottom: (theme) => theme.spacing(10),
            height: "100px",
            width: "100px",
            left: "42%",
          }}
          size="large"
          color="success"
          onClick={() => answerQuestionCallback("ja")}
        >
          <CheckIcon fontSize="large" />

        </Fab >
        <Fab sx={{
          position: "fixed",
          bottom: (theme) => theme.spacing(10),
          height: "100px",
          width: "100px",
        }} color="grey" onClick={() => answerQuestionCallback("enthalten")}>
          <NavigateNextIcon fontSize="large" />
        </Fab>

        <Fab sx={{
          position: "fixed",
          bottom: (theme) => theme.spacing(10),
          right: "42%",
          height: "100px",
          width: "100px",

        }} onClick={() => answerQuestionCallback("nein")} color="error">

          <ClearIcon fontSize="large" />
        </Fab>

      </Grid >

    </>
  ) : (
    <Grid item md={12} justifyContent="center">
      <Typography variant="h3" align="center">
        Fehler beim Laden der Fragen :(
      </Typography>
    </Grid>
  );
}
