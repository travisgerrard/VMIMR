import React, { Component } from 'react';
import ConditionCardView from '../conditions/rotation/ConditionCardView';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Container } from 'semantic-ui-react';
import jwt_decode from 'jwt-decode';
import * as actions from '../../actions';
import _ from 'lodash';

class LastFiveConditions extends Component {
  componentWillMount() {
    this.props.fetchLastFiveConditions();
  }

  listOfConditions() {
    var { landing } = this.props;
    landing.sort(function(a, b) {
      var x = a._learnings[0].dateUpdated;
      var y = b._learnings[0].dateUpdated;
      if (x > y) {
        return -1;
      }
      if (x < y) {
        return 1;
      }
      return 0;
    });

    return _.map(landing, condition => {
      return (
        <ConditionCardView
          condition={condition}
          key={condition._id}
          conditionId={condition._id}
        />
      );
    });
  }

  render() {
    return (
      <Container>
        <h5>{`Hi there ${jwt_decode(localStorage.getItem('token')).name}`}</h5>
        <p>
          Your three most recent <Link to="/conditions/">condition</Link>{' '}
          learnings
        </p>
        <Card.Group>{this.listOfConditions()}</Card.Group>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, actions)(LastFiveConditions);
