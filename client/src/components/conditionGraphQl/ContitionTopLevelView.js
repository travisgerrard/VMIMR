import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Query, withApollo, graphql } from 'react-apollo';
import GET_ALL_LEARNING from '../../queries/ListOfAllLearning';
import GET_CURRENT_USER from '../../queries/CurrentUser';

import SortConditionCards from './SortConditionCards';
import DisplayConditionCards from './DisplayConditionCards';

class ConditionTopLevelViewGQL extends Component {
  state = { sortActiveItem: 'personal' };

  handleSortItemClick = (e, { name }) =>
    this.setState({ sortActiveItem: name });

  loadConditions = () => {
    return (
      <Query query={GET_ALL_LEARNING}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          const currentUserQuery = this.props.client.readQuery({
            query: GET_CURRENT_USER,
          });

          return (
            <DisplayConditionCards
              learnings={data.listOfLearning}
              currentUser={currentUserQuery}
            />
          );
        }}
      </Query>
    );
  };

  render() {
    return (
      <Container style={{ marginTop: '4.5em' }}>
        <SortConditionCards
          handleItemClick={this.handleSortItemClick}
          activeItem={this.state.sortActiveItem}
        />
        {this.loadConditions()}
      </Container>
    );
  }
}

export default withApollo(graphql(GET_CURRENT_USER)(ConditionTopLevelViewGQL));
