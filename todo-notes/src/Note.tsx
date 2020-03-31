
export default class Note {
    _id:number = 0;
    noteName:string = "";
    todoNotes:string[] = [];
    createDate:string;
    lastUpdateDate:string;

    constructor(_id:number, noteName:string, createDate:string, lastUpdateDate:string) {
        this._id = _id;
        this.noteName = noteName;
        this.createDate = createDate;
        this.lastUpdateDate = lastUpdateDate;
    }
}