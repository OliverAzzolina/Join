function openTaskDetails(i){
    document.getElementById('overlay').style.display = "flex"; 
    document.getElementById('overlay').innerHTML = generateOverlay(i);
    setPrioDetailImg(i);
    checkOverlayCategory(i);
    renderDetailSubtasks(i);
    checkIfSubsDone(i);
    renderAssignedToDetail(i);
    slideOutOverlay(i);
}

function closeDetailCard(){
    document.getElementById('overlay').style.display = "none";
}

function checkOverlayCategory(i){
    let category = tasks[i]["category"];
    if(category == 'User Story'){
      document.getElementById(`overlay-category${i}`).style.backgroundColor = "rgb(0,56,255)";
    }
    if(category == 'Technical Task'){
      document.getElementById(`overlay-category${i}`).style.backgroundColor = "rgb(31,215,193)";
    }
}

function setPrioDetailImg(i){
    let prioDetailImg = document.getElementById(`prioDetailImg${i}`);
    let prio = tasks[i]['prio'];
    prioDetailImg.src = `/assets/img/icons/${prio}.png`;
}

function renderAssignedToDetail(index){
    let showAssignedEditors = document.getElementById('detailAssignedTo');
  
    for (let i = 0; i < tasks[index]['assignedto'].length; i++) {
      const checkedEditor = tasks[index]['assignedto'][i]['initials'];
      let randomColor = tasks[index]['assignedto'][i]['randomColor'];
      let name = tasks[index]['assignedto'][i]['name'];
        showAssignedEditors.innerHTML += `
        <div class="detail-name-initials"><div id="editor${i}" class="drop-initials" style="background-color: ${randomColor}">${checkedEditor}</div><span>${name}</span></div>
        `;
    }
}
  

function renderDetailSubtasks(i){
    let detailSub = document.getElementById(`checklistSubDetail`);
    detailSub.innerHTML = '';
  
      for (let j = 0; j < tasks[i]["subtasks"].length; j++) {
        let subtask = tasks[i]["subtasks"][j];
        detailSub.innerHTML += generateDetailSubtasks(i, j, subtask);
      } // j = subtask index & i = task index
}

function checkIfSubChecked(j, i){
    let subtask = tasks[i]['subtasks'][j];
    let subTasksDone = tasks[i]['subTasksDone'][j];
    if(subTasksDone.checked == false){
      setChecked(j, i, subTasksDone)
    }else{
      setUnChecked(j, i, subTasksDone)
    }
    
    generateSubtasks(i, j);
    updateDoneSubs(i);
    setItem('tasks', JSON.stringify(tasks));
    refreshTasks();
    renderTasks();
}

function setChecked(j, i, subTasksDone){
    subTasksDone.checked = true;
    document.getElementById(`detailSub${j}`).src = '/assets/img/icons/check_button_checked_bl.png';
}
  
function setUnChecked(j, i, subTasksDone){
    subTasksDone.checked = false;
    document.getElementById(`detailSub${j}`).src = '/assets/img/icons/check_button.png';
}

function checkIfSubsDone(i){
    for (let j = 0; j < tasks[i]['subTasksDone'].length; j++) {
      const checkedSub = tasks[i]['subTasksDone'][j].checked;
      if(checkedSub == true){
        document.getElementById(`detailSub${j}`).src = '/assets/img/icons/check_button_checked_bl.png'
      }
    }
}

function deleteTask(i){
    tasks.splice(i, 1);
    closeDetailCard();
    setItem('tasks', JSON.stringify(tasks));
    refreshTasks();
    renderTasks();
  }
  