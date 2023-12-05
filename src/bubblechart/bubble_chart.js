import React, { Component, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import _ from 'lodash';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsMore from 'highcharts/highcharts-more';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate } from 'react-router-dom';

HighchartsExporting(Highcharts);
HighchartsAccessibility(Highcharts);
HighchartsMore(Highcharts);


//TODO
// 1. WIP:  make the bubbles clickable, redirect clicks to a random page (www.google.com) vor visualziation
// 2. DONE: display the legend items on the right side, just like in the mockup 
// 3. make the legend items clickable
// 4. make the applications responsive, currently the layout uses a fixed height/width specified in pixels
// 5. integrate a slider to switch between two states
// 6. disable animation, except for switching between two states, speed up the transition animation (if possible)
// 6.1 the current style of the animation quite anoying

//https://www.highcharts.com/docs/chart-and-series-types/packed-bubble
//https://stackblitz.com/edit/react-hketvd?file=index.js (programatically update the highchart component)

function valuetext(value) {
  return `${value}°C`;
}



const marks_spanne = [
  {
    value: 0,
    label: 'Monat',
  },
  {
    value: 20,
    label: 'Jahr',
  },
  {
    value: 40,
    label: 'Legislaturperiode',
  }
];

const marks_zeitraum = [
  {
    value: [0, 10],
    label: '1999',
  },
  {
    value: 20,
    label: '2000',
  },
  {
    value: 40,
    label: '2001',
  },
  {
    value: 60,
    label: '2002',
  },
];


//https://mui.com/material-ui/react-slider/
function RangeSlider() {
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        marks={marks_zeitraum}
      />
    </Box>
  );
}

