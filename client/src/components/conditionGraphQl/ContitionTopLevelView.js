// Top level view for adding / searching learning
import React, { Component } from 'react';
import { Container, Loader, Message, Modal } from 'semantic-ui-react';
import { Query, withApollo } from 'react-apollo';
import _ from 'lodash';
import { id, currentUser } from '../Utils';

import GET_ALL_LEARNING from '../../queries/ListOfAllLearning';
import GET_PERSONAL_LEARNING from '../../queries/ListOfPersonalLearning';
import LEARNING_TO_EDIT from '../../queries/SelectedLearning';

import SortConditionCards from './SortConditionCards';
import DisplayConditionCards from './DisplayConditionCards';
import SearchBox from './SearchBox';
import AddCondition from './AddCondition';
import EditCondition from './EditCondition';

class ConditionTopLevelViewGQL extends Component {
  state = {
    sortActiveItem: 'Your Personal Learning', // personal vs all to filter contents if user has made
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
    console.log('learningAdded');

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
    console.log(currentUser);

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
        <Modal open={this.state.editingLearning} size="large">
          <Modal.Header>Edit learning</Modal.Header>

          <Query
            query={LEARNING_TO_EDIT}
            variables={{ id: this.state.learningIdToEdit }}
          >
            {({ loading, error, data }) => {
              if (loading)
                return (
                  <div style={{ marginTop: 50 }}>
                    <Loader active inline="centered" />
                  </div>
                );
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
        </Modal>
        <Modal open={this.state.addingLearning} size="large">
          <Modal.Header>Add learning</Modal.Header>
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
        </Modal>
      </div>
    );
  };

  displayLearning = () => {
    if (this.state.sortActiveItem === 'Your Personal Learning') {
      return (
        <Query
          query={GET_PERSONAL_LEARNING}
          variables={{ id: id() }}
          fetchPolicy="network-only"
        >
          {({ loading, error, data }) => {
            if (loading) return <Loader active inline="centered" />;
            if (error) return `Error! ${error.message}`;

            const filteredQuery = this.filterQuery(data.listOfPersonalLearning);

            return (
              <div>
                {!data.listOfPersonalLearning.length && (
                  <Message
                    positive
                    content={`It looks like you have not created or been tagged in any learning yet. Click "All Learning" above to show all the learning that has been created by others users.`}
                  />
                )}
                {this.isAddingCondition(filteredQuery, currentUser())}
              </div>
            );
          }}
        </Query>
      );
    } else {
      return (
        <Query query={GET_ALL_LEARNING} fetchPolicy="network-only">
          {({ loading, error, data }) => {
            if (loading) return <Loader active inline="centered" />;
            if (error) return `Error! ${error.message}`;

            const filteredQuery = this.filterQuery(data.listOfAllLearning);

            return (
              <div>{this.isAddingCondition(filteredQuery, currentUser())}</div>
            );
          }}
        </Query>
      );
    }
  };

  render() {
    return (
      <Container style={{ marginTop: 10 }}>
        <SortConditionCards
          handleItemClick={this.handleSortItemClick}
          activeItem={this.state.sortActiveItem}
        />
        {this.displayLearning()}
      </Container>
    );
  }
}

export default withApollo(ConditionTopLevelViewGQL);
