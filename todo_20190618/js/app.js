// 'use strict'
// function Events() {
//     const LISTENERS = {};

//     this.on = function (event, fn){
//         if (!LISTENERS[event]) {
//             LISTENERS[event] = [];
//         }
//         LISTENERS[event].push(fn);
//     }

//     this.trigger = function (event){
//         LISTENERS[event].forEach(fn => fn());
//     }

// }

class Events {
    #LISTENERS = {};

    on(event, fn){
        if (this.#LISTENERS[event] == undefined) {
            this.#LISTENERS[event] = [];
        }
        this.#LISTENERS[event].push(fn);
    }

    trigger(event){       
        this.#LISTENERS[event].forEach(fn => fn());
    }
}

class Collection extends Events {
    #LIST = [];
    static #INSTANCE;

    add(string) {
        this.#LIST.push(string);
        this.trigger('change');
    }

    remove(index) {
        this.#LIST.splice(index, 1);
        this.trigger('change');
    }

    getList() {
        return this.#LIST.slice();
    }
    
    static getInstance(){
        if(this.#INSTANCE){
            return this.#INSTANCE;
        }

        return this.#INSTANCE = new Collection();
    }
}





// function Collection() {
//     const LIST = [];
//     const INSTANCE = this;

//     this.add = function(string) {
//         LIST.push(string);
//         this.trigger('change');
//     }

//     this.remove = function(index) {
//         LIST.splice(index, 1);
//         this.trigger('change');
//     }

//     this.getList = function() {
//         return LIST.slice();
//     }

//     Collection = function () {
//         return INSTANCE;
//     }
// }
// Collection.prototype = new Events();

class TODO {
    #MODEL = Collection.getInstance();
    #TEMPLATE_TODO = document.querySelector('#tplToDoList').content;
    #TEMPLATE_LI = document.querySelector('#tplItem').content;
    #TEMPLATE_CURRENT = this.#TEMPLATE_TODO.cloneNode(true);
    #TASK_VALUE = this.#TEMPLATE_CURRENT.querySelector('#taskValue');
    #TASKS = this.#TEMPLATE_CURRENT.querySelector('#tasksIncompleted')

    constructor(){
        this.#TEMPLATE_CURRENT.querySelector('#buttonAdd').addEventListener('click', this.addTask.bind(this));
        this.#TASKS.addEventListener('click', function(e) {
            if (e.target.classList.contains('_delete')) {
                this.removeTask(e.target.closest('._li').dataset.index);
            }
        }.bind(this));

    document.body.appendChild(this.#TEMPLATE_CURRENT);
    
    this.#MODEL.on('change', this.render.bind(this));
    }

    render() {
        this.#TASKS.innerHTML = '';
        this.#MODEL.getList().forEach((el, i) => {
            const TEMPLATE_CURRENT = this.#TEMPLATE_LI.cloneNode(true);
            TEMPLATE_CURRENT.querySelector('._text').innerText = el;
            TEMPLATE_CURRENT.querySelector('._li').dataset.index = i;
            this.#TASKS.appendChild(TEMPLATE_CURRENT);
        });
    }

    addTask(){
        this.#MODEL.add(this.#TASK_VALUE.value);
    }

    removeTask(index) {
        this.#MODEL.remove(index);
    }
}

// function TODO () {

//     // this is a model
//     const MODEL = Collection.getInstance();
//     const TEMPLATE_TODO = document.querySelector('#tplToDoList').content;
//     const TEMPLATE_LI = document.querySelector('#tplItem').content;

//     const TEMPLATE_CURRENT = TEMPLATE_TODO.cloneNode(true);

//     const TASK_VALUE = TEMPLATE_CURRENT.querySelector('#taskValue');
//     const TASKS = TEMPLATE_CURRENT.querySelector('#tasksIncompleted')

//     function render() {
//         TASKS.innerHTML = '';
//         MODEL.getList().forEach((el, i) => {
//             const TEMPLATE_CURRENT = TEMPLATE_LI.cloneNode(true);
//             TEMPLATE_CURRENT.querySelector('._text').innerText = el;
//             TEMPLATE_CURRENT.querySelector('._li').dataset.index = i;
//             TASKS.appendChild(TEMPLATE_CURRENT);
//         });
//     }

//     this.addTask = function (){
//         MODEL.add(TASK_VALUE.value);
//     }

//     this.removeTask = function(index) {
//         MODEL.remove(index);
//     }

//     TEMPLATE_CURRENT.querySelector('#buttonAdd').addEventListener('click', this.addTask);
//     TASKS.addEventListener('click', function(e) {
//         if (e.target.classList.contains('_delete')) {
//             this.removeTask(e.target.closest('._li').dataset.index);
//         }
//     }.bind(this));

//     document.body.appendChild(TEMPLATE_CURRENT);
//     MODEL.on('change', render);
    
// }

new TODO();
new TODO();