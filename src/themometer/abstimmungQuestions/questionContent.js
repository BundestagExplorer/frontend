import React, { useEffect } from "react";
import {
    Grid,
    Typography,
    Divider,
    Chip
} from "@mui/material";
import * as DOMPurify from 'dompurify'

const chipColors = ['#cc0000', '#eeaa00', '#11aa00', '#0011dd', '#ee00bb']

const BERICHT_DRUCKSACHETYP_SOURCES = ['Beschlussempfehlung und Bericht', 'Bericht']

function sortByFixedDate(a, b, abstimmungData) {
    let abstimmungDate = new Date(abstimmungData.abstimmungDate)

    let date_diff = Math.abs(new Date(a.datum) - abstimmungDate) - Math.abs(new Date(b.datum) - abstimmungDate)

    if (date_diff !== 0) {
        return date_diff
    }

    return 0
}

function sortByDrucksacheHeuristic(a, b, abstimmungData) {
    let fixedDaySort = sortByFixedDate(a, b, abstimmungData)
    if (fixedDaySort !== 0) {
        return fixedDaySort
    }

    if (a.drucksachetyp in BERICHT_DRUCKSACHETYP_SOURCES && !(b.drucksachetyp in BERICHT_DRUCKSACHETYP_SOURCES)) {
        return -1;
    }

    if (!(a.drucksachetyp in BERICHT_DRUCKSACHETYP_SOURCES) && (b.drucksachetyp in BERICHT_DRUCKSACHETYP_SOURCES)) {
        return 1;
    }

    if (a.titel.length < b.titel.length) {
        return -1;
    }
}

function sortByVorgangHeuristic(a, b, abstimmungData, vorgangCounter, vorgangDrucksachetypSource, vorgangInitiatorInAbstimmungTitleCounter) {
    let fixedDaySort = sortByFixedDate(a, b, abstimmungData)
    if (fixedDaySort !== 0) {
        return fixedDaySort
    }

    if (vorgangInitiatorInAbstimmungTitleCounter.get(a.vorgang_id) > vorgangInitiatorInAbstimmungTitleCounter.get(b.vorgang_id)) {
        return -1;
    }

    if (vorgangInitiatorInAbstimmungTitleCounter.get(a.vorgang_id) < vorgangInitiatorInAbstimmungTitleCounter.get(b.vorgang_id)) {
        return 1;
    }


    if (vorgangCounter.get(a.vorgang_id) > vorgangCounter.get(b.vorgang_id)) {
        return -1;
    }

    if (vorgangCounter.get(a.vorgang_id) < vorgangCounter.get(b.vorgang_id)) {
        return 1;
    }

    if (!(vorgangDrucksachetypSource.get(a.vorgang_id) in BERICHT_DRUCKSACHETYP_SOURCES) && (vorgangDrucksachetypSource.get(b.vorgang_id) in BERICHT_DRUCKSACHETYP_SOURCES)) {
        return -1;
    }

    if ((vorgangDrucksachetypSource.get(a.vorgang_id) in BERICHT_DRUCKSACHETYP_SOURCES) && !(vorgangDrucksachetypSource.get(b.vorgang_id) in BERICHT_DRUCKSACHETYP_SOURCES)) {
        return 1;
    }


    if (a.abstract && !b.abstract) {
        return -1;
    }

    if (!a.abstract && b.abstract) {
        return 1;
    }


    return 0;



}

