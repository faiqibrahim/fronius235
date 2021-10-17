import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = (props) => {

    return (
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', ...props.style}}>
            <CircularProgress/>
        </Box>
    );
}

export default Loader;
