import React from 'react';
import { Checkbox } from 'semantic-ui-react';

export default ({ input, label, type, meta: { error, touched } }) => {
  return (
    <Checkbox
      {...input}
      label={label}
      checked={input.value ? true : false}
      onChange={(e, { checked }) => input.onChange(checked)}
    />
  );
};
