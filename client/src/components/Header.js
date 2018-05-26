import React, { Component } from 'react';
import { Query } from 'react-apollo';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Icon, Grid, Dropdown } from 'semantic-ui-react';
import * as actions from '../actions';
import jwt_decode from 'jwt-decode';

import GET_LIST_OF_ROTATIONS from '../queries/ListOfRotations';

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

  returnRotations = () => {
    return (
      <Query query={GET_LIST_OF_ROTATIONS}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          var sortedArray = data.listOfRotations.slice();
          sortedArray.sort(function(a, b) {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
          });

          return sortedArray.map(rotation => {
            return (
              <Dropdown.Item
                name={rotation.title}
                id={rotation.id}
                key={rotation.title}
              >
                <Link
                  to={`/rotations/${rotation.title}`}
                  style={{ color: 'black' }}
                >
                  {rotation.title}
                </Link>
              </Dropdown.Item>
            );
          });
        }}
      </Query>
    );
  };

  renderLinks() {
    if (this.props.authenticated) {
      // show sign out
      return [
        <Menu.Item key="5" position="right" style={{ cursor: 'pointer' }}>
          <Link to="/">Home</Link>
        </Menu.Item>,
        <Dropdown key="4" item text="Rotations">
          <Dropdown.Menu>{this.returnRotations()}</Dropdown.Menu>
        </Dropdown>,
        <Menu.Item key="1" position="right" style={{ cursor: 'pointer' }}>
          <Link to="/Conference">Conference</Link>
        </Menu.Item>,
        <Menu.Item key="2" position="right" style={{ cursor: 'pointer' }}>
          <Link to="/conditions">Learning</Link>
        </Menu.Item>,
        <Menu.Item key="3" position="right" style={{ cursor: 'pointer' }}>
          <Link
            to="/"
            onClick={() => {
              this.props.signoutUser();
            }}
          >
            Sign Out
          </Link>
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
                  {this.renderLinks()}
                  {this.adminLinks()}
                  {this.eastgateLink()}
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
