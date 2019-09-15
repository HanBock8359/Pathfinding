var grid = {
    width: window.innerWidth,
    height: window.innerHeight,
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
                tableHTML += `<rect id="${r / this.side}-${c / this.side}" x="${c}" y="${r}" width="${this.side}" height="${this.side}" r="0" rx="0" ry="0" fill="#ffffff" stroke="#000" stroke-opcaticy="0.2" style="-webkit-tap-highlight-color:rgba(0, 0, 0, 0)"></rect>`;
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

    getSide: function(){
        return this.side;
    },

    startPosition: function (row, col) {
        document.getElementById(`${row}-${col}`).setAttribute("fill", "green");
    },

    endPosition: function (row, col) {
        document.getElementById(`${row}-${col}`).setAttribute("fill", "red");
    },

    isStartPosition: function (row, col) {
        return document.getElementById(`${row}-${col}`).getAttribute("fill") == "green";
    },

    isEndPosition: function (row, col) {
        return document.getElementById(`${row}-${col}`).getAttribute("fill") == "red";
    }
}

$(document).ready(function () {
    grid.generateGrid();
    grid.startPosition(5,15);
    grid.endPosition(5,35);
});