import React, { Component } from 'react';
import RotationTitle from './RotationTitle';
import RotationConditionInput from './RotationConditionInput';

class RotationConditionOverview extends Component {
  shouldRenderInput(title) {
    if (title !== 'All') {
      return <RotationConditionInput title={title} />;
    }
  }

  render() {
    const { title } = this.props;
    return (
      <div>
        <RotationTitle title={title} />
        {this.shouldRenderInput(title)}
      </div>
    );
  }
}

export default RotationConditionOverview;
