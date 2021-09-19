import * as React from 'react';
import {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import Box from '@mui/material/Box';
import {isAuthorized, prepareAxiosOptions} from "../../auth-util";
import TextField from "@mui/material/TextField";
import DatePicker from "../../components/DatePicker";
import Typography from "@mui/material/Typography";
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import Alert from "../../components/Alert";

const MeterReadingInput = (props) => {

    useEffect(() => {
        if (!isAuthorized()) {
            props.history.push('/');
        }
    });

    const [importUnits, setImportUnits] = useState("");
    const [exportUnits, setExportUnits] = useState("");
    const [date, setDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMsgOpen, setSuccessMsgOpen] = useState(false);
    const [error, setError] = useState(false);

    const reset = () => {
        setImportUnits("");
        setExportUnits("");
        setDate(null);
        setLoading(false);
    }

    const closeSuccessMsg = () => {
        setSuccessMsgOpen(false);
    }

    const closeErrorMsg = () => {
        setError(false);
    }


    const submitMeterReading = (date, importUnits, exportUnits) => {
        if (date && importUnits && exportUnits) {
            setLoading(true);
            axios.post('/meter-reading', {
                reading_date: date.toISOString(),
                import_units: +importUnits,
                export_units: +exportUnits
            }, prepareAxiosOptions())
                .then(() => {
                    reset();
                    setSuccessMsgOpen(true);
                })
                .catch(error => {
                    console.error("Could not save meter-reading", error);
                    setLoading(false);
                    setError(true);
                })
        }
    }

    return (
        <Box sx={{padding: 2}}>
            <Snackbar open={successMsgOpen} autoHideDuration={6000} onClose={closeSuccessMsg}>
                <Alert onClose={closeSuccessMsg} severity="success" sx={{width: '100%'}}>
                    Reading noted successfully.
                </Alert>
            </Snackbar>

            <Snackbar open={error} autoHideDuration={6000} onClose={closeErrorMsg}>
                <Alert onClose={closeErrorMsg} severity="error" sx={{width: '100%'}}>
                    Could not save Meter Reading.
                </Alert>
            </Snackbar>

            <Typography variant="h5" elevation={3} component="div" gutterBottom>
                Enter Meter Reading
            </Typography>

            <DatePicker value={date} onValueChange={setDate}/>
            <TextField
                autoFocus
                margin="dense"
                id="importUnits"
                label="Import Units"
                type="number"
                fullWidth
                variant="standard"
                value={importUnits}
                onChange={(e) => setImportUnits(e.target.value)}
            />
            <TextField
                autoFocus
                margin="dense"
                id="exportUnits"
                label="Export Units"
                type="number"
                fullWidth
                variant="standard"
                value={exportUnits}
                onChange={(e) => setExportUnits(e.target.value)}
            />

            <LoadingButton sx={{mt: 4}}
                           loading={loading}
                           variant="contained"
                           loadingPosition="start"
                           startIcon={<SendIcon/>}
                           onClick={() => submitMeterReading(date, importUnits, exportUnits)}
            >
                Submit
            </LoadingButton>
        </Box>
    );
};

export default withRouter(MeterReadingInput);
