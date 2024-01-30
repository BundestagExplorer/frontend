import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import CustomListText from './customlisttext';
import Tooltip from '@mui/material/Tooltip';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import IconSelector from '../common/iconSelector';
import { red } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';

const Item = styled('div')(({ theme, css, middle }) => ({
    background: "rgba(0,0,0,0)",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    //border: '2px solid',
    //borderColor: 'red',
    ...theme.typography.body1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: 150,
    transform: middle ? `` : `rotate(${css?.rotate || 0}deg) translate(${css?.radius || 0}px) rotate(${css?.rotateReverse || 0}deg)`,
    position: 'absolute',
    left: 0,
    top: 0,
    '&:hover': {
        cursor: middle ? 'defualt' : 'pointer',
    },
}));

const Circle = styled('div')({
    width: '100%',
    height: '100%',
    left: 0,
    position: 'relative',
});

const CircleHolder = styled('div')(({ viewportWidth, viewportHeight }) => ({
    position: 'absolute',
    left: 0.475 * viewportWidth - 75,
    top: 0.34 * Math.min(viewportHeight, viewportWidth) + 20,
}));

export default function CircularCardLayout({ agg_data, aggregationLevel, selectedYear, selectedMonth }) {
    const [square, setSquare] = useState([]);
    const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    const theme = useTheme();

    useEffect(() => {
        const handleResize = () => {
            setViewportHeight(window.innerHeight);
            setViewportWidth(window.innerWidth);
            buildCircle();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        buildCircle();
    }, [agg_data, viewportWidth, viewportHeight]);

    const buildCircle = () => {
        const num = agg_data.length;
        const type = 1;
        let radius = Math.min(viewportHeight, viewportWidth) * 0.34;
        console.log("Height: " + viewportHeight)
        console.log("Width: " + viewportWidth)
        let radiusX = radius;
        let radiusY = radius;
        let start = -90 + (360 * type) / num / 2;
        let slice = (360 * type) / num;

        let items = [];
        for (let i = 0; i < num; i++) {
            let angle = ((slice * i + start) * Math.PI) / 180;
            let radius = (radiusX * radiusY) / Math.sqrt(Math.pow(radiusY * Math.cos(angle), 2) + Math.pow(radiusX * Math.sin(angle), 2));

            items.push({
                radius: radius,
                rotate: slice * i + start,
                rotateReverse: (slice * i + start) * -1,
            });
        }
        setSquare(items);
    };

    let navigate = useNavigate();

    return (
        <div>
            <div style={{ maxWidth: '80%', margin: '0 auto', textAlign: 'center' }} >
                <Typography variant='h4' style={{ color: theme.palette.text.secondary }}>Meistdiskutierte Themen im <span style={{ color: theme.palette.secondary.main }}>Bundestag</span></Typography>
            </div>
            <Circle>
                <CircleHolder viewportWidth={viewportWidth} viewportHeight={viewportHeight}>
                    {agg_data.map((data, index) => (
                        <Tooltip key={index} title={
                            <div>
                                <Typography variant="h6">Wichtigste Themen:</Typography>
                                <List dense={true}>
                                    {data.data.map(topic =>
                                        <ListItemButton key={topic.name} onClick={() => navigate("/votes", { state: { ressort: data.name, slider_data: { agg_level: aggregationLevel, selectedYear: selectedYear, selectedMonth: selectedMonth } } })}>
                                            <CustomListText display_text={topic.name}></CustomListText>
                                        </ListItemButton>)}
                                </List>
                            </div>} placement="top">
                            <Item css={square[index]} onClick={() => navigate("/votes", { state: { ressort: data.name, slider_data: { agg_level: aggregationLevel, selectedYear: selectedYear, selectedMonth: selectedMonth } } })}>
                                <IconSelector iconName={data.name} style={{ margin: '0.2vw' }} />
                                <Typography style={{ fontSize: isNaN(data.value_sum) ? 12 : data.value_sum }} sx={{ position: 'relative' }}>
                                    {data.name}
                                </Typography>
                            </Item>
                        </Tooltip>
                    ))}
                </CircleHolder>
                {agg_data.map((data) => (
                    data.max_value &&
                    <Item middle={true} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: Math.min(viewportHeight, viewportWidth) * 7 / 16,
                        height: Math.min(viewportHeight, viewportWidth) * 7 / 16,
                        border: '2px solid',
                        borderColor: theme.palette.secondary.main,
                        left: 0.472 * viewportWidth - Math.min(viewportHeight, viewportWidth) * 7 / 32,
                        top: 0.34 * Math.min(viewportHeight, viewportWidth) + 40 - Math.min(viewportHeight, viewportWidth) * 7 / 32,
                        padding: '10px', borderRadius: '50%'
                    }}>
                        <div>
                            <Typography variant="h6">
                                <b>Brennpunkt des {aggregationLevel === "Monat" ? "Monats" : "Jahres"}:</b><br />
                            </Typography>
                            <Typography variant="h4" style={{ color: theme.palette.secondary.main }}>
                                {data.name}<br />
                            </Typography>

                            <List dense={true} style={{ textAlign: 'center' }}>
                                {data.data.slice(0, 2).map(topic =>
                                    <ListItemButton key={topic.name} style={{ display: 'flex', justifyContent: 'center' }} onClick={() => navigate("/votes", { state: { ressort: data.name, slider_data: { agg_level: aggregationLevel, selectedYear: selectedYear, selectedMonth: selectedMonth } } })}>
                                        <CustomListText display_text={topic.name}></CustomListText>
                                    </ListItemButton>)}
                            </List>
                        </div>
                    </Item>
                ))}
                {agg_data[0].data.length === 0 &&
                    <Item middle={true} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: Math.min(viewportHeight, viewportWidth) * 7 / 16,
                        height: Math.min(viewportHeight, viewportWidth) * 7 / 16,
                        border: '2px solid',
                        borderColor: theme.palette.secondary.main,
                        left: 0.472 * viewportWidth - Math.min(viewportHeight, viewportWidth) * 7 / 32,
                        top: 0.34 * Math.min(viewportHeight, viewportWidth) + 30 - Math.min(viewportHeight, viewportWidth) * 7 / 32,
                        padding: '10px', borderRadius: '50%'
                    }}>
                        <Typography variant="h5">
                            Keine Daten für den Zeitraum {aggregationLevel === "Monat" ? `${selectedMonth}/${selectedYear}` : selectedYear}<br />
                        </Typography>
                    </Item>}
            </Circle>
        </div>
    );
}
