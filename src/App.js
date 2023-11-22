import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import _ from 'lodash';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsExporting(Highcharts);
HighchartsAccessibility(Highcharts);
HighchartsMore(Highcharts);

const getOptions = (type) => ({
  chart: {
    type,
    width: 1000,
    height: 1000,
  },
  title: {
    text: _.startCase(`${type} chart`),
  },
  plotOptions: {
    packedbubble: {
      layoutAlgorithm: {
        gravitationalConstant: 0.05,
        splitSeries: true,
        seriesInteraction: false,
        dragBetweenSeries: true,
        parentNodeLimit: true
    },
      minSize: '30%',
      maxSize: '40%',
      dataLabels: {
        enabled: true,
        format: '{point.name}',
      },
    },
  },
  series: [
    {"name" :"Landwirtschaft",
    "data":[
        {"name":"Kükentöten", "value":40},
        {"name":"Bio", "value":40},
        {"name":"Dürre", "value":40},
        {"name":"Glyphosat", "value":40}
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
],
  credits: {
    enabled: false,
  },
});

function App() {
  return (
    <HighchartsReact highcharts={Highcharts} options={getOptions('packedbubble')} />
  );
}

export default App;