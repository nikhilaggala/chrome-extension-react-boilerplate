import React, { Component } from 'react';

import classes from './index.css'

export default class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      accessToken: '',
      displayName: '',
      avatar: 'https://media.mojoreads.com/120x120/2b77935b-cb1e-4396-8eb5-925a07202009.png'
    }
  }

  componentDidMount() {
    const query = `query getProfile {
      profile {
        username
        displayName
        avatar {
          baseUrl
          key
        }
      }
    }`;

    // Getting access token and storing it in data props
    chrome.cookies.get(
      { url: 'https://dev.readwynk.com', name: 'mr_auth' },
      async (cookie) => {
        if (cookie) {
          const parsedCookie = JSON.parse(decodeURIComponent(cookie.value));

          // Getting avatar of the user
          const res = await fetch('https://api.dev.readwynk.com/news', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${parsedCookie.accessToken}`
            },
            body: JSON.stringify({
              query,
            })
          });
          const parsedRes = await res.json();

          const avatarImage = parsedRes.data.profile.avatar;

          this.setState({
            username: parsedCookie.username,
            accessToken: parsedCookie.accessToken,
            displayName: parsedRes.data.profile.displayName
          });

          if (avatarImage && avatarImage.key) { // 'key' is not null
            const { baseUrl, key } = avatarImage;

            this.setState({
              ...this.state,
              avatar: `${baseUrl}/120x120/${key}`
            })
          }
        }
      }
    );
  }

  renderProfileContainer = () => {
    const { username, avatar } = this.state;

    return (
      <div className={classes.profileContainer}>
        <img src={avatar} title={username} alt="avatar" className={classes.avatarClass} />
        <div className={classes.username}>
          {username}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={classes.container}>
        {this.renderProfileContainer()}
      </div>
    );
  }
}
