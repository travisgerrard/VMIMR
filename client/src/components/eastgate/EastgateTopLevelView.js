import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react';
import { Query, Mutation } from 'react-apollo';
import _ from 'lodash';
import { id } from '../Utils';
import EastgateManual from './EastgateManual';

import GET_ALL_EASTGATE_CONTENT from '../../queries/ListOfEastgateContent';
import ADD_OR_UPDATE_EASTGATE_CONTENT from '../../mutations/AddEastgateContent';
import DELETE_EASTGATE_CONTENT from '../../mutations/DeleteEastgateContent';

class EastgateTopLevelView extends Component {
  state = {
    markdown: '',
  };

  contentSection = eastgateContent => {
    return (
      <Mutation
        mutation={ADD_OR_UPDATE_EASTGATE_CONTENT}
        refetchQueries={[
          {
            query: GET_ALL_EASTGATE_CONTENT,
          },
        ]}
      >
        {(addContent, { data, loading, error }) => (
          <Mutation
            mutation={DELETE_EASTGATE_CONTENT}
            refetchQueries={[
              {
                query: GET_ALL_EASTGATE_CONTENT,
              },
            ]}
          >
            {(deleteContent, { data, loading, error }) => (
              <div>
                {loading && <Loader active inline="centered" />}
                <EastgateManual
                  content={eastgateContent}
                  addContent={addContent}
                  deleteContent={deleteContent}
                  currentUserId={id()}
                  loading={loading}
                  data={data}
                  error={error}
                />
              </div>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  };

  render() {
    return (
      <div>
        <Query query={GET_ALL_EASTGATE_CONTENT}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;

            var eastgateContent = _.sortBy(
              data.listOfEastgateManual,
              'sectionIndex',
            );

            return <div>{this.contentSection(eastgateContent)}</div>;
          }}
        </Query>
      </div>
    );
  }
}

export default EastgateTopLevelView;
