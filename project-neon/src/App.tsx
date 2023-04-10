import react from "react";
import Card from "@mui/material/Card";
import NeonFooter from "./Components/Shared/NeonFooter";
import NeonHeader from "./Components/Shared/NeonHeader/NeonHeader";
import NeonLeftMenu from "./Components/Shared/NeonLeftMenu/components/NeonLeftMenu";
import { leftMenuItemType } from "./Components/Shared/NeonLeftMenu/components/models";
import { ThemeProvider } from "@mui/material/styles";
import { NeonTheme } from './Components/Theme/NeonTheme';

function App() {

  const [searchValue, setSearchValue] = react.useState('');
  const leftMenuDataObj = {
    all: [
      {
        id: '1',
        name: 'PowerBI Report',
        menuId: '1',
        path: '/powerbi',
        info: 'power bi report renderer'
      },
    ],
    bookmarks: [
      {
        id: '1',
        name: 'PowerBI Report',
        menuId: '1',
        path: '/powerbi',
        info: 'power bi report renderer'
      }
    ]
  }

  const onSearchFieldChange = (event: any) => {
    setSearchValue(event.target.value);
    console.log('Searchvalue: ', searchValue);
  }

  const onClickHandler = (event: any) => { }

  const onBookmarksChangeHandler = (updatedBookMarksArray: leftMenuItemType[]): boolean => {
    console.log('Bookmarks changed: ', updatedBookMarksArray);
    return true;
  }

  return (
    <div className="App">
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
            NeonTabControl={<div>Kashish</div>}
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
        <div id='kashish'>

          hi this is kashish
        </div>
        <footer>
          <NeonFooter />
        </footer>
      </ThemeProvider>
    </div>
  );
}

export default App;
