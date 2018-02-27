import React, { Component } from 'react';
import {
  Card,
  Icon,
  Image,
  Input,
  Button,
  Label,
  Message
} from 'semantic-ui-react';
import ConditionCardLearningView from './ConditionCardLearningView';
import ConditionCardPostEdit from './ConditionCardPostEdit';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

import RotationDropDown from './shared/RotationDropDown';
import _ from 'lodash';

class ConditionCardView extends Component {
  state = {
    addingLearning: false,
    editingHeader: false,
    conditionHeaderName: '',
    conditionHeaderTags: [],
    error: ''
  };

  // This is hack so that when new learning added, resets this var
  componentWillReceiveProps(nextProps) {
    this.setState({
      addingLearning: false
    });
  }

  conditionLearnings = () => {
    if (this.props.condition._learnings.length > 0) {
      return _.map(this.props.condition._learnings, learning => {
        return (
          <ConditionCardLearningView
            {...learning}
            key={learning._id}
            learningId={learning._id}
            canEdit={this.props.canEdit}
          />
        );
      });
    }
  };

  addingLearningToTrue = () => {
    this.setState({
      addingLearning: true
    });
  };

  addingLearningToFalse = () => {
    this.setState({
      addingLearning: false
    });
  };

  editingHeaderToTrue = () => {
    this.setState({
      editingHeader: true,
      conditionHeaderName: this.props.condition.condition,
      conditionHeaderTags: this.props.condition.tags
    });
  };

  editingHeaderToFalse = () => {
    this.setState({
      editingHeader: false
    });
  };

  editLearning = () => {
    if (this.state.addingLearning) {
      return (
        <Card.Content>
          <ConditionCardPostEdit
            cancelLearning={this.addingLearningToFalse}
            conditionId={this.props.conditionId}
          />
        </Card.Content>
      );
    } else {
      return (
        <Card.Content extra>
          <Image floated="left" style={{ margin: '0px' }}>
            <Icon
              name="add"
              style={{ cursor: 'pointer', color: '#00824d' }}
              onClick={this.addingLearningToTrue}
            />
          </Image>
          <Image floated="right">
            <Link to={`/conditions/condition/${this.props.conditionId}`}>
              <Icon
                name="expand"
                style={{ cursor: 'pointer', color: '#00824d' }}
              />
            </Link>
          </Image>
        </Card.Content>
      );
    }
  };

  doesNameExists = conditionName => {
    if (conditionName === this.props.condition.condition) return false;
    const doesNameExists = _.some(this.props.conditions.allConditions, {
      condition: conditionName
    });
    return doesNameExists;
  };

  saveHeaderChanges = () => {
    const { conditionHeaderName } = this.state;
    if (conditionHeaderName === '') {
      this.setState({
        error: `Can't save: condition can't be blank`
      });
    } else if (this.state.conditionHeaderTags.length === 0) {
      this.setState({
        error: `Can't save: need at least one tag`
      });
    } else if (this.doesNameExists(conditionHeaderName)) {
      this.setState({
        error: `Can't save: condition name already exists`
      });
    } else {
      console.log('Saving changes');
      this.props.updateCondition({
        condition: this.state.conditionHeaderName,
        tags: this.state.conditionHeaderTags,
        conditionId: this.props.condition._id
      });
      this.setState({
        error: ''
      });
      this.editingHeaderToFalse();
    }
  };

  cancelHeaderChanges = () => {
    this.editingHeaderToFalse();
  };

  doesConditionHaveLearning = () => {
    if (this.props.condition._learnings.length > 0) return true;
    return false;
  };

  deleteCondition = () => {
    if (this.doesConditionHaveLearning()) {
      this.setState({
        error: `Can't delete condition with learning`
      });
    } else {
      this.props.deleteCondition(this.props.condition._id);
      this.setState({
        error: ''
      });
    }
  };

  showErrorMessage = () => {
    if (this.state.error) {
      return (
        <Message negative size="tiny" onDismiss={this.clearError}>
          <Message.Header>{`${this.state.error}`}</Message.Header>
        </Message>
      );
    }
  };

  cardHeader = () => {
    if (this.state.editingHeader) {
      return (
        <Card.Content style={{ background: '#E5F5DD' }}>
          {this.showErrorMessage()}
          <Label>Condition</Label>
          <Input
            value={this.state.conditionHeaderName}
            onChange={(params, data) =>
              this.setState({
                conditionHeaderName: data.value
              })
            }
          />
          <Label>Tags</Label>
          <RotationDropDown
            multiple={true}
            inline={false}
            defaultValue={this.state.conditionHeaderTags}
            onChange={(params, data) =>
              this.setState({
                conditionHeaderTags: data.value
              })
            }
          />
          <div className="ui three buttons" style={{ marginTop: 15 }}>
            <Button
              basic
              color="green"
              onClick={() => this.saveHeaderChanges()}
            >
              Save
            </Button>
            <Button
              basic
              color="grey"
              onClick={() => this.cancelHeaderChanges()}
            >
              Cancel
            </Button>
            <Button basic color="red" onClick={() => this.deleteCondition()}>
              Delete
            </Button>
          </div>
        </Card.Content>
      );
    } else {
      return (
        <Card.Content style={{ background: '#E5F5DD' }}>
          {this.showEdit()}
          <Card.Header>{this.props.condition.condition}</Card.Header>
          <Card.Meta>Tags: {this.props.condition.tags.join(', ')}</Card.Meta>
        </Card.Content>
      );
    }
  };

  showEdit = () => {
    const didUserCreate =
      this.props.condition._creator === this.props.auth.userDetails.sub;
    if (didUserCreate && this.props.canEdit) {
      return (
        <Image floated="right">
          <Icon
            name="edit"
            style={{ cursor: 'pointer', color: '#00824d' }}
            onClick={() => this.editingHeaderToTrue()}
          />
        </Image>
      );
    }
  };

  render() {
    return (
      <Card centered>
        {this.cardHeader()}
        {this.conditionLearnings()}
        {this.editLearning()}
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, actions)(ConditionCardView);
