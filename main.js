let userInput = document.getElementById("user-input")
let inputButton = document.getElementById("input-button")
let tabs = document.querySelectorAll(".task-tabs div")
let underLine = document.getElementById("under-line")

let taskList = [];
let filterList = [];
let mode = 'all'

tabs.forEach(menu => menu.addEventListener("click", (e) => Indicator(e)))
userInput.addEventListener("keydown", function(event) {
    if(event.key === "Enter") {
        inputButton.click();
    }
}
)

inputButton.addEventListener("click", addTask)

for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){filter(event)});
}

function addTask() {
    let task = {
        id: randomIDGenerate(), 
        taskContent : userInput.value,
        isComplete: false
    }
    taskList.push(task)
    console.log(taskList)
    render()
 
}

function render() { 
    let list = [];
    if(mode === "all"){
     list = taskList; 
    }else {
     list = filterList 
    }

    let resultHTML = '';
    for(let i = 0; i<list.length; i++){
        if(list[i].isComplete == true){
            resultHTML+=`<div class="task"> 
                    <div class="task-done"> 
                     ${list[i].taskContent}
                    </div>
                    <div>
                        <button onclick="toggleComplete('${list[i].id}')"> Check </button>
                        <button onclick="deleteTask('${list[i].id}')"> Delete </button>
                    </div>
                </div>`
        }else {
        resultHTML += ` <div class="task"> 
                    <div> 
                     ${list[i].taskContent}
                    </div>
                    <div>
                        <button onclick="toggleComplete('${list[i].id}')"> Check </button>
                        <button  onclick="toggleComplete('${list[i].id}')"> Delete </button>
                    </div>
                </div>`
    }
    }

    document.getElementById("task-board").innerHTML = resultHTML; 
}


function toggleComplete(id) {
   for(let i=0; i<taskList.length; i++){
    if(taskList[i].id == id){
        taskList[i].isComplete = !taskList[i].isComplete;
        break;
    }
   }
   render();
}

function deleteTask(id) {
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;a
        }
       }

       filter({ target: { id: mode } });
}

function filter(event) {
  mode = event.target.id;
  filterList = [];
  if(mode === "all"){
   render();
  }else if(mode === "ongoing"){
   for(let i=0; i<taskList.length; i++){
    if(taskList[i].isComplete === false){
      filterList.push(taskList[i]) 
    }
   }render();
  }else if(mode === "done"){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].isComplete === true){
            filterList.push(taskList[i])
        }
  }render(); 
}
}

function Indicator(e) {
    underLine.style.left = e.currentTarget.offsetLeft + "px";
    underLine.style.width = e.currentTarget.offsetWidth + "px";
    underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight - 4 + "px"
}


function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}