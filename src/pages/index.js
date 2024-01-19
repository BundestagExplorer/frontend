import React, { useState, useEffect } from 'react';
import DenseAppBar from '../appbar/appbar';
import CircularCardLayout from '../cardgrid/circular_layout';
import CustomCardGrid from '../cardgrid/card_grid';
import TemporaryDrawer from '../drawer/drawer';
import { Config } from '../config';

const BT_TOP_TOPIC_ENDPOINT = 'bundestag_top_topics/';


var default_agg_data = 
[
  {
    "name": "Ein Fehler ist aufgetreten :(",
    "data": [
      {
        "name": "Die aktuellen Themen konnten nicht geladen werden.",
        "value": 5
      }
    ],
    "md": 4
  }
]

const Home = () => {

  const [selectedYear, setSelectedYear] = useState(2023);
  const [selectedMonth, setSelectedMonth] = useState(12);

  const [drawerExtended, setDrawerExtented] = useState(false);
  const [aggregationLevel, setAggregationLevel] = useState('Monat');

  const [expertModeActive, setExpertModeActive] = useState(false);

  const [aggData, setAggData] = useState(default_agg_data);
  const [totalSize, setTotalSize] = useState(0)


  //// code for updating the values in the grid in response to change in time selection

  const updateSeries = (selectedMonth, selectedYear) => {

    var search_params = {}
    if(aggregationLevel === 'Jahr'){
      search_params = {year: selectedYear}
    }
    if(aggregationLevel === 'Monat'){
      search_params = {year: selectedYear, 
                       month: selectedMonth}
    }
  
    fetch(Config.API_URL + BT_TOP_TOPIC_ENDPOINT + '?' + new URLSearchParams(search_params)
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
    
    //sample api access only for debugging purposes
    // fetch("http://localhost:3000/23_11.json"
    //   , {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json'
    //     }
    //   }
    // )
    
    .then(function (response) {
      return response.json();
    })
      .then(function (myJson) {
        return data_parser(myJson)
      })
      .then(function (data) {
        console.log(data)
        setAggData(data)
      });
  
  
  
  };
  
  function data_parser(data) {
    // transforms the json from the api endpoint to a matching format for the word-cloud
    let transformed_data = []
    let total = 0
  
    for (var resort_title in data["top_topics"]) {
      let bubble = {}
      bubble["name"] = resort_title
  
      let bubble_list = []

      var value_sum = 0
      for (var element in data["top_topics"][resort_title]) {
        let sub_item = {}
        sub_item["name"] = data["top_topics"][resort_title][element][0]
        sub_item["value"] = data["top_topics"][resort_title][element][1]
        value_sum = value_sum + sub_item["value"]

        bubble_list.push(sub_item)
      }

      bubble["data"] = bubble_list

      bubble["value_sum"] = value_sum
      total += value_sum

      transformed_data.push(bubble)
    }

    setTotalSize(total)

    console.log("transformed_data")
    console.log(transformed_data)

    var values = []
    for (var index in transformed_data) {
        values.push(transformed_data[index].value_sum)
    }
    console.log("values")
    console.log(values)
 
    var min_val = Math.min.apply(Math, values) 
    var max_val = Math.max.apply(Math, values) 


    console.log("min")
    console.log(min_val)
    console.log("max")
    console.log(max_val)


    let new_transformed_data = []
    let max_found = false
    for (var index in transformed_data) {
      let bubble = transformed_data[index]
      bubble["max_value"] = bubble["value_sum"] === max_val && !max_found && max_val != 0
      max_found = bubble["value_sum"] === max_val && !max_found
      bubble["value_sum_raw"] = bubble["value_sum"]
      bubble["value_sum"] = normalize(min_val, max_val, !expertModeActive ? 12 : 25, !expertModeActive ? 28 : 175, bubble["value_sum"])
      console.log("bubble")
      console.log(bubble)
      new_transformed_data.push(bubble)
  }

    return new_transformed_data
  }


  function normalize(min_val, max_val, min_transformed, max_transformed, actual_value){
    return ((actual_value - min_val) / (max_val - min_val))*(max_transformed - min_transformed) + min_transformed
  }
  
  
  //specifies a listener that gets called every time selectedMonth or
  //selectedYear is updated
  useEffect(() => {
    updateSeries(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear, expertModeActive, aggregationLevel]);


  return (
    <div>
      <DenseAppBar displayYear={selectedYear} displayMonth={selectedMonth} aggregationLevel = {aggregationLevel} showDrawer = {() => setDrawerExtented(true)}/>
      <div style={{ padding: 20 }}>
      {expertModeActive ? (
        <CustomCardGrid agg_data= {aggData} totalSize={totalSize}/>
      ) : (
        <CircularCardLayout agg_data= {aggData} aggregationLevel={aggregationLevel}/>
      )}
      </div>
      <TemporaryDrawer drawerExtended = {drawerExtended}
       setDrawerState = { state => setDrawerExtented(state)} 
       setYear = {year => setSelectedYear(year)}
       setMonth = {month => setSelectedMonth(month)}
       setAggregationLevel = {level => setAggregationLevel(level)}
       aggregationLevel = {aggregationLevel}
       year = {selectedYear}
       month = {selectedMonth}
       setExpertModeActive={ level => setExpertModeActive(level)}
       expertModeActive={expertModeActive}/>
       
    </div>
  );
};

export default Home;


