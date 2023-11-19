let todos = [
  {
    title: "Titel",
    description: "Hier kommt die Beschriebung hin",
    assignedto: [],
    duedate: "",
    prio: "Medium",
    category: "User Story",
    subtasks: [],
    status: "In progress",
  },
];

function renderTodos() {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i]["status"] == "In progress") {
      document.getElementById("in-progress-container").innerHTML += generateTodo(i);
    }
  }
}

function generateTodo(i){
    return `<div id="todo-card${i}" class="todo-card" onclick="openTodoDetails(${i})">
    <p>${todos[i]["category"]}</p>
    <p>${todos[i]["title"]}</p>
    <p>${todos[i]["description"]}</p>
    <p>${todos[i]["subtasks"]}</p>
    </div>
    `;
}

//function openTodoDetails(i){
//
//}

//drag&drop