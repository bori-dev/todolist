let userInput = document.getElementById("user-input")
let inputButton = document.getElementById("input-button")
let taskList = []


inputButton.addEventListener("click", addTask)


function addTask() {
    let taskContent = userInput.value;
    taskList.push(taskContent)
    render()
 
}

function render() {
    let resultHTML = '';
    for(let i = 0; i<taskList.length; i++){
        resultHTML += ` <div class="task"> 
                    <div> 
                     ${taskList[i]}
                    </div>
                    <div>
                        <button> Check </button>
                        <button> Delete </button>
                    </div>
                </div>`
    }

    document.getElementById("task-board").innerHTML = resultHTML; 

}

