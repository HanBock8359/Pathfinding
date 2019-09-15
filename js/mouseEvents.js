//var grid exists on grid.js
$(document).ready(function () {
    //When mouse is down
    $(document.body).on("mousedown", function () {
        $("svg").on("mouseover click", function () {
            let col = Math.floor((event.clientX - 8) / grid.getSide());
            let row = Math.floor((event.clientY - 8) / grid.getSide());
            let ele = document.getElementById(`${row}-${col}`);

            isMouseDown = true;

            console.log(row, col, ele.getAttribute("class"));

            if (ele.getAttribute("class") === "unvisited") {
                grid.enableBlocks(event);

            }
            else if (ele.getAttribute("class") === "visited") {

                grid.disableBlocks(event);

            }

        });


    });

    //When mouse is up
    $(document.body).on("mouseup", function () {
        grid.disableMouseEvent();
    });

});

/*
function enableBlocks() {
    let col = Math.floor((event.clientX - 8) / grid.getSide());
    let row = Math.floor((event.clientY - 8) / grid.getSide());

    //Checks if the user is clicking on the start or end position
    if(!(grid.isStartPosition(row,col) || grid.isEndPosition(row,col))){
        document.getElementById(`${row}-${col}`).setAttribute("fill", "#333");
    }
    else{
        console.log("You are at Start or End position!");
    }
}


function disableBlocks() {
    $("svg").off("mouseover");
}
*/

