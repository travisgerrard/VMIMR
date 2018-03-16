import React, { Component } from 'react';
import ConditionCardView from '../conditions/rotation/ConditionCardView';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Container } from 'semantic-ui-react';
import * as actions from '../../actions';
import _ from 'lodash';

class LastFiveConditions extends Component {
  componentWillMount() {
    this.props.fetchAllUsers();
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
          canEdit={false}
        />
      );
    });
  }

  render() {
    return (
      <Container style={{ marginTop: '4.5em' }}>
        <h5>{`Hi there ${this.props.auth.userDetails.name}`}</h5>
        <p>
          This will be the site of the VM: Internal Medicine Recidency landing
          page
        </p>
        <p>For now it just shows the most recnetly added conditions</p>
        <p>
          <Link to="/conditions/">
            Your three most recent condition learnings. Tap this line to add to
            your collection of learnings.
          </Link>
        </p>
        <Card.Group itemsPerRow={3} stackable doubling>
          {this.listOfConditions()}
        </Card.Group>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, actions)(LastFiveConditions);
