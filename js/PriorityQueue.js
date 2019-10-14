class PQElement {
    constructor(elemenet, priority) {
        this.elemenet = element;
        this.priority = priority;
    }

    getElement(){
        return this.elemenet;
    }

    getPriority(){
        return this.priority;
    }
}

function PriorityQueue() {
    this.items = [];
}

PriorityQueue.prototype.enqueue = function (element, priority) {
    let data = new PQElement(element, priority);
    let inserted = false;

    //finds the place where data should be inserted at
    for(let i = 0; i < this.items.length; i++){
        if(this.items[i].getPriority() < data.getPriority()){
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
        str += `[${this.items[i][0]}, ${this.items[i][1]}],\n`;
        // str += this.items[i] + " ";
    }

    return str;
}
