import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import jwt_decode from 'jwt-decode';
import { Button, Loader, Card, Container } from 'semantic-ui-react';

import ADD_CASE_PRESENTATION from '../../mutations/AddCasePresentation';
import LIST_ALL_CASE_PRESENTATIONS from '../../queries/ListOfAllCasePresentations';

class ConferenceTopLevel extends Component {
  render() {
    const currentUser = jwt_decode(localStorage.getItem('VMIMRToken'));
    console.log(currentUser);

    return (
      <Container style={{ marginTop: '4.5em' }}>
        <Mutation
          mutation={ADD_CASE_PRESENTATION}
          refetchQueries={[{ query: LIST_ALL_CASE_PRESENTATIONS }]}
        >
          {(addCasePresentation, { data, loading, error }) => (
            <div>
              {currentUser.admin && (
                <Button
                  onClick={() =>
                    addCasePresentation({
                      variables: {
                        id: currentUser.sub,
                      },
                    })
                  }
                  style={{ marginBottom: 20 }}
                >
                  Add Noon Case Report
                </Button>
              )}
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
                                href={`/noonConference/${casePresentation.id}`}
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
      </Container>
    );
  }
}

export default ConferenceTopLevel;
