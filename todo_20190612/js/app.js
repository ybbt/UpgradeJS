function TODO () {

    // this is a model    const LIST = [];
    const MODEL = new Collection();
    const TEMPLATE_TODO = document.querySelector('#tplToDoList').content;
    const TEMPLATE_LI = document.querySelector('#tplItem').content;

    const TEMPLATE_CURRENT = TEMPLATE_TODO.cloneNode(true);

    const TASK_VALUE = TEMPLATE_CURRENT.querySelector('#taskValue');
    const TASKS = TEMPLATE_CURRENT.querySelector('#tasksIncompleted')

    function render(list) {
        TASKS.innerHTML = '';
        /* LIST */list.forEach((el, i) => {
            const TEMPLATE_CURRENT = TEMPLATE_LI.cloneNode(true);
            TEMPLATE_CURRENT.querySelector('._text').innerText = el;
            TEMPLATE_CURRENT.querySelector('._li').dataset.index = i;
            TASKS.appendChild(TEMPLATE_CURRENT);
        });
    }

    this.addTask = function (){
        // LIST.push(TASK_VALUE.value);
        MODEL.add(TASK_VALUE.value);
        // render();
    }

    this.removeTask = function(index) {
        // LIST.splice(index, 1);
        MODEL.remove(index);
        // render();
    }
    
    MODEL.onChange(render);

    TEMPLATE_CURRENT.querySelector('#buttonAdd').addEventListener('click', this.addTask);
    TASKS.addEventListener('click', function(e) {
        if (e.target.classList.contains('_delete')) {
            this.removeTask(e.target.closest('._li').dataset.index);
        }
    }.bind(this));

    document.body.appendChild(TEMPLATE_CURRENT);
}

function Collection (){
    const LIST = [];

    let render = null;

    const LIST_OBSERVER = new EventObserver();

    this.add = function(itemList){
        LIST.push(itemList);
        // render();
        LIST_OBSERVER.broadcast(LIST);
    }

    this.remove = function(index){
        LIST.splice(index, 1);
        // render();
        LIST_OBSERVER.broadcast(LIST);
    }

    // this.getList = function(){
    //     return LIST;
    // }

    this.onChange = function(fn){
        LIST_OBSERVER.subscribe(fn);
    }
}

// class EventObserver {
//     constructor () {
//         this.observers = []
//     }

//     subscribe (fn) {
//         this.observers.push(fn)
//     }

//     unsubscribe (fn) {
//         this.observers = this.observers.filter(subscriber => subscriber !== fn)
//     }

//     broadcast (data) {
//         this.observers.forEach(subscriber => subscriber(data))
//     }
// }

function EventObserver(){

    let observers = []

    this.subscribe = function(fn) {
        observers.push(fn)
    }

    this.unsubscribe = function(fn) {
        observers = this.observers.filter(subscriber => subscriber !== fn)
    }

   this.broadcast = function(data) {
        observers.forEach(subscriber => subscriber(data))
    }
}

new TODO();