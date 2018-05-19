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
  Modal,
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
    modalHeader: 'Add Eastgate Manual Content',
    visible: false,
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
      modalHeader: 'Add Eastgate Manual Content',
    });
  };

  addContentSection = () => {
    if (this.state.addingContent) {
      return (
        <Modal open={this.state.addingContent} size="large">
          <Modal.Header>{this.state.modalHeader}</Modal.Header>
          <Segment>
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
                  this.setState({
                    content: e.target.value,
                    contentError: false,
                  })
                }
                error={this.state.contentError}
              />
              <Form.Group>
                <Form.Button
                  basic
                  onClick={e => this.submitAddContent(e)}
                  color="green"
                >
                  Submit
                </Form.Button>
                <Form.Button basic onClick={() => this.resetDefaults()}>
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
        </Modal>
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
      modalHeader: 'Edit Eastgate Manual Content',
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
                  <span style={{ whiteSpace: 'pre-wrap' }}>
                    <ReactMarkdown source={sectionContent} escapeHtml={false} />
                  </span>
                </section>
              </div>
            );
          },
        )}
      </div>
    );
  };

  changeVisibleMenu = () => {
    this.setState({ visible: !this.state.visible });
  };

  render() {
    const { visible } = this.state;

    return (
      <div>
        <Menu
          as={Menu}
          borderless
          vertical
          style={{
            position: 'fixed',
            top: '75px',
            overflowY: 'auto',
            padding: 0,
            width: visible ? '180px' : '0px',
          }}
        >
          <EastgateNavBar content={this.props.content} />
        </Menu>
        <Segment
          basic
          style={{
            position: 'relative',
            marginLeft: visible ? '190px' : '25px',
          }}
        >
          {this.returnContent()}
          <Divider />
          {this.addContentSection()}
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
        <Button
          size="mini"
          onClick={() => this.changeVisibleMenu()}
          style={{
            top: '80px',
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 5,
            paddingRight: 5,
            position: 'fixed',
            marginLeft: visible ? '180px' : 0,
            float: 'left',
          }}
        >
          {visible ? '<' : '>'}
        </Button>
      </div>
    );
  }
}

export default EastgateManual;
