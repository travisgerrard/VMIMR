import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Loader } from 'semantic-ui-react';
import SELECTED_CASE_PRESENTATIONS from '../../queries/SelectedCasePresentation';

import NoonConference from './NoonConference';

export default class NoonConferenceWrapper extends Component {
  render() {
    if (this.props.viewOnly) {
      return <NoonConference presentationData={this.props.presentationData} />;
    } else {
      return (
        <Query
          query={SELECTED_CASE_PRESENTATIONS}
          variables={{ id: this.props.match.params.id }}
        >
          {({ loading, error, data }) => {
            if (loading) return <Loader active inline="centered" />;
            if (error) return `Error! ${error.message}`;

            const { selectedCasePresentation } = data;

            return (
              <NoonConference presentationData={selectedCasePresentation} />
            );
          }}
        </Query>
      );
    }
  }
}
