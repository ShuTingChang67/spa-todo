// Some code snippets have been provided to you for ease of coding.
// You can choose to remove or change any of them to suit your needs.

var outstandingtasks = [];
var finishedtasks = [];
var maxtaskid = 0;

function bootstrap()
{
    // Code for Q7 starts here. This code restores the values
    // of variables to their previous values (i.e., before browser
    // was closed). 

    let out_l = localStorage.getItem("outstanding");
    let finish_l = localStorage.getItem("finished");

    if (out_l !== null) {
        outstandingtasks = JSON.parse(out_l);
    }
    if (finish_l !== null) {
        finishedtasks = JSON.parse(finish_l);
    }
    if (localStorage.getItem("task_id") !== null) {
        maxtaskid = JSON.parse(localStorage.getItem("task_id"));
    }

    if (out_l === "[]" || out_l === null) {
        document.getElementById("displayoutstanding").style.display = "none";
        document.getElementById("clearOBtnDiv").style.display = "none";
    }
    if (finish_l === "[]" || finish_l === null) {
        document.getElementById("displaycompleted").style.display = "none";
        document.getElementById("clearCBtnDiv").style.display = "none";
    }

    // Users can only select from the outstanding tasks list.
    let selectBox = document.getElementById("serialNo");
    for (let j = 0; j < outstandingtasks.length; j++) {
        let text = outstandingtasks[j].s_number + ": " + outstandingtasks[j].name.slice(0, 25);
        let value = outstandingtasks[j].s_number;
        selectBox.options.add(new Option(text, value));
    }
    
    displayfunction();    
    // Code for Q7 ends here.
}

function addfunction()
{
    // Code for Q2 starts here. This function uses DOM read
    // to get the values of HTML fields. Subsequently, it
    // adds them to the JS variable called outstandingtasks. 
    // You are also required to save the contents of this variable
    // in a JS cookie (Q7). 

    document.getElementById("errorMes").style.display = "none";

    if (outstandingtasks.length >= 10) {
        document.getElementById("errorMes").innerHTML = "Outstanding tasks list is already full! Please finish the existing tasks before adding new ones :)";
        document.getElementById("errorMes").style.display = "block";
        return;
    }

    let n = document.getElementById("tname").value; 
    if (n == "") {
        document.getElementById("errorMes").innerHTML = "Name cannot be empty!";
        document.getElementById("errorMes").style.display = "block";
        return;
    }

    let p = document.getElementById("priority").value; 
    if (p == "") {
        document.getElementById("errorMes").innerHTML = "Please select a priority!";
        document.getElementById("errorMes").style.display = "block";
        return;
    }

    let d = document.getElementById("deadline").value; 
    if (d == "") {
        document.getElementById("errorMes").innerHTML = "Please select a date as the deadline!";
        document.getElementById("errorMes").style.display = "block";
        return;
    }
    let today = new Date();
    let input_date = new Date(d);
    if (input_date < today) {
        document.getElementById("errorMes").innerHTML = "The deadline has already passed! Please choose a new date!";
        document.getElementById("errorMes").style.display = "block";
        return;
    }

    let task = {
        s_number: maxtaskid,
        name: n,
        priority: p,
        deadline: d
    };

    outstandingtasks.push(task);
    localStorage.setItem("outstanding", JSON.stringify(outstandingtasks));
    maxtaskid++;
    localStorage.setItem("task_id", maxtaskid);

    let out_l = localStorage.getItem("outstanding");
    if (out_l !== "[]" && out_l !== null) {
        document.getElementById("displayoutstanding").style.display = "block";
        document.getElementById("clearOBtnDiv").style.display = "block";
    }
    
    document.location.reload();
    //Code for Q2 ends here.
    console.log(outstandingtasks);
}

