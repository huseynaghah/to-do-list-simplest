import { ToDo } from "./todoModel.js";

const input = document.querySelector("#todoInput");
const addBtn = document.querySelector("#add");
const wrapper = document.querySelector(".todoWrapper");
const counterSpan = document.querySelector("#counterSpan");

const todoArray = JSON.parse(localStorage.getItem("state")) || [];




addBtn.addEventListener('click', () => {
    if (!input.value.trim()) {
        alert("Write Something!");
        return;
    }

    todoArray.push(new ToDo(input.value));
    localStorage.setItem("state", JSON.stringify(todoArray))


    input.value = "";

    renderTodo();


})


const renderTodo = () => {
    // wrapper.innerHTML = "";

    // todoArray.forEach((element) => {
    //     wrapper.innerHTML += `<div class="toDo">
    //                                 <input type="checkbox">
    //                                  <p>${element}</p>
    //                                 <div>
    //                                     <button>Delete</button>
    //                                     <button>Edit</button>
    //                                 </div>

    //                          </div>`
    // })

    wrapper.innerHTML = todoArray.map((element, i) => {
        return `<div class="toDo" data-index=${i}>
                                 <input type="checkbox" ${element.checked ? "checked" : ""} class="chks">
                                 <p style="text-decoration : ${element.checked ? "line-through" : ""}">${element.content}</p>
                                 <i>${element.date}</i>
                                   <div>
                                       <button class="delBtn">Delete</button>
                                        <button class="editBtn">Edit</button>
                                    </div>

                             </div>`
    }).join("");

    const delBtns = document.querySelectorAll(".delBtn");

    delBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            let index = e.target.parentElement.parentElement.dataset.index;

            todoArray.splice(index, 1);
            localStorage.setItem("state", JSON.stringify(todoArray))

            renderTodo();


        })
    })

    const editBtn = document.querySelectorAll(".editBtn");

    editBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            let index = e.target.parentElement.parentElement.dataset.index;

            (async () => {
                const inputValue = todoArray[index].content;
                const { value: newValue } = await Swal.fire({
                    title: "Change your to do!",
                    input: "text",
                    inputValue,
                    showCancelButton: true,
                    inputValidator: (value) => {
                        if (!value) {
                            return "You need to write something!";
                        }
                    }
                });
                if (newValue) {
                    todoArray[index].content = newValue;
                    localStorage.setItem("state", JSON.stringify(todoArray))
                    Swal.fire(`To Do successfully changed!`);
                    renderTodo();
                }
            }
            )();

        })


    })

    const chks = document.querySelectorAll(".chks");

    chks.forEach((checks)=>{
        checks.addEventListener('change',(e)=>{
            let index = e.target.parentElement.dataset.index;

            todoArray[index].checked = ! todoArray[index].checked;
            localStorage.setItem("state", JSON.stringify(todoArray))

            renderTodo()
        })
    })




    counterSpan.textContent = todoArray.length;


    console.log(todoArray);
    

}

renderTodo();