import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {Typography} from "@mui/material";
import {formatNumber} from "../../utils/common-utils";

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

const StatsCard = (props) => {
    const {title, value, unit} = props;

    return (
        <StyledPaper variant="outlined" square>
            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                {title}
            </Typography>

            <Typography variant="h5" elevation={3} component="div">
                {`${formatNumber(value)} ${unit}`}
            </Typography>
        </StyledPaper>
    );
}

export default StatsCard;
