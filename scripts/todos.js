"use strict"

window.onload = init;

function init(){
    createUserDropdown();

}

//TODO Create user dropdown with the Names and IDs
function createUserDropdown(){
    const baseURL = "http://localhost:8083/api/users"

    fetch(baseURL)
        .then((response) => response.json())
        .then((data) =>{
            const userDropdownLocation = document.getElementById("userDropdownDiv");

            //*Create form
            const userSelectForm = document.createElement("form");
            userSelectForm.id = "userSelectForm";
            userDropdownLocation.appendChild(userSelectForm);
            //*Create dropdown
            const userDropdown = document.createElement("select");
            userDropdown.id = "userDropdown"
            userSelectForm.appendChild(userDropdown);
            //*Create form button
            const userSelectBtn = document.createElement("button");
            userSelectBtn.textContent = "Search ToDos";
            userSelectBtn.classList.add("button-33", "ms-2")
            userSelectForm.appendChild(userSelectBtn);
            
            //*Create options for dropdown
            data.forEach(data => {
                let userName = document.createElement("option")
                userName.textContent = data.name;
                userName.value = data.id;
                userDropdown.appendChild(userName);
            });

            //*Submit event listener for ToDo form to display tasks for selected user
            userSelectForm.addEventListener("submit", fetchToDoData);
        });
}

//TODO Fetch all user ToDo Data
function fetchToDoData(event){
    event.preventDefault();

    const baseURL = "http://localhost:8083/api/todos/";
    fetch(baseURL)
        .then((response) => response.json())
        .then((data) => displayData(data));
}

//TODO Display the fetched data
function displayData(data){
    const displayDiv = document.getElementById("displayToDoDiv");
    const userDropdown = document.getElementById("userDropdown");
    const nameSelectValue = userDropdown.value;

    //*Find the task that matches the selected option based on id
    let matching = data.filter(data => data.userid == nameSelectValue);

    //*Extract the correct ToDo data
    let message = "";
    matching.forEach(matching => {

    const category = matching.category;
    const description = matching.description;
    const deadline = matching.deadline;
    const priority = matching.priority;
    const completed = matching.completed;

    //*Completed icons
    let completeIcon = "";
    let addClass = "";
    if(completed === true){
        completeIcon = `<i class="bi bi-journal-check"></i> Complete`;
        addClass = "complete"

    }
    else{
        completeIcon = `<i class="bi bi-journal-x"></i> Incomplete`;
        addClass = "incomplete"
    }

    //* ToDo Card with correct task 
    message += `
    <div class="card m-2" style="width: 18rem;">
        <div class="card-body ${addClass}">
        <h5 class="card-title">${category}</h5>
        <h6 class="card-subtitle mb-2 text-muted"><strong>Priority: </strong>${priority}</h6>
        <p>Deadline: ${deadline}</p>
        <p class="card-text">${description}</p>
        Status: ${completeIcon}
        </div>
    </div>
    `;
})
    //*Display ToDo card
    displayDiv.innerHTML = message;
}