import React from 'react'
import { Provider } from 'react-redux'
import {store} from '../modules/reduxMiddleware'
import { BrowserRouter, Route } from 'react-router-dom'
import '../App.css'
import Home from './Home'

export default function Router() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <Route exact path='/' component={Home}/>
        </Provider>
      </BrowserRouter>
    </div>
  );
}