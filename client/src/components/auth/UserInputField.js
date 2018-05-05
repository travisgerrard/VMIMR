import React from 'react';
import { Form } from 'semantic-ui-react';

export default ({
  input,
  label,
  placeholder,
  type,
  defaultValue,
  meta: { error, touched },
}) => {
  return (
    <Form.Input
      {...input}
      label={label}
      placeholder={placeholder}
      defaultValue={defaultValue}
      type={type ? type : 'text'}
    />
  );
};
