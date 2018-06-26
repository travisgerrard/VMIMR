import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import jwt_decode from 'jwt-decode';
import { Button, Loader, Card, Container, Segment } from 'semantic-ui-react';

import ADD_CASE_PRESENTATION from '../../mutations/AddCasePresentation';
import LIST_ALL_CASE_PRESENTATIONS from '../../queries/ListOfAllCasePresentations';

import NoonConferenceView from './NoonConferenceView';

class Blog extends Component {
  renderBlog = () => {
    return (
      <Query query={LIST_ALL_CASE_PRESENTATIONS}>
        {({ loading, error, data }) => {
          if (loading) return <Loader active inline="centered" />;
          if (error) return `Error! ${error.message}`;

          if (data.listOfAllCasePresentations.length > 0) {
            return (
              <Container style={{ marginTop: 20 }}>
                <Segment>
                  <h1 style={{ color: '#6AB2D6' }}>
                    What's happening at VM:IMR
                  </h1>
                  {data.listOfAllCasePresentations.map(presentation => {
                    return (
                      <NoonConferenceView
                        key={presentation.id}
                        presentationData={presentation}
                      />
                    );
                  })}
                </Segment>
              </Container>
            );
          } else {
            return <div>Building something awesome to go here</div>;
          }
        }}
      </Query>
    );
  };

  render() {
    return <div>{this.renderBlog()}</div>;
  }
}

export default Blog;
