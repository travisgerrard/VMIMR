import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import {
  Form,
  Container,
  Button,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from 'semantic-ui-react';
import SigninField from '../users/UserInputField';

class Signin extends Component {
  handleFormSubmit = ({ username, password }) => {
    this.props.signinUser({
      username,
      password: username,
      history: this.props.history
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
            <Header as="h2" style={{ color: '#50B4DA' }} textAlign="center">
              Log-in to your account
            </Header>
            <Form
              size="large"
              onSubmit={this.props.handleSubmit(this.handleFormSubmit)}
            >
              <Segment stacked>
                <Field
                  component={SigninField}
                  label="Username (what you use to login to cerner)"
                  name="username"
                  placeholder="j12345"
                  autoCapitalize="none"
                />

                <Button style={{ background: '#E8F4DF' }} fluid size="large">
                  Login
                </Button>
              </Segment>
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
  form: 'signin' // no fields array given
})(connect(mapStateToProps, actions)(withRouter(Signin)));
