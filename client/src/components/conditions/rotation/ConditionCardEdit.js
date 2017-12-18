import React, { Component } from 'react';
import {
  Button,
  Card,
  Input,
  Dropdown,
  Form,
  TextArea
} from 'semantic-ui-react';
import rotations from '../rotations';
import moment from 'moment';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

class ConditionCardView extends Component {
  state = {
    conditionToAdd: '',
    tags: '',
    seenWith: '',
    date: moment().format('MM/DD/YY'),
    whatWasLearned: ''
  };

  multiSelectOptions() {
    var options = _.map(rotations, ({ name, dbname }) => {
      return { key: name, text: name, value: dbname };
    });
    return options;
  }

  saveCondition = () => {
    this.props.addCondition({
      condition: this.state.conditionToAdd,
      tags: this.state.tags,
      seenWith: this.state.seenWith,
      date: this.state.date,
      whatWasLearned: this.state.whatWasLearned
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
          <Dropdown
            placeholder="Tags"
            fluid
            multiple
            search
            selection
            options={this.multiSelectOptions()}
            onChange={(params, data) =>
              this.setState({
                tags: data.value
              })
            }
          />
        </Card.Content>
        <Card.Content>
          <Input
            label="Seen With"
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
export default connect(null, actions)(ConditionCardView);
