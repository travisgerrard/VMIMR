import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

class RotationConditionInput extends Component {
  state = {
    conditionToAdd: ''
  };

  render() {
    const { title, dbname } = this.props;
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
        <button
          className="green btn-flat white-text"
          style={{ margin: '0 25px' }}
          onClick={value =>
            this.props.addCondition(dbname, this.state.conditionToAdd)
          }
        >
          Add
        </button>
      </div>
    );
  }
}

export default connect(null, actions)(RotationConditionInput);
