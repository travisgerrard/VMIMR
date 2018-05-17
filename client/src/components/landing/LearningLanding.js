import React, { Component } from 'react';
import { Segment, Button, Modal } from 'semantic-ui-react';
import AddConditionFromRotation from '../conditionGraphQl/AddConditionFromRotation';
import LastThreeLearnings from '../rotations/LastThreeLearnings';

class LearningLanding extends Component {
  state = {
    showLearningModal: false,
  };

  addLearning = () => {
    console.log('Adding learning...');
    this.setState({ showLearningModal: true });
  };

  cancelAddLearning = () => {
    this.setState({ showLearningModal: false });
  };

  learningAdded = () => {
    this.setState({ showLearningModal: false });
  };

  render() {
    return (
      <Segment>
        <h4>
          Most recent learnings:{' '}
          {this.state.showLearningModal ? (
            <Modal open={this.state.showLearningModal} size="large">
              <Modal.Header>Add learning</Modal.Header>
              <AddConditionFromRotation
                cancelAddingcondition={() => this.cancelAddLearning()}
                doneAddingLearning={() => this.learningAdded()}
                id={this.props.currentUser.sub}
                dbname={''}
              />
            </Modal>
          ) : (
            <Button onClick={() => this.addLearning()} size="tiny" primary>
              Add Some Learning
            </Button>
          )}
        </h4>
        <LastThreeLearnings
          userId={this.props.currentUser.sub}
          dbname={''}
          currentUser={this.props.currentUser}
          title={''}
        />
      </Segment>
    );
  }
}

export default LearningLanding;
