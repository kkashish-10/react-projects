export type leftMenuData = {
    all: leftMenuItemType[];
    bookmarks: leftMenuItemType[];
    dynamicRecentGroups?: leftMenuDynamicItems[];
}

export type leftMenuDynamicItems = {
    header: string;
    items: leftMenuItemType[];
}

export type leftMenuItemType = {
    id: string;
    name: string;
    menuId: string;
    children?: leftMenuItemType[];
    path?: string | URL;
    info?: any;
}