import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import ConditionCardEdit from './ConditionCardEdit';

class RotationConditionInput extends Component {
  state = {
    conditionToAdd: '',
    showAddCard: false
  };

  componentWillMount() {
    this.props.clearError();
  }

  addClicked = () => {
    this.setState({
      showAddCard: true
    });
  };

  hideAddCard = () => {
    this.setState({
      showAddCard: false
    });
  };

  shouldShowAddCard = () => {
    if (this.state.showAddCard) {
      return <ConditionCardEdit hideCard={this.hideAddCard} />;
    }
  };

  renderAddButton = () => {
    if (this.props.conditions.loadingAddCondition) {
      return (
        <button
          className="green btn-flat white-text"
          style={{ margin: '0 25px' }}
        >
          <div className="preloader-wrapper small active">
            <div className="spinner-layer spinner-yellow-only">
              <div className="circle-clipper left">
                <div className="circle" />
              </div>
              <div className="gap-patch">
                <div className="circle" />
              </div>
              <div className="circle-clipper right">
                <div className="circle" />
              </div>
            </div>
          </div>
        </button>
      );
    }

    return (
      <button
        className="green btn-flat white-text"
        style={{ margin: '0 25px' }}
        onClick={this.addClicked}
      >
        Add
        <i className="material-icons right">add_box</i>
      </button>
    );
  };

  handleKeyPress = e => {
    console.log(e.key);
    if (e.keyCode === 'Enter') {
      this.addClicked();
    }
  };

  render() {
    const { title } = this.props;
    return (
      <div>
        <input
          style={{ width: '250px' }}
          name={title}
          id={title}
          type="text"
          value={this.state.conditionToAdd}
          onKeyPress={this.handleKeyPress}
          onChange={input =>
            this.setState({
              conditionToAdd: input.target.value
            })
          }
          placeholder={`Add condition to ${title}`}
        />
        {this.renderAddButton()}
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
