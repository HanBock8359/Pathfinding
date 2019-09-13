$(document).ready(function () {
    console.log("welcome!");
    //generates grid
    generateGrid();
    startPosition(5,10);
    endPosition(5,35);

    console.log(isStartPosition(5,10));


    //When mouse is down
    $(document.body).on("mousedown", function () {
        console.log("mouse is down!");

        $("svg").on("mouseover click", function () {
            enableBlocks();
        });

    });

    //When mouse is up
    $(document.body).on("mouseup", function () {
        console.log("mouse is up!");

        disableBlocks();
    });

});

function enableBlocks() {
    console.log("mouseover is abled!");

    let col = Math.floor((event.clientX - 8) / side);
    let row = Math.floor((event.clientY - 8) / side);

    if(document.getElementById(`${row}-${col}`).style != "red"){
        document.getElementById(`${row}-${col}`).setAttribute("fill", "#333");
    }
    // console.log(`Row: ${row} \n Col: ${col}`);
    // console.log("Hover on a rect!");
}

function disableBlocks(){
    console.log("mouseover is disabled!");
    $("svg").off("mouseover");
}

