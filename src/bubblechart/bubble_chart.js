import React, { Component, useState, useEffect } from 'react';
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

//https://www.highcharts.com/docs/chart-and-series-types/packed-bubble
//https://stackblitz.com/edit/react-hketvd?file=index.js (programatically update the highchart component)
const CustomBubbleChart = () => {
  const navigate = useNavigate()

  const [chartData, setChartData] = useState([{
    "name": "Error",
    "data": [
      { "name": "An error occured while loading the visualization data.", "value": 100 }
    ]
  }]);

  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'packedbubble',
      height: (1 / 3 * 100) + '%',
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
          style: {fontSize: '12px'}
        },
      },
    },
    series: chartData,
    credits: {
      enabled: false,
    },
  });

  const [initialSliderValue, setInitialSliderValue] = useState(10); // Set the initial value here


  //todo: make the marks adaptive with respect to the previously choosen granularity level
  const marks_spanne = [
    {
      value: 0,
      label: 'Jan 23',
    },
    {
      value: 10,
      label: 'Feb 23',
    },
    {
      value: 20,
      label: 'Mär 23',
    },
    {
      value: 30,
      label: 'Apr 23',
    },
    {
      value: 40,
      label: 'Mai 23',
    },
    {
      value: 50,
      label: 'Jun 23',
    },
    {
      value: 60,
      label: 'Jul 23',
    },
    {
      value: 70,
      label: 'Aug 23',
    },
    {
      value: 80,
      label: 'Sep 23',
    },
    {
      value: 90,
      label: 'Okt 23',
    },
    {
      value: 100,
      label: 'Nov 23',
    }
  ];

  const updateSliders = () => {
    // Code for updating the markings on the time-slider

  }

  const updateSeries = (slider_val) => {

    let month = (slider_val / 10) + 1;

    fetch('/api/v1/bundestag_top_topics/?month=' + month + '&year=2023'

      , {

        headers: {

          'Content-Type': 'application/json',

          'Accept': 'application/json'

        }

      }

    )

      .then(function (response) {

        console.log(response)

        return response.json();

      })

      .then(function (myJson) {

        return data_parser(myJson)

      })
      .then(function (data) {

        setChartOptions({
          ...chartOptions,
          series: data,
        })

      });

  };

  function data_parser(data) {
    // transforms the json from the api endpoint to a matching format for the word-clouda
    let transformed_data = []

    for (var resort_title in data["top_topics"]) {
      let bubble = {}
      bubble["name"] = resort_title

      let bubble_list = []
      for (var element in data["top_topics"][resort_title]) {
        let sub_item = {}
        sub_item["name"] = data["top_topics"][resort_title][element][0]
        sub_item["value"] = data["top_topics"][resort_title][element][1]
        bubble_list.push(sub_item)
      }
      bubble["data"] = bubble_list
      transformed_data.push(bubble)
    }
    return transformed_data
  }

  useEffect(() => {
    // Code to run when the component mounts
    updateSeries(initialSliderValue);
  }, []);

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
      />
      <Box sx={{ width: 600, paddingLeft: 10 }}>

        <h5>Zeitspanne</h5>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="Monat" control={<Radio onClick={updateSliders} />} label="Monat" checked />
            <FormControlLabel value="Jahr" control={<Radio onClick={updateSliders} />} label="Jahr" disabled />
            <FormControlLabel value="Legislaturperiode" control={<Radio onClick={updateSliders} />} label="Legislaturperiode" disabled />
          </RadioGroup>
        </FormControl>
        <h5>Zeitraum</h5>
        <Slider
          aria-label="Custom marks"
          defaultValue={10}
          step={10}
          valueLabelDisplay="off"
          marks={marks_spanne}
          //onChange={this.updateSeries.bind(this)}
          onChangeCommitted={(e, val) => updateSeries(val)}
        />
      </Box>
    </div>
  )
}

export default CustomBubbleChart