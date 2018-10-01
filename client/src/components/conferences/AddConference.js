import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { admin, id } from '../Utils';
import moment from 'moment';

import ADD_CASE_PRESENTATION from '../../mutations/AddCasePresentation';
import LIST_ALL_CASE_PRESENTATIONS from '../../queries/ListOfAllCasePresentations';

export default class AddConference extends Component {
  render() {
    return (
      <Mutation
        mutation={ADD_CASE_PRESENTATION}
        refetchQueries={[{ query: LIST_ALL_CASE_PRESENTATIONS }]}
      >
        {(addCasePresentation, { data, loading, error }) => (
          <Fragment>
            {admin() && (
              <span
                style={
                  this.props.homepage
                    ? {
                        position: 'absolute',
                        right: '2rem',
                        cursor: 'pointer',
                      }
                    : {
                        fontSize: '2rem',
                        cursor: 'pointer',
                        padding: '8px 10px 0 10px',
                      }
                }
                onClick={() =>
                  addCasePresentation({
                    // 'No Title' is added in the schema....
                    variables: {
                      id: id(),
                      presentationDate: moment().format('MM/DD/YY'),
                      _presentor: id(),
                    },
                  })
                }
              >
                +
              </span>
            )}
          </Fragment>
        )}
      </Mutation>
    );
  }
}