function finishfunction()
{
    // Code for Q3 starts here. This function uses DOM read to
    // get the serial number from the user. Subsequently, it
    // searches/finds the Task matching the serial number and
    // deletes the task from outstandingtasks. Do not forget to
    // add the task to finished tasks before deleting it.

    // document.getElementById("finishErrMes").style.display = "none";
    // let s = document.getElementById("serialNo").value; 
    // if (s == "") {
    //     document.getElementById("finishErrMes").innerHTML = "Please enter a serial number!";
    //     document.getElementById("finishErrMes").style.display = "block";
    //     return;
    // } else if (s >= maxtaskid || s < 0) {
    //     document.getElementById("finishErrMes").innerHTML = "Invalid serial number!";
    //     document.getElementById("finishErrMes").style.display = "block";
    //     return;
    // } 
    // Nothing changes if the number entered belongs to a task already in the completed tasks list.

    let finished_s = parseInt(document.getElementById("serialNo").value);
    for (let i = 0; i < outstandingtasks.length; i++) { 
        if (outstandingtasks[i].s_number === finished_s) {
            console.log("ok");
            finishedtasks.push(outstandingtasks[i]);
            outstandingtasks.splice(i, 1);
            break;
        }
    }
    localStorage.setItem("finished", JSON.stringify(finishedtasks));
    localStorage.setItem("outstanding", JSON.stringify(outstandingtasks));
    
    let finish_l = localStorage.getItem("finished");
    if (finish_l !== "[]" && finish_l !== null) {
        document.getElementById("displaycompleted").style.display = "block";
        document.getElementById("clearCBtnDiv").style.display = "block";
    }

    document.location.reload();
    // Code for Q3 ends.
    console.log(outstandingtasks);
}

function displayfunction()
{
    // Code for Q4 starts here. This function identifies the HTML
    // element corresponding to the Tables for outstanding 
    // and finished tasks. You must create the table by adding rows,
    // columns, and finally populate the text in the table. Code
    // for Outstanding tasks and finished tasks is similar. Use
    // the Demo code used in class as a starting point for table
    // creation using JS.
    
    let o_tbl = document.getElementById("displayoutstanding");
    for (let i = 0; i < outstandingtasks.length; i++)
    {
        let tr = o_tbl.insertRow();
        let td1 = tr.insertCell();
        td1.appendChild(document.createTextNode(outstandingtasks[i].s_number));
        let td2 = tr.insertCell();
        td2.appendChild(document.createTextNode(outstandingtasks[i].name));
        let td3 = tr.insertCell();
        td3.appendChild(document.createTextNode(outstandingtasks[i].priority));
        let td4 = tr.insertCell();
        td4.appendChild(document.createTextNode(outstandingtasks[i].deadline));
        let td5 = tr.insertCell();
        td5.appendChild(document.createTextNode("outstanding"));
    }

    let f_tbl = document.getElementById("displaycompleted");
    for (let i = 0; i < finishedtasks.length; i++)
    {
        let tr = f_tbl.insertRow();
        let td1 = tr.insertCell();
        td1.appendChild(document.createTextNode(finishedtasks[i].s_number));
        let td2 = tr.insertCell();
        td2.appendChild(document.createTextNode(finishedtasks[i].name));
        let td3 = tr.insertCell();
        td3.appendChild(document.createTextNode(finishedtasks[i].priority));
        let td4 = tr.insertCell();
        td4.appendChild(document.createTextNode(finishedtasks[i].deadline));
        let td5 = tr.insertCell();
        td5.appendChild(document.createTextNode("finished"));
    }    
    // Code for Q4 ends.
}

// function restart() 
// {
//     // Allow users to clear everything and restart.

//     localStorage.removeItem("outstanding");
//     localStorage.removeItem("finished");    
//     localStorage.removeItem("task_id");
//     document.location.reload();
// }

function clearOutstand() 
{
    localStorage.removeItem("outstanding");
    localStorage.removeItem("task_id");
    document.location.reload();
}

function clearCompleted() 
{
    localStorage.removeItem("finished");
    document.location.reload();
}
