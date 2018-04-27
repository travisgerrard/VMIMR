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
          primary
          onClick={() => this.props.handleAddButtonPressed}
          style={{ marginBottom: 10 }}
        >
          Add New Learning
        </Button>
        <br />
        <label>Search Learnings</label>
        <br />
        <Input
          type="text"
          placeholder="Search Learnings"
          value={this.props.searchTerm}
          style={{ marginBottom: 10, marginRight: 10 }}
          onChange={this.props.searchTermChanged}
        />
        <br />
        <label>Filter By Rotation</label>
        <br />
        <Select
          style={{ width: '125px', marginBottom: 25 }}
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
