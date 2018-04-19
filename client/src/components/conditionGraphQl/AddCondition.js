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
import moment from 'moment';
import _ from 'lodash';
import { Query, Mutation } from 'react-apollo';
import rotations from '../conditions/rotations';
import ReactMarkdown from 'react-markdown';
import './markdown.css';
import LIST_ALL_USERS from '../../queries/ListOfAllUsers';
import ADD_LEARNING from '../../mutations/AddLearning';

class AddCondition extends Component {
  state = {
    conditionTitle: this.props.conditionTitle,
    tags: '',
    attending: '',
    date: moment().format('MM/DD/YY'),
    userTags: '',
    wwl: '',
  };

  saveClicked = () => {
    console.log(
      `conditionTitle: ${this.state.conditionTitle}, tags: ${
        this.state.tags
      }, attending: ${this.state.attending}, date: ${
        this.state.date
      }, userTags: ${this.state.userTags}, wwl: ${
        this.state.wwl
      }, conditionTitle: ${this.state.conditionTitle},  `,
    );
  };

  cancelClicked = () => {
    console.log('cancel clicked');
  };

  render() {
    const options = _.map(rotations, ({ name, dbname }) => {
      return { key: name, text: name, value: dbname };
    });

    return (
      <Query query={LIST_ALL_USERS}>
        {({ loading, error, data }) => {
          if (loading) return <Loader active inline="centered" />;
          if (error) return `Error! ${error.message}`;

          const listOfUsers = _.map(data.listOfUsers, ({ name, id }) => {
            return { key: id, text: name, value: id };
          });

          return (
            <Mutation mutation={ADD_LEARNING}>
              {(addLearning, { data }) => (
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
                        onChange={(params, data) =>
                          this.setState({ tags: data.value })
                        }
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
                        onChange={(params, data) =>
                          this.setState({ date: data.value })
                        }
                      />
                      <Select
                        options={listOfUsers}
                        search
                        multiple
                        placeholder="Learned With"
                        onChange={(params, data) =>
                          this.setState({ userTags: data.value })
                        }
                      />
                      <Form>
                        <TextArea
                          placeholder="What was learned"
                          value={this.state.wwl}
                          onChange={(params, data) =>
                            this.setState({ wwl: data.value })
                          }
                        />
                      </Form>
                      <div className="ui two buttons">
                        <Button
                          basic
                          color="green"
                          onClick={() => {
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
                            this.props.doneAddingLearning();
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          basic
                          color="grey"
                          onClick={() => this.cancelClicked()}
                        >
                          Cancel
                        </Button>
                      </div>
                    </Segment>
                  </Segment.Group>
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
                    You can add a photo if you know an address it can be found
                    by by typing:{' '}
                    <b>
                      ![Text that describes photo](http://www.aphoto.com/aPhoto)
                    </b>
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
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default AddCondition;
