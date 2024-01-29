import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from "react-router-dom";
import CustomListText from './customlisttext';
import CustomCard from './custom_card';
import IconSelector from '../common/iconSelector';
import MonthlyLineChart from './miniChart';
import Thermometer from 'react-thermometer-component';


export default function CustomCardGrid({ agg_data, totalSize, miniChartData, selectedMonth, selectedYear, aggregationLevel }) {

    let navigate = useNavigate();

    return (

        <Grid container spacing={1}>
            {agg_data.map(data =>

                <Grid item key={data} xs={4} sx={{ position: 'relative', width: '200px' }}>

                    <Card style={{ padding: '0.8vw' }}>
                        {
                            // bubble diasbled
                            //<CustomCard ressort_name={data.name} importance_val={data.value_sum} />
                        }
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                            <div>
                                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '1vw' }}>
                                    <IconSelector iconName={data.name} style={{ margin: '0.2vw' }} />
                                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '0.1vw', marginRight: '0.1vw' }}>
                                        <Typography
                                            variant='h5'
                                            sx={{ position: 'relative' }}
                                            onClick={() => navigate("/votes", { state: { ressort: data.name, slider_data: { agg_level: aggregationLevel, selectedYear: selectedYear, selectedMonth: selectedMonth } } })}
                                            style={{ cursor: 'pointer', marginLeft: '0.3 vw' }}>
                                            {data.name}     ({Math.round(data.value_sum_raw / totalSize * 10000) / 100}%)
                                        </Typography>
                                        {/* <ListItemText style={{ alignSelf: "flex-end", position: 'absolute', right: 15 }}>{Math.round(data.value_sum_raw / totalSize * 10000) / 100}%</ListItemText> */}
                                    </div>
                                </div>
                                <List dense={true} >

                                    {data.data.sort((a, b) => a.value < b.value ? 1 : -1).map(topic =>

                                        <ListItemButton onClick={() => navigate("/votes", { state: { ressort: data.name, slider_data: { agg_level: aggregationLevel, selectedYear: selectedYear, selectedMonth: selectedMonth } } })}>

                                            <CustomListText style={{ alignSelf: "flex-end", position: 'relative'}} display_text={topic.name} value={Math.round(topic.value / totalSize * 10000) / 100}>

                                            </CustomListText>
                                        </ListItemButton>

                                    )}
                                </List>
                            </div>
                            <Box style={{ alignSelf: "flex-end", position: 'absolute', right: 15 }}>
                            <Thermometer
                                
                                theme="light"
                                value={Math.round(data.value_sum)}
                                max="100"
                                steps="1"
                                format="° Trending"
                                size="normal"
                                height="200"
                            />
                            </Box>
                        </Box>


                        {/* <Typography variant="h6" sx={{ marginTop: '1vw', textAlign: 'center' }}>
                            Zeitliche Entwicklung im Jahr Test{selectedYear}
                        </Typography>
                        <MonthlyLineChart values ={miniChartData[data.name]} selectedMonth={selectedMonth}></MonthlyLineChart> */}

                    </Card>
                </Grid>
            )}
        </Grid>
    )
}


