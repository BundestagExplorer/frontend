import React from 'react';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Home from './components/overview/overview';
import Voting from './components/voting/voting';
import ThemOMeter from './components/themometer/them-o-meter';
import '@fontsource/roboto/400.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#41394B',
        },
        secondary: {
            main: '#ffffff',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route path='/votes' element={<Voting />} />
                    <Route path='/them-o-meter' element={<ThemOMeter />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;