export default function QuestionContent({ abstimmungData, drucksachenData }) {

    const [content, setContent] = React.useState(
        {}
    );


    const getContentObject = (abstimmungData, inDrucksachenData) => {
        var contentObject = {}

        const drucksachenData = [...inDrucksachenData]


        if (drucksachenData.length === 0) {
            contentObject = {
                'abstract': null,
                'title': null,
                'sachgebiete': null,
                'deskriptoren': null
            }
            return contentObject
        }

        var arrayVorgaenge = []
        drucksachenData.forEach((drucksache, index) => {
            drucksache.vorgaenge.forEach((vorgang, index) => {
                vorgang.drucksachetyp = drucksache.drucksachetyp
                arrayVorgaenge.push(vorgang)
            }
            )
        })

        if (arrayVorgaenge.length === 0) {
            drucksachenData.sort((a, b) => sortByDrucksacheHeuristic(a, b, abstimmungData))

            contentObject = {
                'abstract': null,
                'title': drucksachenData[0].titel,
                'sachgebiete': null,
                'deskriptoren': null
            }
            return contentObject
        }

        var vorgangCounter = new Map();
        var vorgangDrucksachetypSource = new Map();
        var vorgangInitiatorInAbstimmungTitleCounter = new Map();

        const uniqueVorgaenge = [...arrayVorgaenge.reduce((a, c) => {
            a.set(c.vorgang_id, c);
            vorgangCounter.set(c.vorgang_id, (vorgangCounter.get(c.vorgang_id) || 0) + 1);
            if ((c.drucksachetyp in BERICHT_DRUCKSACHETYP_SOURCES) && (!(c.vorgang_id in vorgangDrucksachetypSource))) {
                vorgangDrucksachetypSource[c.vorgang_id] = c.drucksachetyp;
            }
            else {
                vorgangDrucksachetypSource[c.vorgang_id] = c.drucksachetyp;
            };

            if (!(c.vorgang_id in vorgangInitiatorInAbstimmungTitleCounter)) {
                if (c.initiatoren.length > 0) {
                    c.initiatoren.forEach((initiator, index) => {
                        vorgangInitiatorInAbstimmungTitleCounter[c.vorgang_id] = 0;
                        if (abstimmungData.title.includes(initiator)) {
                            vorgangInitiatorInAbstimmungTitleCounter[c.vorgang_id] = vorgangInitiatorInAbstimmungTitleCounter[c.vorgang_id] + 1;
                        }
                    }
                    )
                }
                else {
                    vorgangInitiatorInAbstimmungTitleCounter[c.vorgang_id] = 0;
                }

            }

            return a;
        }, new Map()).values()].sort((a, b) => sortByVorgangHeuristic(a, b, abstimmungData, vorgangCounter, vorgangDrucksachetypSource, vorgangInitiatorInAbstimmungTitleCounter))

        contentObject = {
            'abstract': uniqueVorgaenge[0].abstract,
            'title': uniqueVorgaenge[0].titel,
            'sachgebiete': uniqueVorgaenge[0].sachgebiet,
            'deskriptoren': uniqueVorgaenge[0].deskriptoren,
        }
        return contentObject
    };


    useEffect(() => {
        setContent({})
        setContent(getContentObject(abstimmungData, drucksachenData))
    }, [abstimmungData, drucksachenData]);

    return drucksachenData.length !== 0 ?
        <Grid container item xs={12} spacing={2} justifyContent="center">
            <Divider flexItem sx={{ width: "100%" }} />
            <Grid item md={12}>
                <Typography variant="h6" color="pillA">{content.title}</Typography>
                {
                    content.sachgebiete &&
                    <Typography fontStyle='italic'>
                        {content.sachgebiete.slice(0, 5).join(" / ")}
                    </Typography>
                }
            </Grid>
            <Grid container item md={12} spacing={0} justifyContent="center">
                <Grid item md={12} justifyContent="flex-start">
                    {
                        content.deskriptoren &&
                        content.deskriptoren.slice(0, 5).map((deskriptor, index) => {
                            return (

                                <Chip key={index} variant="outlined" label={deskriptor} color="primary" size="small"
                                    sx={{
                                        borderColor: chipColors[index],
                                        marginRight: 1
                                    }}
                                />
                            )
                        })
                    }
                </Grid>
            </Grid>
            <Divider />
            <Grid item md={12}>
                {content.abstract && <Typography variant="caption" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.abstract) }} />}
            </Grid>

        </Grid >
        : <Typography variant="h6" color="pillA">Keine Drucksachen gefunden</Typography>

}