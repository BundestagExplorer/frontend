import React, { useEffect } from "react";
import {
    Grid,
    Typography,
    Divider,
    Tooltip,
    List,
    Card,
    CardContent,
    Collapse,
    ListItem,
    CardHeader,
    CardActions,
    Link,
    Box
} from "@mui/material";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function DrucksachenCards({ drucksacheData }) {
    const [expanded, setExpanded] = React.useState(
        false
    );
    return (
        <Grid container item xs={12} spacing={2} justifyContent="center">
            {
                drucksacheData.sort((a, b) => a.titel.length - b.titel.length).map((drucksache, index) => {
                    return (
                        <Card key={index} sx={{ width: "100%", m: 3 }}>
                            <CardHeader title=
                                {
                                    drucksache.drucksache_name + " (" + drucksache.drucksachetyp + ")"
                                } subheader={drucksache.datum} typographyProps={{ color: "red" }} />
                            <CardContent>
                                <Typography variant="body2">{drucksache.titel}</Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: "flex-end", display: "flex" }}>
                                <Link href={drucksache.pdf_url} color="secondary" target="_blank" rel="noopener noreferrer">
                                    <Grid container item xs={12} justifyContent="flex-end" alignItems="center" gap={1}>
                                        <Typography variant="body"> Drucksache öffnen</Typography>
                                        <OpenInNewIcon />
                                    </Grid>
                                </Link>
                            </CardActions>
                        </Card>

                    )
                })
            }

        </Grid >
    )
}