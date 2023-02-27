getData();

const container = document.querySelector("#container");
const todoInput = document.querySelector("#todo");
const descriptionInput = document.querySelector("#description");
const list = document.querySelector("#todo-list")
const addBtn = document.querySelector("#add-btn");
const idInput = document.querySelector("#id-input");
const idTodo = document.querySelector("#id-todo");
const searchBtn = document.querySelector("#search-button")


addBtn.addEventListener("click", addNewTodo);
searchBtn.addEventListener("click", getTodo);


function getData()
{

    var url = "https://localhost:7124/api/Todos";

    fetch(url)
    .then((res) => res.json())
    .then(displayData);

}
function displayData(data)
{
    list.innerHTML = "";

    data.forEach((d) => {
        let element = `<li class="todo-item">${d.todo}`;
        const removeSymbol = `<span onClick="removeTodo(event.target.id)" id="${d.id}" class="removeSymbol"> [X]</span></li>`;
        const editText = `<span onClick = "editTodo(event.target.id)" id="${d.id}" class="editText"> [edit] </span>`

        element += editText;
        element += removeSymbol;

        list.innerHTML += element;
    });
}

function getTodo()
{
    fetch(`https://localhost:7124/api/Todos/${idInput.value}`)
    .then((res) => res.json())
    .then(displayTodo); 
}

function displayTodo(data)
{
    idTodo.innerText = data.todo;
    idInput.value = "";
}

function addNewTodo(e)
{
    const newTodo = {
        todo: todoInput.value,
        description: descriptionInput.value,
        isCompleted: false
    };

    fetch("https://localhost:7124/api/Todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  })
    .then((res) => getData)
    .catch((err) => console.log(err));
}

function editTodo(targetId)
{
    fetch(`https://localhost:7124/api/Todos/${targetId}`, {
    method: "PUT",
    })
}

function removeTodo(targetId)
{
    fetch(`https://localhost:7124/api/Todos/${targetId}`, {
    method: "DELETE",
  })
    .then((res) => getData)
    .catch((err) => console.log(err)); 
}

