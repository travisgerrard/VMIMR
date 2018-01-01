import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import ConditionCardEdit from './ConditionCardEdit';
import { Input } from 'semantic-ui-react';

class RotationConditionInput extends Component {
  componentWillMount() {
    this.props.clearError();
    this.props.clearSearchTerm();
  }

  addClicked = () => {
    this.props.showAddCard();
  };

  hideAddCard = () => {
    this.props.hideAddCard();
  };

  shouldShowAddCard = () => {
    if (this.props.conditions.showAddCard) {
      return <ConditionCardEdit hideCard={this.hideAddCard} />;
    }
  };

  renderInputButton = () => {
    if (this.props.conditions.showAddButton) {
      // <Button primary onClick={this.addClicked}>
      //   Add
      // </Button>
      return (
        <Input
          action={{
            color: 'teal',
            labelPosition: 'right',
            icon: 'add square',
            content: 'Add',
            onClick: this.addClicked
          }}
          placeholder="Search for condition"
          size="large"
          value={this.props.conditions.searchTerm}
          onChange={(params, data) => {
            this.searchBoxChanged(data.value);
          }}
        />
      );
    } else {
      return (
        <Input
          placeholder="Search for condition"
          size="large"
          value={this.props.conditions.searchTerm}
          onChange={(params, data) => {
            this.searchBoxChanged(data.value);
          }}
        />
      );
    }
  };

  searchBoxChanged = inputBoxValue => {
    this.props.changeSearchTerm(inputBoxValue);
  };

  render() {
    return (
      <div>
        {this.renderInputButton()}
        <div className="red-text" style={{ marginBottom: '20px' }}>
          {this.props.conditions.error}
        </div>
        {this.shouldShowAddCard()}
        <br />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, actions)(RotationConditionInput);
