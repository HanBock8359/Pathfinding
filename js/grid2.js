var grid = {
    width: window.innerWidth,
    height: window.innerHeight,
    startPosition: [5, 15],      // [row, col]
    endPosition: [5, 35],        // [row, col]
    side: 30,
    delay: 1000,

    generateGrid: function () {
        /*
        This function generates a grid with multiple SVG images (rectangle with size of side x side)
        */
        document.getElementById("grid").setAttribute("width", `${this.width}`);
        document.getElementById("grid").setAttribute("height", `${this.height}`);

        let tableHTML = "";

        for (let r = 0; r < this.height; r += this.side) {
            for (let c = 0; c < this.width; c += this.side) {
                tableHTML += `<rect id="${r / this.side}-${c / this.side}" class="unvisited" x="${c}" y="${r}" width="${this.side}" height="${this.side}" r="0" rx="0" ry="0" fill="#ffffff" stroke="#000" stroke-opcaticy="0.2" style="-webkit-tap-highlight-color:rgba(0, 0, 0, 0)"></rect>`;
                // <rect x="0" y="0" width="30" height="30" r="0" rx="0" ry="0" fill="#ffffff" stroke="#000" stroke-opcaticy="0.2" style="-webkit-tap-highlight-color:rgba(0, 0, 0, 0)"></rect>
            }
        }

        let grid = document.getElementById("grid");
        grid.innerHTML = tableHTML;
    },

    getWidth: function () {
        return this.width;
    },

    getheight: function () {
        return this.height;
    },

    getSide: function () {
        return this.side;
    },

    setStartPosition: function (row, col) {
        this.startPosition = [row, col];
        // document.getElementById(`${row}-${col}`).setAttribute("fill", "green");
        document.getElementById(`${row}-${col}`).setAttribute("class", "start"); 
    },

    setEndPosition: function (row, col) {
        this.endPosition = [row, col];
        // document.getElementById(`${row}-${col}`).setAttribute("fill", "red");
        document.getElementById(`${row}-${col}`).setAttribute("class", "end"); 
    },

    getStartPosition: function () {
        return this.startPosition;
    },

    getEndPosition: function () {
        return this.endPosition;
    },

    isStartPosition: function (row, col) {
        return (document.getElementById(`${row}-${col}`) === null) ? false : document.getElementById(`${row}-${col}`).getAttribute("class") === "start";
        // return (row == this.startPosition[0] && col == this.startPosition[1]);
        // return document.getElementById(`${row}-${col}`).getAttribute("fill") == "green";
    },

    isEndPosition: function (row, col) {
        return (document.getElementById(`${row}-${col}`) === null) ? false : document.getElementById(`${row}-${col}`).getAttribute("class") === "end";
        // return (row == this.endPosition[0] && col == this.endPosition[1]);
        // return document.getElementById(`${row}-${col}`).getAttribute("fill") == "red";
    },

    isEnabledBlock: function(row, col){
        return (document.getElementById(`${row}-${col}`) === null) ? false : document.getElementById(`${row}-${col}`).getAttribute("class") === "wall";
    },

    isUnvisitededBlock: function(row, col){
        return (document.getElementById(`${row}-${col}`) === null) ? false : document.getElementById(`${row}-${col}`).getAttribute("class") === "unvisited";
    },
    
    isVisiteddBlock: function(row, col){
        return (document.getElementById(`${row}-${col}`) === null) ? false : document.getElementById(`${row}-${col}`).getAttribute("class") === "visited";
    },

    enableBlocks: function (event) {
        let col = Math.floor((event.pageX - 8) / this.side);
        let row = Math.floor((event.pageY - 8) / this.side);
        let ele = document.getElementById(`${row}-${col}`);

        //Checks if the user is clicking on the start or end position
        if (!(this.isStartPosition(row, col) || this.isEndPosition(row, col))) {
            // ele.setAttribute("fill", "#333");
            ele.setAttribute("class", "wall");
        }
        else {
            console.log("You are at Start or End position!");
        }
    },

    disableBlocks: function (event) {
        let col = Math.floor((event.pageX - 8) / this.side);
        let row = Math.floor((event.pageY - 8) / this.side);
        let ele = document.getElementById(`${row}-${col}`);

        //Checks if the user is clicking on the start or end position
        if (!(this.isStartPosition(row, col) || this.isEndPosition(row, col))) {
            // ele.setAttribute("fill", "#FFF");
            ele.setAttribute("class", "unvisited");
        }
        else {
            console.log("You are at Start or End position!");
        }
    },

    disableMouseEvent: function () {
        $("svg").off("mouseover click");

    },

    enableVisited: function (row, col) {
        let ele = document.getElementById(`${row}-${col}`);
        ele.setAttribute("class", "visited"); 
        // $(`#${pos[0]}-${pos[1]}`).animate();
        $(`#${row}-${col}`).fadeOut(this.delay).delay(this.delay).fadeIn(this.delay);
        // $(`#${pos[0]}-${pos[1]}`).animate({fill: "#008BF8"}, "slow");
    },

    isFree: function(row, col) {
        if((row >= 0 && row < this.height/this.side) && (col >= 0 && col < this.width/this.side)){
            if((this.isUnvisitededBlock(row, col)) && (!this.isStartPosition(row, col)) && (!this.isVisiteddBlock(row, col)))
                return true;
            else if(this.isEndPosition(row,col))
                return true;
        }
        return false;
    },

    //BFS
    BFS: function(pos){
        let q = new Queue();
        let rows = [1,-1,0,0];
        let cols = [0,0,1,-1];

        q.enqueue(pos);
        // this.enableVisited(pos);    # It is guaranteeded that the BFS will start at the starting point

        while(!q.isEmpty()){
            var curr = q.dequeue();

            //check if currently on the end point (goal)
            if(this.isEndPosition(curr[0], curr[1])){
                console.log("You reached the goal!");
                break;
            }

            //loops 4 times
            //right, left, bottom and top
            for(let i = 0; i < rows.length; i++){
                if(this.isFree(curr[0] + rows[i], curr[1] + cols[i])){
                    // setTimeout(q.enqueue([curr[0] + rows[i], curr[1] + cols[i]]), 3000);
                    q.enqueue([curr[0] + rows[i], curr[1] + cols[i]]);

                    //if not at the End point (goal)
                    if(!this.isEndPosition(curr[0] + rows[i], curr[1] + cols[i])){
                        this.enableVisited(curr[0] + rows[i], curr[1] + cols[i]);
                    }
                }
            }

        }
        
        console.log("BFS done!");
    }


}

$(document).ready(function () {
    grid.generateGrid();            //create the grid
    grid.setStartPosition(15, 15);   //create start point
    grid.setEndPosition(8, 35);     //create end point

    console.log(grid.getStartPosition());

    grid.BFS(grid.getStartPosition());

    // grid.enableVisited([5,16]);
    // grid.enableVisited([5,17]);
    // grid.enableVisited([5,18]);
    // grid.enableVisited([5,19]);
    // grid.enableVisited([5,20]);
});