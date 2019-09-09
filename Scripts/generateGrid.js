//Use backticks (`) for template literals!
width = 1920;
height = 1080;
side = 30;

function generateGrid(){
    let tableHTML = "";

    for(let r = 0; r <= this.height; r += side){
        for(let c = 0; c <= this.height; c += side){
            tableHTML += `<rect x="${r}" y="${c}" width="${side}" height="${side}" r="0" rx="0" ry="0" fill="#ffffff" stroke="#000" stroke-opcaticy="0.2" style="-webkit-tap-highlight-color:rgba(0, 0, 0, 0)"></rect>`;
            // <rect x="0" y="0" width="30" height="30" r="0" rx="0" ry="0" fill="#ffffff" stroke="#000" stroke-opcaticy="0.2" style="-webkit-tap-highlight-color:rgba(0, 0, 0, 0)"></rect>
        }
    }

    let grid = document.getElementById("grid");
    grid.innerHTML = tableHTML;
}


/*
function generateGrid(){
    let tableHTML = "";

    for(let r = 0; r < this.height; r++){
        let currentArrayRow = [];
        let currentHTMLRow = `<tr id="row ${r}">`;

        for(let c = 0; c < this.width; c++){
            let newNodeId = `${r}-${c}`, newNodeClass, newNode;

            if(r === Math.floor(this.height/2) && c === Math.floor(this.width/4)){
                newNodeClass = "start";
                this.start = `${newNodeId}`;
            }
            else if(r === Math.floor(this.height/2) && c === Math.floor(3 * this.width/4)){
                newNodeClass = "target";
            }
            else{
                newNodeClass = "unvisited";
            }

            newNode = new Node(newNodeId, newNodeClass);
            currentArrayRow.push(newNode);
            currentHTMLRow += `<td id="${newNodeId}" class="${newNodeClass}"></td>`;
            this.nodes[`${newNodeId}`] = newNode;
        }

        this.boardArray.push(currentArrayRow);
        tableHTML += `${currentHTMLRow}</tr>`
    }

    let board = document.getElementById("board");
    board.innerHTML = tableHTML;
}
*/