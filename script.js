// Define UI element
let from = document.querySelector('#task_form');
let taskInput = document.querySelector('#add_task');
let showingTask = document.querySelector('ol');
let clearBtn = document.querySelector('#clear_task_btn');
let filter = document.querySelector('#filter_task');


// // Define Event listeners
from.addEventListener('submit', addTask);
showingTask.addEventListener('click', removeList);
clearBtn.addEventListener('click', clearTask);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTasks);

// Define function
// Add task
function addTask(e) {

    if (taskInput.value == '') {
        alert("Please enter the Task!!");
    } else {
        // Create li item inside ordered list
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + " "));
        // Create link inside list
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'X';
        li.appendChild(link);

        showingTask.appendChild(li);

        // Save Task Local Storage
        storeTaskInLocalStorage(taskInput.value);

        taskInput.value = '';
    }
    e.preventDefault();
}


// Remove List Task
function removeList(e) {
    if (e.target.hasAttribute('href')) {
        if (confirm("Are you sure remove item?")) {
            let ele = e.target.parentElement;
            ele.remove();

            // Remove Item in Local Storage
            removeFromLS(ele);
        }
    }
}


// Clear All Task 
function clearTask(e) {
    // 1st Way
    // showingTask.innerHTML = " ";

    // 2nd Way & Faster Way
    while (showingTask.firstChild) {
        showingTask.removeChild(showingTask.firstChild);
    }

    // Full Task list Clear From document
    if (confirm("Are you sure clear Full Task list??")) {
        localStorage.clear();
    }
}


// Filtering Task
function filterTask(e) {
    let text = e.target.value.toLowerCase();

    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}



// Storage Task in Local Storage
function storeTaskInLocalStorage(task) {
    let tasks;

    if (localStorage.getItem('tasks') == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function getTasks(e) {
    let tasks;

    if (localStorage.getItem('tasks') == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " "));
        // Create link inside list
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'X';
        li.appendChild(link);

        showingTask.appendChild(li);
    });
}


// Remove Item from Local Storage
function removeFromLS(taskItem) {
    let tasks;

    if (localStorage.getItem('tasks') == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let li = taskItem;
    li.removeChild(li.lastChild);

    tasks.forEach((task, index) => {
        if (li.textContent.trim() === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}