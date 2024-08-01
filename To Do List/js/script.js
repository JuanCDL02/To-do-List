// Seleção de elementod
const todoForm = document.querySelector("#todo-form");// a constante todoForm seleciona no documento o elemento #todo-form
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");


let oldInputValue; //valor antigo

//Funções
const savetodo = (Text) => {
    const todo = document.createElement("div") //cria uma div
    todo.classList.add("todo"); //adiciona a class "todo" na div

    const todotitle = document.createElement("h3") // cria o elemento H3
    todotitle.innerText = Text // adiciona text ao h3
    todo.appendChild(todotitle); // coloca h3 dentro da div 

    const doneBtn = document.createElement("button") //cria um botão
    doneBtn.classList.add("finish-todo") //adiciona class ao botão 
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>' //adiciona html ao botão (icon)
    todo.appendChild(doneBtn);//coloca o botão na div

    const editBtn = document.createElement("button") //cria um botão
    editBtn.classList.add("edit-todo") //adiciona class ao botão 
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>' //adiciona html ao botão (icon)
    todo.appendChild(editBtn);//coloca o botão na div

    const deleteBtn = document.createElement("button") //cria um botão
    deleteBtn.classList.add("remove-todo") //adiciona class ao botão 
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>' //adiciona html ao botão (icon)
    todo.appendChild(deleteBtn);//coloca o botão na div

    todoList.appendChild(todo);//adiciona toda a função no todolist

    todoInput.value = ""//limpa a barra
    todoInput.focus(); //mantem a seleção
};

const toggleForms = () =>{ //a função adiciona ou remove Hide na class dos elementos -- se houver remove se não houver adiciona
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
    
};

const updateTodo = (Text) =>{

    const todos = document.querySelectorAll(".todo"); // seleciona todos todo do documento

    todos.forEach((todo) =>{ //para cada todo

        let todoTitle= todo.querySelector("h3"); //seleciona o h3 do todo atual
        
        if(todoTitle.innerText === oldInputValue){// se o titulo for igual ao antigo
            todoTitle.innerText = Text;// recebe o novo titulo
        }
    })
}

//Eventos
todoForm.addEventListener("submit", (e) => {//aciona o evento ao clicar no botão "submit"

    e.preventDefault();

    const inputValue = todoInput.value;// a const inputValue é o valor colocado no todoInput(barra que o usuario preenche)

    if(inputValue) {//se houver valor no inputValue
    savetodo(inputValue)//então execulta a função savetodo com o valor do inputValue(escolhido pelo usuario)
}
});

document.addEventListener("click", (e) =>{// quando clicar em algum botão ativ a função

    const targetEl= e.target;//marca o elemento selecionado
    const parentEl= targetEl.closest("div");//escolhe o pai mais proximo que seja "div" do elemento selecionado
    let todoTitle;

    if(parentEl && parentEl.querySelector("h3")){//verifica se o elemento tem uma div e se tem h3
        todoTitle = parentEl.querySelector("h3").innerText; // então o valor do elemento h3 vai ser o texto inserido
    }

    if(targetEl.classList.contains("finish-todo")){// ve se o elemento clicado contem a class finish-todo
        parentEl.classList.toggle("done");   //se tiver a class adiciona done ao pai mais proximo (div)   -- toggle: troca a class (coloca e tira) 
    }

    if(targetEl.classList.contains("remove-todo")){// se tiver a class remove-todo
        parentEl.remove();// remove a div
    }

    if(targetEl.classList.contains("edit-todo")){// se tiver a class edit-todo
        toggleForms();// faz a troca do hide

        editInput.value = todoTitle // recebe novo titulo dado pelo usuario
        oldInputValue= todoTitle // guarda o antigo valor 
    }
});

cancelEditBtn.addEventListener("click", (e) =>{//cancela a ação de editar
   e.preventDefault();
   
   toggleForms();
});

editForm.addEventListener("submit", (e) =>{
    e.preventDefault()

    const editInputValue = editInput.value //salva o valor editado pelo usuario 

    if(editInputValue){//verifica se há valor editado
        updateTodo(editInputValue)//adiciona o valor do input
    }

    toggleForms();
})