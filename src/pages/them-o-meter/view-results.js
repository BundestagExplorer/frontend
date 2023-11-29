import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';


const rows = [
    createData('Cannabis legalisieren', 'JA', 'NEIN', 'NEIN', 'NEIN'),
    createData('Windkraft ausbauen', 'JA', 'NEIN', 'NEIN', 'NEIN'),
    createData('Islamismus bekämpfen', 'JA', 'NEIN', 'NEIN', 'NEIN'),
    createData('Schulen bauen', 'JA', 'NEIN', 'NEIN', 'NEIN'),
    createData('Etat für Bundeswehr erhöhen', 'JA', 'NEIN', 'NEIN', 'NEIN')
];


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

export default function ViewResults() {

    return (
        <React.Fragment>
            <Typography variant='h4'>Größte Übereinstimmung: Die PARTEI</Typography>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Frage</TableCell>
                            <TableCell align="right">Ihre Antwort</TableCell>
                            <TableCell align="right">CDU</TableCell>
                            <TableCell align="right">SPD</TableCell>
                            <TableCell align="right">Die PARTEI</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );

}