//select dom elements
const input=document.getElementById('todo-input')
const addbtn=document.getElementById('add-btn')
const list=document.getElementById('todo-list')

//try to load saved todos from local storage(if any)
const saved=localStorage.getItem('todos');
const todos=saved? JSON.parse(saved) : [];

function saveTodos(){
    //save current todo arrays to current local storage
    localStorage.setItem('todos', JSON.stringify(todos));
}

// create a dom node for a todo object and append it to list
function createTodoNode(todo,index){
   const li=document.createElement('li')
   //checkbox to toggle completion
   const checkbox=document.createElement('input');
   checkbox.type='checkbox';
   checkbox.checked=!!todo.completed;
   checkbox.addEventListener("change", ()=>{
    todo.completed=checkbox.checked;
    if(todo.completed){
        textspan.style.textDecoration = "line-through";
    } else {
        textspan.style.textDecoration = "none";
    }
    //TODO:visual feedback:strike-through when completed
    saveTodos();
   })
   //text of the todo
   const textspan=document.createElement("span");
   textspan.textContent=todo.text;
   textspan.style.margin='0 8px';
   if(todo.completed){
    textspan.style.textDecoration='line-through';
   }
    // add double click event listener to edit todo
    textspan.addEventListener("dblclick",()=>{
         const newText=prompt("edit todo",todo.text);
         if(newText !== null){
            todo.text= newText.trim()
            textspan.textContent=todo.text;
            saveTodos();
         }
    })
    // delete todo button
    const delBtn=document.createElement('button');
    delBtn.textContent="delete";
    delBtn.addEventListener('click', ()=>{
        todos.splice(index, 1);
        render();
        saveTodos();
    })
    li.appendChild(checkbox);
    li.appendChild(textspan);
    li.appendChild(delBtn);
    return li
   }

//render  the whole todo list from todos array
function render(){
   list.innerHTML='';
   //recreate each item
   todos.forEach((todo,index) => {
    const node= createTodoNode(todo,index);
    list.appendChild(node)
   });
}
function addTodo(){
    const text=input.value.trim();
    if(!text){
        return
    }
    // push a new todo object
    todos.push({text,completed:false});
    input.value='';
    render()
    saveTodos()
}
addbtn.addEventListener("click",addTodo);
render();