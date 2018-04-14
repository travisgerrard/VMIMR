import React, { Component } from 'react';
import { Button, Select, Input } from 'semantic-ui-react';
import rotations from '../conditions/rotations';
import _ from 'lodash';

class SearchBox extends Component {
  render() {
    const options = _.map(rotations, ({ name, dbname }) => {
      return { key: name, text: name, value: dbname };
    });

    return (
      <Input
        type="text"
        placeholder="Search/Add Condition"
        value={this.props.searchTerm}
        action
        style={{ marginBottom: 25 }}
        onChange={this.props.searchTermChanged}
      >
        <input />
        <Select
          options={[{ key: 'All', text: 'All', value: 'all' }, ...options]}
          defaultValue="all"
        />
        <Button disabled={true} type="submit">
          Add Learning
        </Button>
      </Input>
    );
  }
}

export default SearchBox;
