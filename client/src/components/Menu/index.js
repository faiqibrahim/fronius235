import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LegendToggle from '@mui/icons-material/LegendToggle';
import MailIcon from '@mui/icons-material/Mail';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

const Menu = ({toggleDrawer, open, toggleTheme}) => {
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
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <LegendToggle/> : <MailIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </SwipeableDrawer>
    );
}

export default Menu;
