// Top level view for adding / searching learning
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
    sortActiveItem: 'personal', // personal vs all to filter contents if user has made
    searchTerm: '', // Tracks what is written in search box
    category: 'all', // Sort conditions with regard to rotation
    currentUserId: '',
    addingLearning: false, // Boolean to help displays correct components
    editingLearning: false, // Boolean to help displays correct components
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

  // The functions that takes an input array of learning and outputs just learning that fits applied filters and search termms
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

  // Setter for after learning has been added
  learningAdded = () => {
    this.setState({ addingLearning: false });
    this.setState({ searchTerm: '' });
  };

  // Setter for initiationg editing of learning
  editingLearning = learningId => {
    this.setState({ learningIdToEdit: learningId });
    this.setState({ editingLearning: true });
  };

  // Setter for finalizing the editing of learning
  doneEditingLearning = () => {
    this.setState({ learningIdToEdit: '' });
    this.setState({ editingLearning: false });
  };

  // Decideds what user should see depending on if user is creating/editing learning or looking for past learing
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
                doneEditingLearning={() => this.doneEditingLearning()}
                cancelAddingcondition={() => this.doneEditingLearning()}
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
