import React from 'react';
import {Component} from 'react';
import {Checkbox, Form, FormField, Label, Input} from 'semantic-ui-react';
import observableTodoNodes from './ObservableTodoNotes';
import "semantic-ui-css/semantic.min.css";

interface IProps {
  id: number;
}

interface IState {
  todoNoteName: string;
  isChecked: boolean;
}

export default class TodoNote extends Component<IProps,IState> {
    constructor(props: Readonly<IProps>) {
      super(props);  
      this.state = {
        todoNoteName: "",
        isChecked: false
      };
    }

    render() {
      return (
        <div className='ui input'>
          <label>
            <Form onSubmit = {event => {
              observableTodoNodes.addTodoNote(this.props.id, this.state.todoNoteName);
              this.setState({todoNoteName:""}); }}>

              <FormField>
              <Input action='submit' size='mini'
              value={this.state.todoNoteName}
              onChange={event => {
                this.setState({ todoNoteName: event.target.value });
              }}
              placeholder="Insert todo name"
            />
              </FormField>
              
          </Form>

        {observableTodoNodes.findNote(this.props.id)?.todoNotes.map((note) => {
        return (
          <div >
            <br></br>
            <Checkbox onChange = {element => {
              this.setState({isChecked: !this.state.isChecked});
            }}/>
            <Label size = 'small'>{note}</Label>
            </div>
        );
        })}

          </label>
        </div>    
      );
    }
  }
