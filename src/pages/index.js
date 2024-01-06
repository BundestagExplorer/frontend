import React, { Component, useState, useRef, useEffect } from 'react';
import DenseAppBar from '../appbar/appbar';
import CustomCardGrid from '../cardgrid/card_grid';
import Drawer from '../drawer/drawer';





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
  const [selectedMonth, setSelectedMonth] = useState(12);
  const [extendedViewActive, setExtendedViewActive] = useState(false);

  const [drawerExtended, setDrawerExtented] = useState(false);


  return (
    <div>
      <DenseAppBar displayYear={selectedYear} displayMonth={selectedMonth} showDrawer = {() => setDrawerExtented(true)}/>
      <CustomCardGrid agg_data= {agg_data}/>
      <Drawer drawerExtended = {drawerExtended} setDrawerState = { state => setDrawerExtented(state)}/>

    </div>
  );
};

export default Home;


