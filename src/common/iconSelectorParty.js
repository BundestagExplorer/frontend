import React from 'react';
import AfD from '../assets/parties/AFD_logo.png';
import Grüne from '../assets/parties/Grünen_logo.png';
import FDP from '../assets/parties/FDP_logo.png';
import CDUCSU from '../assets/parties/CDUCSU_logo.png';
import fraktionslos from '../assets/parties/fraktionslos_logo.png';
import SPD from '../assets/parties/SPD_logo.png';
import { Box } from '@mui/material';

const IconSelectorParty = ({ partyName, style }) => {
    const getIcon = (partyName) => {
        switch (partyName) {
            case 'AfD':
                return <Box component={"img"} src={AfD} sx={{ width: 40, height: 40, marginRight: 2, marginLeft: 1 }}></Box>;
            case 'B90/Grüne':
                return <Box component={"img"} src={Grüne} sx={{ width: 40, height: 40, marginRight: 2 , marginLeft: 1}}></Box>;
            case 'CDU/CSU':
                return <Box component={"img"} src={CDUCSU} sx={{ width: 40, height: 40, marginRight: 2, marginLeft: 1 }}></Box>;
            case 'FDP':
                return <Box component={"img"} src={FDP} sx={{ width: 40, height: 40, marginRight: 2, marginLeft: 1 }}></Box>;
            case 'fraktionslos':
                return <Box component={"img"} src={fraktionslos} sx={{ width: 40, height: 40, marginRight: 2, marginLeft: 1 }}></Box>;
            case 'SPD':
                return <Box component={"img"} src={SPD} sx={{ width: 40, height: 40, marginRight: 2, marginLeft: 1 }}></Box>;
            default:
                return null;
        }
    };

    return (
        <div style={style}>
            {getIcon(partyName)}
        </div>
    );
};

export default IconSelectorParty;