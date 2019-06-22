export default class Events {
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