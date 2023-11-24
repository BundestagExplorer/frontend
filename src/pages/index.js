import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import _ from 'lodash';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsMore from 'highcharts/highcharts-more';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

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


  
const marks = [
    {
      value: 0,
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

const political_data = [
    {"name" :"Landwirtschaft",
    "data":[
        {"name":"Veganismus", "value":10},
        {"name":"Bio", "value":40},
        {"name":"Dürre", "value":40},
        {"name":"Glyphosat", "value":40}, 
    ]
    },
    {"name" :"Justiz",
    "data":[
        {"name":"Staatsanwalt", "value":40}
    ]
    },
    {"name" :"Wirtschaft",
    "data":[
        {"name":"Börsenkrise", "value":40},
        {"name":"Leitzins", "value":40},
        {"name":"EZB", "value":40},
        {"name":"Inflation", "value":40}
    ]
    },
    {"name" :"Gesundheit",
    "data":[
        {"name":"Pflegekräfte", "value":40}
    ]
    },
    {"name" :"Verkehr",
    "data":[
        {"name":"Fahrradstrecken", "value":40},
        {"name":"ÖPNV", "value":40},
        {"name":"Bahn", "value":40}
    ]
    },
    {"name" :"Arbeit",
    "data":[
        {"name":"Verteilung", "value":40},
        {"name":"Reiche", "value":40},
        {"name":"Arbeitslosigkeit", "value":40}
    ]
    },
    {"name" :"Finanzen",
    "data":[
        {"name":"Euro", "value":40},
        {"name":"Steuer", "value":40},
        {"name":"Erbschaft", "value":40}
    ]
    },
    {"name" :"Wohnungen und Bau",
    "data":[
        {"name":"Obdachlose", "value":40},
        {"name":"Sozialwohnungen", "value":40}
    ]
    },
    {"name" :"Familie",
    "data":[
        {"name":"Kindergarten", "value":40},
        {"name":"Rentner", "value":40}
    ]
    },
    {"name" :"Verteidigung",
    "data":[
        {"name":"Bundeswehr", "value":40},
        {"name":"Krieg", "value":40},
        {"name":"Verteidigung", "value":40}
    ]
    },
    {"name" :"Innenpolitik",
    "data":[
        {"name":"Rechtsextremismus", "value":40},
        {"name":"Berlin", "value":40},
        {"name":"Bayern", "value":40}
    ]
    },
    {"name" :"Digitalisierung",
    "data":[
        {"name":"Digitalisierung", "value":40},
        {"name":"Künstliche Intelligenz", "value":40}
    ]
    },
    {"name" :"Umwelt",
    "data":[
        {"name":"Klimawandel", "value":40},
        {"name":"Wasserverschmutzung", "value":40},
        {"name":"Hitze", "value":40}
    ]
    },
    {"name" :"Bildung und Forschung",
    "data":[
        {"name":"G8", "value":40},
        {"name":"Lehrer", "value":40},
        {"name":"NC", "value":40}
    ]
    },
    {"name" :"Außenpolitik",
    "data":[
        {"name":"Syrien", "value":40},
        {"name":"Libyen", "value":40},
        {"name":"Krim", "value":40},
        {"name":"Russland", "value":40}
    ]
    }
];

const getOptions = (type) => ({

    chart: {
      type: 'packedbubble',
      
    },
    legend: {
        align: 'right',
        verticalAlign: 'top',
        layout: 'vertical'
    },
    title: {
      text: "Current Topics",
    },

    plotOptions: {
      packedbubble: {
        events: {
            click: function (event) {
                alert(
                    this.name + ' clicked\n' +
                    'Alt: ' + event.altKey + '\n' +
                    'Control: ' + event.ctrlKey + '\n' +
                    'Meta: ' + event.metaKey + '\n' +
                    'Shift: ' + event.shiftKey
                );}},
        draggable: false,
        // https://api.highcharts.com/highcharts/series.packedbubble.layoutAlgorithm
        // Dokumentation der folgenden Optionen
        layoutAlgorithm: {
          //gravitationalConstant: 0.05,
          // friction = 0 friert die Animation ein 
          //friction: -0.7,
          splitSeries: true,
          seriesInteraction: false,
          dragBetweenSeries: false,
          parentNodeLimit: true,
          enableSimulation: false, //disables the annoying simulation#,
          allowPointSelect: true
      },
      
        // minSize: '30%',
        // maxSize: '45%',
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

  let make_alert = function make_alert() {
    political_data.push(    {"name" :"Test",
    "data":[
        {"name":"Nice", "value":40},
        {"name":"Es funktioniert", "value":40}
    ]
    });}
  

const Home = () => {
    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={getOptions('packedbubble')} />
            <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Custom marks"
        defaultValue={20}
        getAriaValueText={valuetext}
        step={10}
        valueLabelDisplay="auto"
        marks={marks}
        onChange={make_alert}
      />
    </Box>
        </div>
    );
};
 
export default Home;



