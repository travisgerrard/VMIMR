import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import * as actions from '../../actions';
import rotations from './rotations';
import RotationConditionOverview from './rotation/RotationConditionOverview';

class ConditionTopLevelView extends Component {
  componentWillMount() {
    this.props.fetchConditionMessage();
  }

  renderSideBar() {
    var sorted = _.sortBy(rotations, 'name');
    return _.map(sorted, ({ path, name }) => {
      return (
        <li key={name}>
          <Link to={path}>{name}</Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                padding: '10px',
                width: '20%'
              }}
            >
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {this.renderSideBar()}
              </ul>

              {rotations.map((route, index) => (
                // You can render a <Route> in as many places
                // as you want in your app. It will render along
                // with any other <Route>s that also match the URL.
                // So, a sidebar or breadcrumbs or anything else
                // that requires you to render multiple things
                // in multiple places at the same URL is nothing
                // more than multiple <Route>s.
                <Route key={index} path={route.path} exact={route.exact} />
              ))}
            </div>

            <div style={{ flex: 1, padding: '10px' }}>
              <h2>Conditions</h2>
              {rotations.map((route, index) => (
                // Render more <Route>s with the same paths as
                // above, but different components this time.
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  render={props => (
                    <RotationConditionOverview
                      {...props}
                      title={route.name}
                      dbname={route.dbname}
                    />
                  )}
                />
              ))}
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { conditionMessage: state.condition.message };
}

export default connect(mapStateToProps, actions)(ConditionTopLevelView);
