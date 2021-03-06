import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import { Form, Button, Grid, Segment } from 'semantic-ui-react';
import SigninField from './UserInputField';

const titleStyle = {
  fontFamily: 'Lato',
  fontStyle: 'normal',
  lineHeight: 'normal',
  fontSize: '24px',
  backgroundColor: '#E8F4F7',
  padding: 10,
};

class Signin extends Component {
  handleFormSubmit = ({ username, password }) => {
    this.props.signinUser({
      username: username.toLowerCase(),
      password: username.toLowerCase(),
      history: this.props.history,
    });
  };

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div style={{ marginBottom: '10px', color: 'red' }}>
          <strong>Ooops</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    return (
      <div className="login-form">
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form
              size="large"
              onSubmit={this.props.handleSubmit(this.handleFormSubmit)}
            >
              <Segment.Group stacked>
                <Segment style={titleStyle}>Username (Cerner login)</Segment>
                <Segment>
                  <Field
                    component={SigninField}
                    name="username"
                    placeholder="j12345"
                    autoCapitalize="none"
                  />
                </Segment>
                <Segment>
                  <Button
                    style={{
                      background: '#E8F4DF',
                      fontFamily: 'Lato',
                    }}
                    fluid
                    size="large"
                  >
                    Login
                  </Button>
                </Segment>
              </Segment.Group>
            </Form>
            {this.renderAlert()}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signin', // no fields array given
})(
  connect(
    mapStateToProps,
    actions,
  )(withRouter(Signin)),
);
