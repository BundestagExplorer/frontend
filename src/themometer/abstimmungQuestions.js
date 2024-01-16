import React from "react";
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
} from "@mui/material";
import MobileStepper from "@mui/material/MobileStepper";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RednerCard from "./rednerCard";

export default function AbstimmungQuestions({
  questionIndex,
  totalQuestions,
  votingData,
  answerQuestionCallback,
}) {
  console.log(votingData);
  return votingData ? (
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
              <Grid container direction="row">
                <Grid item md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="body1">
                        Lorem ipsum odor amet, consectetuer adipiscing elit.
                        Netus risus parturient sodales taciti eget turpis in
                        mus. Amet arcu platea porttitor sollicitudin faucibus
                        ligula. Eros hendrerit metus metus ullamcorper orci
                        bibendum lobortis vehicula. Ligula proin ligula
                        vulputate quis adipiscing nascetur blandit diam
                        consectetur. Convallis est non facilisi vitae potenti.
                        Nibh curabitur imperdiet potenti suscipit libero urna
                        pulvinar augue. Euismod tempor maximus pulvinar lobortis
                        ac conubia fames. Integer torquent nunc ipsum nascetur
                        erat per..
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item md={4}>
                  <RednerCard />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <CardContent>
            <Grid container direction="row" justifyContent="center" spacing={3}>
              <Grid
                item
                md={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => answerQuestionCallback("nein")}
                  sx={{ width: "80%" }}
                >
                  Nein
                </Button>
              </Grid>
              <Grid
                item
                md={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  variant="contained"
                  color="info"
                  onClick={() => answerQuestionCallback("enthalten")}
                  sx={{ width: "80%" }}
                >
                  Enthalten
                </Button>
              </Grid>
              <Grid
                item
                md={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => answerQuestionCallback("ja")}
                  sx={{ width: "80%" }}
                >
                  Ja
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  ) : (
    <Grid item md={12} justifyContent="center">
      <Typography variant="h3" align="center">
        Fehler beim Laden der Fragen :(
      </Typography>
    </Grid>
  );
}
