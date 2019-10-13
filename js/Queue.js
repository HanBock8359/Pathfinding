function Queue() {
    this.items = [];
}

Queue.prototype.enqueue = function(item){
    this.items.push(item);
}

Queue.prototype.dequeue = function(){
    if (this.isEmpty()) {
        return "Queue is already empty!";
    }
    return this.items.shift();
}

Queue.prototype.front = function(){
    if (this.isEmpty()) {
        return "No element exists!";
    }
    return this.items[0];
}

Queue.prototype.isEmpty = function(){
    return this.items.length == 0;
}

Queue.prototype.printQueue = function(){
    var str = "";

    for (var i = 0; i < this.items.length; i++) {
        str += `[${this.items[i][0]}, ${this.items[i][1]}],\n`
        // str += this.items[i] + " ";
    }

    return str;
}
