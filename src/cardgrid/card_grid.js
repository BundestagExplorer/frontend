import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from "react-router-dom";

import CustomListText from './customlisttext';

import WirtschaftImage from './images/wirtschaftimage.jpg'; // Import using relative path
import FinanzenImage from './images/finanzenimage.jpg'; // Import using relative path



//ToDo: Display the image based on the currrent card in the CustomCardGrid
var Item = styled(Paper)(({ theme, ressort_name, diameter }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    backgroundImage:  `url(${FinanzenImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    ...theme.typography.body1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: '50%',
    width: 300,
    height: 300

  }));


export default function CustomCardGrid({agg_data, extended}){

    // extended = true
    // if (extended) {
    //     agg_data.splice(6,1,{extended: true, ressort_name : "Themen des Tages", values : ["Sehr", "wichtige", "Themen", "foo", "bar"]})
    // }

    let new_data = agg_data.map(data => {
        var transformed_data = data
        transformed_data.md = 2.4
        if (transformed_data.extended){
            transformed_data.md = 7.2
        }
        return transformed_data
    })


    let navigate = useNavigate();
    function handleClicked() {
        console.log("firstList Clicked");
        navigate("/votes");
    }
    
    
    return(
        <Grid container spacing={1}>
            {agg_data.map( data =>
                
                <Grid item key={data} md={data.md}>
                <Item ressort_name>

                <Typography variant='h5'>
                {data.name}
                </Typography>
                    

                    <List dense={true} diameter={300}>
                    
                    {data.data.map(topic =>

                    <ListItemButton onClick={handleClicked}>
                        {/* <ListItemText>
                            {topic.name}
                        </ListItemText> */}
                        <CustomListText display_text ={topic.name}>

                        </CustomListText>
                    </ListItemButton>
                        
                        )}
                    </List>
                    </Item>
                </Grid>
                )}
        </Grid>
    )
}


