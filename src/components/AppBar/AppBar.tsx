import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/redux/store";
import {logOutThunk} from "../../state/redux/loggin-Reducer";

export const Header = () => {

    const isLoggedIn = useSelector((state: AppRootStateType) => state.loggin.isLogged)
    const dispatch = useDispatch()
    const logOutHandler = () => dispatch(logOutThunk())

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" color="transparent">
                <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    {isLoggedIn ? <Button onClick={() => logOutHandler()} color="inherit">logOut</Button> :
                        <Button href={'/login'} color="inherit">login</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
