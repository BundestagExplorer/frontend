import React, { Component, useState, useRef, useEffect } from 'react';
import DenseAppBar from '../appbar/appbar';
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
    "md": 2.4
  }
]

const Home = () => {

  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState(3);
  const [extendedViewActive, setExtendedViewActive] = useState(false);

  const [drawerExtended, setDrawerExtented] = useState(false);
  const [aggregationLevel, setAggregationLevel] = useState('Monat');

  const [aggData, setAggData] = useState(default_agg_data);


  //// code for updating the values in the grid in response to change in time selection

  const updateSeries = (selectedMonth, selectedYear) => {
  
    fetch(Config.API_URL + BT_TOP_TOPIC_ENDPOINT + '?' + new URLSearchParams({
      month: selectedMonth,
      year: selectedYear
    })
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
  
  
  //specifies a listener that gets called every time selectedMonth or
  //selectedYear is updated
  useEffect(() => {
    updateSeries(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);


  return (
    <div>
      <DenseAppBar displayYear={selectedYear} displayMonth={selectedMonth} aggregationLevel = {aggregationLevel} showDrawer = {() => setDrawerExtented(true)}/>
      <div style={{ padding: 20 }}>
      <CustomCardGrid agg_data= {aggData}/>
      </div>
      <TemporaryDrawer drawerExtended = {drawerExtended}
       setDrawerState = { state => setDrawerExtented(state)} 
       setYear = {year => setSelectedYear(year)}
       setMonth = {month => setSelectedMonth(month)}
       setAggregationLevel = {level => setAggregationLevel(level)}
       aggregationLevel = {aggregationLevel}
       year = {selectedYear}
       month = {selectedMonth}/>
       
    </div>
  );
};

export default Home;


