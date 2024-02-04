import React from "react";
import { Card, CardContent, CardMedia, CardHeader, Typography, Box, Link } from "@mui/material";
import defaultRedner from "../../assets/defaultRedner.png";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function RednerCard({ full_name, funktion, image_url }) {

  return (
    <Card sx={{ maxWidth: 230, m: 3 }}>
      <CardMedia
        component="img"
        image={image_url}
        alt={full_name}
        sx={{ objectFit: "cover", minWidth: 200, height: 300 }}
        onError={
          (event) => {
            event.onerror = null;
            event.target.src = defaultRedner;
          }
        }
      />
      <CardContent>
        <Typography variant="body2" color={"secondary"}>{funktion}</Typography>
        <Typography variant="body1">{full_name}</Typography>
        <Link href={`https://de.wikipedia.org/w/index.php?title=Special:Search&search=${full_name}`} target="_blank" rel="noopener" underline="none">
          <Typography variant="body1">Wikipedia <OpenInNewIcon fontSize="small" /></Typography>
        </Link>
      </CardContent>
    </Card >
  );
}
