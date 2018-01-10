import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';
import jwt_decode from 'jwt-decode';

class Header extends Component {
  adminLinks() {
    if (localStorage.getItem('token') !== null) {
      if (jwt_decode(localStorage.getItem('token')).admin) {
        return (
          <Menu.Item position="right">
            <Link to="/users">Users</Link>
          </Menu.Item>
        );
      }
    }
  }

  renderLinks() {
    // <Menu.Item key="1" position="right">
    //   <Link to="/messages">
    //     <Icon name="mail" />
    //   </Link>
    // </Menu.Item>,
    if (this.props.authenticated) {
      // show sign out
      return [
        <Menu.Item key="2" position="right">
          <Link to="/conditions">Conditions</Link>
        </Menu.Item>,

        <Menu.Item key="3" position="right">
          <Link to="/signout">
            <Icon name="x" size="large" />
          </Link>
        </Menu.Item>
      ];
    }
    //show sign in
    return [
      <Menu.Item key="signin">
        <Link to="/signin">Sign in</Link>
      </Menu.Item>
    ];
  }

  render() {
    return (
      <Menu color="green" inverted>
        <Menu.Item>
          <Link to="/">VM:IMR</Link>
        </Menu.Item>
        {this.adminLinks()}
        <Menu.Menu position="right">{this.renderLinks()}</Menu.Menu>
      </Menu>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);
