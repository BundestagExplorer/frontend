import React, { Component, useState, useRef, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { List, ListItemButton, ListItemText } from '@mui/material';

import WirtschaftImage from './Wolfsburg_VW-Werk-50_opacity.jpg'; // Import using relative path
import FinanzenImage from './Euro_coins_and_banknotes-50_opacity.jpg'; // Import using relative path


//ToDo: Display the image based on the currrent card in the CustomCardGrid
const Item = styled(Paper)(({ theme, ressort_name }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    backgroundImage:  `url(${WirtschaftImage})`,
    //backgroundImage:  `url(${ressort_name})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    ...theme.typography.body1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


export default function CustomCardGrid({agg_data, extended}){

    extended = true
    if (extended) {
        agg_data.splice(6,1,{extended: true, ressort_name : "Themen des Tages", values : ["Sehr", "wichtige", "Themen", "foo", "bar"]})
    }

    let new_data = agg_data.map(data => {
        var transformed_data = data
        transformed_data.md = 2.4
        if (transformed_data.extended){
            transformed_data.md = 7.2
        }
        return transformed_data
    })
    
    
    return(
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {agg_data.map( data =>
                
                <Grid item key={data} md={data.md}>
                <Item ressort_name>

                <Typography variant='h5'>
                {data.ressort_name}
                </Typography>
                    

                    <List dense={true}>
                    
                    {data.values.map(topic =>

                    <ListItemButton>
                        <ListItemText>
                            {topic}
                        </ListItemText>
                    </ListItemButton>
                        
                        )}
                    </List>
                    </Item>
                </Grid>
                )}
        </Grid>
    )
}


