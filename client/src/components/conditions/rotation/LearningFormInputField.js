import React from 'react';
import { Form } from 'semantic-ui-react';

export default ({
  input,
  label,
  placeholder,
  defaultValue,
  meta: { error, touched }
}) => {
  return (
    <Form.Input
      label="Attending"
      placeholder="Ex: Baliga"
      value={this.state.seenWith}
      onChange={(params, data) =>
        this.setState({
          seenWith: data.value
        })
      }
    />
    <Form.Input
      {...input}
      label={label}
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
  );
};
