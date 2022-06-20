import React, { useReducer } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {configureStore} from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import "typeface-roboto";
import { Divider } from '@mui/material';



import linksReducer, { sortLinks } from "./features/links";
import Postlink from './Postlink';

const store = configureStore({
  reducer: {
    links: linksReducer,
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <div className='gridFrameWrapper'>
      <header>
        <h1>LinkVote Challenge</h1>
        <Divider></Divider>
        </header>
    <Router>
      <Routes>
        <Route path={'/'} element={<App />} />
        <Route path={'/Postlink'} element={<Postlink />} />
      </Routes>
    </Router>
    </div>
  </Provider>
    
);



