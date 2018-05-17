import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Loader } from 'semantic-ui-react';

import GET_ROTATION_LEARNING from '../../queries/ListOfLearningWithTag';
import DisplayConditionCards from '../conditionGraphQl/DisplayConditionCards';

class LastThreeLearnings extends Component {
  render() {
    return (
      <Query
        query={GET_ROTATION_LEARNING}
        variables={{ id: this.props.userId, rotation: this.props.dbname }}
      >
        {({ loading, error, data }) => {
          if (loading) return <Loader active inline="centered" />;
          if (error) return `Error! ${error.message}`;

          if (data.listOfLearningWithTag.length) {
            return (
              <DisplayConditionCards
                learnings={data.listOfLearningWithTag}
                currentUser={this.props.currentUser}
                editLearning
              />
            );
          }
          return <div>No learning associated with {this.props.title} yet</div>;
        }}
      </Query>
    );
  }
}

export default LastThreeLearnings;
