import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import jwt_decode from 'jwt-decode';
import { Button, Loader, Card, Container, Segment } from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';

import ADD_CASE_PRESENTATION from '../../mutations/AddCasePresentation';
import LIST_ALL_CASE_PRESENTATIONS from '../../queries/ListOfAllCasePresentations';

import NoonConferenceView from './NoonConferenceView';

class ConferenceTopLevel extends Component {
  renderList = () => {
    const currentUser = jwt_decode(localStorage.getItem('VMIMRToken'));
    if (currentUser.admin) {
      return (
        <Mutation
          mutation={ADD_CASE_PRESENTATION}
          refetchQueries={[{ query: LIST_ALL_CASE_PRESENTATIONS }]}
        >
          {(addCasePresentation, { data, loading, error }) => (
            <div>
              <Button
                onClick={() =>
                  addCasePresentation({
                    variables: {
                      id: currentUser.id,
                    },
                  })
                }
                style={{ marginBottom: 20 }}
              >
                Add Noon Case Report
              </Button>

              <Query query={LIST_ALL_CASE_PRESENTATIONS}>
                {({ loading, error, data }) => {
                  if (loading) return <Loader active inline="centered" />;
                  if (error) return `Error! ${error.message}`;

                  if (data.listOfAllCasePresentations.length > 0) {
                    return (
                      <div>
                        {data.listOfAllCasePresentations.map(
                          casePresentation => {
                            return (
                              <Card
                                fluid
                                key={casePresentation.id}
                                href={`/ConferenceAdmin/${casePresentation.id}`}
                                header={casePresentation.title}
                              />
                            );
                          },
                        )}
                      </div>
                    );
                  }
                  return <div />;
                }}
              </Query>
            </div>
          )}
        </Mutation>
      );
    } else {
      //Not an admin...
      return (
        <Query query={LIST_ALL_CASE_PRESENTATIONS}>
          {({ loading, error, data }) => {
            if (loading) return <Loader active inline="centered" />;
            if (error) return `Error! ${error.message}`;

            if (data.listOfAllCasePresentations.length > 0) {
              console.log(data.listOfAllCasePresentations);

              return (
                <div>
                  {data.listOfAllCasePresentations.map(presentationData => {
                    return (
                      <NoonConferenceView
                        key={presentationData.id}
                        presentationData={presentationData}
                      />
                    );
                  })}
                </div>
              );
            }
            return <div />;
          }}
        </Query>
      );
    }
  };

  render() {
    const currentUser = jwt_decode(localStorage.getItem('VMIMRToken'));

    return (
      <Container style={{ marginTop: 10 }}>
        <Segment>{this.renderList()}</Segment>
      </Container>
    );
  }
}

export default ConferenceTopLevel;
