import React, { Component } from 'react';
import { Container, Loader } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import _ from 'lodash';

import GET_ALL_LEARNING from '../../queries/ListOfAllLearning';
import GET_PERSONAL_LEARNING from '../../queries/ListOfPersonalLearning';
import GET_CURRENT_USER from '../../queries/CurrentUser';

import SortConditionCards from './SortConditionCards';
import DisplayConditionCards from './DisplayConditionCards';
import SearchBox from './SearchBox';

class ConditionTopLevelViewGQL extends Component {
  state = {
    sortActiveItem: 'personal',
    searchTerm: '',
  };

  handleSortItemClick = (e, { name }) =>
    this.setState({ sortActiveItem: name });

  handleSearchTermChanged = (e, { value }) => {
    this.setState({ searchTerm: value });
  };

  filterQuery = query => {
    var filteredQuery = _.filter(
      query,
      function(o) {
        return (
          o._condition.condition
            .toLowerCase()
            .includes(this.state.searchTerm.toLowerCase()) ||
          o.whatWasLearned
            .toLowerCase()
            .includes(this.state.searchTerm.toLowerCase())
        );
      }.bind(this),
    );
    return filteredQuery;
  };

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

                  const filteredQuery = this.filterQuery(
                    data.listOfPersonalLearning,
                  );

                  return (
                    <DisplayConditionCards
                      learnings={filteredQuery}
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

                  const filteredQuery = this.filterQuery(
                    data.listOfAllLearning,
                  );

                  return (
                    <DisplayConditionCards
                      learnings={filteredQuery}
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
        <SearchBox
          searchTerm={this.state.searchTerm}
          searchTermChanged={this.handleSearchTermChanged}
        />
        {this.loadConditions()}
      </Container>
    );
  }
}

export default ConditionTopLevelViewGQL;
