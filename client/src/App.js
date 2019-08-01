// npm run dev

import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// auth
import Register from './components/auth/Register';
import FinalPage from './components/auth/FinalPage';
// layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import './App.css';

const App = () =>
<Router>
  <Fragment>
    <Navbar />
    <Route exact path='/' component={Register} />
    <Switch>
      <Route path='/FinalPage' component={FinalPage}/>
    </Switch>
    <Footer />
  </Fragment>
</Router>
  
export default App;
