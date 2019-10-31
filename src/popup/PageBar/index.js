import React, { Component } from 'react';
import Switch from "react-switch";

import classes from './index.css'

import rwLogo from '../../../images/rw-logo-128px.png'
import moon from '../../../images/moon.svg'

export default class PageBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: true,
      theme: 'dark'
    };
  }

  handleChange = (checked) => {
    console.log('checked', checked);

    const { theme } = this.state;

    if (checked) {
      return this.setState({
        checked,
        theme: 'dark'
      }, () => {
        document.documentElement.setAttribute('data-theme', 'dark');
      });
    } else {
      console.log('Came into else', checked, theme);

      return this.setState({
        checked,
        theme: 'light'
      }, () => {
        document.documentElement.setAttribute('data-theme', 'light');
      });
    }

  }

  render() {
    return (
      <div className={classes.container}>
        <div className={classes.logoContainer}>
          <img src={rwLogo} className={classes.logo} alt="readwynk" title="readwynk" />
          <div className={classes.title}>
            readwynk
          </div>
        </div>
        <Switch
          checked={this.state.checked}
          height={24}
          width={50}
          handleDiameter={20}
          onColor="#000"
          className={classes.toggleSwitch}

          onChange={this.handleChange}
        />
      </div>
    );
  }
}
