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
    minHeight: '12vh',
    lineHeight: '60px',
}));

const UsageCard = (props) => {
    const {
        to_date, days_span,
        production, production_per_day,
        net_export, net_export_per_day,
        consumed_units, consumed_units_per_day,
        grid_import_units, grid_import_units_per_day,
        direct_solar_units, direct_solar_units_per_day
    } = props;

    const color = net_export > 0 ? 'green' : net_export < 0 ? 'red' : 'text.secondary';

    return (
        <StyledPaper variant="outlined" square sx={{py: 4}}>
            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                After {days_span} days @ {formatDate(to_date)}
            </Typography>

            <Box sx={{display: "grid", gap: 4, gridTemplateColumns: 'repeat(2, 1fr)'}}>
                <Box>
                    <Typography sx={{fontSize: 16, fontWeight: 'bold'}} color="text.secondary">
                        Usage
                    </Typography>

                    <Typography elevation={3} component="div">
                        Production: <b>{`${formatNumber(production)}`}</b>
                    </Typography>

                    <Typography elevation={3} component="div">
                        Used: <b>{`${formatNumber(consumed_units)}`}</b>
                    </Typography>

                    <Typography elevation={3} component="div">
                        From Grid: <b>{`${formatNumber(grid_import_units)}`}</b>
                    </Typography>

                    <Typography elevation={3} component="div">
                        From Solar: <b>{`${formatNumber(direct_solar_units)}`}</b>
                    </Typography>

                    <Typography elevation={3} component="div" sx={{color}}>
                        Net Export: <b>{`${formatNumber(net_export)}`}</b>
                    </Typography>
                </Box>

                <Box>
                    <Typography sx={{fontSize: 16, fontWeight: 'bold'}} color="text.secondary">
                        Avg / Day
                    </Typography>

                    <Typography elevation={3} component="div">
                        Production: <b>{`${formatNumber(production_per_day)}`}</b>
                    </Typography>

                    <Typography elevation={3} component="div">
                        Used: <b>{`${formatNumber(consumed_units_per_day)}`}</b>
                    </Typography>

                    <Typography elevation={3} component="div">
                        From Grid: <b>{`${formatNumber(grid_import_units_per_day)}`}</b>
                    </Typography>

                    <Typography elevation={3} component="div">
                        From Solar: <b>{`${formatNumber(direct_solar_units_per_day)}`}</b>
                    </Typography>

                    <Typography elevation={3} component="div" sx={{color}}>
                        Net Export: <b>{`${formatNumber(net_export_per_day)}`}</b>
                    </Typography>
                </Box>

            </Box>

        </StyledPaper>
    );
}

export default UsageCard;
