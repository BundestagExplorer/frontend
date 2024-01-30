import React from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useTheme } from '@mui/material/styles';


export default function TimeSlider({ setAggregationLevel, setYear, setMonth, year, month, aggregationLevel, minYear = 2020, maxYear = 2024}) {

    const today = new Date()
    const theme = useTheme();
    function getMin(level) {
        return level === 'Monat' ? 1 : minYear
    }

    function getMax(level) {
        return level === 'Monat' ? 
            year === today.getFullYear() ? today.getMonth() +2 : 12
        : maxYear
    }

    function generateMarks(level, selectedYear) {
        if (level === 'Monat') {
            return [
                {
                    value: 1,
                    label: 'Jan ' + selectedYear,
                },
                {
                    value: 2,
                    label: 'Feb ' + selectedYear,
                },
                {
                    value: 3,
                    label: 'Mär ' + selectedYear,
                },
                {
                    value: 4,
                    label: 'Apr ' + selectedYear,
                },
                {
                    value: 5,
                    label: 'Mai ' + selectedYear,
                },
                {
                    value: 6,
                    label: 'Jun ' + selectedYear,
                },
                {
                    value: 7,
                    label: 'Jul ' + selectedYear,
                },
                {
                    value: 8,
                    label: 'Aug ' + selectedYear,
                },
                {
                    value: 9,
                    label: 'Sep ' + selectedYear,
                },
                {
                    value: 10,
                    label: 'Okt ' + selectedYear,
                },
                {
                    value: 11,
                    label: 'Nov ' + selectedYear,
                },
                {
                    value: 12,
                    label: 'Dez ' + selectedYear,
                }
            ]
        }
        else if (level === 'Jahr') {
            var yearMarks = []
            for (var i=minYear; i <= maxYear; i++){
                yearMarks.push({value:i, label: i.toString()})
            }
            return yearMarks
        }
        else {
            console.log("level must either be 'month' or 'year'");
        }
    }


    return (
        <div>
            <Box sx={{ display: 'flex', padding: 1, flexDirection: 'row', width: '90%' }}>
                <FormControl>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={aggregationLevel}
                        onChange={(event, value) => { setAggregationLevel(value) }}
                    >
                        <FormControlLabel value="Monat" control={<Radio />} label="Nach Monat aggregieren" defaultChecked />
                        <FormControlLabel value="Jahr" control={<Radio />} label="Nach Jahr aggregieren" />
                    </RadioGroup >
                </FormControl>
                <Slider
                    style={{color: theme.palette.secondary.main}}
                    aria-label="Custom marks"
                    defaultValue={aggregationLevel === "Jahr" ? year : month}
                    step={1}
                    min={getMin(aggregationLevel)}
                    max={getMax(aggregationLevel)}
                    value={aggregationLevel === "Jahr" ? year : month}
                    valueLabelDisplay="off"
                    marks={generateMarks(aggregationLevel, year)}
                    onChange={(event, value) => {
                        if (aggregationLevel === "Jahr") { setYear(value) };
                        if (aggregationLevel === "Monat") { setMonth(value) };
                    }}
                />
            </Box>
        </div>
    );
}
