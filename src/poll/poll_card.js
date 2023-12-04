import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

const PollCard = ({ date, title, result, party, additionalInfo }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card style={{ width: '100%', margin: '0 auto', marginBottom: '1vh' }}>
            <CardContent>
                <Typography variant="body2" color="textSecondary" align="right">
                    {date}
                </Typography>
                <Typography variant="h5" component="div" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body1" color={result === 'accepted' ? 'primary' : 'error'} gutterBottom>
                    Result: {result}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    Proposed by: {party}
                </Typography>
            </CardContent>
            {expanded && (
                <CardContent>
                    <Typography variant="body2" color="textSecondary">
                        {additionalInfo}
                    </Typography>
                </CardContent>
            )}
            <CardActions disableSpacing>
                <Button
                    variant="outlined"
                    color="primary"
                    style={{ marginRight: 'auto', marginLeft: '.5vw', marginBottom: '1vh' }}
                    onClick={() => alert('Read More Clicked')}
                >
                    Read More
                </Button>
                <IconButton
                    style={{ marginLeft: 'auto', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default PollCard;
