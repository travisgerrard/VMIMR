import React from 'react';
import { Button, Card, Input, Form, TextArea } from 'semantic-ui-react';
import UserDropDown from './shared/UserDropDown';

const LearningEdit = ({
  attendingLabel,
  dateLabel,
  attendingValue,
  dateValue,
  wwlValue,
  multiple,
  attendingPlaceholder,
  userPlaceholder,
  wwlPlaceholder,
  attendingOnChange,
  dateOnChange,
  userOnChange,
  wwlOnChange,
  saveOnClick,
  cancelOnClick,
  deleteOnClick,
  showDeleteButton
}) => {
  var deleteButton;
  if (showDeleteButton) {
    deleteButton = (
      <Button basic color="red" onClick={deleteOnClick}>
        Delete
      </Button>
    );
  }

  return (
    <Card.Content>
      <Input
        label={attendingLabel}
        placeholder={attendingPlaceholder}
        value={attendingValue}
        onChange={attendingOnChange}
      />
      <Input label={dateLabel} value={dateValue} onChange={dateOnChange} />
      <UserDropDown
        multiple={multiple}
        onChange={userOnChange}
        placeholder={userPlaceholder}
      />
      <Form>
        <TextArea
          autoHeight
          placeholder={wwlPlaceholder}
          value={wwlValue}
          onChange={wwlOnChange}
        />
      </Form>
      <div className="ui three buttons">
        <Button basic color="green" onClick={saveOnClick}>
          Save
        </Button>
        <Button basic color="grey" onClick={cancelOnClick}>
          Cancel
        </Button>
        {deleteButton}
      </div>
    </Card.Content>
  );
};

export default LearningEdit;
