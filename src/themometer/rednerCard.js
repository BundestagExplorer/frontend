import React from "react";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";

export default function RednerCard({ key, full_name, funktion, image_url, reden }) {
  console.log(key, full_name, funktion, image_url);
  return (
    < Card width={"100%"} >
      <CardContent width={"100%"}>

        <img src={image_url}
          onError={
            (event) => {
              event.onerror = null;
              event.target.src = "https://www.bundestag.de/static/appdata/includes/images/namentlich/Image3x4_small";
            }
          }
          alt={full_name}
        />
        <Typography variant="body1">{full_name}</Typography>
      </CardContent>
    </Card >
  );
}
