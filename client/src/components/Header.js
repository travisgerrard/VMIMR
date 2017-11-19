import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      // show sign out
      return (
        <li>
          <Link to="/signout">Sign Out</Link>
        </li>
      );
    }
    //show sign in
    return [
      <li key="signin">
        <Link to="signin">Sign in</Link>
      </li>,
      <li key="signup">
        <Link to="/signup">Sign up</Link>
      </li>
    ];
  }

  render() {
    return (
      <nav>
        <Link to="/">Redux Auth</Link>
        <ul className="right">{this.renderLinks()}</ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);
