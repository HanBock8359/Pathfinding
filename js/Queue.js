class Queue{
    constructor(){
        this.items = [];
    }

    enqueue(item){
        this.items.push(item);
    }

    dequeue(){
        if(this.isEmpty()){
            return "Queue is already empty!";
        }
        return this.items.shift();
    }

    front(){    
        if(this.isEmpty()){
            return "No element exists!";
        }
        return this.items[0];
    }

    isEmpty(){
        return this.items.length == 0;
    }

    printQueue(){
        var str = "";

        for(var i = 0; i < this.items.length; i++){
            str += `[${this.items[i][0]}, ${this.items[i][1]}],\n`
            // str += this.items[i] + " ";
        }

        return str;
    }
}