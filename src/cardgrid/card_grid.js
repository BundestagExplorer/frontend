import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from "react-router-dom";
import CustomListText from './customlisttext';
import CustomCard from './custom_card';
import IconSelector from '../common/iconSelector';
import Thermometer from '../thermometer/thermometer';
import MonthlyLineChart from './miniChart';
//import Thermometer from 'react-thermometer-component';


export default function CustomCardGrid({ agg_data, totalSize, miniChartData, selectedMonth, selectedYear, aggregationLevel }) {

    let navigate = useNavigate();
    //Problme mit dem Thermometer
    //1. Thermometer kannn nur daten zwischen 0 - 100 anzeigen
    // --> Verwendung der tatsächlichen Prozentzahlen sieht langweilig aus
    // --> Verwendung von min-max normaliserten Werten denkbar, diese sind aber inkonstisten wenn daneben die tatsächlichen Prozentzahlen angezeigt werden
    //2. Layout noch fixen, insb. sollen die Überschriften der Cards nur eine Zeile belegen, und alle Cards sollen die gleiche Größe haben
    //3. 
    return (

        <Grid container spacing={1}>
            {agg_data.map(data =>

                <Grid item key={data} xs={4} sx={{ position: 'relative', width: '200px' }}>

                    <Card style={{ padding: '0.8vw' }}>
                        {
                            // bubble diasbled
                            //<CustomCard ressort_name={data.name} importance_val={data.value_sum} />
                        }
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
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
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                            <div>

                                <List dense={true} >

                                    {data.data.sort((a, b) => a.value < b.value ? 1 : -1).map(topic =>

                                        <ListItemButton onClick={() => navigate("/votes", { state: { ressort: data.name, slider_data: { agg_level: aggregationLevel, selectedYear: selectedYear, selectedMonth: selectedMonth } } })}>

                                            <CustomListText style={{ alignSelf: "flex-end", position: 'relative' }} display_text={topic.name} value={Math.round(topic.value / totalSize * 10000) / 100}>

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


                        <Typography variant="h6" sx={{ marginTop: '3vw', textAlign: 'center' }}>
                            Zeitliche Entwicklung im Jahr {selectedYear}
                        </Typography>
                        <MonthlyLineChart values={miniChartData[data.name]} selectedMonth={selectedMonth} sx={{ marginTop: 0 }}></MonthlyLineChart>

                    </Card>
                </Grid>
            )}
        </Grid>
    )
}


