// ConditionCardLearningView
// Controls if learningView is in edit mode or not
import React, { Component } from 'react';
import ConditionCardPostEdit from './ConditionCardPostEdit';
import NormalCardConditionLearningView from './NormalCardConditionLearningView';

class ConditionCardLearningView extends Component {
  state = {
    editing: false
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      editing: false
    });
  }

  editingToTrue = () => {
    this.setState({
      editing: true
    });
  };

  editingToFalse = () => {
    this.setState({
      editing: false
    });
  };

  render() {
    if (this.state.editing) {
      return (
        <ConditionCardPostEdit
          {...this.props}
          cancelLearning={this.editingToFalse}
          learningId={this.props.learningId}
        />
      );
    } else {
      return (
        <NormalCardConditionLearningView
          {...this.props}
          editLearning={this.editingToTrue}
        />
      );
    }
  }
}

export default ConditionCardLearningView;
