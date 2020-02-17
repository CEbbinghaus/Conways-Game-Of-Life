const c = document.getElementById("Canvas");
const ctx = c.getContext("2d");

let isRunning = false;
var mouse = false;
var mousebtn = 0;

var grid = true;
var square = false;

let squares = [];
let countdownTime = 70;
const border = 1;
let dimensions = 20;
let size = window.innerHeight + window.innerWidth;
let w = Math.floor((window.innerWidth - Math.floor(window.innerWidth / dimensions) * border - 1) / dimensions)
document.getElementById("Canvas").width = w * dimensions + w * border;
let h = Math.floor((window.innerHeight - Math.floor(window.innerHeight / dimensions) * border - 8) / dimensions)
document.getElementById("Canvas").height = h * dimensions + h * border;
let heightSquares = 0;
let widthSquares = 0;
let random = false;
let outerMousePosition = 3;
let outerMouseDestination = 3;
let x = y = 0;
var mouseColor = "#FF4500";
var activeGridColor = "#529957";
var passiveGridColor = "#DB7093";
var gridColor;
var blockColor = "#000000"


function test(jscolor){
    //console.log(jscolor)
}

function d(l){
    return document.getElementById(l)
}

function redo(v){
    dimensions = v;
    h = Math.floor((window.innerHeight - Math.floor(window.innerHeight / dimensions) * border - 8) / dimensions);
    document.getElementById("Canvas").height = h * dimensions + h * border;
    w = Math.floor((window.innerWidth - Math.floor(window.innerWidth / dimensions) * border - 1) / dimensions);
    document.getElementById("Canvas").width = w * dimensions + w * border;
    squares = [];
    for(totalSquares = 0; totalSquares < w * h; totalSquares++){
        if(squares.length < w * h){
            heightSquares = Math.floor(squares.length / w);
            heightSquares *= dimensions + border;
            widthSquares = squares.length % w;
            widthSquares *= dimensions + border;
            random = Math.ceil(Math.random() * 2) == 1 ? true : false;
            squares.push([widthSquares, heightSquares, false]);
        }
    }
    Conway.restart(squares);
}

window.onload = function(){
    alert(`
    Use H for Help
    Controls:
    (R) Generates a random pattern
    (F) Toggels Fullscreen
    (G) Toggles Grid
    (O) brings up the options menu
    (H) brings up this alert
    (S) Switches between the old box and the new Circle brush
    (C) clears the screen and sets it into editing mode
    (Space) Switches between running and editing
    (0 - 9) Changes the grid size
    (+ -) Changes playback speed
    (LeftMouseButton) Draws in editing mode
    (RightMouseButton) Erases in editing mode
    (ScrollWheel) Change the size of the cursor
    `);
    document.getElementById("Canvas").style.cursor = "none";
}

let he = false; 

window.addEventListener("keydown", function(evt){
    console.log(event.keyCode);
    if(event.keyCode == 67){
        event.preventDefault();
        Conway.clear();
    }
    if(event.keyCode == 79){
        d("options").style.display = d("options").style.display == "block" ? "none" : "block"
        d("canvas").style.display = d("options").style.display == "block" ? "none" : "block"
    }
    if(event.keyCode == 32){
        isRunning = !isRunning;
    }
    if(event.keyCode == 82){
        Conway.random();
    }
    if(event.keyCode == 189){
        countdownTime += 10;
    }
    if(event.keyCode == 187){
        countdownTime -= 10;
    }
    if(event.keyCode == 49 || event.keyCode == 97){
        redo(5);
    }
    if(event.keyCode == 50 || event.keyCode == 98){
        redo(10);
    }
    if(event.keyCode == 51 || event.keyCode == 99){
        redo(20);
    }
    if(event.keyCode == 52 || event.keyCode == 100){
        redo(30);
    }
    if(event.keyCode == 53 || event.keyCode == 101){
        redo(40);
    }
    if(event.keyCode == 54 || event.keyCode == 102){
        redo(50);
    }
    if(event.keyCode == 55 || event.keyCode == 103){
        redo(60);
    }
    if(event.keyCode == 56 || event.keyCode == 104){
        redo(70);
    }
    if(event.keyCode == 57 || event.keyCode == 105){
        redo(80);
    }
    if(event.keyCode == 48 || event.keyCode == 96){
        redo(window.innerHeight / 4);
    }
    if(event.keyCode == 71){
        grid = grid == true ? false : true;
    }
    if(event.keyCode == 72){
        alert(`
        Use H for Help
        Controls:
        (R) Generates a random pattern
        (F) Toggels Fullscreen
        (G) Toggles Grid
        (O) brings up the options menu
        (H) brings up this alert
        (S) Switches between the old box and the new Circle brush
        (C) clears the screen and sets it into editing mode
        (Space) Switches between running and editing
        (0 - 9) Changes the grid size
        (+ -) Changes playback speed
        (LeftMouseButton) Draws in editing mode
        (RightMouseButton) Erases in editing mode
        (ScrollWheel) Change the size of the cursor
        `);
        document.getElementById("Canvas").style.cursor = "none";
    }
    if(event.keyCode == 83){
        square = !square
    }
    if(event.keyCode == 70){
        he = he == true ? false : true;
        if(he){
            document.documentElement.webkitRequestFullscreen();
        }
        else{
            document.webkitCancelFullScreen();
        }
    }
}, false)

