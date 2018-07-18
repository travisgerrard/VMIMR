import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import _ from 'lodash';
import jwt_decode from 'jwt-decode';
import moment from 'moment';
import { Button, Loader, Container } from 'semantic-ui-react';

import SortConferenceCards from './SortConferenceCards';
import ADD_CASE_PRESENTATION from '../../mutations/AddCasePresentation';
import LIST_ALL_CASE_PRESENTATIONS from '../../queries/ListOfAllCasePresentations';

import NoonConferenceView from './NoonConferenceView';

class ConferenceTopLevel extends Component {
  state = {
    searchTerm: '', // Tracks what is written in search box
    sortActiveItem: 'all', // personal vs all to filter contents if user has made
  };

  handleSortItemClick = name => {
    this.setState({ sortActiveItem: name });
  };

  filterQuery = query => {
    const { sortActiveItem } = this.state;

    var filteredQuery = _.filter(query, function(o) {
      if (sortActiveItem === 'all') {
        return o;
      } else {
        return _.includes(o.presentationType, sortActiveItem);
      }
    });

    return filteredQuery;
  };

  renderList = () => {
    let currentUser = '';
    if (localStorage.getItem('VMIMRToken')) {
      currentUser = jwt_decode(localStorage.getItem('VMIMRToken'));
    }
    const admin = currentUser.admin;

    return (
      <Mutation
        mutation={ADD_CASE_PRESENTATION}
        refetchQueries={[{ query: LIST_ALL_CASE_PRESENTATIONS }]}
      >
        {(addCasePresentation, { data, loading, error }) => (
          <div>
            {admin && (
              <Button
                onClick={() =>
                  addCasePresentation({
                    // 'No Title' is added in the schema....
                    variables: {
                      id: currentUser.id,
                      presentationDate: moment().format('MM/DD/YY'),
                      _presentor: currentUser.id,
                    },
                  })
                }
                style={{ marginBottom: 20 }}
              >
                Add Post
              </Button>
            )}

            <Query query={LIST_ALL_CASE_PRESENTATIONS}>
              {({ loading, error, data }) => {
                if (loading) return <Loader active inline="centered" />;
                if (error) return `Error! ${error.message}`;

                if (data.listOfAllCasePresentations.length > 0) {
                  var presentations = data.listOfAllCasePresentations.slice();
                  // presentations.sort(function(a, b) {
                  //   return a.presentationDate < b.presentationDate
                  //     ? 1
                  //     : b.presentationDate < a.presentationDate
                  //       ? -1
                  //       : 0;
                  // });

                  const filteredQuery = this.filterQuery(presentations);

                  return (
                    <div>
                      <SortConferenceCards
                        handleItemClick={this.handleSortItemClick}
                        activeItem={this.state.sortActiveItem}
                      />
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
          </div>
        )}
      </Mutation>
    );
  };

  render() {
    return <Container style={{ marginTop: 10 }}>{this.renderList()}</Container>;
  }
}

export default ConferenceTopLevel;
