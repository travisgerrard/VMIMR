import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Container, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import UserInputField from './UserInputField';
import UserCheckboxField from './UserCheckboxField';
import * as actions from '../../actions';

class ModifyUser extends Component {
  componentWillMount() {
    var name,
      username,
      email = '';
    var admin = false;
    if (this.props.users[this.props.match.params.id] !== undefined) {
      ({ name, username, email, admin } = this.props.users[
        this.props.match.params.id
      ]);
    }
    this.props.initialize({
      name,
      username,
      email,
      admin,
      id: this.props.match.params.id
    });
  }

  render() {
    return (
      <Container>
        <Form>
          <Field
            component={UserInputField}
            label="name"
            name="name"
            placeholder="Name"
          />
          <Field
            component={UserInputField}
            label="username"
            name="username"
            placeholder="Username"
          />
          <Field
            component={UserInputField}
            label="email"
            name="email"
            placeholder="Email"
          />
          <Field
            component={UserCheckboxField}
            type="checkbox"
            name="admin"
            label="Is Admin"
          />
          <Form.Group>
            <Form.Button
              color="green"
              onClick={() =>
                this.props.submitUser(
                  this.props.form.userForm.values,
                  this.props.history
                )
              }
            >
              Save
            </Form.Button>
            <Link to="/users" style={{ color: 'white' }}>
              <Form.Button color="red">Cancel</Form.Button>
            </Link>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}

function mapStateToProps(state, ownProps) {
  //console.log(state.form.userForm);
  return state;
}

ModifyUser = connect(mapStateToProps, actions)(ModifyUser);

export default reduxForm({
  form: 'userForm' // a unique name for this form
})(ModifyUser);
