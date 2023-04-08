import React from 'react'
import { leftMenuItemType } from '../components/models';



const LeftMenuContext = React.createContext({
    bookmarks: [] as leftMenuItemType[],
    // defaultACL: 'Enabled',
    setBookmarks: (obj: leftMenuItemType[]) => { },
    onClickCallback: function (arg0: leftMenuItemType, arg1: leftMenuItemType[]) { },
    onBookmarksChangeCallback: (arg0: leftMenuItemType[]): boolean => { return false; },
});

export default LeftMenuContext;