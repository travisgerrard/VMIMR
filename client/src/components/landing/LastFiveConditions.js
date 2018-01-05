import React, { Component } from 'react';
import ConditionCardView from '../conditions/rotation/ConditionCardView';
import { connect } from 'react-redux';
import { Card, Container } from 'semantic-ui-react';
import jwt_decode from 'jwt-decode';
import * as actions from '../../actions';
import _ from 'lodash';

class LastFiveConditions extends Component {
  componentWillMount() {
    this.props.fetchLastFiveConditions();
  }

  listOfConditions() {
    var lastFiveReversed = _.values(this.props.landing).reverse();
    return _.map(lastFiveReversed, condition => {
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
        <p>Last Five</p>
        <Card.Group>{this.listOfConditions()}</Card.Group>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.landing);
  return state;
}

export default connect(mapStateToProps, actions)(LastFiveConditions);
