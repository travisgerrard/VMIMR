import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Button,
  Segment,
  Form,
  Message,
  Divider,
  Grid,
  Menu,
  Confirm,
} from 'semantic-ui-react';

import EastgateNavBar from './EastgateNavBar';
import './Eastgate.css';

class EastgateManual extends Component {
  state = {
    id: '12345',
    addingContent: false,
    title: '',
    index: 0,
    content: '',
    error: '',
    formError: false,
    titleError: false,
    indexError: false,
    contentError: false,
    confirmOpen: false,
    idToDelete: '',
  };

  submitAddContent = e => {
    if (this.state.title === '') {
      this.setState({
        error: 'Title cannot be blank',
        titleError: true,
      });
    } else if (this.state.index <= 0) {
      this.setState({
        error: 'Index must be greater than one',
        indexError: true,
      });
    } else if (this.state.content === '') {
      this.setState({
        error: 'Content cannot be blank',
        contentError: true,
      });
    } else {
      this.props.addContent({
        variables: {
          id: this.state.id,
          sectionTitle: this.state.title,
          sectionIndex: this.state.index,
          sectionContent: this.state.content,
          _creator: this.props.currentUserId,
        },
      });
      // Making dangerous assumtion that update/addition worked...
      this.resetDefaults();
    }
  };

  deleteContent = id => {
    this.setState({ confirmOpen: true });
    this.setState({ idToDelete: id });
  };

  resetDefaults = () => {
    this.setState({
      id: '12345',
      addingContent: false,
      title: '',
      index: 0,
      content: '',
      error: '',
      formError: false,
      titleError: false,
      indexError: false,
      contentError: false,
    });
  };

  addContentSection = () => {
    if (this.state.addingContent) {
      return (
        <Segment style={{ marginRight: 25 }}>
          <Form error={this.state.formError} loading={this.props.loading}>
            <Form.Group>
              <Form.Input
                label="Section Title"
                required={true}
                value={this.state.title}
                onChange={e =>
                  this.setState({ title: e.target.value, titleError: false })
                }
                error={this.state.titleError}
              />
              <Form.Input
                required={true}
                label="Section Index"
                type="number"
                min="0"
                step="0.01"
                value={this.state.index}
                onChange={e =>
                  this.setState({ index: e.target.value, indexError: false })
                }
                error={this.state.indexError}
              />
            </Form.Group>
            <Form.TextArea
              required={true}
              label="Section Content"
              value={this.state.content}
              onChange={e =>
                this.setState({ content: e.target.value, contentError: false })
              }
              error={this.state.contentError}
            />
            <Form.Group>
              <Form.Button onClick={e => this.submitAddContent(e)}>
                Submit
              </Form.Button>
              <Form.Button onClick={() => this.resetDefaults()}>
                Cancel
              </Form.Button>
            </Form.Group>
          </Form>
          {this.state.titleError ||
          this.state.indexError ||
          this.state.contentError ? (
            <Message error header="Error" content={this.state.error} />
          ) : (
            <div />
          )}
        </Segment>
      );
    } else {
      return (
        <Button
          primary
          onClick={() =>
            this.setState({
              addingContent: true,
            })
          }
        >
          Add Section
        </Button>
      );
    }
  };

  editSelectedContent = (id, sectionContent, sectionTitle, sectionIndex) => {
    this.setState({
      id,
      addingContent: true,
      title: sectionTitle,
      index: sectionIndex,
      content: sectionContent,
    });
  };

  returnContent = () => {
    return (
      <div>
        {this.props.content.map(
          ({ id, sectionContent, sectionTitle, sectionIndex, _creator }) => {
            return (
              <div key={id} id={sectionIndex}>
                <section id={sectionIndex.toString()}>
                  <Grid style={{ marginBottom: 5, marginTop: 5 }}>
                    <Grid.Column width={8}>
                      <h2>{sectionTitle}</h2>
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <Button
                        size="mini"
                        onClick={() =>
                          this.editSelectedContent(
                            id,
                            sectionContent,
                            sectionTitle,
                            sectionIndex,
                          )
                        }
                      >
                        Edit
                      </Button>
                      {this.props.currentUserId === _creator.id && (
                        <Button
                          size="mini"
                          color="red"
                          onClick={() => this.deleteContent(id)}
                        >
                          Delete
                        </Button>
                      )}
                    </Grid.Column>
                  </Grid>
                  <ReactMarkdown source={sectionContent} />
                </section>
              </div>
            );
          },
        )}
      </div>
    );
  };

  render() {
    return (
      <div>
        <Menu
          as={Menu}
          borderless
          vertical
          style={{
            position: 'fixed',
            top: '0px',
            bottom: '0px',
            overflowY: 'auto',
            width: '180px',
          }}
        >
          <EastgateNavBar content={this.props.content} />
        </Menu>
        <Segment basic style={{ position: 'relative', marginLeft: '200px' }}>
          {this.addContentSection()}
          <Divider />
          {this.returnContent()}
        </Segment>
        <Confirm
          open={this.state.confirmOpen}
          content="Are you sure you want to delete this content?"
          onCancel={() => this.setState({ confirmOpen: false })}
          onConfirm={() => {
            this.props.deleteContent({
              variables: {
                id: this.state.idToDelete,
              },
            });
            this.setState({ confirmOpen: false });
          }}
        />
      </div>
    );
  }
}

export default EastgateManual;
