import React from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import _ from 'lodash';

const RotationDropDown = ({ onChange, multiple, placeholder, users }) => {
  const options = _.map(users, ({ name, _id }) => {
    return { key: name, text: name, value: _id };
  });

  return (
    <Dropdown
      placeholder={placeholder}
      multiple={multiple}
      search
      selection
      options={options}
      onChange={onChange}
    />
  );
};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(RotationDropDown);
