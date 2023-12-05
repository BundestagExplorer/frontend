import React, { useState } from 'react';
import PollCard from '../poll/poll_card';
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Voting = () => {
    const [selectedCategories, setSelectedCategories] = useState([]);
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

    const votingData = [
        {
            id: 1,
            date: '2023-12-04',
            title: 'Electoral Voting Title',
            result: 'accepted',
            party: 'Example Party',
            additionalInfo: 'Additional information about the voting...',
            category: 'Finance',
        },
        {
            id: 2,
            date: '2023-12-04',
            title: 'Another Voting Title',
            result: 'rejected',
            party: 'Another Party',
            additionalInfo: 'More details about the voting...',
            category: 'Inner politics',
        },
    ];

    const filteredVotingData = selectedCategories.length
        ? votingData.filter((item) => selectedCategories.includes(item.category))
        : votingData;

    return (
        <div style={{ maxWidth: '80%', margin: '0 auto', padding: '2vh' }}>
            <h1>Welcome to the Voting page</h1>

            {/* Category filter accordion */}
            <Accordion style={{ marginBottom: '2vh'}} expanded={expanded} onChange={handleAccordionChange}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Filter by Category</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {votingData.reduce((categories, item) => {
                            if (!categories.includes(item.category)) {
                                categories.push(item.category);
                            }
                            return categories;
                        }, []).map((category) => (
                            <label key={category} style={{ margin: '0.5vh 0' }}>
                                <Checkbox
                                    checked={selectedCategories.includes(category)}
                                    onChange={() => handleCategoryToggle(category)}
                                />
                                {category}
                            </label>
                        ))}
                    </div>
                </AccordionDetails>
            </Accordion>

            {/* Display filtered voting cards */}
            {filteredVotingData.map((item) => (
                <PollCard
                    key={item.id}
                    date={item.date}
                    title={item.title}
                    result={item.result}
                    party={item.party}
                    additionalInfo={item.additionalInfo}
                    category={item.category}
                />
            ))}
        </div>
    );
};

export default Voting;
