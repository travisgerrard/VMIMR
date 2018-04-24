import React, { Component } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import { Query, Mutation } from 'react-apollo';
import _ from 'lodash';

import EastgateNavBar from './EastgateNavBar';
import EastgateManual from './EastgateManual';

import GET_ALL_EASTGATE_CONTENT from '../../queries/ListOfEastgateContent';
import ADD_OR_UPDATE_EASTGATE_CONTENT from '../../mutations/AddEastgateContent';
import GET_CURRENT_USER from '../../queries/CurrentUser';

class EastgateTopLevelView extends Component {
  state = {
    markdown: '',
  };

  // componentWillMount() {
  //   const manualPath = require('./EastgateManual.md');
  //   fetch(manualPath)
  //     .then(response => {
  //       return response.text();
  //     })
  //     .then(text => {
  //       this.setState({ markdown: text });
  //     });
  // }

  navSection = eastgateContent => {
    return <EastgateNavBar content={eastgateContent} />;
  };

  contentSection = eastgateContent => {
    return (
      <Query query={GET_CURRENT_USER}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          const currentUser = data.currentUser;

          return (
            <Mutation
              mutation={ADD_OR_UPDATE_EASTGATE_CONTENT}
              refetchQueries={[
                {
                  query: GET_ALL_EASTGATE_CONTENT,
                  variables: { id: data.currentUser.id },
                },
              ]}
              onCompleted={() => console.log('Add some content')}
            >
              {(addContent, { data, loading, error }) => (
                <div>
                  {loading && <Loader active inline="centered" />}
                  <EastgateManual
                    content={eastgateContent}
                    addContent={addContent}
                    currentUserId={currentUser.id}
                    loading={loading}
                    data={data}
                    error={error}
                  />
                </div>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  };

  render() {
    return (
      <div style={{ marginTop: '4.5em' }}>
        <Query query={GET_ALL_EASTGATE_CONTENT}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;

            var eastgateContent = _.sortBy(
              data.listOfEastgateManual,
              'sectionIndex',
            );

            return (
              <Grid>
                <Grid.Column width={2} style={{ backgroundColor: '#F7F7F7' }}>
                  {this.navSection(eastgateContent)}
                </Grid.Column>
                <Grid.Column stretched width={14}>
                  {this.contentSection(eastgateContent)}
                </Grid.Column>
              </Grid>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default EastgateTopLevelView;
