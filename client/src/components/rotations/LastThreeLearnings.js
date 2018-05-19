import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Loader, Modal } from 'semantic-ui-react';

import GET_ROTATION_LEARNING from '../../queries/ListOfLearningWithTag';
import LEARNING_TO_EDIT from '../../queries/SelectedLearning';

import DisplayConditionCards from '../conditionGraphQl/DisplayConditionCards';
import EditCondition from '../conditionGraphQl/EditCondition';

class LastThreeLearnings extends Component {
  state = {
    learningIdToEdit: '',
    editingLearning: false,
  };

  // Setter for initiationg editing of learning
  editingLearning = learningId => {
    this.setState({ learningIdToEdit: learningId });
    this.setState({ editingLearning: true });
  };

  // Setter for finalizing the editing of learning
  doneEditingLearning = () => {
    console.log('this ran');

    this.setState({ learningIdToEdit: '' });
    this.setState({ editingLearning: false });
  };

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
              <div>
                <DisplayConditionCards
                  learnings={data.listOfLearningWithTag}
                  currentUser={this.props.currentUser}
                  editLearning={learningId => this.editingLearning(learningId)}
                />
                <Modal open={this.state.editingLearning} size="large">
                  <Modal.Header>Edit learning</Modal.Header>

                  <Query
                    query={LEARNING_TO_EDIT}
                    variables={{ id: this.state.learningIdToEdit }}
                  >
                    {({ loading, error, data }) => {
                      if (loading)
                        return (
                          <div style={{ marginTop: 50 }}>
                            <Loader active inline="centered" />
                          </div>
                        );
                      if (error) return `Error! ${error.message}`;

                      return (
                        <EditCondition
                          conditionTitle={this.state.searchTerm}
                          doneEditingLearning={() => this.doneEditingLearning()}
                          cancelAddingcondition={() =>
                            this.doneEditingLearning()
                          }
                          currentUser={this.props.currentUser}
                          learning={data.returnLearning}
                          sortingBy={this.state.sortActiveItem}
                        />
                      );
                    }}
                  </Query>
                </Modal>
              </div>
            );
          }
          return <div>No learning associated with {this.props.title} yet</div>;
        }}
      </Query>
    );
  }
}

export default LastThreeLearnings;
