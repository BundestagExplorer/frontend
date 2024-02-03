import React from 'react';
import AfD from '../assets/parties/AFD_logo.png';
import Grüne from '../assets/parties/Grünen_logo.png';
import FDP from '../assets/parties/FDP_logo.png';
import CDUCSU from '../assets/parties/CDUCSU_logo.png';
import fraktionslos from '../assets/parties/fraktionslos_logo.png';
import Linke from '../assets/parties/Linke_logo.png'
import SPD from '../assets/parties/SPD_logo.png';
import { Box } from '@mui/material';

const IconSelectorParty = ({ partyName, style, wh = 40, div = true }) => {
    const getIcon = (partyName) => {
        switch (partyName) {
            case 'AfD':
                return <Box component={"img"} src={AfD} sx={{ width: wh, height: wh, marginRight: 2, marginLeft: 1 }}></Box>;
            case 'B90/Grüne':
                return <Box component={"img"} src={Grüne} sx={{ width: wh, height: wh, marginRight: 2, marginLeft: 1 }}></Box>;
            case 'CDU/CSU':
                return <Box component={"img"} src={CDUCSU} sx={{ width: wh, height: wh, marginRight: 2, marginLeft: 1 }}></Box>;
            case 'FDP':
                return <Box component={"img"} src={FDP} sx={{ width: wh, height: wh, marginRight: 2, marginLeft: 1 }}></Box>;
            case 'fraktionslos':
                return <Box component={"img"} src={fraktionslos} sx={{ width: wh, height: wh, marginRight: 2, marginLeft: 1 }}></Box>;
            case 'Die Linke':
                return <Box component={"img"} src={Linke} sx={{ width: wh, height: wh, marginRight: 2, marginLeft: 1 }}></Box>;
            case 'SPD':
                return <Box component={"img"} src={SPD} sx={{ width: wh, height: wh, marginRight: 2, marginLeft: 1 }}></Box>;
            default:
                return null;
        }
    };

    return (
        div ?
            <div style={style}>
                {getIcon(partyName)}
            </div>
            :
            getIcon(partyName)
    );
};

export default IconSelectorParty;