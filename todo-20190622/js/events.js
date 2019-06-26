export default class Events {
    #listeners = {};

    on(event, fn){
        if (this.#listeners[event] == undefined) {
            this.#listeners[event] = [];
        }
        this.#listeners[event].push(fn);
    }

    trigger(event){       
        this.#listeners[event].forEach(fn => fn());
    }
}