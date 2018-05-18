import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Icon, Grid } from 'semantic-ui-react';
import * as actions from '../actions';
import jwt_decode from 'jwt-decode';

class Header extends Component {
  state = {
    mobileMenuVisible: false,
  };

  adminLinks() {
    if (localStorage.getItem('VMIMRToken') !== null) {
      if (jwt_decode(localStorage.getItem('VMIMRToken')).admin) {
        return [
          <Menu.Item key="1" position="right" style={{ cursor: 'pointer' }}>
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
          <Menu.Item key="1" position="right" style={{ cursor: 'pointer' }}>
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
        <Menu.Item key="4" position="right" style={{ cursor: 'pointer' }}>
          <a href="/rotations">Rotations</a>
        </Menu.Item>,
        <Menu.Item key="1" position="right" style={{ cursor: 'pointer' }}>
          <Link to="/Conference">Conference</Link>
        </Menu.Item>,
        <Menu.Item key="2" position="right" style={{ cursor: 'pointer' }}>
          <Link to="/conditions">Learning</Link>
        </Menu.Item>,

        <Menu.Item
          key="3"
          position="right"
          onClick={() => {
            this.props.signoutUser();
          }}
          style={{ cursor: 'pointer' }}
        >
          Sign Out
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

  expandMobileMenu = () => {
    this.setState({ mobileMenuVisible: !this.state.mobileMenuVisible });
  };

  render() {
    return (
      <Grid>
        <Grid.Row columns={1} only="mobile">
          <Grid.Column>
            <Menu
              style={{
                background: '#00b6de',
                borderRadius: '0px',
                marginBottom: 0,
              }}
              inverted
            >
              <Menu.Item>
                <Link to="/">VM:IMR</Link>
              </Menu.Item>

              <Menu.Menu position="right">
                <Menu.Item
                  key="3"
                  position="right"
                  style={{ cursor: 'pointer' }}
                >
                  <Icon
                    name="sidebar"
                    size="large"
                    onClick={() => {
                      this.expandMobileMenu();
                    }}
                  />
                </Menu.Item>
              </Menu.Menu>
            </Menu>
            {this.state.mobileMenuVisible && (
              <Menu
                style={{
                  background: '#00b6de',
                  borderRadius: '0px',
                  marginBottom: 0,
                  marginTop: 0,
                }}
                inverted
                stackable
              >
                <Menu.Menu position="right">
                  {this.adminLinks()}
                  {this.eastgateLink()}
                  {this.renderLinks()}
                </Menu.Menu>{' '}
              </Menu>
            )}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1} only="tablet computer">
          <Grid.Column>
            <Menu
              style={{
                background: '#00b6de',
                borderRadius: '0px',
                marginBottom: 0,
              }}
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
            </Menu>{' '}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, actions)(Header);
