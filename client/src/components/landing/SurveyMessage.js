import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Message, Button, Modal } from 'semantic-ui-react';
import jwt_decode from 'jwt-decode';

import HAS_USER_FILLED_OUT_SURVEY from '../../queries/HasUserFilledOutSuevey';
import SUBMIT_SURVEY from '../../mutations/SubmitSurvey';

import Survey from '../survey/SurveyTopLevel';

class SurveyMessage extends Component {
  state = {
    showSurvey: false,
  };
  surveyButtonClicked = () => {
    console.log('Button clicked');
    this.setState({ showSurvey: true });
  };

  surveySubmitted = () => {
    this.setState({ showSurvey: false });
  };

  render() {
    const currentUserId = jwt_decode(localStorage.getItem('VMIMRToken')).id;
    return (
      <div>
        <Query
          query={HAS_USER_FILLED_OUT_SURVEY}
          variables={{ id: currentUserId }}
        >
          {({ loading, error, data }) => {
            if (loading) return <div />;
            if (error) return `Error! ${error.message}`;

            if (data.doseSurveyWithUserIdExist) {
              return <div />;
            } else {
              return (
                <div>
                  <Message positive>
                    <Message.Header>Survey</Message.Header>
                    <p>
                      There is a QI project in place, would you take 30 seconds
                      and fill out a survey? It will be SUPER helpful. Thanks
                    </p>
                    <Button primary onClick={() => this.surveyButtonClicked()}>
                      Fill Out Survey
                    </Button>
                  </Message>
                  <Modal open={this.state.showSurvey} size="large">
                    <Modal.Header>Survey</Modal.Header>
                    <Mutation
                      mutation={SUBMIT_SURVEY}
                      refetchQueries={[
                        {
                          query: HAS_USER_FILLED_OUT_SURVEY,
                          variables: { id: currentUserId },
                        },
                      ]}
                      onCompleted={() => this.surveySubmitted()}
                      onError={() => console.log(error)}
                    >
                      {(submitSurvey, { data, loading, error }) => (
                        <Survey
                          submitSurvey={submitSurvey}
                          cancel={() => this.surveySubmitted()}
                        />
                      )}
                    </Mutation>
                  </Modal>
                </div>
              );
            }
          }}
        </Query>
      </div>
    );
  }
}

export default SurveyMessage;
