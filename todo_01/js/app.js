// const TEMPLATE_TODO = document.querySelector('#tplToDoList').content;
// const TEMPLATE_LI = document.querySelector('#tplItem').content;

// function initialize() {
//     let template = TEMPLATE_TODO.cloneNode(true);
//     template.querySelector('#buttonAdd').addEventListener('click', addTask);

//     document.body.appendChild(template);
// }

function addTask() {
    let template = TEMPLATE_LI.cloneNode(true);

    template.querySelector('._text').innerText = document.querySelector('#taskValue').value;
    document.querySelector('#taskValue').value = '';
    template.querySelector('._delete').onclick = function () {
        this.closest('li').remove();
    }

    document.querySelector('#tasksIncompleted').appendChild(template);
}

function ToDoList(name, contSelector) {

    const TEMPLATE_TODO = document.querySelector('#tplToDoList').content;
    const TEMPLATE_LI = document.querySelector('#tplItem').content;

    initialize();

    function initialize() {
        let template = TEMPLATE_TODO.cloneNode(true);
        template.querySelector('#buttonAdd').addEventListener('click', addTask);
        let tmplUl = template.querySelector('#tasksIncompleted');
        tmplUl.id += name;
        
        // let tmplt = template.querySelector('#tplToDoList');
        // tmplt.id += name;
        
        template.querySelector('.container').classList.add('_container'+name);
        template.querySelector('._taskValue').classList.add('_taskValue'+name);
        var container = null;
        if (contSelector!=undefined) {
            container = document.querySelector(contSelector);
        } else {
            container = document.body;
        }
        container.appendChild(template);
    }

    function addTask() {
        let template = TEMPLATE_LI.cloneNode(true);
// console.log( document.querySelector('._taskValue'));



        template.querySelector('._text').innerText = document.querySelector('._taskValue'+name).value;
        document.querySelector('._taskValue'+name).value = '';
        template.querySelector('._delete').onclick = function () {
            this.closest('li').remove();
        }

        document.querySelector('#tasksIncompleted'+name).appendChild(template);
    }
}

// initialize();

let toDoListFirst = new ToDoList("First");
// toDoListFirst.initialize();

let toDoListSecond = new ToDoList("Second", ".example");