import React from 'react';
import RotationTitle from './RotationTitle';
import RotationConditionInput from './RotationConditionInput';

const RotationConditionOverview = ({ title }) => {
  return (
    <div>
      <RotationTitle title={title} />
      <RotationConditionInput title={title} />
    </div>
  );
};

export default RotationConditionOverview;
