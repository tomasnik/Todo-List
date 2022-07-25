let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const taskList = document.getElementById("task-list");
const input = document.getElementById("input-task");
const addButton = document.getElementById("add-task-button");

renderTasks();

addButton.addEventListener("click", () => {
    addTask(input.value);
    renderTasks();
});

function addTask(text) {
    const task = {
        id: Date.now(),
        todo: text,
        completed: false
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
}

function renderTasks() {
    taskList.replaceChildren();
    for (let task of tasks) {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            console.log(task.completed);
        });

        const span = document.createElement("span");
        span.setAttribute("class", "task");
        span.appendChild(document.createTextNode(task.todo));

        const button = document.createElement("button");
        button.setAttribute("class", "delete-btn");
        button.addEventListener("click", () => {
            tasks.splice(tasks.indexOf(task), 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(button);

        taskList.appendChild(li);
    }
}

