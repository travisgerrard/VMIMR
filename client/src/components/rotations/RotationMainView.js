import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Segment, Container } from 'semantic-ui-react';

import SELECTED_ROTATION from '../../queries/SelectedRotation';

class RotationMainView extends Component {
  getTitleInfoProviders = () => {
    return (
      <Query query={SELECTED_ROTATION} variables={{ id: this.props.id }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          const { generalInfo, title, providers } = data.returnRotation;

          return (
            <Container>
              <h1>{title}</h1>
              <h4>General Info</h4>
              <Segment stacked style={{ marginRight: 25 }}>
                {generalInfo}
              </Segment>
              <h4>Providers</h4>
              <Segment.Group style={{ marginRight: 25 }}>
                {providers.map(provider => {
                  return <Segment key={provider}>{provider}</Segment>;
                })}
              </Segment.Group>

              <h4>{title} learnings</h4>
              <p>Will pull in most recent conditions learned regarding gyn</p>

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

export default RotationMainView;
