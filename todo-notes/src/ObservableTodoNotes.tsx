import { observable, IObservableArray} from "mobx"
import Note from './Note';
import Axios from 'axios';

export class ObservableTodoNodes {
    @observable notes:IObservableArray<Note>=observable([])
    @observable numOfTodoNotes = 0
    @observable localHostName = 'http://localhost:5000/notes/'

    async addNote(name:string)
    {
        if(observableTodoNodes.notes.length < 10)
        {   
        await Axios.post(
            this.localHostName,
            {noteName: name }
            );
        const response =
        await Axios.get(this.localHostName);
        observableTodoNodes.notes.replace(response.data);
        }
        return;
    }

    findNote(id:number)
    {
        return observableTodoNodes.notes.find(note => {return note._id === id});
    }

    async addTodoNote(id:number, name:string) {
        const currectNote = this.findNote(id); 
        currectNote?.todoNotes.push(name);
        await Axios.patch(this.localHostName + currectNote?._id, 
        {
            todoNotes: currectNote?.todoNotes}
        );
        return;
    }

    deleteNote(id:number) {
        Axios.delete(this.localHostName + id);
        observableTodoNodes.notes.replace(observableTodoNodes.notes.filter(note => {return note._id !== id}));
        return;
    }
}

const observableTodoNodes = new ObservableTodoNodes();

export default observableTodoNodes;