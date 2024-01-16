import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import CustomListText from './customlisttext';
import Tooltip from '@mui/material/Tooltip';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';

const Item = styled('div')(({ theme, css, middle }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    ...theme.typography.body1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: middle ? 450 : 100,
    transform: middle ? 'translateY(-16vh) translateX(-8vw)' : `rotate(${css?.rotate || 0}deg) translate(${css?.radius || 0}px) rotate(${css?.rotateReverse || 0}deg)`,
    position: 'absolute',
    left: 0,
    '&:hover': {
        cursor: middle ? 'defualt' : 'pointer',
    },
}));

const Circle = styled('div')({
    width: '75vw',
    height: '50vh',
    borderRadius: '50%',
    margin: '150px auto 40px',
    position: 'relative',
});

const CircleHolder = styled('div')(({ viewportWidth, viewportHeight }) => ({
    position: 'absolute',
    left: 3 * viewportWidth / 8 - 100,
    top: viewportHeight / 4 - 25,
}));

export default function CircularCardLayout({ agg_data, aggregationLevel }) {
    const [square, setSquare] = useState([]);
    const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

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
        let radiusX = 3.5 * viewportWidth / 8 - 50;
        let radiusY = 3 * viewportHeight / 8 - 50;
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
        <Circle>
            <CircleHolder viewportWidth={viewportWidth} viewportHeight={viewportHeight}>
                {agg_data.map((data, index) => (
                    <div>
                        <Tooltip key={index} title={
                            <div>
                                <Typography variant="h6">Wichtigste Themen:</Typography>
                                <List dense={true}>
                                    {data.data.map(topic =>
                                        <ListItemButton key={topic.name}>
                                            <CustomListText display_text={topic.name}></CustomListText>
                                        </ListItemButton>)}
                                </List>
                            </div>} placement="top">
                            <Item css={square[index]} onClick={() => navigate("/votes", { state: { ressort: data.name } })}>
                                <Typography style={{ fontSize: isNaN(data.value_sum) ? 12 : data.value_sum }} sx={{ position: 'relative' }}>
                                    {data.name}
                                </Typography>
                            </Item>
                        </Tooltip>
                        {data.max_value ?
                            <Item middle={true}>
                                <Typography variant="h4">
                                    <b>Brennpunkt des {aggregationLevel === "Monat" ? "Monats" : "Jahres"}:</b><br />
                                </Typography>
                                <Typography variant="h5">
                                    {data.name}:<br />
                                </Typography>
                                
                                <List dense={true} style={{ textAlign: 'center' }}>
                                    {data.data.map(topic =>
                                        <ListItemButton key={topic.name} style={{display:'flex', justifyContent:'center'}}>
                                            <CustomListText display_text={topic.name}></CustomListText>
                                        </ListItemButton>)}
                                </List>
                            </Item>
                            : <div></div>
                        }
                    </div>
                ))}
            </CircleHolder>
        </Circle>
    );
}
