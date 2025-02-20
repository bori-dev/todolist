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
        userInput.value = "";
    }
}
)

inputButton.addEventListener("click", addTask)
   

for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){filter(event)});
}

function addTask() {
    let taskValue = userInput.value;
    if(taskValue === "") return alert ("할일을 입력해주세요")
    let task = {
        id: randomIDGenerate(), 
        taskContent : userInput.value,
        isComplete: false
    }
    taskList.push(task)
    console.log(taskList)
    render()

    userInput.value = "";
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
            resultHTML+=`
                    <div class="task-done task"> 
                     ${list[i].taskContent}
                    <div>
                        <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-left"></i></button>
                        <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>`
        }else {
        resultHTML += ` <div class="task"> 
                    <div> 
                     ${list[i].taskContent}
                    </div>
                    <div>
                        <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
                        <button  onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
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
   if (mode === 'all') {
    render(); 
} else {
    filter({ target: { id: mode } }); 
}
}

function deleteTask(id) {
    // taskList에서 해당 id를 가진 아이템을 삭제
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList.splice(i, 1); // 해당 아이템 삭제
            break;
        }
    }

    // 삭제 후 바로 화면 갱신
    if (mode === 'all') {
        render(); // 전체 리스트 렌더링
    } else if (mode === 'ongoing') {
        filter({ target: { id: 'ongoing' } }); // ongoing 상태로 필터링 후 렌더링
    } else if (mode === 'done') {
        filter({ target: { id: 'done' } }); // done 상태로 필터링 후 렌더링
    }
}


function filter(event) {
  mode = event.target.id;
  filterList = [];
  if(mode === "ongoing"){
   for(let i=0; i<taskList.length; i++){
    if(taskList[i].isComplete === false){
      filterList.push(taskList[i]) 
    }
   }
  }else if(mode === "done"){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].isComplete === true){
            filterList.push(taskList[i])
        }
  }
}
render(); 
}

function Indicator(e) {
    underLine.style.left = e.currentTarget.offsetLeft + "px";
    underLine.style.width = e.currentTarget.offsetWidth + "px";
    underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight - 4 + "px"
}


function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
