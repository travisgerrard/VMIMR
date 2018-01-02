import React, { Component } from 'react';
import {
  Button,
  Card,
  Input,
  Form,
  TextArea,
  Icon,
  Image
} from 'semantic-ui-react';
import RotationDropDown from './shared/RotationDropDown';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

class ConditionCardView extends Component {
  state = {
    conditionToAdd: this.props.conditions.searchTerm,
    tags: '',
    seenWith: '',
    date: moment().format('MM/DD/YY'),
    whatWasLearned: ''
  };

  saveCondition = () => {
    this.props.addCondition({
      condition: this.state.conditionToAdd,
      tags: this.state.tags,
      learning: {
        seenWith: this.state.seenWith,
        tag: this.state.tags,
        date: this.state.date,
        whatWasLearned: this.state.whatWasLearned
      }
    });
  };

  render() {
    return (
      <Card fluid>
        <Card.Content>
          <Input
            label="Condition"
            placeholder="Ex: ARDS"
            value={this.state.conditionToAdd}
            onChange={(params, data) =>
              this.setState({
                conditionToAdd: data.value
              })
            }
          />
          <Image floated="right">
            <Icon
              name="remove"
              color="grey"
              style={{ cursor: 'pointer' }}
              onClick={this.props.hideCard}
            />
          </Image>
          <RotationDropDown
            multiple={true}
            inline={false}
            placeholder="Tags"
            onChange={(params, data) =>
              this.setState({
                tags: data.value
              })
            }
          />
        </Card.Content>
        <Card.Content>
          <Input
            label="Attending"
            placeholder="Ex: Baliga"
            value={this.state.seenWith}
            onChange={(params, data) =>
              this.setState({
                seenWith: data.value
              })
            }
          />
          <Input
            label="Date"
            value={this.state.date}
            onChange={(params, data) =>
              this.setState({
                date: data.value
              })
            }
          />

          <Form>
            <TextArea
              autoHeight
              placeholder="What was learned"
              value={this.state.whatWasLearned}
              onChange={(params, data) =>
                this.setState({
                  whatWasLearned: data.value
                })
              }
            />
          </Form>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button basic color="green" onClick={this.saveCondition}>
              Save
            </Button>
            <Button basic color="red">
              Cancel
            </Button>
          </div>
        </Card.Content>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, actions)(ConditionCardView);
