import React, { Component } from 'react';
import { Container, Loader } from 'semantic-ui-react';
import { Query, withApollo } from 'react-apollo';
import _ from 'lodash';

import GET_ALL_LEARNING from '../../queries/ListOfAllLearning';
import GET_PERSONAL_LEARNING from '../../queries/ListOfPersonalLearning';
import GET_CURRENT_USER from '../../queries/CurrentUser';
import LEARNING_TO_EDIT from '../../queries/SelectedLearning';

import SortConditionCards from './SortConditionCards';
import DisplayConditionCards from './DisplayConditionCards';
import SearchBox from './SearchBox';
import AddCondition from './AddCondition';
import EditCondition from './EditCondition';

class ConditionTopLevelViewGQL extends Component {
  state = {
    sortActiveItem: 'personal',
    searchTerm: '',
    category: 'all',
    currentUserId: '',
    addingLearning: false,
    editingLearning: false,
    learningIdToEdit: '',
  };

  handleSortItemClick = (e, { name }) =>
    this.setState({ sortActiveItem: name });

  handleSearchTermChanged = (e, { value }) => {
    this.setState({ searchTerm: value });
  };

  handleCategoryChanged = (e, { value }) => {
    this.setState({ category: value });
  };

  handleAddButtonPressed = (e, args) => {
    this.setState({ addingLearning: true });
  };

  filterQuery = query => {
    var filteredQuery = _.filter(
      query,
      function(o) {
        if (this.state.category === 'all') {
          return (
            o._condition.condition
              .toLowerCase()
              .includes(this.state.searchTerm.toLowerCase()) ||
            o.whatWasLearned
              .toLowerCase()
              .includes(this.state.searchTerm.toLowerCase())
          );
        } else {
          return (
            (o._condition.condition
              .toLowerCase()
              .includes(this.state.searchTerm.toLowerCase()) ||
              o.whatWasLearned
                .toLowerCase()
                .includes(this.state.searchTerm.toLowerCase())) &&
            _.includes(o._condition.tags, this.state.category)
          );
        }
      }.bind(this),
    );

    return filteredQuery;
  };

  learningAdded = () => {
    this.setState({ addingLearning: false });
    this.setState({ searchTerm: '' });
  };

  editingLearning = learningId => {
    this.setState({ learningIdToEdit: learningId });
    this.setState({ editingLearning: true });
  };

  isAddingCondition = (queryDataToDisplay, currentUser) => {
    if (this.state.addingLearning) {
      return (
        <AddCondition
          conditionTitle={this.state.searchTerm}
          doneAddingLearning={() => this.learningAdded()}
          cancelAddingcondition={() =>
            this.setState({
              addingLearning: false,
            })
          }
          currentUser={currentUser}
          sortingBy={this.state.sortActiveItem}
        />
      );
    } else if (this.state.editingLearning) {
      return (
        <Query
          query={LEARNING_TO_EDIT}
          variables={{ id: this.state.learningIdToEdit }}
        >
          {({ loading, error, data }) => {
            if (loading) return <Loader active inline="centered" />;
            if (error) return `Error! ${error.message}`;

            return (
              <EditCondition
                conditionTitle={this.state.searchTerm}
                doneEditingLearning={() => this.learningAdded()}
                cancelAddingcondition={() =>
                  this.setState({
                    editingLearning: false,
                  })
                }
                currentUser={currentUser}
                learning={data.returnLearning}
                sortingBy={this.state.sortActiveItem}
              />
            );
          }}
        </Query>
      );
    }
    return (
      <div>
        <SearchBox
          searchTerm={this.state.searchTerm}
          searchTermChanged={this.handleSearchTermChanged}
          handleCategoryChanged={this.handleCategoryChanged}
          handleAddButtonPressed={this.handleAddButtonPressed}
        />
        <DisplayConditionCards
          learnings={queryDataToDisplay}
          currentUser={currentUser}
          editLearning={learningId => this.editingLearning(learningId)}
        />
      </div>
    );
  };

  render() {
    return (
      <Container style={{ marginTop: '4.5em' }}>
        <SortConditionCards
          handleItemClick={this.handleSortItemClick}
          activeItem={this.state.sortActiveItem}
        />
        <p>
          Search through stuff you've learned, or add something new! If you want
          to see everybody's learned, click "All" above.
        </p>

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
                    const currentUserQuery = this.props.client.readQuery({
                      query: GET_CURRENT_USER,
                    });

                    return (
                      <div>
                        {this.isAddingCondition(
                          filteredQuery,
                          currentUserQuery.currentUser,
                        )}
                      </div>
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
                    const currentUserQuery = this.props.client.readQuery({
                      query: GET_CURRENT_USER,
                    });

                    return (
                      <div>
                        {this.isAddingCondition(
                          filteredQuery,
                          currentUserQuery.currentUser,
                        )}
                      </div>
                    );
                  }}
                </Query>
              );
            }
          }}
        </Query>
      </Container>
    );
  }
}

export default withApollo(ConditionTopLevelViewGQL);
