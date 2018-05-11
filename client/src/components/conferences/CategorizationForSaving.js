import React, { Component } from 'react';
import { Form, Loader, Container } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import _ from 'lodash';
import moment from 'moment';

import rotations from '../conditions/rotations';

import LIST_ALL_USERS from '../../queries/ListOfAllUsers';

class CatagorizationForSaving extends Component {
  state = {
    presenter: '',
    title: '',
    date: moment().format('MM/DD/YY'),
    tags: [],
  };

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
                  value={this.state.title}
                  onChange={(params, data) =>
                    this.setState({ title: data.value })
                  }
                />
                <Form.Input
                  label="Date of presentation"
                  placeholder=""
                  value={this.state.date}
                  onChange={(params, data) =>
                    this.setState({ date: data.value })
                  }
                />
                <Form.Select
                  options={listOfUsers}
                  search
                  label="Presenter"
                  placeholder="The Presenter Is"
                  onChange={(params, data) =>
                    this.setState({ presenter: data.value })
                  }
                />
                <Form.Select
                  options={options}
                  search
                  multiple
                  label="Rotation tags"
                  placeholder="Rotation tags"
                  onChange={(params, data) =>
                    this.setState({ tags: data.value })
                  }
                />
                <Form.Button
                  basic
                  fluid
                  color="green"
                  onClick={() =>
                    console.log(
                      this.state.presenter,
                      this.state.title,
                      this.state.tags,
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
