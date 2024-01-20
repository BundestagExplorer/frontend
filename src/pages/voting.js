import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PollCard from '../poll/poll_card';
import DetailView from '../poll/poll_detail_view';
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, Typography } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Config } from '../config';
import { useEffect } from 'react';
import { dachzeileToRessort } from '../common/dachzeileToRessort';
import TemporaryDrawer from '../drawer/drawer';
import DenseAppBar from '../appbar/appbar';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const BT_ABSTIMMUNGEN_ENDPOINT = 'abstimmung/';


const Voting = () => {

    const [votingData, setVotingData] = useState([[]]);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);

    const [drawerExtended, setDrawerExtented] = useState(false);

    const [aggregationLevel, setAggregationLevel] = useState('Monat');

    const [sortBy, setSortBy] = useState('Datum');
    const [sortOrder, setSortOrder] = useState('desc');

    const sortOptions = ["Datum", "Resultat", "Resort", "Stimmen: Ja", "Stimmen: Nein", "Stimmen: Neutral", "Stimmen: Nicht abgegeben"]
    const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
    const [detailViewData, setDetailViewData] = useState([{"fraktion" : "Keine Daten", "ja" : 0, "nein" : 0, "enthalten": 0, "nicht_abgegeben" : 0}])

    const openDetailView = (parties) => {
        setIsDetailViewOpen(true);
        parties && setDetailViewData(parties)
    };

    const closeDetailView = () => {
        setIsDetailViewOpen(false);
    };

    const convertToResort = (dachzeile) => {
        return dachzeileToRessort[dachzeile] ? dachzeileToRessort[dachzeile] : 'keine Zuordnung'
    }

    const getVotingData = async (selectedMonth, selectedYear) => {
        //use padded month, as database needs leading zero
        const paddedMonth = String(selectedMonth).padStart(2, '0');
        //get the correct date of the last day in the month
        const lastDayOfMonth = new Date(selectedYear, selectedMonth, 0).getDate();

        const date_min = aggregationLevel === "Jahr" ? selectedYear + "-01-01" : selectedYear + "-" + paddedMonth + "-01"
        const date_max = aggregationLevel === "Jahr" ? selectedYear + "-12-31" : selectedYear + "-" + paddedMonth + "-" + lastDayOfMonth

        await fetch(Config.API_URL + BT_ABSTIMMUNGEN_ENDPOINT + '?' + new URLSearchParams({
            limit: 300,
            date_min: date_min,
            date_max: date_max
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
                    parties: item.fraktionen,
                    additionalInfo: "abstract" in item ? item.abstract : 'No abstract',
                    category: "dachzeile" in item ? convertToResort(item.dachzeile) : 'keine Zuordnung',
                }
            }).sort(
                (a, b) => new Date(b.date) - new Date(a.date)
            )
        }).then(function (data) {
            setVotingData(data)
            //console.log(data.filter((elem) => { return elem.title === "Deutsch-französisches Parlamentsabkommen" }))
        });
    }

    useEffect(() => {
        getVotingData(selectedMonth, selectedYear)
    }, [selectedMonth, selectedYear, aggregationLevel])

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

    const sortFunc = (a, b) => {
        switch (sortBy) {
            case "Datum":
                const d1 = Date.parse(a.date)
                const d2 = Date.parse(b.date)
                return d1 < d2 ? -1 : (d1 > d2 ? 1 : 0)
            case "Resultat":
                const r1 = a.yesResult > a.noResult
                const r2 = b.yesResult > b.noResult
                return r1 && !r2 ? 1 : (!r1 && r2 ? -1 : 0)
            case "Resort":
                return a.category.localeCompare(b.category)
            case "Stimmen: Ja":
                return a.yesResult < b.yesResult ? -1 : (a.yesResult > b.yesResult ? 1 : 0)
            case "Stimmen: Nein":
                return a.noResult < b.noResult ? -1 : (a.noResult > b.noResult ? 1 : 0)
            case "Stimmen: Neutral":
                return a.neutralResult < b.neutralResult ? -1 : (a.neutralResult > b.neutralResult ? 1 : 0)
            case "Stimmen: Nicht abgegeben":
                return a.notResult < b.notResult ? -1 : (a.notResult > b.notResult ? 1 : 0)
            default:
                return 0
        }
    }

    const filteredVotingData = selectedCategories.length
        ? votingData.filter((item) => selectedCategories.includes(item.category)).sort(sortFunc)
        : votingData.sort(sortFunc);

    const handleSortChange = (event) => {
        const selectedField = event ? event.target.value : sortBy;
        setSortBy(selectedField);
    };

    const handleSortOrderChange = () => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    }

    return (
        <div>
            <DenseAppBar displayYear={selectedYear} displayMonth={selectedMonth} aggregationLevel={aggregationLevel} showDrawer={() => setDrawerExtented(true)} />
            <div style={{ maxWidth: '80%', margin: '0 auto', padding: '2vh' }} >
                <h1>Abstimmungen im Bundestag</h1>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {/* Category filter accordion */}
                    < Accordion style={{ marginBottom: '2vh', width: '87%' }} expanded={expanded} onChange={handleAccordionChange} >
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
                                    <label key={category} style={{ margin: '0.5vh 1vw', flex: '0 0 22%' }}>
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
                    <FormControl style={{ marginBottom: '2vh', marginLeft: '1%', width: '7%', height: '100%' }}>
                        <InputLabel id="sort-label">Sortieren</InputLabel>
                        <Select
                            labelId="sort-label"
                            id="sort-select"
                            value={sortBy}
                            label="Sortieren"
                            onChange={handleSortChange}
                        >
                            {sortOptions.map((field) => (
                                <MenuItem key={field} value={field}>
                                    {field}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        variant="outlined"
                        style={{ padding: '1.5vh', height: '100%', marginLeft: '1%' }}
                        onClick={handleSortOrderChange}>
                        {sortOrder === "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                    </Button>
                </div>
                {/* Display filtered voting cards */}
                {
                    (sortOrder === "asc" ? filteredVotingData : filteredVotingData.reverse()).map((item) => (
                        <PollCard
                            key={item.id}
                            date={item.date}
                            title={item.title}
                            result={item.result}
                            yesVotes={item.yesResult}
                            noVotes={item.noResult}
                            neutralVotes={item.neutralResult}
                            notVoted={item.notResult}
                            parties={item.parties}
                            additionalInfo={item.additionalInfo}
                            category={item.category}
                            openDetailView={openDetailView}
                        />
                    ))
                }
            </div >
            <DetailView open={isDetailViewOpen} onClose={closeDetailView} data={detailViewData}/>
            <TemporaryDrawer drawerExtended={drawerExtended}
                setDrawerState={state => setDrawerExtented(state)}
                setYear={year => setSelectedYear(year)}
                setMonth={month => setSelectedMonth(month)}
                setAggregationLevel={level => setAggregationLevel(level)}
                aggregationLevel={aggregationLevel}
                year={selectedYear}
                month={selectedMonth}
                setExpertModeActive={null}
                expertModeActive={null}
                minYear={2009} />
        </div>
    );
};

export default Voting;
