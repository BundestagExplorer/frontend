import React, { Component, useState, useRef, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { css } from '@emotion/react';
import { orange } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";
import CustomListText from './customlisttext';
import CustomCard from './custom_card';


//ToDo: Display the image based on the currrent card in the CustomCardGrid
const Item = styled(Paper)(({ theme, ressort_name, css }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    //backgroundImage:  `url(${ressort_name})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    ...theme.typography.body1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: 150,
    transform: "rotate("+ (css?.rotate || 0) +"deg) translate("+ (css?.radius || 0) +"px) rotate("+ (css?.rotateReverse || 0) +"deg)",
    position: 'absolute',
    left:0
  }));


export default function CircularCardLayout({agg_data, extended}){

    const [square, setSquare] = useState([]);
    const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

    useEffect(() => {
        // Function to update viewport height when the window is resized
        const handleResize = () => {
            setViewportHeight(window.innerHeight);
            setViewportWidth(window.innerWidth);
            buildCircle();
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    let navigate = useNavigate();
    function handleClicked() {
        console.log("firstList Clicked");
        navigate("/votes");
    }
    
    const buildCircle = () => {
        const num = agg_data.length; //Number of Square to be generate
        const type = 1;
        let radiusX = 3.4* viewportWidth/8 - 50; // distance from center along the horizontal axis
        let radiusY = 1.9* viewportWidth/8 - 50; // distance from center along the vertical axis
        let start = -90 + (360 * type) / num / 2; // shift start from 0
        let slice = (360 * type) / num;

        let items = [];
        for (let i = 0; i < num; i++) {
        let angle = ((slice * i + start) * Math.PI) / 180; // Convert to radians
        let radius = (radiusX * radiusY) / Math.sqrt(Math.pow(radiusY * Math.cos(angle), 2) + Math.pow(radiusX * Math.sin(angle), 2));

        items.push({
            radius: radius,
            rotate: slice * i + start,
            rotateReverse: (slice * i + start) * -1
        });
        }
        setSquare(items);
    };

    useEffect(() => {
        // Uncomment the line below if you want to show on load
        buildCircle();
      }, []);

    const Circle = styled('div')({
        //background: 'orange',
        width: '75vw',
        height: '50vh',
        borderRadius: '50%',
        margin: '150px auto 40px',
        position: 'relative',
    });

    const CircleHolder = styled('div')({
        position: 'absolute',
        left: 3*viewportWidth/8 - 50,
        top: viewportHeight/4 - 25,
    });
    
    return(
        <Circle>
            <CircleHolder>
                {agg_data.map( (data,index) =>
                    
                    <Item ressort_name css={square[index]} >
                        <CustomCard ressort_name={data.name} importance_val={data.value_sum}/>
                        <Typography variant='h5' sx={{position: 'relative'}}>
                            {data.name}
                        </Typography>
                            
                        <List dense={true} >
                            {data.data.map(topic =>
                                <ListItemButton onClick={handleClicked}>
                                    <CustomListText display_text ={topic.name}></CustomListText>
                                </ListItemButton>
                            )}
                        </List>
                    </Item>
                )}
            </CircleHolder>
        </Circle>
    )
}


