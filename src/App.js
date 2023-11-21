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
    {
      "name": "Wirtschaft",
      "data": [
          {
              "name": "Börsencrash",
              "value": 30
          },
          {
              "name": "Aktienkurs",
              "value": 20
          },
          {
              "name": "Stonks",
              "value": 40
          }
      ]
  },
  {
      "name": "Umwelt",
      "data": [
          {
              "name": "Klimawandel",
              "value": 30
          },
          {
              "name": "Schäden",
              "value": 20
          },
          {
              "name": "Hitze",
              "value": 40
          }
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