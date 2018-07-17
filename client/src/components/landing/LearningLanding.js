import React, { Component } from 'react';
import { Segment, Button, Modal } from 'semantic-ui-react';
import AddConditionFromRotation from '../conditionGraphQl/AddConditionFromRotation';
import LastThreeLearnings from '../rotations/LastThreeLearnings';
import { Link } from 'react-router-dom';

const titleStyle = {
  fontFamily: 'Lato',
  fontStyle: 'normal',
  fontWeight: 'thin',
  lineHeight: 'normal',
  fontSize: '24px',
  backgroundColor: '#E8F4F7',
  padding: 10,
};

const fontStyle = {
  fontFamily: 'Lato',
  fontStyle: 'normal',
  fontWeight: 'lighter',
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
          Most recent learning
          <br />
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
            <Button
              onClick={() => this.addLearning()}
              size="tiny"
              style={fontStyle}
              primary
            >
              Add Some Learning
            </Button>
          )}
          <Button
            size="tiny"
            style={{ backgroundColor: '#5E9B6A' }}
            style={fontStyle}
            primary
          >
            <Link to="/conditions" style={{ color: 'white' }}>
              Goto Learning Section
            </Link>
          </Button>
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
