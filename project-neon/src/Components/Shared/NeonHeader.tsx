import { AppBar, Box, ClickAwayListener, Icon, IconButton, Input, InputAdornment, Paper, Popper, Slide, Toolbar, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';


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

type Props = {}

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

    const handleOnClickTextField = () => {
        setIsSearchBarExpanded(true);
    }

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
    return (
        <>
            <HeaderContext.Provider value={contextMemo}>
                {NeonLeftMenu}
            </HeaderContext.Provider>
            <AppBar sx={{ height }} className='appBar'>
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
                        </Box>
                    </Box>

                </Toolbar>
            </AppBar>
        </>
    )
}

export default NeonHeader