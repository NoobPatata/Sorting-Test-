let users = [];

window.onload = () => {
    var id = getLatestId();
    document.querySelector("#userID").value = id;
    var list = getLocalStorage();
    loadData(list);
}

const addUser = (ev)=>{

    //prevent form from submitting
    ev.preventDefault();
   
    var userID = getLatestId();
     
    let user = {
        id: parseInt(document.getElementById("userID").value),
        userName: document.getElementById('userName').value,
        occupation: document.getElementById('occupation').value
    }

    if (!validation()) {
        alert('Username or Occupation cannot be empty!');      
    } 
    else if (!startWithAlpha()) {
        alert('Username and occupation must start with alphabet!');
    }
    else {
        
        //push user object into users array
        users.push(user);

        // to clear the form for the next entries
        document.forms[0].reset();

        //Display the next userID after adding new user
        document.querySelector("#userID").value = userID + 1; 
        
        //create local storage named userList
        localStorage.setItem('userList', JSON.stringify(users) );

        var list = getLocalStorage();
        loadData(list);
        
    }
    
}

function getLatestId() {
    var userID;
    //check if local storage exist
    let retrieve = localStorage.getItem("userList");
    
    if (retrieve === null) {
        userID = 1;
        return userID;
    } else {
        var list = JSON.parse(retrieve);
        var length = list.length - 1;
        userID = parseInt(list[length].id) + 1;
        return userID;
    }  

}

function validation() {
    var username = document.getElementById("userName").value;
    var occupation = document.getElementById('occupation').value;

    if (username == '' || occupation == '' ) {
        return false;
    } 
    else {
       return true;
    }
}

function getLocalStorage() {
    let retrieve = localStorage.getItem("userList");
    let list = JSON.parse(retrieve);
    return list;
}

function loadData(list) {
    const tableBody = document.getElementById("tableData");
    let dataHTML = '';

    for (let user of list) {    
        dataHTML += `<tr><td>${user.id}</td><td>${user.userName}</td><td>${user.occupation}</td></tr>`;
    }

    tableBody.innerHTML = dataHTML;
}

document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('btn').addEventListener('click', addUser);
});

function sortColumn() {
    const data = document.getElementById("data").value;
    var list = getLocalStorage();
    const dataType = typeof list[0][data];
    
    switch(data) {
        case 'id' :
            list = sortNumber(data);
            break;
        case 'userName' :
            list = sortString(data);
            break;
        case 'occupation':
            list = sortString(data);
            break;
    }
    loadData(list);
}

function sortNumber(data) {
    var list = getLocalStorage();

    list = list.sort((p1, p2) => {
        return p1[data]- p2[data]
    });

    return list;
}

function sortString(data) {
    var list = getLocalStorage();
    list = list.sort(function(a,b) {
        if(a[data].toLowerCase() < b[data].toLowerCase()) return -1;
        if(a[data].toLowerCase() > b[data].toLowerCase()) return 1;
        return 0
    })

    return list;
}

function startWithAlpha() {
    var name = /^[a-zA-Z]/.test(document.getElementById('userName').value);
    
    var occup = /^[a-zA-Z]/.test(document.getElementById('occupation').value);

    // console.log(name);

    if(name == false || occup == false ) {
        return false 
    } else {
        return true
    }

 
}
