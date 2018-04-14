import React, { Component } from 'react';
import { Container, Loader } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import GET_ALL_LEARNING from '../../queries/ListOfAllLearning';
import GET_PERSONAL_LEARNING from '../../queries/ListOfPersonalLearning';
import GET_CURRENT_USER from '../../queries/CurrentUser';

import SortConditionCards from './SortConditionCards';
import DisplayConditionCards from './DisplayConditionCards';

class ConditionTopLevelViewGQL extends Component {
  state = { sortActiveItem: 'personal' };

  handleSortItemClick = (e, { name }) =>
    this.setState({ sortActiveItem: name });

  loadConditions = () => {
    return (
      <Query query={GET_CURRENT_USER}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          if (this.state.sortActiveItem === 'personal') {
            return (
              <Query
                query={GET_PERSONAL_LEARNING}
                variables={{ id: data.currentUser.id }}
              >
                {({ loading, error, data }) => {
                  if (loading) return <Loader active inline="centered" />;
                  if (error) return `Error! ${error.message}`;

                  return (
                    <DisplayConditionCards
                      learnings={data.listOfPersonalLearning}
                      currentUser={data.currentUser}
                    />
                  );
                }}
              </Query>
            );
          } else {
            return (
              <Query query={GET_ALL_LEARNING}>
                {({ loading, error, data }) => {
                  if (loading) return <Loader active inline="centered" />;
                  if (error) return `Error! ${error.message}`;

                  return (
                    <DisplayConditionCards
                      learnings={data.listOfAllLearning}
                      currentUser={data.currentUser}
                    />
                  );
                }}
              </Query>
            );
          }
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

export default ConditionTopLevelViewGQL;
