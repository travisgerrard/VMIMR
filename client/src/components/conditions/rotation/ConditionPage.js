import React, { Component } from 'react';
import { Card, Button, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../actions';
import _ from 'lodash';
import ConditionCardLearningView from './ConditionCardLearningView';

//When we are looking at ALL the learning, regardless of creator, from one conditions, this page gets called
class ConditionPage extends Component {
  componentWillMount() {
    this.props.fetchAllLearningForCondition(this.props.match.params.id);
  }

  learningCards = condition => {
    return _.map(condition._learnings, learning => {
      return (
        <Card key={learning._id} fluid>
          <ConditionCardLearningView
            {...learning}
            key={learning._id}
            learningId={learning._id}
            canEdit={false}
          />
        </Card>
      );
    });
  };

  render() {
    var condition = {};
    if (
      this.props.conditions.allConditions[this.props.match.params.id] !==
      undefined
    ) {
      condition = this.props.conditions.allConditions[
        this.props.match.params.id
      ];
    }

    if (condition !== undefined) {
      return (
        <Container style={{ marginTop: '4.5em' }}>
          <div>
            <h1>
              {condition.condition}
              <Button
                basic
                onClick={() => this.props.history.goBack()}
                style={{ float: 'right', marginTop: 5 }}
              >
                {' '}
                Back
              </Button>
            </h1>
          </div>
          {this.learningCards(condition)}
        </Container>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, actions)(withRouter(ConditionPage));
