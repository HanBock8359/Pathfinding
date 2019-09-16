class Stack{
    constructor(){
        this.items = [];
    }

    push(item){
        this.items.push(item);
    }

    pop(){
        if(this.isEmpty()){
            return "Stack is already empty!";
        }
        return this.items.shift();
    }

    peek(){
        if(this.isEmpty()){
            return "No element exists!";
        }
        return this.items[0];
    }

    isEmpty(){
        return this.items.length == 0;
    }

    printStack(){  
        var str = "";

        for(var i = 0; i < this.items.length; i++){
            str += this.items[i] + " ";
        }

        return str;
    }

}