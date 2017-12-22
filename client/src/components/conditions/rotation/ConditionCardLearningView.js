import React from 'react';
import { Card } from 'semantic-ui-react';

const ConditionCardLearningView = ({ seenWith, dateField, whatWasLearned }) => {
  return (
    <Card.Content>
      <Card.Meta>
        Seen With: {seenWith} on {dateField}
      </Card.Meta>
      <Card.Description>
        <span style={{ whiteSpace: 'pre-line' }}>{whatWasLearned}</span>
      </Card.Description>
    </Card.Content>
  );
};

export default ConditionCardLearningView;
