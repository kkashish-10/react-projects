import React from 'react';
import NeonFooter from './Components/Shared/NeonFooter';
import NeonHeader from './Components/Shared/NeonHeader/NeonHeader';
import NeonLeftMenu from './Components/Shared/NeonLeftMenu/components/NeonLeftMenu';
import { leftMenuItemType } from './Components/Shared/NeonLeftMenu/components/models';
import { NeonTheme } from './Components/Theme/NeonTheme';
import { ThemeProvider } from '@emotion/react';
import { Card } from '@mui/material';
import NeonTabControl from './Components/Shared/NeonTabControl/NeonTabControl';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Screens/Dashboard';

function App() {
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [activeTab, setActiveTab] = React.useState<number>(0);
  const leftMenuDataObj = {
    all: [
      {
        id: '1',
        name: 'PowerBI Report',
        menuId: '1',
        path: '/powerbi1',
        info: 'power bi report renderer'
      },
      {
        id: '2',
        name: 'PowerBI Report',
        menuId: '2',
        path: '/powerbi2',
        info: 'power bi report renderer'
      }, {
        id: '3',
        name: 'PowerBI Report',
        menuId: '3',
        path: '/powerbi3',
        info: 'power bi report renderer'
      },
    ],
    bookmarks: [
      {
        id: '1',
        name: 'PowerBI Report',
        menuId: '1',
        path: '/powerbi1',
        info: 'power bi report renderer'
      }
    ]
  }
  const tabControlTabs = {
    1: {
      label: "Tab 1",
      content: <p>This is the content for Tab 1.</p>,
    },
    2: {
      label: "Tab 2",
      content: <p>This is the content for Tab 2.</p>,
    },
    3: {
      label: "Tab 3",
      content: <p>This is the content for Tab 3.</p>,
    },
  };

  const onSearchFieldChange = (event: any) => {
    setSearchValue(event.target.value);
    console.log('Searchvalue: ', searchValue);
  }

  const onClickHandler = (arg0: any) => {
    console.log('event', arg0)
  }

  const onBookmarksChangeHandler = (updatedBookMarksArray: leftMenuItemType[]): boolean => {
    console.log('Bookmarks changed: ', updatedBookMarksArray);
    return true;
  }

  const onTabChangeHandler = (event: any, tabIndex: number) => {
    console.log('Tabchanged to ', tabIndex);
    setActiveTab(tabIndex);
  }

  return (
    <>
      <ThemeProvider theme={NeonTheme}>
        <header className="App-header">
          <NeonHeader
            onSearchFieldChange={onSearchFieldChange}
            userTitle='Kashish'
            buildVersion="DEV"
            AppComponent={<Card />}
            NotificationComponent={<Card />}
            HelpComponent={"https://github.com/kkashish-10"}
            UserComponent={<Card />}
            toggleFullScreenRequired={true}
            IsSearchBarRequired={true}
            NeonTabControl={
              <NeonTabControl
                tabControlTabs={tabControlTabs}
                initiallySelectedTab={activeTab}
                onTabChangeHandler={onTabChangeHandler}
              />}
            NeonLeftMenu={
              <NeonLeftMenu
                data={leftMenuDataObj}
                onClickCallback={onClickHandler}
                pageId="leftMenu"
                onBookmarksChangeCallback={onBookmarksChangeHandler}
                productImage=""
              />}
          />
        </header>
        <footer>
          <NeonFooter />
        </footer>
        {/* <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/powerbi1' element={<Dashboard />} />
        </Routes> */}
      </ThemeProvider>
    </>
  );
}


export default App
