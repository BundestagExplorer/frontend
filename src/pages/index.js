import React from 'react';
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
 {extended: false,ressort_name : "Finanzen", values : ["value1", "value2", "value3", "value4", "value5"]},


]

const Home = () => {
  return (
    <div>
      <DenseAppBar></DenseAppBar>
      <CustomCardGrid agg_data= {agg_data}/>

    </div>
  );
};

export default Home;


