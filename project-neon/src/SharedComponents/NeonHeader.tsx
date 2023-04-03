import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import VpnKeyIcon from '@mui/icons-material/VpnKeyOff';
import NeonLeftMenu from './NeonLeftMenu';
import { useState } from 'react';
type Props = {}

// const drawerWidth = 240;


const NeonHeader = (props: Props) => {
    const [leftMenuFlag, setLeftMenuFlag] = useState(false)
    const onClickHandler = (e: any) => {
        console.log("inside onClickHandler ", e);
        setLeftMenuFlag(!leftMenuFlag);
        console.log(leftMenuFlag);
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color='primary'>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={onClickHandler}
                    >
                        <MenuIcon />
                        <NeonLeftMenu isOpen={leftMenuFlag} />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    <Button color="inherit">
                        <VpnKeyIcon />

                    </Button>
                </Toolbar>
            </AppBar>
        </Box>

    )
}

export default NeonHeader