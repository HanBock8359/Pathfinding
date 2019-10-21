//var Grid exists on Grid.js
drawingWall = false;
drawingUnvisited = false;
drawingStart = false;
drawingEnd = false;

$(document).ready(function () {
    //When mouse is down
    $(document.body).on("mousedown", function () {
        $("svg").on("mousedown mouseover", function () {
            if(!Grid.isSearching){
                let coordinate = toGridCoordinate(event);
                let row = coordinate[0];
                let col = coordinate[1];
                let ele = document.getElementById(`${row}-${col}`);

                console.log(row, col, ele.getAttribute("class"));

                //if not drawing any object
                //checks which element was clicked on
                if(!isDrawing()){
                    if (Grid.isUnvisited(row, col))
                        drawingWall = true;
                    else if (Grid.isWall(row, col)) 
                        drawingUnvisited = true;
                    else if (Grid.isStartPosition(row, col))
                        drawingStart = true;
                    else if (Grid.isEndPosition(row, col))
                        drawingEnd = true;
                }

                if(drawingWall){
                    Grid.enableWall(row, col);
                }
                else if(drawingUnvisited){
                    Grid.disableWall(row, col);
                }
                else if(drawingStart){
                    // if current position is not Start, End and Wall
                    if(!Grid.isStartPosition(row,col) && !Grid.isEndPosition(row,col) && !Grid.isWall(row,col)){
                        let prevPos = Grid.getStartPosition();
                        Grid.setStartPosition(row,col);
                        Grid.setUnvisited(prevPos[0], prevPos[1]);
                    }
                }
                else if(drawingEnd){
                    // if current position is not Start, End and Wall
                    if(!Grid.isStartPosition(row,col) && !Grid.isEndPosition(row,col) && !Grid.isWall(row,col)){
                        let prevPos = Grid.getEndPosition();
                        Grid.setEndPosition(row,col);
                        Grid.setUnvisited(prevPos[0], prevPos[1]);
                    }
                }
            }

        });
    });

    //When mouse is up
    $(document.body).on("mouseup", function () {
        disableMouseEvent();
    });

});

function toGridCoordinate(event) {
    let col = Math.floor((event.pageX) / Grid.getSide());
    let row = Math.floor((event.pageY) / Grid.getSide());
    return [row, col];
}


// disables MouseEvent
function disableMouseEvent() {
    drawingStart = false;
    drawingEnd = false;
    drawingWall = false;
    drawingUnvisited = false;
    $("svg").off("mouseover click");
}

// returns false if drawing nothing
// returns true if currently drawing any of four elements
function isDrawing(){
    return (drawingWall || drawingUnvisited || drawingStart || drawingEnd);
}