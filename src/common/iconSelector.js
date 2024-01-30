import React from 'react';
import { Factory, AttachMoney, LocalPolice, Public, Balance, Work, MilitaryTech, Agriculture, FamilyRestroom, HealthAndSafety, Commute, Park, School, Diversity3, Home } from '@mui/icons-material';

const IconSelector = ({ iconName, style, div = true }) => {
    const getIcon = (iconName) => {
        switch (iconName) {
            case 'Wirtschaft':
                return <Factory />;
            case 'Finanzen':
                return <AttachMoney />;
            case 'Innenpolitik':
                return <LocalPolice />;
            case 'Außenpolitik':
                return <Public />;
            case 'Justiz':
                return <Balance />;
            case 'Arbeit':
                return <Work />;
            case 'Verteidigung':
                return <MilitaryTech />;
            case 'Landwirtschaft':
                return <Agriculture />;
            case 'Familie':
                return <FamilyRestroom />;
            case 'Gesundheit':
                return <HealthAndSafety />;
            case 'Verkehr und Digitalisierung':
                return <Commute />;
            case 'Umwelt':
                return <Park />;
            case 'Bildung und Forschung':
                return <School />;
            case 'Entwicklung':
                return <Diversity3 />;
            case 'Wohnungsbau':
                return <Home />;
            default:
                return null;
        }
    };

    return (
        div ?
            <div style={style}>
                {getIcon(iconName)}
            </div>
            :
            getIcon(iconName)
    );
};

export default IconSelector;