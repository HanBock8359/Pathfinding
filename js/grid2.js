var grid = {
    width: window.innerWidth,
    height: window.innerHeight,
    startPosition: [5, 15],      // [row, col]
    endPosition: [5, 35],        // [row, col]
    side: 30,

    generateGrid: function () {
        /*
        This function generates a grid with multiple SVG images (rectangle with size of side x side)
        */
        document.getElementById("grid").setAttribute("width", `${this.width}`);
        document.getElementById("grid").setAttribute("height", `${this.height}`);

        let tableHTML = "";

        for (let r = 0; r < this.height; r += this.side) {
            for (let c = 0; c < this.width - 2 * this.side; c += this.side) {
                tableHTML += `<rect id="${r / this.side}-${c / this.side}" class="unvisited" x="${c}" y="${r}" width="${this.side}" height="${this.side}" r="0" rx="0" ry="0" fill="#ffffff" stroke="#000" stroke-opcaticy="0.2" style="-webkit-tap-highlight-color:rgba(0, 0, 0, 0)"></rect>`;
                // <rect x="0" y="0" width="30" height="30" r="0" rx="0" ry="0" fill="#ffffff" stroke="#000" stroke-opcaticy="0.2" style="-webkit-tap-highlight-color:rgba(0, 0, 0, 0)"></rect>
            }
        }

        let grid = document.getElementById("grid");
        grid.innerHTML = tableHTML;

        console.log("done!");
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
        startPosition = [row, col];
        document.getElementById(`${row}-${col}`).setAttribute("fill", "green");
    },

    setEndPosition: function (row, col) {
        endPosition = [row, col];
        document.getElementById(`${row}-${col}`).setAttribute("fill", "red");
    },

    getStartPosition: function () {
        return this.startPosition;
    },

    getEndPosition: function () {
        return this.endPosition;
    },

    isStartPosition: function (row, col) {
        return (row == this.startPosition[0] && col == this.startPosition[1]);
        // return document.getElementById(`${row}-${col}`).getAttribute("fill") == "green";
    },

    isEndPosition: function (row, col) {
        return (row == this.endPosition[0] && col == this.endPosition[1]);
        // return document.getElementById(`${row}-${col}`).getAttribute("fill") == "red";
    },

    isEnabledBlock: function(row, col){
        return document.getElementById(`${row}-${col}`).className == "wall";
    },

    isDisabledBlock: function(row, col){
        return document.getElementById(`${row}-${col}`).className == "unvisited";
    },

    enableBlocks: function (event) {
        let col = Math.floor((event.pageX - 8) / this.side);
        let row = Math.floor((event.pageY - 8) / this.side);
        let ele = document.getElementById(`${row}-${col}`);

        //Checks if the user is clicking on the start or end position
        if (!(this.isStartPosition(row, col) || this.isEndPosition(row, col) || this.isDisabledBlock(row, col))) {
            ele.setAttribute("fill", "#333");
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
        if (!(this.isStartPosition(row, col) || this.isEndPosition(row, col) || this.isEnabledBlock(row, col))) {
            ele.setAttribute("fill", "#FFF");
            ele.setAttribute("class", "unvisited");
        }
        else {
            console.log("You are at Start or End position!");
        }
    },

    disableMouseEvent: function () {
        $("svg").off("mouseover click");

    }


}

$(document).ready(function () {
    grid.generateGrid();            //create the grid
    grid.setStartPosition(5, 15);   //create start point
    grid.setEndPosition(5, 35);     //create end point
});