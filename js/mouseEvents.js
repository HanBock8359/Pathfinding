$(document).ready(function () {
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

    document.getElementById(`${row}-${col}`).setAttribute("fill", "#333");
}

function disableBlocks() {
    console.log("mouseover is disabled!");
    $("svg").off("mouseover");
}

