//var Grid exists on Grid.js
$(document).ready(function () {
    //When mouse is down
    $(document.body).on("mousedown", function () {
        $("svg").on("mousedown mouseover", function () {
            let col = Math.floor((event.pageX) / Grid.getSide());
            let row = Math.floor((event.pageY) / Grid.getSide());
            let ele = document.getElementById(`${row}-${col}`);

            console.log(row, col, ele.getAttribute("class"));

            if (Grid.isUnvisited(row,col)) {
                Grid.enableBlocks(row, col);
            }
            // else if (ele.getAttribute("class") === "wall") {
            //     Grid.disableBlocks(row, col);
            // }

        });


    });

    //When mouse is up
    $(document.body).on("mouseup", function () {
        isMouseDown = false;
        Grid.disableMouseEvent();
    });

});

/*
function enableBlocks() {
    let col = Math.floor((event.clientX - 8) / Grid.getSide());
    let row = Math.floor((event.clientY - 8) / Grid.getSide());

    //Checks if the user is clicking on the start or end position
    if(!(Grid.isStartPosition(row,col) || Grid.isEndPosition(row,col))){
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

