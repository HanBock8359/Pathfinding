var grid = {
    width: 1920,
    height: 1080,
    startPosition: [5, 15],      // [row, col]
    endPosition: [5, 35],        // [row, col]
    side: 30,
    delay: 500,
    isDfsDone: false,

    generateGrid: function () {
        /*
        This function generates a grid with multiple SVG images (rectangle with size of side x side)
        */
        let ele = document.getElementById("grid");
        ele.setAttribute("width", `${this.width}`);
        ele.setAttribute("height", `${this.height}`);

        console.log(window.innerWidth, window.innerHeight);
        console.log(ele.getAttribute("width"), ele.getAttribute("height"));

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

    resetGrid: function () {
        grid.generateGrid();            //create the grid
        grid.setStartPosition(this.startPosition[0], this.startPosition[1]);   //create start point
        grid.setEndPosition(this.endPosition[0], this.endPosition[1]);     //create end point
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
        document.getElementById(`${row}-${col}`).setAttribute("class", "start");
    },

    setEndPosition: function (row, col) {
        this.endPosition = [row, col];
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
    },

    isEndPosition: function (row, col) {
        return (document.getElementById(`${row}-${col}`) === null) ? false : document.getElementById(`${row}-${col}`).getAttribute("class") === "end";
    },

    isEnabledBlock: function (row, col) {
        return (document.getElementById(`${row}-${col}`) === null) ? false : document.getElementById(`${row}-${col}`).getAttribute("class") === "wall";
    },

    isUnvisitededBlock: function (row, col) {
        return (document.getElementById(`${row}-${col}`) === null) ? false : document.getElementById(`${row}-${col}`).getAttribute("class") === "unvisited";
    },

    isVisitedBlock: function (row, col) {
        return (document.getElementById(`${row}-${col}`) === null) ? false : document.getElementById(`${row}-${col}`).getAttribute("class") === "visited";
    },

    enableBlocks: function (event) {
        let col = Math.floor((event.pageX) / this.side);
        let row = Math.floor((event.pageY) / this.side);
        let ele = document.getElementById(`${row}-${col}`);

        //Checks if the user is clicking on the start or end position
        if (!(this.isStartPosition(row, col) || this.isEndPosition(row, col))) {
            ele.setAttribute("class", "wall");
        }
        else {
            console.log("You are at Start or End position!");
        }
    },

    disableBlocks: function (event) {
        let col = Math.floor((event.pageX) / this.side);
        let row = Math.floor((event.pageY) / this.side);
        let ele = document.getElementById(`${row}-${col}`);

        //Checks if the user is clicking on the start or end position
        if (!(this.isStartPosition(row, col) || this.isEndPosition(row, col))) {
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
        $(`#${row}-${col}`).fadeOut(this.delay).delay(this.delay).fadeIn(this.delay);
        // $(`#${pos[0]}-${pos[1]}`).animate({fill: "#008BF8"}, "slow");
    },

    isFree: function (row, col) {
        if ((row >= 0 && row < this.height / this.side) && (col >= 0 && col < this.width / this.side)) {
            if ((this.isUnvisitededBlock(row, col)) && (!this.isStartPosition(row, col)) && (!this.isVisitedBlock(row, col)))
                return true;
            // else if (this.isEndPosition(row, col))
            //     return false;
        }
        return false;
    },

    HelperBFS: function () {
        grid.BFS(grid.getStartPosition());
    },

    //BFS
    BFS: function (pos) {
        let that = this;
        let q = new Queue();
        let count = 0;

        //starts from TOP, RIGHT, BOTTOM and LEFT (Clockwise)
        let rows = [-1, 0, 1, 0];
        let cols = [0, 1, 0, -1];

        q.enqueue(pos);
        // this.enableVisited(pos);    # It is guaranteeded that the BFS will start at the starting point

        while (!q.isEmpty()) {
            let curr = q.dequeue();

            //loops 4 times
            //bottom, top, right, left
            for (let i = 0; i < rows.length; i++) {
                //if not reached the end position
                //enqueue UP, RIGHT, BOTTOM and LEFT of current coordinate
                if (that.isFree(curr[0] + rows[i], curr[1] + cols[i])) {
                    q.enqueue([curr[0] + rows[i], curr[1] + cols[i]])
                    that.enableVisited(curr[0] + rows[i], curr[1] + cols[i])
                }
                //if found the end position
                //terminate the function
                else if (that.isEndPosition(curr[0] + rows[i], curr[1] + cols[i])) {
                    console.log("You reached the goal!");
                    console.log(q.printQueue());
                    return;
                }
            }

        }


        console.log("BFS Done!");
    },

    HelperDFS: function () {
        this.isDfsDone = false;
        grid.DFS(grid.getStartPosition());
    },

    DFS: function (pos) {
        //starts from TOP, RIGHT, BOTTOM and LEFT (Clockwise)
        let rows = [-1, 0, 1, 0];
        let cols = [0, 1, 0, -1];

        //loops 4 times
        //bottom, top, right, left
        for (let i = 0; i < rows.length; i++) {
            //if DFS is alreayd done
            //terminates the function immediately
            if (this.isDfsDone)
                return;

            //if UP, RIGHT, BOTTOM or LEFT of current position are free AND
            //DFS is not done yet (end position is not found)
            //enable neighbours
            //recursive call
            if (this.isFree(pos[0] + rows[i], pos[1] + cols[i]) && !this.isDfsDone) {
                this.enableVisited(pos[0] + rows[i], pos[1] + cols[i]);
                this.DFS([pos[0] + rows[i], pos[1] + cols[i]]);
            }
            //if found the end position
            //terminates the function immediately
            else if (this.isEndPosition(pos[0] + rows[i], pos[1] + cols[i])) {
                console.log("You reached the goal!");
                console.log("DFS Done!");
                this.isDfsDone = true;
                return;
            }
        }
    }


}

$(document).ready(function () {
    grid.generateGrid();            //create the grid
    grid.setStartPosition(5, 15);   //create start point
    grid.setEndPosition(15, 15);     //create end point

    console.log(grid.getStartPosition());

    // grid.HelperBFS();
    // grid.HelperDFS();

    // grid.enableVisited([5,16]);
    // grid.enableVisited([5,17]);
    // grid.enableVisited([5,18]);
    // grid.enableVisited([5,19]);
    // grid.enableVisited([5,20]);
});