import React from "react";
import {Routes, Route} from 'react-router-dom'
import { ThemeProvider } from "@emotion/react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline } from "@mui/material";
import { Provider } from 'react-redux';

import store from './store/store'

import Login from "./pages/Login"
import SignUp from "./pages/Signup";
import Layout from "./pages/Layout";
import EntryManagement from "./pages/EntryManagement";
import Dashboard from "./pages/Dashboard";
import NewEntry from "./pages/entries/NewEntry";
import EditEntry from "./pages/entries/EditEntry";
import Profile from "./pages/Profile";
import EntryInfo from "./pages/entries/EntryInfo";

//import Notification  from './components/Notification'


function App() {
  const [theme, colorMode] = useMode();
  //console.log(theme,colorMode);
  // const [notificationBar, setNotificationBar] = useState(false)
  // const handleNotification = () => {
  //   setNotificationBar()
  // }
  return (
    <Provider store={store}>
    <ColorModeContext.Provider value={colorMode} >
      <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<SignUp/>}/>
            <Route path="/" element={<Layout />}>
              <Route path="/register" element={<SignUp/>}/>
              <Route path="/" element={<EntryManagement/>} />
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/entry/new" element={<NewEntry/>} />
              <Route path="/entry/edit/:entryId" element={<EditEntry/>} />
              <Route path="/transaction/:entryId" element={<EntryInfo/>} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/profile-edit" element={<h1>Editable profile page coming soon!</h1>} />
            </Route>
          </Routes>
    </ThemeProvider>
    </ColorModeContext.Provider>
    </Provider>
  );
}

export default App;
