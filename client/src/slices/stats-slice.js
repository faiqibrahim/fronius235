import {createSlice} from '@reduxjs/toolkit'
import moment from 'moment-timezone';

let now = moment().tz('Asia/Karachi');
let day = now.format('YYYY-MM-DD HH:mm:ss');

export const statsSlice = createSlice({
    name: 'stats',
    initialState: {
        currentPower: 0,
        day,
        dayEnergy: 0,
        yearEnergy: 0,
        time: day,
        year: now.format('YYYY')
    },
    reducers: {
        updateStats: (state, {payload}) => {
            Object.keys(payload).forEach(key => {
                state[key] = payload[key];
            })
        },
    },
});

export const {updateStats} = statsSlice.actions
export default statsSlice.reducer
