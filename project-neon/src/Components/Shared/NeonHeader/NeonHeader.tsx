import { AppBar, Avatar, Box, ClickAwayListener, Icon, IconButton, Input, InputAdornment, Paper, Popper, Slide, Toolbar, Typography, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import React from 'react';
import AppsIcon from '@mui/icons-material/Apps';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons';
import PersonIcon from '@mui/icons-material/Person';
export interface NeonHeaderProps {
    NeonLeftMenu?: React.ReactElement;
    NeonTabControl?: React.ReactElement;
    onSearchFieldChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    SearchResultComponent?: React.ReactNode;
    AppComponent?: React.ReactNode;
    NotificationComponent?: React.ReactNode;
    UserComponent?: React.ReactNode;
    HelpComponent?: React.ReactNode | string;
    toggleFullScreenRequired?: boolean;
    userTitle?: string;
    buildVersion?: string;
    IsSearchBarRequired?: boolean;
}

export const HeaderContext = React.createContext({
    openDrawer: false, setOpenDrawer: (arg0: boolean) => { },
});

// type Props = {} not required yet

const NeonHeader: React.FC<NeonHeaderProps> = (props): JSX.Element => {
    const {
        NeonTabControl, onSearchFieldChange, SearchResultComponent, AppComponent, NotificationComponent, UserComponent, toggleFullScreenRequired, userTitle, buildVersion, HelpComponent, NeonLeftMenu, IsSearchBarRequired
    } = props;

    NeonHeader.defaultProps = {
        NeonLeftMenu: <></>,
        NeonTabControl: <></>,
        onSearchFieldChange: () => { },
        SearchResultComponent: <></>,
        AppComponent: <></>,
        NotificationComponent: <></>,
        UserComponent: <></>,
        toggleFullScreenRequired: false,
        userTitle: '',
        buildVersion: '',
        HelpComponent: '',
        IsSearchBarRequired: true,
    }

    // const [privilege, setPrivilege] = React.useState('');
    const [anchorElApp, setAnchorElApp] = React.useState<HTMLElement | null>(null);
    const [anchorElNotification, setAnchorElNotification] = React.useState<HTMLElement | null>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<HTMLElement | null>(null);
    const [leftMenuIsOpen, setLeftMenuIsOpen] = React.useState(false);
    const [isSearchBarExpanded, setIsSearchBarExpanded] = React.useState(false);
    const [iconDivWidth, setIconDivWidth] = React.useState(0);
    const [searchValue, setSearchValue] = React.useState('');
    const [searchPopperAnchorEl, setSearchPopperAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    // Privilege state

    const containerRef: React.RefObject<HTMLElement> = React.useRef(null);
    const isLessThan1920 = useMediaQuery('(max0width: 1920px)');
    const isLessThan1600 = useMediaQuery('(max0width: 1600px)');
    const isLessThan1366 = useMediaQuery('(max0width: 1366px)');

    let height = '3.563rem';
    let iconSize = '1.54rem';
    let fullScreenIconSize = '1rem';
    let adjustedSearchWidth = '7rem';
    if (isLessThan1366) {
        height = '2.813rem';
        iconSize = '1.31rem';
        fullScreenIconSize = '1rem';
        adjustedSearchWidth = '6.1rem';
        console.log('>1366');
    }
    else if (isLessThan1600) {
        height = '3.125rem';
        iconSize = '1.31rem';
        fullScreenIconSize = '1rem';
        adjustedSearchWidth = '6rem';
        console.log('>1600');
    }
    else if (isLessThan1920) {
        height = '3.563rem';
        iconSize = '1.54rem';
        fullScreenIconSize = '1rem';
        adjustedSearchWidth = '7rem';
        console.log('>1920');
    }

    React.useEffect(() => {
        console.log('privilege loc2');
    })

    const handleLeftMenu = (flag?: boolean) => {
        flag === true ? setLeftMenuIsOpen(flag) : setLeftMenuIsOpen(!leftMenuIsOpen);
    }

    const handleAppIconClick = (event: any) => { }
    const handleNotificationIconClick = () => { }
    const handleHelpIconClick = () => { }
    const handleUserIconClick = () => { }

    const handleOnClickTextField = () => {
        setIsSearchBarExpanded(true);
    }
    const expandTextField = () => { }

    const clearTextField = () => {
        setSearchValue('');
    }

    const handleSearchDivClose = (event: any) => {
        setSearchPopperAnchorEl(null);
        setIconDivWidth(32);
        if (event.target.type !== 'text') setIsSearchBarExpanded(false);
        clearTextField();
    }

    const handleSearchFieldChange = (event: any) => {
        setSearchPopperAnchorEl(event.currentTarget);
        setSearchValue(event.target.value);
        if (onSearchFieldChange) onSearchFieldChange(event);
        if (event !== undefined && event.target !== undefined && event.target.val !== undefined && event.target.val.trim().length === 0) setSearchPopperAnchorEl(null);
    }

    const getTopSearchBar = () => (IsSearchBarRequired && isSearchBarExpanded
        && (
            <ClickAwayListener onClickAway={handleSearchDivClose}>
                <div style={{ width: '100%', display: 'contents' }}>
                    <Slide direction='left' in={isSearchBarExpanded} mountOnEnter unmountOnExit>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: isSearchBarExpanded ? `calc(100% - ${containerRef.current?.clientWidth !== undefined ? (containerRef.current?.clientWidth * 100) / document.documentElement.clientWidth : 0}px)` : '0vw', }}>
                            <IconButton className='icon' sx={{ m: '0 0.5rem' }}>
                                <SearchIcon sx={{ fontSize: iconSize, color: '#474a73' }} data-testid='search-icon-textfield' onClick={handleSearchDivClose} />
                            </IconButton>
                            <Input
                                disableUnderline
                                autoFocus
                                inputProps={{ 'data-testid': 'text-field' }}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => { if (onSearchFieldChange) handleSearchFieldChange(event); }}
                                className='userDivFont'
                                onClick={handleOnClickTextField}
                                value={searchValue}
                                placeholder='search ...'
                                fullWidth
                                endAdornment={(<InputAdornment position='end' placeholder='Search Filter'>
                                    <Icon data-testid='clear-icon-textfield' component={ClearIcon} onClick={clearTextField} sx={{ color: '#b9b9b9', fontSize: '1.5vw' }} />
                                </InputAdornment>)}
                            ></Input>
                        </Box>
                    </Slide>
                    <Popper open={!!searchPopperAnchorEl} anchorEl={searchPopperAnchorEl} placement='bottom-start'>
                        <Paper data-testid='search-result'
                            sx={{ widht: `calc(80vw- ${containerRef.current?.clientWidth}px + 10vw)`, position: 'fixed', overflow: 'hidden' }}>
                            {SearchResultComponent}
                        </Paper>
                    </Popper>
                </div>
            </ClickAwayListener>
        ));

    const contextMemo = React.useMemo(() => ({ openDrawer: leftMenuIsOpen, setOpenDrawer: (arg0: boolean) => handleLeftMenu(arg0), }), [leftMenuIsOpen]);

    function toggleFullScreen() {
        document.fullscreenElement == null ? document.documentElement.requestFullscreen() : document.exitFullscreen();
    }


    return (
        <>
            <HeaderContext.Provider value={contextMemo}>
                {NeonLeftMenu}
            </HeaderContext.Provider>
            <AppBar sx={{ height }} className='appBar' >
                <Toolbar disableGutters sx={{ height }} className='toolbar'>
                    <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: '20rem' }}>
                        {/* <Box > //component="img" data-testid='logo' height={height} src={'../assets/headerIcon.svg'} alt='logo not provided'> */}
                        <Box>
                            {
                                !isSearchBarExpanded && (<IconButton data-testid='menu-icon' sx={{ color: '#474a73', marginLeft: '5px' }} onClick={() => { handleLeftMenu(); }}>
                                    {/* <FontAwesomeIcon style={{ fontSize: fullScreenIconSize, padding: '2px' }} icon={faBars} /> */}
                                    <MenuIcon />

                                </IconButton>)
                            }
                        </Box>
                        <Box sx={{ display: 'flex', width: isSearchBarExpanded ? 'calc(100vw)' : `calc(100vw -${adjustedSearchWidth})`, justifyContent: 'space-between', alignItems: 'center' }}>
                            {!isSearchBarExpanded && (
                                <Box sx={{ width: '100%', maxWidth: `calc(100% - ${containerRef.current?.clientWidth}px - 2.73rem - ${iconDivWidth}rem)`, marginLeft: '0.2rem' }}>{NeonTabControl} </Box>
                            )} {getTopSearchBar()}
                            <Box
                                sx={{ display: 'flex', alignItems: 'center', }} ref={containerRef}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    {
                                        IsSearchBarRequired && !isSearchBarExpanded && (<IconButton data-testid='search-icon' className='icon' onClick={expandTextField}><SearchIcon sx={{ fontSize: iconSize }} /></IconButton>)
                                    }
                                    {
                                        AppComponent && (<IconButton data-testid='app-icon' className='icon' onClick={handleAppIconClick}><AppsIcon sx={{ fontSize: iconSize }} /> </IconButton>)
                                    }
                                    {
                                        NotificationComponent && (<IconButton data-testid='notification-icon' className='icon' onClick={handleNotificationIconClick}><NotificationsIcon sx={{ fontSize: iconSize }} /></IconButton>)
                                    }
                                    {
                                        HelpComponent && (<IconButton data-testid='help-icon' className='icon' onClick={handleHelpIconClick} sx={{ padding: '0.5rem' }}><HelpIcon sx={{ fontSize: iconSize }} /></IconButton>)
                                    }
                                    {
                                        toggleFullScreenRequired && (<IconButton data-testid='fullscreen-icon' className='icon' onClick={() => { toggleFullScreen(); }}><FontAwesomeIcon style={{ fontSize: fullScreenIconSize, padding: '2px' }} icon={faUpRightAndDownLeftFromCenter} /></IconButton>)
                                    }
                                </Box>

                                <Box data-testid='user-details' sx={{ height, display: 'flex', alignItems: 'center', marginLeft: '7px', justifyContent: 'space-between' }} onClick={handleUserIconClick}>
                                    <Typography sx={{ padding: '0', fontSize: `calc(${iconSize})`, color: '#D8D8D8' }} />
                                    <Box sx={{ display: 'flex', height, gap: '0', padding: '0', alignItems: 'center', margin: '0 0.5vw' }}>
                                        <IconButton data-testid='user-icon' className='icon'><Avatar className='user-icon-avatar'><PersonIcon sx={{ fontSize: iconSize }} /></Avatar> </IconButton>
                                        <Box sx={{ textAlign: 'left', padding: '0.5rem', cursor: 'pointer', gap: '0.5rem' }}>
                                            <Typography className='userDivFont' sx={{ color: 'rgb(15,15,93)', fontWeight: 'normal', marginBottom: '2px' }}>{userTitle}</Typography>
                                            <Box sx={{ bgcolor: '#a0974f', width: 'max-content', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                                                <Box className='userDivFont buildVersionDiv'> {buildVersion}</Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>

                        </Box>
                    </Box>

                </Toolbar>
            </AppBar>

            <Popper open={!!anchorElApp} anchorEl={anchorElApp} placement='bottom-start' >
                <ClickAwayListener onClickAway={(event) => { handleAppIconClick(event); }}><Box>{AppComponent}</Box></ClickAwayListener>
            </Popper>

            <Popper open={!!anchorElNotification} anchorEl={anchorElNotification} placement='bottom-start'>
                <ClickAwayListener onClickAway={handleNotificationIconClick}><Box>{NotificationComponent}</Box></ClickAwayListener>
            </Popper>

            <Popper open={!!anchorElUser} anchorEl={anchorElUser} placement='bottom-start'>
                <ClickAwayListener onClickAway={handleUserIconClick}><Box>{UserComponent}</Box></ClickAwayListener>
            </Popper>
        </>
    )
}

export default NeonHeader