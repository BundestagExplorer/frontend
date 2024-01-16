import React from 'react';
import Navbar from './navbar';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Home from './pages';
import Voting from './pages/voting';
import ThemOMeter from './themometer/them-o-meter';
import '@fontsource/roboto/400.css';
import { useTheme, ThemeProvider } from '@mui/material'
import { theme } from './theme';



function App() {
    useTheme(theme);
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