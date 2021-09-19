import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MuiDatePicker from '@mui/lab/DatePicker';

const DatePicker = ({value, onValueChange}) => {

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MuiDatePicker
                margin='dense'
                label="Date"
                value={value}
                onChange={(newValue) => {
                    onValueChange(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
};

export default DatePicker;
