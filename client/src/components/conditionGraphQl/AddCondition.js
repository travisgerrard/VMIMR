import React, { Component } from 'react';
import {
  Segment,
  Input,
  Select,
  TextArea,
  Form,
  Loader,
  Button,
  Message,
} from 'semantic-ui-react';
import moment from 'moment';
import _ from 'lodash';
import { Query, Mutation } from 'react-apollo';
import rotations from '../conditions/rotations';
import ReactMarkdown from 'react-markdown';
import './markdown.css';
import LIST_ALL_USERS from '../../queries/ListOfAllUsers';
import GET_ALL_LEARNING from '../../queries/ListOfAllLearning';
import GET_PERSONAL_LEARNING from '../../queries/ListOfPersonalLearning';
import ADD_LEARNING from '../../mutations/AddLearning';
import { validateInputs } from './validation';

class AddCondition extends Component {
  state = {
    conditionTitle: this.props.conditionTitle,
    tags: [],
    attending: '',
    date: moment().format('MM/DD/YY'),
    userTags: [],
    wwl: '',
    error: '',
    formError: false,
  };

  cancelClicked = () => {
    this.props.cancelAddingcondition();
  };

  gutsOfAddLearning = (options, listOfUsers, addLearning, loading) => {
    return (
      <div>
        <Segment stacked>
          <Form error={this.state.formError} loading={loading}>
            <Form.Group widths="equal">
              <Form.Input
                label="Name"
                placeholder="Ex: ARDS"
                value={this.state.conditionTitle}
                onChange={(params, data) =>
                  this.setState({ conditionTitle: data.value })
                }
              />
              <Form.Select
                options={options}
                search
                multiple
                label="Rotation tags"
                placeholder="Rotation tags"
                onChange={(params, data) => this.setState({ tags: data.value })}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                label="Attending"
                placeholder="Ex: Baliga"
                value={this.state.attending}
                onChange={(params, data) =>
                  this.setState({ attending: data.value })
                }
              />
              <Form.Input
                label="Date"
                placeholder=""
                value={this.state.date}
                onChange={(params, data) => this.setState({ date: data.value })}
              />
              <Form.Select
                options={listOfUsers}
                search
                multiple
                label="Learned With (Not required)"
                placeholder="Learned With"
                onChange={(params, data) =>
                  this.setState({ userTags: data.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <TextArea
                style={{ marginTop: 10, marginBottom: 20 }}
                placeholder="What was learned"
                label="What was learned"
                value={this.state.wwl}
                onChange={(params, data) => this.setState({ wwl: data.value })}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Button
                basic
                fluid
                color="green"
                onClick={() => {
                  var isValid = validateInputs(
                    this.state.conditionTitle,
                    this.state.tags,
                    this.state.attending,
                    this.state.date,
                    this.state.userTags,
                    this.state.wwl,
                  );

                  const { error } = isValid;
                  if (!error) {
                    addLearning({
                      variables: {
                        condition: this.state.conditionTitle,
                        tags: this.state.tags,
                        attending: this.state.attending,
                        date: this.state.date,
                        userTags: this.state.userTags,
                        wwl: this.state.wwl,
                      },
                    });
                  } else {
                    this.setState({ error: error });
                  }
                }}
              >
                Save
              </Form.Button>
              <Form.Button
                basic
                fluid
                color="grey"
                onClick={() => this.cancelClicked()}
              >
                Cancel
              </Form.Button>
            </Form.Group>
          </Form>
        </Segment>
      </div>
    );
  };

  render() {
    const options = _.map(rotations, ({ name, dbname }) => {
      return { key: name, text: name, value: dbname };
    });

    return (
      <div>
        <Query query={LIST_ALL_USERS}>
          {({ loading, error, data }) => {
            if (loading) return <Loader active inline="centered" />;
            if (error) return `Error! ${error.message}`;

            const listOfUsers = _.map(data.listOfUsers, ({ name, id }) => {
              return { key: id, text: name, value: id };
            });

            if (this.props.sortingBy === 'personal') {
              return (
                <Mutation
                  mutation={ADD_LEARNING}
                  refetchQueries={[
                    {
                      query: GET_PERSONAL_LEARNING,
                      variables: { id: this.props.currentUser.id },
                    },
                  ]}
                  onCompleted={() => this.props.doneAddingLearning()}
                >
                  {(addLearning, { data, loading, error }) => (
                    <div>
                      {this.gutsOfAddLearning(
                        options,
                        listOfUsers,
                        addLearning,
                        loading,
                      )}
                    </div>
                  )}
                </Mutation>
              );
            } else {
              return (
                <Mutation
                  mutation={ADD_LEARNING}
                  refetchQueries={[{ query: GET_ALL_LEARNING }]}
                >
                  {(addLearning, { data }) => (
                    <div>
                      {this.gutsOfAddLearning(
                        options,
                        listOfUsers,
                        addLearning,
                      )}
                    </div>
                  )}
                </Mutation>
              );
            }
          }}
        </Query>
        {this.state.error ? (
          <Message negative>
            <Message.Header>{this.state.error}</Message.Header>
          </Message>
        ) : (
          ''
        )}
        <p>
          FYI: This site uses{' '}
          <a href="https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf">
            Markdown
          </a>{' '}
          to style text
        </p>
        <p>
          You can add a link by typing:{' '}
          <b>[Some Link Text](http://www.link.org/) </b>
        </p>
        <p />
        <p>
          You can add a photo if you know an address it can be found by by
          typing:{' '}
          <b>![Text that describes photo](http://www.aphoto.com/aPhoto)</b>
        </p>
        <p />
        <h3>Preview</h3>
        <Segment>
          {this.state.wwl ? (
            <span style={{ whiteSpace: 'pre-wrap' }}>
              <ReactMarkdown source={this.state.wwl} />
            </span>
          ) : (
            <p>Start typeing above to see preview</p>
          )}
        </Segment>
        <br />
      </div>
    );
  }
}

export default AddCondition;
