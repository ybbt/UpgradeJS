import Events from './events.js';

export default class Collection extends Events {
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