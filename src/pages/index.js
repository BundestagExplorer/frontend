import React, { Component, useState, useRef, useEffect } from 'react';
import DenseAppBar from '../appbar/appbar';
import CustomCardGrid from '../cardgrid/card_grid';
import TemporaryDrawer from '../drawer/drawer';






var agg_data = 
[
 {extended: false, ressort_name : "Wirtschaft", values : ["value1", "value2", "value3", "value4", "value5"]},
 {extended: false, ressort_name : "Finanzen", values : ["value1", "value2", "value3", "value4", "value5"]},
 {extended: false, ressort_name : "Wirtschaft", values : ["value1", "value2", "value3", "value4", "value5"]},
 {extended: false, ressort_name : "Finanzen", values : ["value1", "value2", "value3", "value4", "value5"]},
 {extended: false, ressort_name : "Wirtschaft", values : ["value1", "value2", "value3", "value4", "value5"]},
 {extended: false, ressort_name : "Finanzen", values : ["value1", "value2", "value3", "value4", "value5"]},
 {extended: false, ressort_name : "Wirtschaft", values : ["value1", "value2", "value3", "value4", "value5"]},
 {extended: false, ressort_name : "Finanzen", values : ["value1", "value2", "value3", "value4", "value5"]},
 {extended: false, ressort_name : "Wirtschaft", values : ["value1", "value2", "value3", "value4", "value5"]},
 {extended: false, ressort_name : "Finanzen", values : ["value1", "value2", "value3", "value4", "value5"]},
 {extended: false, ressort_name : "Wirtschaft", values : ["value1", "value2", "value3", "value4", "value5"]},
 {extended: false, ressort_name : "Finanzen", values : ["value1", "value2", "value3", "value4", "value5"]},
 {extended: false, ressort_name : "Wirtschaft", values : ["value1", "value2", "value3", "value4", "value5"]},
 {extended: false, ressort_name : "Finanzen", values : ["value1", "value2", "value3", "value4", "value5"]},


]

const Home = () => {

  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState(3);
  const [extendedViewActive, setExtendedViewActive] = useState(false);

  const [drawerExtended, setDrawerExtented] = useState(false);
  const [aggregationLevel, setAggregationLevel] = useState('Monat');


  return (
    <div>
      <DenseAppBar displayYear={selectedYear} displayMonth={selectedMonth} aggregationLevel = {aggregationLevel} showDrawer = {() => setDrawerExtented(true)}/>
      <CustomCardGrid agg_data= {agg_data}/>
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


