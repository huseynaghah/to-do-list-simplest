export class ToDo {
    constructor(content) {
        this.content = content;
    }
    date = moment().format('MMM Do YY, h:mm a');
    checked = false;
}

export class State {
    #state;
    constructor(state) {
        this.#state = state ? state : []
    }

    set data(payload) {
        this.#state.push(payload);
        localStorage.setItem("state", JSON.stringify(this.#state))
    }

    get data(){
        return this.#state;
    }

    deleteTodo(index) {
        this.#state.splice(index, 1);
        localStorage.setItem("state", JSON.stringify(this.#state))
    }

    editTodo(payload, index) {
        
        
        this.#state[index].content = payload;
        localStorage.setItem("state", JSON.stringify(this.#state))
    }

    toggleDone(index){
        this.#state[index].checked = ! this.#state[index].checked;
        localStorage.setItem("state", JSON.stringify(this.#state))
    }

}