import Drawer, { DrawerProps } from '@mui/material/Drawer'
import React from 'react'
import { leftMenuData, leftMenuItemType } from './models';
import { HeaderContext } from '../../NeonHeader/NeonHeader';
import LeftMenuContext from '../utils/LeftMenuContext';
import { findMatchInItem } from '../utils/LeftMenuHelperFunctions';
import { Box, Button, ButtonGroup, ClickAwayListener, Collapse, IconButton, InputAdornment, InputBase, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Stack, SxProps } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';

type Props = Omit<DrawerProps, ""> & {
    data: leftMenuData;
    pageId: string;
    drawerWidth?: number;
    productImage: string;
    onClickCallback(arg0: leftMenuItemType, arg1?: leftMenuItemType[]): void;
    onBookmarksChangeCallback(arg0: leftMenuItemType[]): boolean;
}

const NeonLeftMenu = (props: Props) => {
    const { drawerWidth, data } = props;
    const [defaultWidth, setDefaultWidth] = React.useState<number>(253);
    const [tabName, setTabName] = React.useState("All");
    const [showRecentsTab, setShowRecentsTab] = React.useState<boolean>(false);
    const {
        onClickCallback,
        onBookmarksChangeCallback,
        pageId,
        productImage,
        ...drawerProps
    } = props;
    const [bookmarks, setBookmarks] = React.useState(data.bookmarks);
    const [filteredData, setFilteredData] = React.useState(data);
    const [searchQuery, setSearchQuery] = React.useState("");
    const contextValue = React.useMemo(() => ({
        bookmarks,
        setBookmarks,
        onBookmarksChangeCallback,
        onClickCallback,
    }), [bookmarks, onBookmarksChangeCallback, onClickCallback]
    );


    const[subMenuOpen, setSubMenuOpen] =React.useState(true);

    const handleSubMenuClick= () => {
        setSubMenuOpen(!subMenuOpen);
    }

    const buttonStyles: SxProps = {
    }

    // const listStyles: SxProps = {}


    const { openDrawer, setOpenDrawer } = React.useContext(HeaderContext);
    React.useEffect(() => {
        setShowRecentsTab(Boolean(data.bookmarks || (data.dynamicRecentGroups && data.dynamicRecentGroups.length > 0)));
        if (drawerWidth) setDefaultWidth(drawerWidth);
    }, [data.bookmarks, data.dynamicRecentGroups, drawerWidth, openDrawer]);

    function handleSearch(event: any) {
        const searchText = event.target.value;
        setSearchQuery(searchText);
        if (searchText === "") setFilteredData(data);
        else {
            if (tabName === "All") {
                const filteredData = findMatchInItem(searchText, data.all);
                setFilteredData({ ...data, all: filteredData })
            }
        }
    }

    function handleClickAway() {
        if (setOpenDrawer) setOpenDrawer(false);
    }

    function toggleTab(event: any, tabName: string) {
        setTabName(tabName);
    }


    return (
        <LeftMenuContext.Provider value={contextValue}>
            {
                openDrawer && (
                    <ClickAwayListener onClickAway={handleClickAway}>
                        <Drawer
                            sx={{
                                '&.MuiDrawer-paper': {
                                    width: drawerWidth || defaultWidth,
                                    // boxSizing: 'border-box',
                                },
                            }}
                            className='NeonLeftMenuDrawer'
                            variant='persistent'
                            anchor='left'
                            open={openDrawer}
                            {...drawerProps}
                        >
                            <Stack direction='row' justifyContent='space-between' pb={1}>
                                <Stack direction={'row'} alignItems={'center'} >
                                    <Box> hi
                                    </Box>
                                    <Box> hi</Box>
                                </Stack>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginRight: '1rem'
                                }}>
                                    <IconButton data-testid='menu-icon'
                                        sx={{ color: 'white', margin: '5px' }} >
                                        <MenuIcon />
                                    </IconButton>
                                </Box>
                            </Stack>
                            <InputBase
                                autoFocus={true}
                                value={searchQuery}
                                onChange={(event) => handleSearch(event)}
                                placeholder='Search'
                                sx={{
                                    color: 'rgba(255,255,255,0.33)', backgroundColor: '#4f5283', height: '2.7rem', padding: '0 1rem', marginBottom: '1rem',
                                    borderBottom: '', "& .MuiInputBase-input.MuiFilledInput-input": { padding: 0, },
                                    "&::before": { borderBottom: 'none' },
                                    "&::hover": { color: 'rgba(255,255,255,0.33)', backgroundColor: "#4f5283", "&::before": { borderBottom: 'none' }, },
                                }}
                                startAdornment={<InputAdornment position='start'>
                                    <SearchIcon sx={{ color: 'rgba(255,255,255,0.33)' }} />
                                </InputAdornment>}
                            />
                            {
                                showRecentsTab && (<ButtonGroup size='medium' sx={{ margin: '0 1rem' }} color='inherit' >
                                    <Button fullWidth variant='contained' sx={
                                        tabName === "All" ?
                                            { ...buttonStyles, backgroundColor: '#6d7096' } : { ...buttonStyles }} onClick={(event) => { toggleTab(event, "All"); }}>
                                        All
                                    </Button>
                                    <Button fullWidth variant='contained' sx={
                                        tabName === 'Recent' ?
                                            { ...buttonStyles, backgroundColor: '#6d7096' } : { ...buttonStyles }} onClick={(event) => { toggleTab(event, "Recent"); }}>
                                        Recent
                                    </Button>
                                </ButtonGroup>)}
                            {/* {
                                tabName === 'All' ? (<List sx={listStyles}>
                                    {filteredData.all.map(item => isMenuItemAccessible(item)
                                        && (<ExpandableMenuItem width={defaultWidth} key={item.id} item={item} allItems={filteredData.all} />))}
                                </List>) : (showRecentsTab && (<List sx={listStyles}>
                                    {bookmarks && bookmarks.length > 0 && (<ListWithHeader showDeleteIcon
                                        group={{ header: 'Bookmarks', items: bookmarks || [], }} />)}
                                    {
                                        filteredData.dynamicRecentGroups && filteredData.dynamicRecentGroups.map((item) => (
                                            <ListWithHeader key={item.header} showDeleteIcon={false} group={item} />
                                        ))}
                                </List>))
                            } */}

                            {
                                <List sx={{ width: '100%', maxWidth: drawerWidth, bgcolor: 'background.paper' }}
                                    component={"nav"} aria-labelledby='nested-list-subheader'
                                    // subheader={<ListSubheader component={'div'} id='nested-list-subheader'>
                                    //     Nested List Items
                                    // </ListSubheader>}

                                >
                                    <ListItemButton >
                                        <ListItemIcon>
                                            <SendIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Sent mail" />
                                    </ListItemButton>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <DraftsIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Drafts" />
                                    </ListItemButton>
                                    <ListItemButton onClick={handleSubMenuClick}>
                                        <ListItemIcon>
                                            <InboxIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Inbox" />
                                        {subMenuOpen ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={subMenuOpen} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <ListItemButton sx={{ pl: 4 }}>
                                                <ListItemIcon>
                                                    <StarBorder />
                                                </ListItemIcon>
                                                <ListItemText primary="Starred" />
                                            </ListItemButton>
                                        </List>
                                    </Collapse>
                                </List>
                            }
                        </Drawer>
                    </ClickAwayListener>
                )}
        </LeftMenuContext.Provider>
    )
}

export default NeonLeftMenu;