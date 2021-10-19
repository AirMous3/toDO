import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';

export const Header = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="transparent">
                <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Button href={'/login'} color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
