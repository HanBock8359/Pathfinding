var Grid = {
    width: 1920,
    height: 1080,
    startPosition: [5, 15],      // [row, col], default starting point
    endPosition: [5, 35],        // [row, col], default ending point
    side: 30,                    // size of sides of a square in the grid
    delay: 20,                  // delay
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
        return new Promise(resolve => {
            setTimeout(() => {
                resolve("resolved");
                let ele = document.getElementById(`${row}-${col}`);
                ele.setAttribute("class", "visited");
            }, this.delay);
        });
        // let ele = document.getElementById(`${row}-${col}`);
        // ele.setAttribute("class", "visited");
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
    BFS: async function (pos) {
        let q = new Queue();
        let nodeQ = new Queue();

        q.enqueue(pos);
        nodeQ.enqueue(new Node(pos, null));

        while (!q.isEmpty()) {
            let curr = q.dequeue();
            let currNode = nodeQ.dequeue();
            let neighbours = this.findNeighbours(curr);

            //loops 4 times
            //top, right, botom, left
            for (let i = 0; i < neighbours.length; i++) {
                let row = neighbours[i][0];
                let col = neighbours[i][1];

                //if current neighbour is UNVISITED
                if (this.isUnvisited(row, col)) {
                    q.enqueue(neighbours[i]);
                    nodeQ.enqueue(new Node(neighbours[i], currNode));

                    await this.setVisited(row, col);
                }
                //if current neighbour is the END
                else if (this.isEndPosition(row, col)) {
                    console.log("You reached the goal!");
                    this.makePath(currNode);
                    return this.makePath(currNode);
                }
            }
        }

        //returns an empty list when the shortest path is not found 
        return [];
    },

    HelperDFS: function () {
        this.isDfsDone = false;
        this.DFS(this.getStartPosition(), new Node(this.getStartPosition(), null));
        console.log("DFS Done!");
    },

    DFS: async function (pos, parentNode) {
        let neighbours = this.findNeighbours(pos);
        //loops 4 times
        //top, right, botom, left
        for (let i = 0; i < neighbours.length; i++) {
            //if DFS is alreayd done
            //terminates the function immediately
            if (this.isDfsDone)
                return;

            let row = neighbours[i][0];
            let col = neighbours[i][1];

            //if current neighbour is UNVISITED
            if (this.isUnvisited(row, col)) {
                await this.setVisited(row, col);
                await this.DFS(neighbours[i], new Node(neighbours[i], parentNode));
            }
            //if current neighbour is the END
            else if (this.isEndPosition(row, col)) {
                console.log("You reached the goal!");
                this.isDfsDone = true;
                return this.makePath(parentNode);
            }
        }

        //returns an empty list when the shortest path is not found 
        return [];
    },

    // Dijkstra Algorithm
    HelperDijkstra: function () {
        this.Dijkstra(this.getStartPosition());
        console.log("Dijkstra Done!");
    },

    Dijkstra: async function (pos) {
        let q = new Queue();
        let nodeQ = new Queue();

        q.enqueue(pos);
        nodeQ.enqueue(new Node(pos, null));

        while (!q.isEmpty()) {
            let curr = q.dequeue();
            let currNode = nodeQ.dequeue();
            let neighbours = this.findNeighbours(curr);

            //loops 4 times
            //top, right, botom, left
            for (let i = 0; i < neighbours.length; i++) {
                let row = neighbours[i][0];
                let col = neighbours[i][1];

                //if current neighbour is UNVISITED
                if (this.isUnvisited(row, col)) {
                    q.enqueue(neighbours[i]);
                    nodeQ.enqueue(new Node(neighbours[i], currNode));
                    await this.setVisited(row, col);
                }
                //if current neighbour is the END
                else if (this.isEndPosition(row, col)) {
                    console.log("You reached the goal!");
                    return this.makePath(currNode);
                }
            }
        }

        //returns empty list if no shortest path is found
        return [];
    },

    // A* Algorithm
    HelperAStar: function () {
        this.AStar(this.getStartPosition());
        console.log("A* Done!");
    },

    AStar: async function (pos) {
        let pq = new PriorityQueue();   // ([row, col], total (f), cost (g), heuristic (h))
        pq.enqueue(pos, 0, 0, 0, null); // position, total, cost, heuristic, parent

        while (!pq.isEmpty()) {
            /*
                @param curr = [row, col], priority
            */
            let item = pq.dequeue();
            let curr = item.getElement();
            let neighbours = this.findNeighbours(curr);

            //loops 4 times
            //top, right, botom, left
            for (let i = 0; i < neighbours.length; i++) {
                let row = neighbours[i][0];
                let col = neighbours[i][1];

                //if current neighbour is UNVISITED
                if (this.isUnvisited(row, col)) {
                    let cost = item.getCost() + 1;
                    let heuristic = this.getHeuristic(neighbours[i], this.getEndPosition());
                    let totalCost = cost + heuristic;

                    pq.enqueue(neighbours[i], totalCost, cost, heuristic, item);
                    await this.setVisited(row, col);
                }
                //if current neighbour is the END
                else if (this.isEndPosition(row, col)) {
                    console.log("You reached the goal!");
                    return this.makePath(item);
                }
            }
        }

        //returns empty list if no shortest path is found
        return [];
    },

    //uses Manhattan Distance Formula
    getHeuristic: function (start, end) {
        let x = Math.abs(start[0] - end[0]);
        let y = Math.abs(start[1] - end[1]);
        return x + y;
    },
    
    // returns the shortest path
    // @Param Node can be the class of Node or PQElement
    makePath: function (Node) {
        let path = [];
        let currPos = Node;

        //ignores the starting point
        while (currPos != null && !this.isStartPosition(currPos.getElement()[0], currPos.getElement()[1])) {
            let ele = document.getElementById(`${currPos.getElement()[0]}-${currPos.getElement()[1]}`);
            ele.setAttribute("class", "trace");
            path.push(currPos.getElement());
            currPos = currPos.getParent();
        }

        return path.reverse();
    },

};

$(document).ready(function () {
    Grid.generateGrid();            //create the Grid
    Grid.setStartPosition(15, 5);   //create start point
    Grid.setEndPosition(15, 35);     //create end point

    console.log(Grid.getStartPosition());
});

