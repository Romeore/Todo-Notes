import React from 'react';
import {Component} from 'react';
import {Form, FormField, Button, Label, Header, Input, Card, Icon, Container, Segment} from 'semantic-ui-react';
import TodoNote from './TodoNote';
import {observer} from 'mobx-react';
import observableTodoNodes from './ObservableTodoNotes';
import "semantic-ui-css/semantic.min.css";
import Axios from 'axios';

interface IProps {
}

interface IState {
  noteName: string;
}

@observer
export default class App extends Component<IProps,IState> {
    constructor(props: Readonly<IProps>) {
      super(props);
      this.state = {
        noteName:"",
      };

      this.getDataAxios();
    }
    
    async getDataAxios() {
      const response =
        await Axios.get(observableTodoNodes.localHostName);
        observableTodoNodes.notes.replace(response.data);
    } 


    beautifyDate(date:string)
    {
        date = date.replace('T', ' ');
        date = date.replace('Z', ' ');
        date = date.slice(0,19);
        return date;
    }

    render() {
      return (
        <div>
            <Segment inverted>
          <Header as='h2' textAlign="center">
             Todo Notes</Header>
             </Segment>
          <Card centered = {true}>
          {observableTodoNodes.notes.length === 10 && (<Label> you have reached capacity </Label>)}
          <label>
            <Form onSubmit = {event => {
              observableTodoNodes.addNote(this.state.noteName);
              this.setState({noteName:""});
              }}>

              <FormField>
              <Input action='submit'
              value={this.state.noteName}
              onChange={event => {
                this.setState({ noteName: event.target.value });
              }}npm
              placeholder="Insert note name"
            />
              </FormField>
          </Form>
          <br></br>
          
        {observableTodoNodes.notes.map((note) => {
        return (
          <Container>
          <Card centered = {true}>
          <Card.Content>
        <Card.Header>{note.noteName}</Card.Header>
            <Card.Meta>
        <span className='date'>Create date: {this.beautifyDate(note.createDate)}</span>
        <br></br>
            </Card.Meta>
            <Card.Meta>
            <span className='date'>Last update: {(this.beautifyDate(note.lastUpdateDate))}</span>
            </Card.Meta>
            <Card.Description>
            <br></br>
            <Card.Group>
            <TodoNote id = {note._id} />
            </Card.Group>
            <br></br>
            <Button onClick =  {() => {observableTodoNodes.deleteNote(note._id)}} >
              Delete
              </Button>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>

              <Icon name='numbered list' />
              {note.todoNotes.length}
          </Card.Content>
        </Card>
        <br></br>
        </Container>
        
        );
        })}

          </label>
          </Card>
        </div>    
      );
    }
  }
