import React, { Component } from 'react';
import {
  Segment,
  Input,
  Select,
  TextArea,
  Form,
  Loader,
  Button,
} from 'semantic-ui-react';
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
    error: [],
  };

  cancelClicked = () => {
    this.props.cancelAddingcondition();
  };

  deleteClicked = () => {};

  gutsOfeditLearning = (options, listOfUsers, editLearning, deleteLearning) => {
    return (
      <div>
        <Segment.Group stacked>
          <Segment>
            <Input
              label="Name"
              placeholder="Ex: ARDS"
              value={this.state.conditionTitle}
              onChange={(params, data) =>
                this.setState({ conditionTitle: data.value })
              }
            />
            <Select
              options={options}
              search
              multiple
              placeholder="Rotation tags"
              defaultValue={this.state.tags}
              onChange={(params, data) => this.setState({ tags: data.value })}
            />
          </Segment>
          <Segment>
            <Input
              label="Attending"
              placeholder="Ex: Baliga"
              value={this.state.attending}
              onChange={(params, data) =>
                this.setState({ attending: data.value })
              }
            />
            <Input
              label="Date"
              placeholder=""
              value={this.state.date}
              onChange={(params, data) => this.setState({ date: data.value })}
            />
            <Select
              options={listOfUsers}
              search
              multiple
              placeholder="Learned With"
              defaultValue={this.state.userTags}
              onChange={(params, data) =>
                this.setState({ userTags: data.value })
              }
            />
            <Form>
              <TextArea
                style={{ marginTop: 10 }}
                placeholder="What was learned"
                value={this.state.wwl}
                onChange={(params, data) => this.setState({ wwl: data.value })}
              />
            </Form>
          </Segment>
          <Segment>
            <div className="ui three buttons">
              <Button
                basic
                color="green"
                onClick={() => {
                  editLearning({
                    variables: {
                      id: this.props.learning.id,
                      condition: this.state.conditionTitle,
                      tags: this.state.tags,
                      attending: this.state.attending,
                      date: this.state.date,
                      userTags: this.state.userTags,
                      wwl: this.state.wwl,
                    },
                  });
                }}
              >
                Save
              </Button>
              <Button basic color="grey" onClick={() => this.cancelClicked()}>
                Cancel
              </Button>
              <Button
                basic
                color="red"
                onClick={() => {
                  deleteLearning({
                    variables: {
                      id: this.props.learning.id,
                    },
                  });
                }}
              >
                Delete
              </Button>
            </div>
          </Segment>
        </Segment.Group>
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
                          )}
                          {loading && <Loader active inline="centered" />}
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
                  refetchQueries={[{ query: GET_ALL_LEARNING }]}
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
            <ReactMarkdown source={this.state.wwl} />
          ) : (
            <p>Start typeing above to see preview</p>
          )}
        </Segment>
        <br />
      </div>
    );
  }
}

export default EditCondition;
