import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {Box, Typography} from "@mui/material";
import {formatDate, formatNumber} from "../../utils/common-utils";

const StyledPaper = styled(Paper)(({theme}) => ({
    ...theme.typography.h3,
    color: theme.palette.text.secondary,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '12vh',
    lineHeight: '60px',
}));

const ReadingCard = (props) => {
    const {reading_date, import_units, export_units, days_span, import_per_day, export_per_day, lastReading} = props;

    const netExport = export_units - import_units;
    const lastNetExport = lastReading ? (lastReading.export_units - lastReading.import_units) : netExport;
    const color = netExport > lastNetExport ? 'green' : netExport < lastNetExport ? 'red' : 'text.secondary';

    return (
        <StyledPaper variant="outlined" square sx={{py: 8}}>
            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                After {days_span} days @ {formatDate(reading_date)}
            </Typography>

            <Box sx={{display: "grid", gap: 4, gridTemplateColumns: 'repeat(2, 1fr)'}}>
                <Box>
                    <Typography sx={{fontSize: 16, fontWeight: 'bold'}} color="text.secondary">
                        Readings
                    </Typography>

                    <Typography elevation={3} component="div">
                        Import: <b>{`${formatNumber(import_units)}`}</b>
                    </Typography>

                    <Typography elevation={3} component="div">
                        Export: <b>{`${formatNumber(export_units)}`}</b>
                    </Typography>
                </Box>

                <Box>
                    <Typography sx={{fontSize: 16, fontWeight: 'bold'}} color="text.secondary">
                        Avg / Day
                    </Typography>

                    <Typography elevation={3} component="div">
                        Import: <b>{`${formatNumber(import_per_day)}`}</b>
                    </Typography>

                    <Typography elevation={3} component="div">
                        Export: <b>{`${formatNumber(export_per_day)}`}</b>
                    </Typography>
                </Box>

            </Box>

            <Typography sx={{fontSize: 16}} color={color} gutterBottom>
                Accumulated Units: <b>{formatNumber(netExport)}</b>
            </Typography>

        </StyledPaper>
    );
}

export default ReadingCard;
