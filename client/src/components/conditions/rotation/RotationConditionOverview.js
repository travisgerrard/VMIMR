import React from 'react';
import RotationConditionInput from './RotationConditionInput';
import RotationConditionList from './RotationConditionList';

const RotationConditionOverview = ({ title }) => {
  return (
    <div>
      <RotationConditionInput title={title} />
      <RotationConditionList title={title} />
    </div>
  );
};

export default RotationConditionOverview;
