export class ToDo {
    constructor(content){
        this.content = content;
    }
    date = moment().format('MMM Do YY, h:mm a');
    checked = false;
}