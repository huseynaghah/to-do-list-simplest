export class ToDo {
    constructor(content) {
        this.content = content;
    }
    date = new Date();
    checked = false;
}

export class State {
    #state = [];
    // constructor(state) {
    //     this.#state = state ? state : []
    // }

    set data(payload) {
        this.#state.push(payload);
        // localStorage.setItem("state", JSON.stringify(this.#state))
    }

    get data() {
        return this.#state;
    }

    deleteTodo(index) {
        this.#state.splice(index, 1);
        // localStorage.setItem("state", JSON.stringify(this.#state))
    }

    editTodo(payload, index) {

        this.#state[index].content = payload;
        // localStorage.setItem("state", JSON.stringify(this.#state))
    }

    toggleDone(index) {
        this.#state[index].checked = !this.#state[index].checked;
        // localStorage.setItem("state", JSON.stringify(this.#state))
    }

    searchTodo(keyword) {
        let stateAfterSearch = this.#state.filter(todo => {
            return todo.content.toUpperCase().startsWith(keyword.toUpperCase());
        })

        return stateAfterSearch;
    }

    sortByDate(value) {
        let sortedArr;
        switch (value) {
            case "default":
                sortedArr = [...this.#state];
                break;
            case "ntoo":
                sortedArr = this.#state.toSorted((a, b) => a.date - b.date);
                break;
            case "oton":
                sortedArr = this.#state.toSorted((a, b) => b.date - a.date);
                break;
            default:
                sortedArr = [...this.#state];
                break;
        }

        return sortedArr;
    }

    clearState(){
        this.#state = [];        
    }

}