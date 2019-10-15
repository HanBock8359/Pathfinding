class PQElement {
    constructor(element, total, cost, heuristic, parent) {
        this.element = element;
        this.total = total;
        this.cost = cost;
        this.heuristic = heuristic;
        this.parent = parent;
    }

    getElement(){
        return this.element;
    }

    getTotal(){
        return this.total;
    }

    getCost(){
        return this.cost;
    }

    getHeuristic(){
        return this.heuristic;
    }

    getParent(){
        return this.parent;
    }
}

function PriorityQueue() {
    this.items = [];
}

PriorityQueue.prototype.enqueue = function (element, total, cost, heuristic, parent) {
    let data = new PQElement(element, total, cost, heuristic, parent);
    let inserted = false;

    //finds the place where data should be inserted at
    //for this priority queue, the lowest prioirty (cost) will be placed up front
    for(let i = 0; i < this.items.length; i++){
        if(this.items[i].getTotal() >= total){
            this.items.splice(i, 0, data);
            inserted = true;
            break;
        }
    }

    //data is to be placed at the end
    if(!inserted)
        this.items.push(data);
}

PriorityQueue.prototype.dequeue = function () {
    if (this.isEmpty()) {
        return "Queue is already empty!";
    }
    return this.items.shift();
}

PriorityQueue.prototype.front = function () {
    if (this.isEmpty()) {
        return "No element exists!";
    }
    return this.items[0];
}

PriorityQueue.prototype.back = function () {
    if (this.isEmpty()) {
        return "No element exists!";
    }
    return this.items[this.items.length - 1];
}

PriorityQueue.prototype.isEmpty = function () {
    return this.items.length == 0;
}

PriorityQueue.prototype.printQueue = function () {
    var str = "";

    for (var i = 0; i < this.items.length; i++) {
        str += `[${this.items[i].getElement()}, ${this.items[i].getTotal()}]\n`;
        // str += this.items[i] + " ";
    }

    return str;
}
