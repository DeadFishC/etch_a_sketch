let cells;
let cellColor = "#000000";
let backColor = "#bbe8c4";
let isDown = false;
let side = 80;

let resizeCanvas = function() {
    let sideN = document.getElementById("size").value;
    if (sideN < 4) {
        alert("Minimum size is 4x4");
        return;
    }
    else if (sideN > 100) {
        alert("Maximum size is 100x100");
        return;
    }
    side = sideN;
    document.getElementById("sketch").innerHTML = '';
    console.log("side:"+side);
    createGrid();
    addListeners();
}

let clearCanvas = function() {
    cells = document.getElementsByClassName("cellPainted");
    let i = 0;
    while (cells.length){
        cells[i].classList.add("cellBack");
        cells[i].style.backgroundColor = backColor;
        cells[i].classList.remove("cellPainted");
    }
    console.log("cleared");
}

let paintCellClick = function() {
    this.classList.remove("cellBack");
    this.classList.add("cellPainted");
    console.log(this.style.backgroundColor = cellColor);
};

let paintCellHover = function() {
    if (isDown) {
        this.classList.remove("cellBack");
        this.classList.add("cellPainted");
        this.style.backgroundColor = cellColor;
    }
};

let setBackColor = function() {
    let backCells = document.getElementsByClassName("cellBack");
    for (let i=0; i<backCells.length; i++) {
        backCells[i].style.backgroundColor = backColor = this.value;
    }
}

function addListeners(){
    const penColor = document.getElementById("penColor");
    penColor.addEventListener('change', () => {cellColor = penColor.value;});

    document.getElementById("backColor").addEventListener('change', setBackColor);
    
    for (let i = 0; i < cells.length; i++){
        cells[i].addEventListener('click', paintCellClick);
        cells[i].addEventListener('mouseover', paintCellHover);
    }
}

document.addEventListener("DOMContentLoaded", function(event) { 
    document.addEventListener('mousedown', () => {isDown = true});
    document.addEventListener('mouseup', () => {isDown = false});

    document.getElementById("clear").addEventListener('click', clearCanvas);
    document.getElementById("resize").addEventListener('click', resizeCanvas);

    document.getElementById("size").addEventListener('change', () => {
        document.getElementById("xsize").innerText = 
            `x${document.getElementById("size").value}`;
    })
    createGrid();
    addListeners();

});

function createGrid(){
    const sketch = document.getElementById("sketch");
    let grid_template_columns = "";
    let cell;
    for (let i=1; i<=side*side; i++){
        cell = document.createElement('div');
        cell.classList.add("cell");
        cell.classList.add("cellBack");
        cell.style.backgroundColor = backColor;
        sketch.appendChild(cell);
    }
    for (let i=0;i<side;i++) {
        grid_template_columns += "1fr ";
    }
    console.log(grid_template_columns);
    sketch.style.gridTemplateColumns = grid_template_columns;
    cells = document.getElementsByClassName("cellBack");

}