import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PollCard from '../poll/poll_card';
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Config } from '../config';
import { useEffect } from 'react';

const BT_ABSTIMMUNGEN_ENDPOINT = 'abstimmung/';
const categoryMapPath = '/data/dachzeileToTopics.json'


const Voting = () => {

    const [votingData, setVotingData] = useState([[]])
    const [categoryMap, setCategoryMap] = useState({});

    const getVotingData = async () => {
        fetch(Config.API_URL + BT_ABSTIMMUNGEN_ENDPOINT + '?' + new URLSearchParams({
            limit: 380,
            /*date_min: '2023-01-01',
            date_max: '2023-12-31'*/
        })
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        ).then(function (response) {
            return response.json();
        }).then(function (abstimmungJson) {
            return abstimmungJson.map((item) => {
                return {
                    id: item.id,
                    date: item.abstimmung_date,
                    title: item.titel,
                    yesResult: item.ja,
                    noResult: item.nein,
                    neutralResult: item.enthalten,
                    notResult: item.nicht_abgegeben,
                    result: item.ja > item.nein ? 'accepted' : 'rejected',
                    party: 'Nothing',  // TODO: Add initiative partie(s) => item.initiative
                    additionalInfo: "abstract" in item ? item.abstract : 'No abstract',
                    category: "dachzeile" in item ? categoryMap[item.dachzeile] : 'keine Zuordnung',
                }
            }).sort(
                (a, b) => new Date(b.date) - new Date(a.date)
            )
        }).then(function (data) {
            setVotingData(data)
            //console.log(data.filter( (elem) => { return elem.title === "Bundeswehreinsatz im Irak"}))
        });
    }

    const fetchCategoryMap = async () => {
        try {
          const response = await fetch(categoryMapPath);
          const jsonData = await response.json();
          setCategoryMap(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
          await fetchCategoryMap();
        };
    
        fetchData();
    }, []);
    
    useEffect(() => {
        getVotingData();
    }, [categoryMap]);

    const { state } = useLocation();
    const { ressort } = state ? state : ""; // Read values passed on state
    const initialSelectedCategories = ressort ? [ressort] : [];
    const [selectedCategories, setSelectedCategories] = useState(initialSelectedCategories);
    const [expanded, setExpanded] = useState(false);

    const handleCategoryToggle = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const handleAccordionChange = () => {
        setExpanded(!expanded);
    };




    const filteredVotingData = selectedCategories.length
        ? votingData.filter((item) => selectedCategories.includes(item.category))
        : votingData;

    return (
        <div style={{ maxWidth: '80%', margin: '0 auto', padding: '2vh' }} >
            <h1>Abstimmungen im Bundestag</h1>

            {/* Category filter accordion */}
            < Accordion style={{ marginBottom: '2vh' }} expanded={expanded} onChange={handleAccordionChange} >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Filter</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {votingData.reduce((categories, item) => {
                            if (!categories.includes(item.category)) {
                                categories.push(item.category);
                            }
                            return categories;
                        }, []).sort().map((category) => (
                            <label key={category} style={{ margin: '0.5vh 1vw', flex: '0 0 20%' }}>
                                <Checkbox
                                    checked={selectedCategories.includes(category)}
                                    onChange={() => handleCategoryToggle(category)}
                                />
                                {category}
                            </label>
                        ))}
                    </div>
                </AccordionDetails>
            </Accordion >

            {/* Display filtered voting cards */}
            {
                filteredVotingData.map((item) => (
                    <PollCard
                        key={item.id}
                        date={item.date}
                        title={item.title}
                        result={item.result}
                        yesVotes={item.yesResult}
                        noVotes={item.noResult}
                        neutralVotes={item.neutralResult}
                        notVoted={item.notResult}
                        party={item.party}
                        additionalInfo={item.additionalInfo}
                        category={item.category}
                    />
                ))
            }
        </div >
    );
};

export default Voting;
