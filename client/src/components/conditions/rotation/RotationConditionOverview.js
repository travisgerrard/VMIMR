import React from 'react';
import RotationTitle from './RotationTitle';
import RotationConditionInput from './RotationConditionInput';

const RotationConditionOverview = ({ title, dbname }) => {
  return (
    <div>
      <RotationTitle title={title} />
      <RotationConditionInput title={title} dbname={dbname} />
    </div>
  );
};

export default RotationConditionOverview;
