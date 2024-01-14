import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from "react-router-dom";

import CustomListText from './customlisttext';

import CustomCard from './custom_card';

import WirtschaftImage from './images/wirtschaftimage.jpg'; // Import using relative path
import FinanzenImage from './images/finanzenimage.jpg'; // Import using relative path


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
                <CustomCard ressort_name={data.name} importance_val={data.value_sum}>
                <Typography variant='h5'>
                {data.name}
                </Typography>
                    

                    <List dense={true} >
                    
                    {data.data.map(topic =>

                    <ListItemButton onClick={handleClicked}>

                        <CustomListText display_text ={topic.name}>

                        </CustomListText>
                    </ListItemButton>
                        
                        )}
                    </List>

                    </CustomCard>
                </Grid>
                )}
        </Grid>
    )
}


