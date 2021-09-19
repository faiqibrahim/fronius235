import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LegendToggle from '@mui/icons-material/LegendToggle';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import BatteryCharging60Icon from '@mui/icons-material/BatteryCharging60';
import PowerInputIcon from '@mui/icons-material/PowerInput';
import {withRouter} from 'react-router-dom';

const menus = [
    {text: 'Current Status', link: '/live-stats', icon: <PowerInputIcon/>},
    {text: 'Production History', link: '/production-history', icon: <QueryStatsIcon/>},
    {text: 'Meter Readings', link: '/meter-readings', icon: <ReadMoreIcon/>},
    {text: 'Usage Stats', link: '/usage-stats', icon: <BatteryCharging60Icon/>}
];

const Menu = ({toggleDrawer, open, toggleTheme, history}) => {

    return (
        <SwipeableDrawer
            anchor={"left"}
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}>
            <Box
                sx={{width: 250}}
                role="presentation"
            >

                <List>
                    {['Toggle Theme'].map((text, index) => (
                        <ListItem button key={text} onClick={toggleTheme}>
                            <ListItemIcon>
                                <LegendToggle/>
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>

                <Divider/>

                <List>
                    {menus.map(({text, link, icon}, index) => (
                        <ListItem button key={text} onClick={() => {
                            history.push(link);
                            toggleDrawer(false)();
                        }}>
                            <ListItemIcon>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </SwipeableDrawer>
    );
}

export default withRouter(Menu);
