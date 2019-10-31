import React from 'react';
import ReactDOM from 'react-dom';
// import Router, { Link, goBack } from 'route-lite';

import AppRoot from './AppRoot';
import PageBar from './PageBar';
import Footer from './Footer';

import classes from '../styles/app.css'

const render = (Component) => {
  console.log('Comp', Component);
  ReactDOM.render(
    <div className={classes.appContainer}>
      <PageBar />
      <Component />
      <Footer />
    </div>,
    document.getElementById('app-root')
  );
}

render(AppRoot)
