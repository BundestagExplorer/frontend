import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { List, ListItemButton } from '@mui/material';
import { useNavigate } from "react-router-dom";

import CustomListText from './customlisttext';

import CustomCard from './custom_card';

import WirtschaftImage from './images/wirtschaftimage.jpg'; // Import using relative path
import FinanzenImage from './images/finanzenimage.jpg'; // Import using relative path


export default function CustomCardGrid({ agg_data, extended }) {

    // extended = true
    // if (extended) {
    //     agg_data.splice(6,1,{extended: true, ressort_name : "Themen des Tages", values : ["Sehr", "wichtige", "Themen", "foo", "bar"]})
    // }

    let new_data = agg_data.map(data => {
        var transformed_data = data
        transformed_data.md = 2.4
        if (transformed_data.extended) {
            transformed_data.md = 7.2
        }
        return transformed_data
    })


    let navigate = useNavigate();


    return (
        <Grid container spacing={1}>
            {agg_data.map(data =>

                <Grid item key={data} md={data.md} sx={{ position: 'relative', width: '200px' }}>
                    <Card style={{padding: '0.8vw'}}>
                        <CustomCard ressort_name={data.name} importance_val={data.value_sum} />

                        <Typography 
                            variant='h5' 
                            sx={{ position: 'relative' }}
                            onClick={() => navigate("/votes", { state: { ressort: data.name } })}
                            style={{cursor: 'pointer'}}>
                            {data.name}
                        </Typography>


                        <List dense={true} >

                            {data.data.map(topic =>

                                <ListItemButton onClick={() => navigate("/votes", { state: { ressort: data.name } })}>

                                    <CustomListText display_text={topic.name}>

                                    </CustomListText>
                                </ListItemButton>

                            )}
                        </List>
                    </Card>
                </Grid>
            )}
        </Grid>
    )
}


