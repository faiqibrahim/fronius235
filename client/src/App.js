import Box from '@mui/material/Box';
import {CssBaseline} from "@mui/material";
import {useSelector} from 'react-redux'
import {createTheme, styled, ThemeProvider} from '@mui/material/styles';
import TopBar from "./components/TopBar";
import {useState} from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import LiveStats from "./pages/LiveStats";

const Content = styled(Box)(({theme}) => ({
    height: '100vh',
    flexGrow: 1,
}));

const lightTheme = createTheme({palette: {mode: 'light'}});
const darkTheme = createTheme({palette: {mode: 'dark'}});

function App() {
    const stats = useSelector(state => state.stats);
    const [theme, setTheme] = useState(lightTheme);
    const toggleTheme = () => setTheme(theme.palette.mode === 'light' ? darkTheme : lightTheme);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <TopBar toggleTheme={toggleTheme}/>

            <Router>
                <Content>
                    <Switch>
                        <Route path={'/live-stats'}>
                            <LiveStats data={stats}/>
                        </Route>
                        <Redirect to={'/live-stats'} />
                    </Switch>
                </Content>
            </Router>
        </ThemeProvider>
    );
}

export default App;
