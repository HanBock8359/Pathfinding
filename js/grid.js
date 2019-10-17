var Grid = {
    width: 1920,
    height: 1080,
    startPosition: [5, 15],      // [row, col], default starting point
    endPosition: [5, 35],        // [row, col], default ending point
    side: 30,                    // size of sides of a square in the grid
    delay: 500,                  // delay
    isDfsDone: false,            // used for DFS algorithm

    generateGrid: function () {
        /*
        This function generates a Grid with multiple SVG images (rectangle with size of side x side)
        */
        let grid = document.getElementById("Grid");
        grid.setAttribute("width", `${this.width}`);
        grid.setAttribute("height", `${this.height}`);

        let tableHTML = "";

        for (let r = 0; r < this.height; r += this.side) {
            for (let c = 0; c < this.width; c += this.side) {
                tableHTML += `<rect id="${r / this.side}-${c / this.side}" class="unvisited" x="${c}" y="${r}" width="${this.side}" height="${this.side}" r="0" rx="0" ry="0" fill="#ffffff" stroke="#000" stroke-opcaticy="0.2" style="-webkit-tap-highlight-color:rgba(0, 0, 0, 0)"></rect>`;
                // <rect x="0" y="0" width="30" height="30" r="0" rx="0" ry="0" fill="#ffffff" stroke="#000" stroke-opcaticy="0.2" style="-webkit-tap-highlight-color:rgba(0, 0, 0, 0)"></rect>
            }
        }

        grid.innerHTML = tableHTML;
    },

    //resets the whole grid, except the starting and ending positions
    resetGrid: function () {
        Grid.generateGrid();            //create the Grid
        Grid.setStartPosition(this.startPosition[0], this.startPosition[1]);   //create start point
        Grid.setEndPosition(this.endPosition[0], this.endPosition[1]);     //create end point
    },

    //resets the visited node and the traced nodes (shortest path)
    resetVisited: function () {
        let visited = Array.from(document.getElementsByClassName("visited"));
        let trace = Array.from(document.getElementsByClassName("trace"));
        let ele = null;

        for (let i = 0; i < visited.length; i++) {
            //reset visited nodes
            ele = document.getElementById(`${visited[i].id}`);
            ele.setAttribute("class", "unvisited");
        }

        for (let i = 0; i < trace.length; i++) {
            //reset trace nodes
            ele = document.getElementById(`${trace[i].id}`);
            ele.setAttribute("class", "unvisited");
        }
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

    isEnabled: function (row, col) {
        return (document.getElementById(`${row}-${col}`) === null) ? false : document.getElementById(`${row}-${col}`).getAttribute("class") === "wall";
    },

    isUnvisited: function (row, col) {
        return (document.getElementById(`${row}-${col}`) === null) ? false : document.getElementById(`${row}-${col}`).getAttribute("class") === "unvisited";
    },

    isVisited: function (row, col) {
        return (document.getElementById(`${row}-${col}`) === null) ? false : document.getElementById(`${row}-${col}`).getAttribute("class") === "visited";
    },

    isTrace: function (row, col) {
        return (document.getElementById(`${row}-${col}`) === null) ? false : document.getElementById(`${row}-${col}`).getAttribute("class") === "trace";
    },

    enableBlocks: function (row, col) {
        let ele = document.getElementById(`${row}-${col}`);

        //Checks if the user is clicking on the start or end position
        if (this.isFree(row, col)) {
            ele.setAttribute("class", "wall");
        }
        else {
            console.log("You are at Start or End position!");
        }
    },

    disableBlocks: function (row, col) {
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

    setVisited: function (row, col) {
        let ele = document.getElementById(`${row}-${col}`);
        ele.setAttribute("class", "visited");
    },

    setUnvisited: function (row, col) {
        let ele = document.getElementById(`${row}-${col}`);
        ele.setAttribute("class", "unvisited");
    },

    //checks if the mouse is within the grid
    isFree: function (row, col) {
        if ((row >= 0 && row < this.height / this.side) && (col >= 0 && col < this.width / this.side)) {
            if (this.isUnvisited(row, col))
                return true;
        }
        return false;
    },

    // @Param: pos -> [row, col]
    // returns adjacent neighbours (in order of top, right, bottom, left)
    // the state of each node (unvisited, visited, start, end, trace) does not matter
    findNeighbours: function (pos) {
        let neighbours = [];
        let rows = [-1, 0, 1, 0];
        let cols = [0, 1, 0, -1];

        let row = pos[0];
        let col = pos[1];

        for (let i = 0; i < rows.length; i++) {
            neighbours.push([row + rows[i], col + cols[i]]);
        }

        return neighbours;
    },

    HelperBFS: function () {
        this.BFS(this.getStartPosition());
        console.log("BFS Done!");
    },

    //BFS
    BFS: function (pos) {
        let q = new Queue();
        let count = 0;

        //starts from TOP, RIGHT, BOTTOM and LEFT (Clockwise)
        let rows = [-1, 0, 1, 0];
        let cols = [0, 1, 0, -1];

        q.enqueue(pos);

        while (!q.isEmpty()) {
            let curr = q.dequeue();
            let neighbours = this.findNeighbours(curr);

            for (let i = 0; i < neighbours.length; i++) {
                let row = neighbours[i][0];
                let col = neighbours[i][1]

                //if current neighbour is UNVISITED
                if(this.isUnvisited(row, col)){
                    q.enqueue(neighbours[i]);
                    this.setVisited(row, col);
                }
                //if current neighbour is the END
                else if(this.isEndPosition(row, col)){
                    console.log("You reached the goal!");
                    return;
                }
            }

            //loops 4 times
            //bottom, top, right, left
            // for (let i = 0; i < rows.length; i++) {
            //     //if not reached the end position
            //     //enqueue UP, RIGHT, BOTTOM and LEFT of current coordinate
            //     if (this.isFree(curr[0] + rows[i], curr[1] + cols[i])) {
            //         q.enqueue([curr[0] + rows[i], curr[1] + cols[i]]);
            //         this.setVisited(curr[0] + rows[i], curr[1] + cols[i]);
            //     }
            //     //if found the end position
            //     //terminate the function
            //     else if (this.isEndPosition(curr[0] + rows[i], curr[1] + cols[i])) {
            //         console.log("You reached the goal!");
            //         // console.log(q.printQueue());
            //         return;
            //     }
            // }

        }
    },

    HelperDFS: function () {
        this.isDfsDone = false;
        this.DFS(this.getStartPosition());
        console.log("DFS Done!");
    },

    DFS: function (pos) {
        //starts from TOP, RIGHT, BOTTOM and LEFT (Clockwise)
        let count = 0;
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
                this.setVisited(pos[0] + rows[i], pos[1] + cols[i]);
                this.DFS([pos[0] + rows[i], pos[1] + cols[i]]);
            }
            //if found the end position
            //terminates the function immediately
            else if (this.isEndPosition(pos[0] + rows[i], pos[1] + cols[i])) {
                console.log("You reached the goal!");
                this.isDfsDone = true;
                return;
            }
        }
    },

    // Dijkstra Algorithm
    HelperDijkstra: function () {
        this.Dijkstra(this.getStartPosition());
        console.log("Dijkstra Done!");
    },

    Dijkstra: function (pos) {
        let rows = [-1, 0, 1, 0];
        let cols = [0, 1, 0, -1];
        let q = new Queue();
        let nodeQ = new Queue();

        q.enqueue(pos);
        nodeQ.enqueue(new Node(pos, null));

        while (!q.isEmpty()) {
            let curr = q.dequeue();
            let currNode = nodeQ.dequeue();

            //loops 4 times
            //bottom, top, right, left
            for (let i = 0; i < rows.length; i++) {
                //if not reached the end position
                //enqueue UP, RIGHT, BOTTOM and LEFT of current coordinate
                if (this.isFree(curr[0] + rows[i], curr[1] + cols[i])) {
                    q.enqueue([curr[0] + rows[i], curr[1] + cols[i]]);
                    this.setVisited(curr[0] + rows[i], curr[1] + cols[i]);
                    nodeQ.enqueue(new Node([curr[0] + rows[i], curr[1] + cols[i]], currNode));
                }
                //if found the end position
                //terminate the function
                else if (this.isEndPosition(curr[0] + rows[i], curr[1] + cols[i])) {
                    console.log("You reached the goal!");
                    this.dijkstraPath(currNode);
                    return this.dijkstraPath(currNode);
                }
            }
        }

        //returns empty list if no shortest path is found
        return [];
    },

    dijkstraPath: function (Node) {
        let path = [];
        let currPos = Node;

        console.log(currPos);

        //ignores the starting point
        while (currPos != null && !this.isStartPosition(currPos.getElement()[0], currPos.getElement()[1])) {
            let ele = document.getElementById(`${currPos.getElement()[0]}-${currPos.getElement()[1]}`);
            ele.setAttribute("class", "trace");
            path.push(currPos.getElement());
            currPos = currPos.getParent();
        }

        return path.reverse();
    },

    // A* Algorithm
    HelperAStar: function () {
        this.AStar(this.getStartPosition());
        console.log("A* Done!");
    },

    AStar: function (pos) {
        let rows = [-1, 0, 1, 0];
        let cols = [0, 1, 0, -1];
        let pq = new PriorityQueue();   // ([row, col], total (f), cost (g), heuristic (h))

        pq.enqueue(pos, 0, 0, 0, null); // position, total, cost, heuristic, parent

        while (!pq.isEmpty()) {
            /*
                @param curr = [row, col], priority
            */
            let item = pq.dequeue();
            let curr = item.getElement();

            //if reached to the end position
            if (this.isEndPosition(curr[0], curr[1])) {
                return this.constructPath(new PQElement([curr[0], curr[1]], 0, 0, 0, item));
            }

            //loops 4 times
            //bottom, top, right, left
            for (let i = 0; i < rows.length; i++) {
                //if not reached the end position
                //enqueue UP, RIGHT, BOTTOM and LEFT of current coordinate
                if (this.isFree(curr[0] + rows[i], curr[1] + cols[i])) {
                    let cost = item.getCost() + 1;
                    let heuristic = this.getHeuristic([curr[0] + rows[i], curr[1] + cols[i]], this.getEndPosition());
                    let totalCost = cost + heuristic;

                    pq.enqueue([curr[0] + rows[i], curr[1] + cols[i]], totalCost, cost, heuristic, item);
                    this.setVisited(curr[0] + rows[i], curr[1] + cols[i]);
                }
                //if found the end position
                //terminate the function
                else if (this.isEndPosition(curr[0] + rows[i], curr[1] + cols[i])) {
                    console.log("You reached the goal!");
                    return this.constructPath(item);
                }
            }
        }

        return [];
    },

    //uses Manhattan Distance Formula
    getHeuristic: function (start, end) {
        let x = Math.abs(start[0] - end[0]);
        let y = Math.abs(start[1] - end[1]);
        return x + y;
    },

    getNeighbors: function (pos) {
        let rows = [-1, 0, 1, 0];
        let cols = [0, 1, 0, -1];
        let neighbours = [];

        //loops 4 times
        //bottom, top, right, left
        for (let i = 0; i < rows.length; i++) {
            if (this.isFree(pos[0] + rows[i], pos[1] + cols[i])) {
                neighbours.push([curr[0] + rows[i], curr[1] + cols[i]]);
            }
        }
        return neighbours;
    },

    // returns the shortest path from A* algorithm
    constructPath: function (PQElement) {
        let path = [];
        let currPos = PQElement;

        console.log(currPos);

        //ignores the starting point
        while (currPos != null && !this.isStartPosition(currPos.getElement()[0], currPos.getElement()[1])) {
            let ele = document.getElementById(`${currPos.getElement()[0]}-${currPos.getElement()[1]}`);
            ele.setAttribute("class", "trace");
            path.push(currPos.getElement());
            currPos = currPos.getParent();
        }

        return path.reverse();
    }

};

$(document).ready(function () {
    Grid.generateGrid();            //create the Grid
    Grid.setStartPosition(15, 5);   //create start point
    Grid.setEndPosition(15, 15);     //create end point

    console.log(Grid.getStartPosition());
});

