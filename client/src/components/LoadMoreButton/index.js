import * as React from "react";
import Loader from '../Loader';

import Button from '@mui/material/Button';

const LoadMoreButton = (props) => {
    const {loading, onClick, hasData} = props;

    if (loading)
        return <Loader/>

    const text = hasData ? 'Load More' : 'Load Data';

    return (
        <Button variant="contained" onClick={onClick}>
            {text}
        </Button>
    );
}

export default LoadMoreButton;
