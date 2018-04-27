// Add condition Button, search box, and filter drop down

import React, { Component } from 'react';
import { Select, Input, Button } from 'semantic-ui-react';
import rotations from '../conditions/rotations';
import _ from 'lodash';

class SearchBox extends Component {
  render() {
    const options = _.map(rotations, ({ name, dbname }) => {
      return { key: name, text: name, value: dbname };
    });

    return (
      <div>
        <Button
          fluid
          primary
          style={{ marginBottom: 10 }}
          onClick={this.props.handleAddButtonPressed}
        >
          Add New Learning
        </Button>
        <label>Search Learnings</label>
        <Input
          style={{ marginBottom: 10 }}
          type="text"
          fluid
          placeholder="Search Learnings"
          value={this.props.searchTerm}
          onChange={this.props.searchTermChanged}
        />
        <label>Filter By Rotation</label>
        <Select
          fluid
          style={{ marginBottom: 25 }}
          options={[{ key: 'All', text: 'All', value: 'all' }, ...options]}
          defaultValue="all"
          search
          compact
          onChange={this.props.handleCategoryChanged}
        />
      </div>
    );
  }
}

export default SearchBox;
