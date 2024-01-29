import React from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


export default function TimeSlider({ setAggregationLevel, expertModeActive, setYear, setMonth, year, month, aggregationLevel, setExpertModeActive, minYear = 2020, maxYear = 2024}) {

    const today = new Date()
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
                    label: 'December ' + selectedYear,
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
            {setExpertModeActive !== null? <FormControlLabel
                control={
                    <Switch checked={expertModeActive} onChange={(event, value) => { setExpertModeActive(value) }} inputProps={{ 'aria-label': 'controlled' }} />
                }
                label={expertModeActive ? 'Standardmodus' : 'Expertenmodus'}
                style={{ marginLeft: '0.5vw' }}
            />: null}
        </div>
    );
}