c.addEventListener('mousewheel', function(e){
    event.preventDefault();
    outerMouseDestination += event.deltaY > 0 ? 1 + outerMouseDestination / 100 : -1 + -outerMouseDestination / 100;
    return false;
})

window.addEventListener('mousemove', function (e) {
    x = event.clientX;
    y = event.clientY;
    Conway.mouse(Conway.x, Conway.y + document.body.scrollTop, ctx, dimensions, mousebtn, outerMousePosition);
})

window.addEventListener('contextmenu', function(e) {
    event.preventDefault();
    return false;
}, false)

window.addEventListener(`mousedown`, function(e){
    mousebtn = e.button == 0 ? 1 : 0;
    Conway.mouse(Conway.x, Conway.y, ctx, dimensions, mousebtn, outerMousePosition);
    mouse = true;
})

window.addEventListener(`mouseup`, function(e){
    Conway.mouse(Conway.x, Conway.y, ctx, dimensions, mousebtn, outerMousePosition);
    mouse = false;
})

for(totalSquares = 0; totalSquares < w * h; totalSquares++){
    if(squares.length < w * h){
        heightSquares = Math.floor(squares.length / w);
        heightSquares *= dimensions + border;
        widthSquares = squares.length % w;
        widthSquares *= dimensions + border;
        random = Math.ceil(Math.random() * 2) == 1 ? true : false;
        squares.push([widthSquares, heightSquares, false]);
    }
}

let Conway = new conwayCheck(squares);

function run(){
    let drawTime = Date.now();
    if(countdownTime < 0) countdownTime = 0;
    if(countdownTime > 1000) countdownTime = 1000;
    let countingTime = Date.now() + countdownTime
    if(d("canvas").style.display == "block"){
    if(size != window.innerHeight + window.innerWidth){
        redo(dimensions);
        size = window.innerHeight + window.innerWidth;
    }
    if(outerMouseDestination < dimensions / 2)outerMouseDestination = dimensions / 2;
    if(outerMouseDestination > 200)outerMouseDestination = 200;
    outerMousePosition += (outerMouseDestination - outerMousePosition) / 2;
    if(outerMousePosition < 0.3)outerMousePosition = 0.3;
    if(isRunning){
        Conway.update(w, h);
    }
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    if(grid){
        ctx.fillStyle = gridColor;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }
    let isEmpty = true;
    for(i = 0; i < Conway.old.length; i++){
        if(Conway.old[i][2] == true)
            {
                isEmpty = false;
            }
        if(Conway.old[i][2]){
            ctx.fillStyle = blockColor;
            ctx.fillRect(Conway.old[i][0], Conway.old[i][1], dimensions, dimensions);
        }else{
            if(grid){
                ctx.clearRect(Conway.old[i][0], Conway.old[i][1], dimensions, dimensions);
            }
        }
    }
    if(isEmpty == true){
        isRunning = false;
    }
    if(!isRunning){
        gridColor = passiveGridColor;
        document.title = "Editing";
        ctx.fillStyle = mouseColor;
        if(square){
            ctx.fillRect(Conway.x - outerMousePosition, Conway.y - outerMousePosition, outerMousePosition * 2, outerMousePosition * 2)
        }else{
            ctx.beginPath();
            ctx.arc(Conway.x,Conway.y,outerMousePosition,0,2*Math.PI);
            ctx.fill();
        }
    }
    else{
        document.title = "Running";
        gridColor = activeGridColor;
    }
    //console.log("Drawing took " + (Date.now() - drawTime) + " Milleseconds")
    }
    window.setTimeout(function(){run()}, countingTime - Date.now())
}

window.setInterval(function(){
    Conway.x += (x - Conway.x) / 2;
    Conway.y += (y - Conway.y) / 2;
    Conway.mouse(Conway.x, Conway.y, ctx, dimensions, mousebtn, outerMousePosition);
},10)