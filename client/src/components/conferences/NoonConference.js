import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Loader } from 'semantic-ui-react';

import NoonConferenceInput from './NoonConferenceInput';
import Questions from './Questions';
import Slides from './NoonConferenceSlides';
import CatagorizationForSaving from './CategorizationForSaving';
//import NoonConferenceQR from './NoonConferenceQR';

import SELECTED_CASE_PRESENTATIONS from '../../queries/SelectedCasePresentation';

class NoonConference extends Component {
  //        <NoonConferenceQR />

  render() {
    return (
      <div>
        <Query
          query={SELECTED_CASE_PRESENTATIONS}
          variables={{ id: this.props.match.params.id }}
        >
          {({ loading, error, data }) => {
            if (loading) return <Loader active inline="centered" />;
            if (error) return `Error! ${error.message}`;

            console.log(data);

            return (
              <div>
                <NoonConferenceInput />
                <Questions />
                <Slides />
                <CatagorizationForSaving />
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default NoonConference;
