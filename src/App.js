import logo from './logo.svg';
import './App.css';
import React from 'react';
//import { render } from 'react-dom';
import WordCloud from 'react-d3-cloud';

const data = [
  { text: 'Hallo', value: 400 },
  { text: 'Team!', value: 400 },
  { text: 'BundestagExplorer', value: 400 },
  { text: '#bestesprojekt', value: 400 },
  { text: 'foo bar', value: 400 },
];

function App() {



  //render(<WordCloud data={data} />, document.getElementById('root'));


  return (
    <div className="App">
      <div><WordCloud data={data}/>
</div>
        
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          Hello Worl
        </p>
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

      </header>

    </div>
  );
}

export default App;
