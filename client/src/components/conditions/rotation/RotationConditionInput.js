import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

class RotationConditionInput extends Component {
  state = {
    conditionToAdd: ''
  };

  componentWillMount() {
    this.props.clearError();
  }

  addClicked = () => {
    this.props.addCondition(this.props.dbname, this.state.conditionToAdd);
    this.setState({
      conditionToAdd: ''
    });
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, actions)(RotationConditionInput);
