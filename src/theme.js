import { createTheme } from '@mui/material/styles';
const themeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#433C4D',
        },
        secondary: {
            main: '#f50057',
        },
    },
};

export const theme = createTheme(themeOptions);
