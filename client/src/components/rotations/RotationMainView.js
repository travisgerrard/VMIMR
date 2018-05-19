// The top level of the rotation view
// Handles displaying general info...

import React, { Component } from 'react';
import { Query, withApollo } from 'react-apollo';
import { Container, Button, Modal } from 'semantic-ui-react';
import jwt_decode from 'jwt-decode';

import SELECTED_ROTATION from '../../queries/SelectedRotation';

import RotationGeneralInfo from './RotationGeneralInfo';
import RotationProviders from './RotationProviders';
import AddConditionFromRotation from '../conditionGraphQl/AddConditionFromRotation';
import LastThreeLearnings from './LastThreeLearnings';

class RotationMainView extends Component {
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

  getTitleInfoProviders = () => {
    return (
      <Query query={SELECTED_ROTATION} variables={{ id: this.props.id }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          const currentUser = jwt_decode(localStorage.getItem('VMIMRToken'));

          const { id } = currentUser;

          if (data.returnRotation === null) return <div>Pick a rotation</div>;

          const { generalInfo, title, providers, dbname } = data.returnRotation;

          return (
            <Container>
              <h1>{title}</h1>
              <RotationGeneralInfo
                generalInfo={generalInfo}
                admin={true}
                id={this.props.id}
              />
              <br />
              <RotationProviders
                providers={providers}
                admin={true}
                id={this.props.id}
                creator={id}
              />
              <br />
              <h4>
                {title} learnings:{' '}
                {this.state.showLearningModal ? (
                  <Modal open={this.state.showLearningModal} size="large">
                    <Modal.Header>Add learning</Modal.Header>
                    <AddConditionFromRotation
                      cancelAddingcondition={() => this.cancelAddLearning()}
                      doneAddingLearning={() => this.learningAdded()}
                      id={id}
                      dbname={dbname}
                    />
                  </Modal>
                ) : (
                  <Button
                    onClick={() => this.addLearning()}
                    size="tiny"
                    primary
                  >
                    Add Some Learning
                  </Button>
                )}
              </h4>
              <LastThreeLearnings
                userId={id}
                dbname={dbname}
                currentUser={currentUser}
                title={title}
              />

              <h4>General Comments</h4>
              <p>Will put in general comments section regarding the rotation</p>
            </Container>
          );
        }}
      </Query>
    );
  };

  render() {
    return <div>{this.getTitleInfoProviders()}</div>;
  }
}

export default withApollo(RotationMainView);
