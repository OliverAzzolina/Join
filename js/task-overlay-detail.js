function openTaskDetails(i){
    document.getElementById('overlay').style.display = "flex"; 
    document.getElementById('overlay').innerHTML = generateDetailOverlay(i);
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
    prioDetailImg.src = `/assets/img/prio_${prio}_icon.png`;
}

function renderAssignedToDetail(index){
  let assignedTo = document.getElementById('detailAssignedTo');
  assignedTo.innerHTML = '';
    if(tasks[index]['assignedto'].length > 3){
      checkIfToMuchEditorsDetail(assignedTo, index);
    
    }else {
      notToMuchEditorsDetail(assignedTo, index);
    }
}

function checkIfToMuchEditorsDetail(assignedTo, index){
  for (let i = 0; i < 3; i++) {
    const checkedEditor = tasks[index]['assignedto'][i];
    let initials = checkedEditor.initials;
    let userColor = checkedEditor.userColor;
    let tooMuchEditors = document.getElementById(`toMuchEditors${index}`);
    tooMuchEditors.style.display = 'flex';
    tooMuchEditors.innerHTML = `+${tasks[index]['assignedto'].length - 3}`;
  
    assignedTo.innerHTML += `
    <div id="mini-logo${i}" style="background-color: ${userColor}" class="mini-logo">${initials}</div>
    `;
  }
}

function notToMuchEditorsDetail(assignedTo, index){
  for (let i = 0; i < tasks[index]['assignedto'].length; i++) {
    const checkedEditor = tasks[index]['assignedto'][i];
    let initials = checkedEditor.initials;
    let userColor = checkedEditor.userColor;
    assignedTo.innerHTML += `
    <div id="mini-logo${i}" style="background-color: ${userColor}" class="mini-logo">${initials}</div>
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
    document.getElementById(`detailSub${j}`).src = 'assets/img/check_checked_black.png';
}
  
function setUnChecked(j, i, subTasksDone){
    subTasksDone.checked = false;
    document.getElementById(`detailSub${j}`).src = 'assets/img/check_unchecked.png';
}

function checkIfSubsDone(i){
    for (let j = 0; j < tasks[i]['subTasksDone'].length; j++) {
      const checkedSub = tasks[i]['subTasksDone'][j].checked;
      if(checkedSub == true){
        document.getElementById(`detailSub${j}`).src = 'assets/img/check_checked_black.png'
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
  