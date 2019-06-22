import Collection from './Collection.js';

export default class TODO {
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