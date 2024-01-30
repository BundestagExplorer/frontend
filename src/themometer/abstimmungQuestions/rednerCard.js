import React from "react";
import { Card, CardContent, CardMedia, CardHeader, Typography, Box, Link } from "@mui/material";
import defaultRedner from "../../assets/defaultRedner.png";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function RednerCard({ key, full_name, funktion, image_url }) {

  return (
    <Card key={key} sx={{ maxWidth: 250, minWidth: 250 }}>
      <CardMedia
        component="img"
        image={image_url}
        height={300}
        alt={full_name}
        sx={{ objectFit: "cover", minWidth: "90%" }}
        onError={
          (event) => {
            event.onerror = null;
            event.target.src = defaultRedner;
          }
        }
      />
      <CardContent>

        {/* <img src={image_url}
          onError={
            (event) => {
              event.onerror = null;
              event.target.src = "https://www.bundestag.de/static/appdata/includes/images/namentlich/Image3x4_small";
            }
          }
          alt={full_name}
        /> */}
        <Typography wrap variant="body2" color={"secondary"}>{funktion}</Typography>
        <Typography wrap variant="body1">{full_name}</Typography>
        <Link href={`https://de.wikipedia.org/w/index.php?title=Special:Search&search=${full_name}`} target="_blank" rel="noopener" underline="none">
          <Typography wrap variant="body1">Wikipedia <OpenInNewIcon fontSize="small" /></Typography>
        </Link>
      </CardContent>
    </Card >
  );
}
