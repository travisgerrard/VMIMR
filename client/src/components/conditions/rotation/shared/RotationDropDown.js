import React from 'react';
import rotations from '../../rotations';
import { Dropdown } from 'semantic-ui-react';
import _ from 'lodash';

const RotationDropDown = ({
  onChange,
  multiple,
  placeholder,
  defaultValue
}) => {
  const options = _.map(rotations, ({ name, dbname }) => {
    return { key: name, text: name, value: dbname };
  });

  return (
    <Dropdown
      placeholder={placeholder}
      multiple={multiple}
      search
      selection
      defaultValue={defaultValue ? defaultValue : ''}
      options={
        multiple
          ? options
          : [{ key: 'All', text: 'All', value: 'all' }, ...options]
      }
      onChange={onChange}
    />
  );
};

export default RotationDropDown;
