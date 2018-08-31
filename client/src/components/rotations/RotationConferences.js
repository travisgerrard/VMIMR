import React, { Component } from "react";
import { Query } from "react-apollo";

import NoonConferenceView from "../conferences/NoonConferenceView";

import CONFERENCES_FOR_ROTATION from "../../queries/ConferencesForRotation";

export default class RotationConferences extends Component {
  render() {
    const { rotation } = this.props;
    console.log(rotation);

    return (
      <Query query={CONFERENCES_FOR_ROTATION} variables={{ rotation }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          var presentations = data.ConferencesForRotation;
          console.log(presentations);

          return (
            <div>
              {presentations.map(casePresentation => {
                return (
                  <NoonConferenceView
                    key={casePresentation.id}
                    presentationData={casePresentation}
                  />
                );
              })}
            </div>
          );
        }}
      </Query>
    );
  }
}
