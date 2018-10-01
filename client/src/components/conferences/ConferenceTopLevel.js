import React, { Component, Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import _ from 'lodash';
import { admin, id } from '../Utils';
import moment from 'moment';
import { Button, Loader, Container, Input } from 'semantic-ui-react';

import SortConferenceCards from './SortConferenceCards';
import ADD_CASE_PRESENTATION from '../../mutations/AddCasePresentation';
import LIST_ALL_CASE_PRESENTATIONS from '../../queries/ListOfAllCasePresentations';

import NoonConferenceView from './NoonConferenceView';
import AddConference from './AddConference';

class ConferenceTopLevel extends Component {
  state = {
    searchTerm: '', // Tracks what is written in search box
    sortActiveItem: 'all', // personal vs all to filter contents if user has made
  };

  handleSortItemClick = name => {
    this.setState({ sortActiveItem: name });
  };

  handleSearchTermChanged = value => {
    this.setState({ searchTerm: value });
  };

  filterQuery = query => {
    const { sortActiveItem } = this.state;

    var filteredQuery = _.filter(
      query,
      function(o) {
        if (sortActiveItem === 'all') {
          return (
            o.title
              .toLowerCase()
              .includes(this.state.searchTerm.toLowerCase()) ||
            o.embedPresentationSting
              .toLowerCase()
              .includes(this.state.searchTerm.toLowerCase())
          );
        } else {
          return (
            o.title
              .toLowerCase()
              .includes(this.state.searchTerm.toLowerCase()) &&
            _.includes(o.presentationType, sortActiveItem)
          );
        }
      }.bind(this),
    );

    return filteredQuery;
  };

  renderList = () => {
    return (
      <Fragment>
        <Query query={LIST_ALL_CASE_PRESENTATIONS}>
          {({ loading, error, data }) => {
            if (loading) return <Loader active inline="centered" />;
            if (error) return `Error! ${error.message}`;

            if (data.listOfAllCasePresentations.length > 0) {
              var presentations = data.listOfAllCasePresentations.slice();

              const filteredQuery = this.filterQuery(presentations);

              return (
                <div>
                  <SortConferenceCards
                    handleItemClick={this.handleSortItemClick}
                    activeItem={this.state.sortActiveItem}
                  />
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 11fr',
                    }}
                  >
                    <AddConference />

                    <Input
                      style={{ marginBottom: 10 }}
                      type="text"
                      placeholder="Search Confereces"
                      icon="search"
                      value={this.state.searchTerm}
                      onChange={e =>
                        this.handleSearchTermChanged(e.target.value)
                      }
                    />
                  </div>
                  {filteredQuery.map(casePresentation => {
                    return (
                      <NoonConferenceView
                        key={casePresentation.id}
                        presentationData={casePresentation}
                      />
                    );
                  })}
                </div>
              );
            }
            return <div />;
          }}
        </Query>
      </Fragment>
    );
  };

  render() {
    return <Container style={{ marginTop: 10 }}>{this.renderList()}</Container>;
  }
}

export default ConferenceTopLevel;
