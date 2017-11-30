import React, { Component } from 'react';

class RotationConditionInput extends Component {
  state = {
    conditionToAdd: ''
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
        <button
          className="green btn-flat white-text"
          style={{ margin: '0 25px' }}
          onClick={value =>
            console.log(`${title} - ${this.state.conditionToAdd}`)
          }
        >
          Add
        </button>
      </div>
    );
  }
}

export default RotationConditionInput;
