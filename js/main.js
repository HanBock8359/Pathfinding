$(document).ready(function () {
    grid.generateGrid();            //create the grid
    grid.setStartPosition(5, 15);   //create start point
    grid.setEndPosition(15, 15);     //create end point

    console.log(grid.getStartPosition());

    // grid.HelperBFS();
    // grid.HelperDFS();

    // grid.enableVisited([5,16]);
    // grid.enableVisited([5,17]);
    // grid.enableVisited([5,18]);
    // grid.enableVisited([5,19]);
    // grid.enableVisited([5,20]);
});