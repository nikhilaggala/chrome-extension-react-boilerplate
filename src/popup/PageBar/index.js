import React, { Component } from 'react';

import classes from './index.css'

import rwLogo from '../../../images/rw-logo-128px.png'

export default class PageBar extends Component {
  render() {
    return (
      <div className={classes.container}>
        <img src={rwLogo} className={classes.logo} alt="readwynk" title="readwynk" />
        <div className={classes.title}>
          readwynk
        </div>
      </div>
    );
  }
}
