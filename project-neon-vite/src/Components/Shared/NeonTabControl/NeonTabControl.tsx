/* eslint-disable @typescript-eslint/no-empty-function */
import { useTheme } from "@emotion/react";
import { AppBar, Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
export interface ITabData {
    label: string;
    content: React.ReactNode;
}

export interface NeonTabControlProps {
    tabControlTabs: { [key: string]: ITabData };
    initiallySelectedTab: number;
    onTabChangeHandler?: (event: any, tabIndex: number) => void;
}

export const TabControlContext = React.createContext({
    openDrawer: false, setOpenDrawer: (flag: boolean) => { console.log('drawer flag', flag) }
})

const NeonTabControl: React.FC<NeonTabControlProps> = (props): JSX.Element => {
    const theme = useTheme();
    const { tabControlTabs, initiallySelectedTab, onTabChangeHandler } = props;
    const [value, setValue] = React.useState(initiallySelectedTab);

    const handleChangeTabIndex = (index: number) => {
        setValue(index);
    }
    NeonTabControl.defaultProps = {
        tabControlTabs: {},
        initiallySelectedTab: 2,
        onTabChangeHandler: (event: any, tabIndex: number) => {
            handleChangeTabIndex(tabIndex);
        }
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={props.initiallySelectedTab}
                onChange={props.onTabChangeHandler}
                indicatorColor="secondary"
                textColor="secondary"
                aria-label="tabs"
                centered
            >
                {Object.entries(tabControlTabs).map(([key, data], index) => (
                    <Tab key={key} label={data.label} id={`tab-${index}`} aria-controls={`tabpanel-${index}`} />
                ))}
            </Tabs>
        </Box>
    )
}
export default NeonTabControl