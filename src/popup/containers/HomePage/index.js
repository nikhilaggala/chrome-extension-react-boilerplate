import React, { Component } from 'react';

import classes from './index.css'

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: '',
      username: ''
    }
  }

  goToListAction = () => {
    // Safety check, whether cookie exists or not
    chrome.cookies.get(
      { url: 'https://dev.readwynk.com', name: 'mr_auth' },
      (cookie) => {
        if(!cookie) {
          const updatedProperties = {
            url: 'https://dev.readwynk.com/auth/signin',
            active: true
          };

          window.close();
          return chrome.tabs.update(updatedProperties);
        }

        const parsedCookie = JSON.parse(decodeURIComponent(cookie.value));

        // Taking user to list
        const updatedProperties = {
          url: `https://dev.readwynk.com/u/${parsedCookie.username}`,
          active: true
        };

        chrome.tabs.update(updatedProperties);
        window.close();
      }
    );
  }

  renderGoToListBtn = () => {
    return (
      <div className={classes.goToList} onClick={this.goToListAction}>
        Go to lists
      </div>
    );
  }

  render() {
    return (
      <div className={classes.pageContainer}>
        {this.renderGoToListBtn()}
      </div>
    );
  }
}
