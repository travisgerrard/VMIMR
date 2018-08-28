import React, { Component } from 'react';
import { Segment, Modal } from 'semantic-ui-react';
import AddConditionFromRotation from '../conditionGraphQl/AddConditionFromRotation';
import LastThreeLearnings from '../rotations/LastThreeLearnings';
import { Link } from 'react-router-dom';

const titleStyle = {
  fontFamily: 'Lato',
  fontStyle: 'normal',
  lineHeight: 'normal',
  fontSize: '24px',
  backgroundColor: '#E8F4F7',
  padding: 10,
};

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
      <Segment.Group>
        <Segment style={titleStyle}>
          <Link to="/conditions" style={{ color: 'black' }}>
            Latest learning
          </Link>

          {this.state.showLearningModal ? (
            <Modal open={this.state.showLearningModal} size="large">
              <Modal.Header>Add learning</Modal.Header>
              <AddConditionFromRotation
                cancelAddingcondition={() => this.cancelAddLearning()}
                doneAddingLearning={() => this.learningAdded()}
                id={this.props.currentUser.id}
                currentUser={this.props.currentUser}
                dbname={''}
              />
            </Modal>
          ) : (
            <span
              onClick={() => this.addLearning()}
              style={{ position: 'absolute', right: '2rem', cursor: 'pointer' }}
            >
              +
            </span>
          )}
        </Segment>
        <Segment>
          <LastThreeLearnings
            userId={this.props.currentUser.id}
            dbname={''}
            currentUser={this.props.currentUser}
            title={''}
          />
        </Segment>
      </Segment.Group>
    );
  }
}

export default LearningLanding;
