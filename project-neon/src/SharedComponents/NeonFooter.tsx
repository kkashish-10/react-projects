import { Box, AppBar, Toolbar, Typography } from '@mui/material'

type Props = {}

const NeonFooter = (props: Props) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" color='primary' sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar >
                    <Typography variant="h6" color="inherit" noWrap>
                        © Neon 2023
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NeonFooter