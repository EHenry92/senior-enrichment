'use strict'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
import Root from './components/Root'

import NavBar from './components/Navbar';
import Student from './components/Students';
import Campuses from './components/Campuses';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


render(
    <Provider store={store}>
      <Router>
        <div id="main">
          <div className="col-xs-2">
            <NavBar />
          </div>
          <div className="col-xs-10">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/students" component={Student} />
              <Route path="/campuses" component={Campuses} />
              <Route component={Home} />
            </Switch>
            </div>
            </div>
    </Router>
    </Provider>
  ,
  document.getElementById('main')
)
