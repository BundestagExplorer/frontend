import React from 'react';
import DenseAppBar from '../appbar/appbar';
import CircularCardLayout from '../cardLayout/circular_layout';
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
 {extended: false,ressort_name : "Finanzen", values : ["value1", "value2", "value3", "value4", "value5"]},


]

const Home = () => {
  return (
    <div>
      <DenseAppBar></DenseAppBar>
      <CircularCardLayout agg_data= {agg_data}/>

    </div>
  );
};

export default Home;


