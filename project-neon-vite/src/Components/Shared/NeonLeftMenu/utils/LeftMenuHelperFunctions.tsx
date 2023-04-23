import { leftMenuItemType } from '../components/models';
export function findMatchInItem(searchQuery: string,
    leftMenuItemArray: leftMenuItemType[] | undefined): leftMenuItemType[] {
    if (!leftMenuItemArray || leftMenuItemArray.length === 0) {
        return [] as leftMenuItemType[];
    }
    else {
        let result = [] as leftMenuItemType[];
        leftMenuItemArray?.forEach((item) => {
            if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) result.push(item);
            else {
                const searchResultInChildren = findMatchInItem(searchQuery, item.children);
                if (searchResultInChildren.length > 0) result.push(item);
            }

        });
        return result;
    }
}

export function isMenuItemAccessible(item: leftMenuItemType): boolean {
    return true;
}