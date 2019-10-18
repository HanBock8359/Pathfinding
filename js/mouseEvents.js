//var Grid exists on Grid.js
$(document).ready(function () {
    //When mouse is down
    $(document.body).on("mousedown", function () {
        $("svg").on("mousedown mouseover", function () {
            isMouseDown = true;
            let coordinate = toGridCoordinate(event);
            let row = coordinate[0];
            let col = coordinate[1];
            let ele = document.getElementById(`${row}-${col}`);

            console.log(row, col, ele.getAttribute("class"));

            if (Grid.isUnvisited(row,col)) {
                Grid.enableWall(row, col);
            }
            else if (Grid.isWall(row,col)){
                // Grid.disableWall(row, col);
            }
            else if (Grid.isStartPosition(row,col)){

            }
            else if (Grid.isEndPosition(row,col)){

            }
        });
    });

    //When mouse is up
    $(document.body).on("mouseup", function () {
        isMouseDown = false;
        Grid.disableMouseEvent();
    });

});

function toGridCoordinate(event){
    let col = Math.floor((event.pageX) / Grid.getSide());
    let row = Math.floor((event.pageY) / Grid.getSide());
    return [row, col];
}