//Use backticks (`) for template literals!
width = window.innerWidth;
height = window.innerHeight;
side = 30;

console.log(width, height);

function generateGrid() {
    /*
        This function generates a grid with multiple SVG images (rectangle with size of side x side)
    */

    boardWidth = document.getElementById("board").style.width;
    boardHeight = document.getElementById("board").style.height;
    console.log(boardWidth, boardHeight);

    document.getElementById("grid").setAttribute("width", width);
    document.getElementById("grid").setAttribute("height", height);

    let tableHTML = "";

    for (let r = 0; r < height; r += side) {
        for (let c = 0; c < width - 2 * side; c += side) {
            tableHTML += `<rect id="${r/side}-${c/side}" x="${c}" y="${r}" width="${side}" height="${side}" r="0" rx="0" ry="0" fill="#ffffff" stroke="#000" stroke-opcaticy="0.2" style="-webkit-tap-highlight-color:rgba(0, 0, 0, 0)"></rect>`;
            // <rect x="0" y="0" width="30" height="30" r="0" rx="0" ry="0" fill="#ffffff" stroke="#000" stroke-opcaticy="0.2" style="-webkit-tap-highlight-color:rgba(0, 0, 0, 0)"></rect>
        }
    }

    let grid = document.getElementById("grid");
    grid.innerHTML = tableHTML;
}

function getWidth() {
    return width;
}

function getheight() {
    return height;
}

function startPosition(row, col){
    document.getElementById(`${row}-${col}`).setAttribute("fill", "green");
}

function endPosition(row, col){
    document.getElementById(`${row}-${col}`).setAttribute("fill", "red");
}

function isStartPosition(row, col){
    return $(`#${row}-${col}`).filter(function(){
        $(this).attr("fill") === ("green");
    });
}

function isEndPosition(row, col){
    return $(`#${row}-${col}`).filter(function(){
        $(this).attr("fill") === ("red");
    });
}