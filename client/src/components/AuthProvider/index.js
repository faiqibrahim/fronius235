import Button from "@mui/material/Button";
import {withRouter} from 'react-router-dom';
import {useState} from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import {isAuthorized, prepareBasicAuthToken, saveToken, prepareAxiosOptions} from "../../auth-util";

const AuthProvider = ({text, link, history}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);
    const [formOpen, setFormOpen] = useState(false);

    const resetForm = () => {
        setUsername("");
        setPassword("");
        setLoading(false);
        setError(null);
    }

    const openForm = () => {
        resetForm();
        setFormOpen(true);
    }

    const closeForm = () => {
        setFormOpen(false);
        resetForm();
    }

    const onClick = () => {
        if (isAuthorized())
            history.push(link);
        else
            openForm();
    }


    const authorize = (username, password) => {
        setLoading(true);

        const token = prepareBasicAuthToken(username, password);
        axios.post('/validate-credentials', {}, prepareAxiosOptions(token))
            .then(() => {
                saveToken(token);
                closeForm();
                onClick();
            })
            .catch(error => {
                console.error("Could not validate credentials", error);
                setLoading(false)
                setError(true);
            })
    }

    return (
        <Box>
            <Button color="inherit" onClick={onClick}>{text}</Button>

            <Dialog open={formOpen} onClose={closeForm}>
                <DialogTitle>Enter Admin Credentials</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        To enter meter readings, you need to provide admin credentials.
                    </DialogContentText>

                    {loading ? (
                        <Box sx={{display: 'flex', justifyContent: 'center'}}>
                            <CircularProgress/>
                        </Box>
                    ) : <>
                        <TextField
                            error={error}
                            autoFocus
                            margin="dense"
                            id="username"
                            label="Username"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            error={error}
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </>}
                </DialogContent>

                <DialogActions>
                    <Button onClick={closeForm}>Cancel</Button>
                    <Button onClick={() => authorize(username, password)}>Authorize</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default withRouter(AuthProvider);
