import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';
import * as actions from '../actions';
import jwt_decode from 'jwt-decode';

class Header extends Component {
  adminLinks() {
    if (localStorage.getItem('VMIMRToken') !== null) {
      if (jwt_decode(localStorage.getItem('VMIMRToken')).admin) {
        return [
          <Menu.Item key="1" position="right">
            <Link to="/users">Users</Link>
          </Menu.Item>,
        ];
      }
    }
  }

  eastgateLink() {
    if (localStorage.getItem('VMIMRToken') !== null) {
      if (jwt_decode(localStorage.getItem('VMIMRToken')).eastgate) {
        return [
          <Menu.Item key="1" position="right">
            <Link to="/eastgate">Eastgate</Link>
          </Menu.Item>,
        ];
      }
    }
  }

  renderLinks() {
    if (this.props.authenticated) {
      // show sign out
      return [
        <Menu.Item key="4" position="right">
          <a href="/rotations">Rotations</a>
        </Menu.Item>,
        <Menu.Item key="1" position="right">
          <Link to="/Conference">Conference</Link>
        </Menu.Item>,
        <Menu.Item key="2" position="right">
          <Link to="/conditions">Learning</Link>
        </Menu.Item>,

        <Menu.Item key="3" position="right">
          <a href="/">
            <Icon
              name="x"
              size="large"
              onClick={() => {
                this.props.signoutUser();
              }}
            />
          </a>
        </Menu.Item>,
      ];
    } else {
      //show sign in
      return [
        <Menu.Item key="signin">
          <Link to="/signin">Sign in</Link>
        </Menu.Item>,
      ];
    }
  }

  render() {
    return (
      <Menu
        fixed="top"
        style={{ background: '#00b6de', borderRadius: '0px' }}
        inverted
      >
        <Menu.Item>
          <Link to="/">VM:IMR</Link>
        </Menu.Item>

        <Menu.Menu position="right">
          {this.adminLinks()}
          {this.eastgateLink()}
          {this.renderLinks()}
        </Menu.Menu>
      </Menu>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, actions)(Header);
