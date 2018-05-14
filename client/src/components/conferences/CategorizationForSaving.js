// Bottom of the creation of noon conference

import React, { Component } from 'react';
import { Form, Loader, Container } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import _ from 'lodash';

import rotations from '../conditions/rotations';

import LIST_ALL_USERS from '../../queries/ListOfAllUsers';

class CatagorizationForSaving extends Component {
  render() {
    return (
      <Container>
        <Query query={LIST_ALL_USERS}>
          {({ loading, error, data }) => {
            if (loading) return <Loader active inline="centered" />;
            if (error) return `Error! ${error.message}`;

            const listOfUsers = _.map(data.listOfUsers, ({ name, id }) => {
              return { key: id, text: name, value: id };
            });

            const options = _.map(rotations, ({ name, dbname }) => {
              return { key: name, text: name, value: dbname };
            });

            return (
              <Form>
                <Form.Input
                  label="Title"
                  placeholder=""
                  value={this.props.title}
                  onChange={(params, data) =>
                    this.props.updateConferenceInputState(`title`, data.value)
                  }
                />
                <Form.Input
                  label="Date of presentation"
                  placeholder=""
                  value={this.props.presentationDate}
                  onChange={(params, data) =>
                    this.props.updateConferenceInputState(
                      `presentationDate`,
                      data.value,
                    )
                  }
                />
                <Form.Select
                  options={listOfUsers}
                  search
                  label="Presenter"
                  placeholder="The Presenter Is"
                  onChange={(params, data) =>
                    this.props.updateConferenceInputState(
                      `_presentor`,
                      data.value,
                    )
                  }
                />
                <Form.Select
                  options={options}
                  search
                  multiple
                  label="Rotation tags"
                  placeholder="Rotation tags"
                  onChange={(params, data) =>
                    this.props.updateConferenceInputState(`tags`, data.value)
                  }
                />
                <Form.Button
                  basic
                  fluid
                  color="green"
                  onClick={() =>
                    console.log(
                      this.props.presenter,
                      this.props.title,
                      this.props.date,
                      this.props.tags,
                    )
                  }
                >
                  Save
                </Form.Button>
              </Form>
            );
          }}
        </Query>
      </Container>
    );
  }
}

export default CatagorizationForSaving;
