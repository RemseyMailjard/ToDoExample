'use strict'

window.onload = init;

function init(){
    createUserDropdown(); 
    createCategoryDropdown();

    const createToDoForm = document.getElementById("createNewToDoForm");
    createToDoForm.addEventListener("submit", postToDo);

    document.querySelector("#categoryDropdown").addEventListener("input", (input) => {
        document.querySelector("#newToDo").textContent = input.currentTarget.value;
    } )
    document.querySelector("#priorityDropdown").addEventListener("input", (input) => {
        document.querySelector("#newPriority").innerHTML = "<strong>Priority: </strong>" + input.currentTarget.value;
    } )
    document.querySelector("#deadline").addEventListener("input", (input) => {
        document.querySelector("#newDeadline").innerHTML ="<strong>Deadline: </strong>" +  input.currentTarget.value;
    } )
    document.querySelector("#description").addEventListener("input", (input) => {
        document.querySelector("#newDescription").innerHTML ="<strong>Description: </strong>" + input.currentTarget.value;
    } )
}

//TODO Create user Name dropdown
function createUserDropdown(){
    const baseURL = "http://localhost:8083/api/users"
    const userDropdown = document.getElementById("userDropdown");

    fetch(baseURL)
        .then((response) => response.json())
        .then((data) => {
            //*Create options for each name with the name as the text and the id as the value
            data.forEach(data => {
            let userName = document.createElement("option");
            userName.textContent = data.name;
            userName.value = data.id;
            userDropdown.appendChild(userName);
            })
        })
}

//TODO Create category dropdown
function createCategoryDropdown(){
    const baseURL = "http://localhost:8083/api/categories";    
    const categoryDropdown = document.getElementById("categoryDropdown");

    fetch(baseURL)
        .then((response) => response.json())
        .then((data) => {
            //*Create options for each category
            data.forEach(data => {
                let category = document.createElement("option");
                category.textContent = data.name;
                categoryDropdown.appendChild(category)
            })
        })
    }
    
//TODO Post new ToDo to API
function postToDo(event){
    event.preventDefault();
    const categoryDropdown = document.getElementById("categoryDropdown");

    const newToDo = {
        userid: document.getElementById("userDropdown").value,
        category: categoryDropdown.options[categoryDropdown.selectedIndex].text,
        description: document.getElementById("description").value,
        deadline: document.getElementById("deadline").value,
        priority: document.getElementById("priorityDropdown").value,
    }
    console.log(newToDo);
    
    const baseURL = "http://localhost:8083/api/todos";
    fetch(baseURL, {
        method: "POST",
        body: JSON.stringify(newToDo),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((response) => response.json())
    .then((data) => {
        let confirmationMessage = `Success! New ToDo added.`
        // alert(confirmationMessage);
        document.getElementById("confirmationMessage").innerHTML = confirmationMessage;
    })
    .catch(err => {
        let confirmationMessage = document.getElementById("confirmationMessage");
        confirmationMessage.innerHTML = "Unexpected error."
    })
    return false;
}
