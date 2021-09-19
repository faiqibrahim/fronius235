import {configureStore} from '@reduxjs/toolkit'
import statsSlice from './slices/stats-slice';

export default configureStore({
    reducer: {
        stats: statsSlice
    },
});
