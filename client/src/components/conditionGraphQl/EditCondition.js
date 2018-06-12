// Edit condition form

import React, { Component } from 'react';
import { Segment, Form, Loader, Message } from 'semantic-ui-react';
import _ from 'lodash';
import { Query, Mutation } from 'react-apollo';
import rotations from '../conditions/rotations';
import ReactMarkdown from 'react-markdown';
import './markdown.css';
import LIST_ALL_USERS from '../../queries/ListOfAllUsers';
import GET_ALL_LEARNING from '../../queries/ListOfAllLearning';
import GET_PERSONAL_LEARNING from '../../queries/ListOfPersonalLearning';
import UPDATE_LEARNING from '../../mutations/UpdateLearning';
import DELETE_LEARNING from '../../mutations/DeleteLearning';
import { validateInputs } from './validation';

class EditCondition extends Component {
  state = {
    conditionTitle: this.props.learning._condition.condition,
    tags: this.props.learning.tags,
    attending: this.props.learning.seenWith,
    date: this.props.learning.dateField,
    userTags: _.map(this.props.learning.usersTagged, ({ id }) => {
      return id;
    }),
    wwl: this.props.learning.whatWasLearned,
    confirmOpen: false,
    error: '',
  };

  cancelClicked = () => {
    this.props.cancelAddingcondition();
  };

  deleteClicked = () => {};

  gutsOfeditLearning = (
    options,
    listOfUsers,
    editLearning,
    deleteLearning,
    loading,
  ) => {
    return (
      <div>
        <Segment stacked>
          <Form loading={loading}>
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
                value={this.state.tags}
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
                value={this.state.userTags}
                onChange={(params, data) =>
                  this.setState({ userTags: data.value })
                }
              />
            </Form.Group>
            <Form.TextArea
              placeholder="What was learned"
              label="What was learned"
              value={this.state.wwl}
              onChange={(params, data) => this.setState({ wwl: data.value })}
            />
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
                    editLearning({
                      variables: {
                        id: this.props.learning.id,
                        condition: this.state.conditionTitle,
                        tags: this.state.tags,
                        attending: this.state.attending,
                        date: this.state.date,
                        userTags: this.state.userTags,
                        wwl: this.state.wwl,
                        userId: this.props.currentUser.id,
                      },
                    });
                  } else {
                    this.setState({ error });
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
              <Form.Button
                basic
                fluid
                color="red"
                onClick={() => {
                  if (
                    window.confirm(
                      `Are you sure you want to delete ${
                        this.state.conditionTitle
                      }?`,
                    )
                  ) {
                    deleteLearning({
                      variables: {
                        id: this.props.learning.id,
                      },
                    });
                  }
                }}
              >
                Delete
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
      <Segment>
        <Query query={LIST_ALL_USERS}>
          {({ loading, error, data }) => {
            if (loading) return <Loader active inline="centered" />;
            if (error) return `Error! ${error.message}`;

            const listOfUsers = _.map(data.listOfUsers, ({ name, id }) => {
              return { key: id, text: name, value: id };
            });

            if (this.props.sortingBy === 'Your Personal Learning') {
              return (
                <Mutation
                  mutation={UPDATE_LEARNING}
                  refetchQueries={[
                    {
                      query: GET_PERSONAL_LEARNING,
                      variables: { id: this.props.currentUser.id },
                    },
                  ]}
                  onCompleted={() => this.props.doneEditingLearning()}
                >
                  {(editLearning, { data, loading, error }) => (
                    <Mutation
                      mutation={DELETE_LEARNING}
                      variables={{ id: this.props.learning.id }}
                      refetchQueries={[
                        {
                          query: GET_PERSONAL_LEARNING,
                          variables: { id: this.props.currentUser.id },
                        },
                      ]}
                      onCompleted={() => this.props.doneEditingLearning()}
                    >
                      {(deleteLearning, { data, loading, error }) => (
                        <div>
                          {this.gutsOfeditLearning(
                            options,
                            listOfUsers,
                            editLearning,
                            deleteLearning,
                            loading,
                          )}
                        </div>
                      )}
                    </Mutation>
                  )}
                </Mutation>
              );
            } else {
              return (
                <Mutation
                  mutation={UPDATE_LEARNING}
                  refetchQueries={[
                    {
                      query: GET_ALL_LEARNING,
                      fetchPolicy: 'network-only',
                    },
                  ]}
                  onCompleted={() => this.props.doneEditingLearning()}
                >
                  {(editLearning, { data }) => (
                    <Mutation
                      mutation={DELETE_LEARNING}
                      variables={{ id: this.props.learning.id }}
                      refetchQueries={[
                        {
                          query: GET_PERSONAL_LEARNING,
                          variables: { id: this.props.currentUser.id },
                        },
                      ]}
                      onCompleted={() => this.props.doneEditingLearning()}
                    >
                      {(deleteLearning, { data, loading, error }) => (
                        <div>
                          {this.gutsOfeditLearning(
                            options,
                            listOfUsers,
                            editLearning,
                            deleteLearning,
                          )}
                        </div>
                      )}
                    </Mutation>
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
              <ReactMarkdown source={this.state.wwl} escapeHtml={false} />
            </span>
          ) : (
            <p>Start typeing above to see preview</p>
          )}
        </Segment>
        <br />
      </Segment>
    );
  }
}

export default EditCondition;
