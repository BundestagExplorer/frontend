import React, { Component, useState, useRef, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { func } from 'prop-types';
import { Typography } from '@mui/material';


export default function TimeSlider({setAggregationLevel, setYear, setMonth, year, month, aggregationLevel }) {

    //const [aggregationLevelinternal, setAggregationLevelinternal] = useState('month');


    const sliderDefaultValue = 110;

    function getMin(level){
        if(level === 'Monat'){ 
            return 1;}
        
        if(level === 'Jahr'){ 
            return 2014;}

        else{
            return 42;
        }
    }

    function getMax(level){
        if(level === 'Monat'){ 
            return 12;}
        
        if(level === 'Jahr'){ 
            return 2024;}

        else{
            return 42;
        }
    }
    
    function generateMarks(level, selectedYear) {
        if (level === 'Monat'){
            return [
                {
                    value: 1,
                    label: 'Jan '+selectedYear,
                },
                {
                    value: 2,
                    label: 'Feb '+selectedYear,
                },
                {
                    value: 3,
                    label: 'Mär '+selectedYear,
                },
                {
                    value: 4,
                    label: 'Apr '+selectedYear,
                },
                {
                    value: 5,
                    label: 'Mai '+selectedYear,
                },
                {
                    value: 6,
                    label: 'Jun '+selectedYear,
                },
                {
                    value: 7,
                    label: 'Jul '+selectedYear,
                },
                {
                    value: 8,
                    label: 'Aug '+selectedYear,
                },
                {
                    value: 9,
                    label: 'Sep '+selectedYear,
                },
                {
                    value: 10,
                    label: 'Okt '+selectedYear,
                },
                {
                    value: 11,
                    label: 'Nov '+selectedYear,
                },
                {
                    value: 12,
                    label: 'December '+selectedYear,
                }
            ]
        }
        else if (level === 'Jahr') {
            return [
                {
                    value: 2014,
                    label: '2014',
                },
                {
                    value: 2015,
                    label: '2015',
                },
                {
                    value: 2016,
                    label: '2016',
                },
                {
                    value: 2017,
                    label: '2017',
                },
                {
                    value: 2018,
                    label: '2018',
                },
                {
                    value: 2019,
                    label: '2019',
                },
                {
                    value: 2020,
                    label: '2020',
                },
                {
                    value: 2021,
                    label: '2021',
                },
                {
                    value: 2022,
                    label: '2022',
                },
                {
                    value: 2023,
                    label: '2023',
                },
                {
                    value: 2024,
                    label: '2024',
                }
            ]
        }
        else {
            console.log("level must either be 'month' or 'year'");
        }
    }


    return (
        <Box sx={{ display:'flex', padding:1, flexDirection: 'row', width: '90%'}}>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={(event, value) => {setAggregationLevel(value); setAggregationLevel(value)}}
          >
            <FormControlLabel value="Monat" control={<Radio />} label="Nach Monat aggregieren" defaultChecked />
            <FormControlLabel value="Jahr" control={<Radio />} label="Nach Jahr aggregieren"  />
          </RadioGroup >
        </FormControl>
         <Slider 
          aria-label="Custom marks"
          defaultValue={sliderDefaultValue}
          step={1}
          min={getMin(aggregationLevel)}
          max={getMax(aggregationLevel)}
        


        //   max={ () => {
        //         if(aggregationLevel === 'Monat'){ 
        //             return 12;}
                
        //         if(aggregationLevel === 'Jahr'){ 
        //             return 2024;}
        //         else{
        //             return 1;
        //         }
        //         }
        //   }


          valueLabelDisplay="off"
          marks={generateMarks(aggregationLevel, year)}
          onChange={(event, value) => {
            if(aggregationLevel === "Jahr")
            {setYear(value)}; 
            if(aggregationLevel === "Monat")
            {setMonth(value)}; 
            }}
        /> 
      </Box> 

    );
}
