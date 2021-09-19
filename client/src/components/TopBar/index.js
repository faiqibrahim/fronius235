import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from '../Menu';
import {useState} from "react";


const TopBar = ({onButtonClick, toggleTheme}) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && event.key && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setMenuOpen(open);
    };

    return (
        <>
            <Menu open={menuOpen} toggleDrawer={toggleDrawer} toggleTheme={toggleTheme}/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Solar 235-A
                    </Typography>
                    <Button color="inherit" onClick={onButtonClick}>+ Meter Reading</Button>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default TopBar;