const CustomBubbleChart = () => {
  const navigate = useNavigate()
  const political_data = [
    {
      "name": "Landwirtschaft",
      "data": [
        { "name": "Veganismus", "value": 10 },
        { "name": "Bio", "value": 40 },
        { "name": "Dürre", "value": 40 },
        { "name": "Glyphosat", "value": 40 },
      ]
    },
    {
      "name": "Justiz",
      "data": [
        { "name": "Staatsanwalt", "value": 40 }
      ]
    },
    {
      "name": "Wirtschaft",
      "data": [
        { "name": "Börsenkrise", "value": 40 },
        { "name": "Leitzins", "value": 40 },
        { "name": "EZB", "value": 40 },
        { "name": "Inflation", "value": 40 }
      ]
    },
    {
      "name": "Gesundheit",
      "data": [
        { "name": "Pflegekräfte", "value": 40 }
      ]
    },
    {
      "name": "Verkehr",
      "data": [
        { "name": "Fahrradstrecken", "value": 40 },
        { "name": "ÖPNV", "value": 40 },
        { "name": "Bahn", "value": 40 }
      ]
    },
    {
      "name": "Arbeit",
      "data": [
        { "name": "Verteilung", "value": 40 },
        { "name": "Reiche", "value": 40 },
        { "name": "Arbeitslosigkeit", "value": 40 }
      ]
    },
    {
      "name": "Finanzen",
      "data": [
        { "name": "Euro", "value": 40 },
        { "name": "Steuer", "value": 40 },
        { "name": "Erbschaft", "value": 40 }
      ]
    },
    {
      "name": "Wohnungen und Bau",
      "data": [
        { "name": "Obdachlose", "value": 40 },
        { "name": "Sozialwohnungen", "value": 40 }
      ]
    },
    {
      "name": "Familie",
      "data": [
        { "name": "Kindergarten", "value": 40 },
        { "name": "Rentner", "value": 40 }
      ]
    },
    {
      "name": "Verteidigung",
      "data": [
        { "name": "Bundeswehr", "value": 40 },
        { "name": "Krieg", "value": 40 },
        { "name": "Verteidigung", "value": 40 }
      ]
    },
    {
      "name": "Innenpolitik",
      "data": [
        { "name": "Rechtsextremismus", "value": 40 },
        { "name": "Berlin", "value": 40 },
        { "name": "Bayern", "value": 40 }
      ]
    },
    {
      "name": "Digitalisierung",
      "data": [
        { "name": "Digitalisierung", "value": 40 },
        { "name": "Künstliche Intelligenz", "value": 40 }
      ]
    },
    {
      "name": "Umwelt",
      "data": [
        { "name": "Klimawandel", "value": 40 },
        { "name": "Wasserverschmutzung", "value": 40 },
        { "name": "Hitze", "value": 40 }
      ]
    },
    {
      "name": "Bildung und Forschung",
      "data": [
        { "name": "G8", "value": 40 },
        { "name": "Lehrer", "value": 40 },
        { "name": "NC", "value": 40 }
      ]
    },
    {
      "name": "Außenpolitik",
      "data": [
        { "name": "Syrien", "value": 40 },
        { "name": "Libyen", "value": 40 },
        { "name": "Krim", "value": 40 },
        { "name": "Russland", "value": 40 }
      ]
    }
  ];
  
  const political_data_updated = [
    {
      "name": "Landwirtschaft",
      "data": [
        { "name": "Veganismus", "value": 10 },
        { "name": "Bio", "value": 40 },
        { "name": "Dürre", "value": 60 },
        { "name": "Glyphosat", "value": 20 },
      ]
    },
    {
      "name": "Justiz",
      "data": [
        { "name": "Staatsanwalt", "value": 10 }
      ]
    },
    {
      "name": "Wirtschaft",
      "data": [
        { "name": "Börsenkrise", "value": 30 },
        { "name": "Leitzins", "value": 50 },
        { "name": "EZB", "value": 20 },
        { "name": "Inflation", "value": 10 }
      ]
    },
    {
      "name": "Gesundheit",
      "data": [
        { "name": "Pflegekräfte", "value": 70 }
      ]
    },
    {
      "name": "Verkehr",
      "data": [
        { "name": "Fahrradstrecken", "value": 50 },
        { "name": "ÖPNV", "value": 30 },
        { "name": "Bahn", "value": 20 }
      ]
    },
    {
      "name": "Arbeit",
      "data": [
        { "name": "Verteilung", "value": 20 },
        { "name": "Reiche", "value": 10 },
        { "name": "Arbeitslosigkeit", "value": 10 }
      ]
    },
    {
      "name": "Finanzen",
      "data": [
        { "name": "Euro", "value": 20 },
        { "name": "Steuer", "value": 30 },
        { "name": "Erbschaft", "value": 40 }
      ]
    },
    {
      "name": "Wohnungen und Bau",
      "data": [
        { "name": "Obdachlose", "value": 40 },
        { "name": "Sozialwohnungen", "value": 40 }
      ]
    },
    {
      "name": "Familie",
      "data": [
        { "name": "Kindergarten", "value": 40 },
        { "name": "Rentner", "value": 40 }
      ]
    },
    {
      "name": "Verteidigung",
      "data": [
        { "name": "Bundeswehr", "value": 40 },
        { "name": "Krieg", "value": 60 },
        { "name": "Verteidigung", "value": 40 }
      ]
    },
    {
      "name": "Innenpolitik",
      "data": [
        { "name": "Rechtsextremismus", "value": 40 },
        { "name": "Berlin", "value": 60 },
        { "name": "Bayern", "value": 40 }
      ]
    },
    {
      "name": "Digitalisierung",
      "data": [
        { "name": "Digitalisierung", "value": 40 },
        { "name": "Künstliche Intelligenz", "value": 40 }
      ]
    },
    {
      "name": "Umwelt",
      "data": [
        { "name": "Klimawandel", "value": 40 },
        { "name": "Wasserverschmutzung", "value": 40 },
        { "name": "Hitze", "value": 40 }
      ]
    },
    {
      "name": "Bildung und Forschung",
      "data": [
        { "name": "G8", "value": 40 },
        { "name": "Lehrer", "value": 40 },
        { "name": "NC", "value": 40 }
      ]
    },
    {
      "name": "Außenpolitik",
      "data": [
        { "name": "Syrien", "value": 40 },
        { "name": "Libyen", "value": 40 },
        { "name": "Krim", "value": 40 },
        { "name": "Russland", "value": 40 }
      ]
    }
  ];


  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'packedbubble',
      height: (1 / 2 * 100) + '%',
    },
    legend: {
      align: 'right',
      verticalAlign: 'top',
      layout: 'vertical',
    },
    title: {
      text: 'Current Topics',
    },
    plotOptions: {
      packedbubble: {
        events: {
          click: function (event) {
            /*alert(
              this.name + ' clicked\n' +
              'Alt: ' + event.altKey + '\n' +
              'Control: ' + event.ctrlKey + '\n' +
              'Meta: ' + event.metaKey + '\n' +
              'Shift: ' + event.shiftKey
            );*/
            navigate("/votes", { state: { category: this.name } })
          },
        },
        draggable: false,
        layoutAlgorithm: {
          splitSeries: true,
          seriesInteraction: false,
          dragBetweenSeries: false,
          parentNodeLimit: true,
          enableSimulation: false,
          allowPointSelect: true,
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}',
        },
      },
    },
    series: political_data, 
    credits: {
      enabled: false,
    },
  });

  const updateSeries = () => {
    // The chart is updated only with new options.
    setChartOptions({
      ...chartOptions,
      series: political_data_updated,
    });
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
      />
      <Box sx={{ width: 600, padding: 30 }}>
        <h5>Zeitspanne</h5>


        {/* <Slider

          aria-label="Custom marks"
          defaultValue={20}
          getAriaValueText={valuetext}
          step={10}
          valueLabelDisplay="auto"
          marks={marks_spanne}
          onChange={this.updateSeries.bind(this)}
        /> */}
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="Monat"  control={<Radio onClick={updateSeries} />} label="Monat" />
            <FormControlLabel value="Jahr" control={<Radio onClick={updateSeries} />} label="Jahr" />
            <FormControlLabel value="Legislaturperiode" control={<Radio onClick={updateSeries} />} label="Legislaturperiode" />

          </RadioGroup>
        </FormControl>

        <h5>Zeitraum</h5>
        <RangeSlider></RangeSlider>
      </Box>
    </div>
  )
}

export default CustomBubbleChart