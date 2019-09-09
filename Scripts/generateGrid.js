//Use backticks (`) for template literals!
width = screen.width;
height = screen.height;
side = 30;

function generateGrid(){
    /*
        This function generates a grid with multiple SVG images (rectangle with size of side x side)
    */

    let tableHTML = "";

    for(let r = 0; r < this.height; r += side){
        for(let c = 0; c < this.width; c += side){
            tableHTML += `<rect x="${c}" y="${r}" width="${side}" height="${side}" r="0" rx="0" ry="0" fill="#ffffff" stroke="#000" stroke-opcaticy="0.2" style="-webkit-tap-highlight-color:rgba(0, 0, 0, 0)"></rect>`;
            // <rect x="0" y="0" width="30" height="30" r="0" rx="0" ry="0" fill="#ffffff" stroke="#000" stroke-opcaticy="0.2" style="-webkit-tap-highlight-color:rgba(0, 0, 0, 0)"></rect>
        }
    }

    let grid = document.getElementById("grid");
    grid.innerHTML = tableHTML;
}
