import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Loader } from 'semantic-ui-react';
import _ from 'lodash';

import UpComing from './UpComing';

import LIST_ALL_USERS_THAT_ARE_VISIBLE from '../../queries/ListOfAllUsersThatAreVisible';

class MasterScheduleView extends Component {
  render() {
    return (
      <Query query={LIST_ALL_USERS_THAT_ARE_VISIBLE}>
        {({ loading, error, data }) => {
          if (loading) return <Loader active inline="centered" />;
          if (error) return `Error! ${error.message}`;

          const listOfUsers = _.map(
            data.listOfUsersThatAreVisible,
            ({ name, id }) => {
              return { key: id, text: name, value: id };
            },
          );

          return (
            <div>
              {listOfUsers.map(user => {
                var name = user.text.split(' ')[1];

                return <UpComing name={name} />;
              })}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default MasterScheduleView;
