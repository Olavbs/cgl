// Conway's Game of Life
// Written by Olav Bakke Svendsen
// 
// Controls
//
// Click to populate or kill cells,
// Hold space, click and drag to move camera.
// Scroll to zoom in and out.
//
// P:		Pause/Play
// Enter:	Next generation
// W:		Increase Tickrate
// S:		Decrease Tickrate
// F:		Toggle Padding
// G:		Toggle Grid

var frame = {}
var framerate = 30;
var tickrate = 30;
var tcount = 0;

var autoplay = false;
var viewGrid = true;
var viewPadding = true;
var viewSidebar = true;

var cellSize = 15;
var viewPos = {
	x: 0.5,
	y: 0.5
}

var genCount = 0;

var world;

function setup() {
	frame.width = windowWidth;
	frame.height = windowHeight;


	world = new World();

	createCanvas(frame.width, frame.height);
	frameRate(framerate);
}

function draw() {
	clear();
	background(38,34,27);

	tcount++;
	if (autoplay) {
		if ( tcount >= floor( framerate / tickrate ) ) {
			tcount = 0;
			nextGen();
		}
	}
//	console.log(frameRate());
	moveWorld();

	//world.calculateOffset(cellSize, frame.width, frame.height, viewPos.x, viewPos.y);
	world.draw(cellSize, viewPadding, viewGrid);

	if(viewSidebar)drawSidebar();
}

function keyPressed() {
	if (keyCode === 13) { // Enter - nextGen();
		if(!autoplay) nextGen();
	} else if (keyCode === 80) { // 'P' - toggle autoplay
		if(autoplay) autoplay = false; else autoplay = true;
	} else if (keyCode === 72) { // 'H' - toggle sidebar
		if(viewSidebar) viewSidebar = false; else viewSidebar = true;
	} else if (keyCode === 70) { // 'F' - toggle padding
		if(viewPadding) viewPadding = false; else viewPadding = true;
	} else if (keyCode === 71) { // 'G' - toggle grid
		if(viewGrid) viewGrid = false; else viewGrid = true;
	} else if (keyCode === 87) { // 'W' - Zoom in
		if(cellSize < 100) cellSize++;
	} else if (keyCode === 83) { // 'S' - Zoom out
		if(cellSize > 1) cellSize--;
	}
}
function mousePressed() {
	if (!keyIsDown(32)){
		world.toggleCell(mouseX, mouseY);
	}
}

function moveWorld() {
	if (keyIsDown(32)){
		if (mouseIsPressed){
			world.move(pmouseX, pmouseY, mouseX, mouseY);
		} 
	}
}

function nextGen(){
	world.nextGen();
	genCount++;
}

function drawSidebar(){
	fill(91, 81, 69);
	strokeWeight(0);
	rect(0,0,180,frame.height);

	fill(38,34,27);
	textFont('Helvetica');
	textSize(14);
	textAlign(LEFT);
	text("Conway's", 12, 24);
	textSize(30);
	text("Game of", 10, 50);
	text("Life", 10, 80);

	rect(105, 75,5,5);
	rect(112, 75,5,5);
	rect(119, 75,5,5);
	rect(119, 68,5,5);
	rect(112, 61,5,5);

	textSize(14);

	text("Autoplay:", 10, 120);
	if(autoplay){
		text("ON", 100, 120);
	} else {
		text("OFF", 100, 120);
	}

	text("PB Rate:", 10, 135);
	text(tickrate + " g/s", 100, 135);

	text("Generation:", 10, 150);
	text(genCount.toString(), 100, 150);

	text("Grid:", 10, 175);
	if(viewGrid) text("ON", 100, 175); else text("OFF", 100, 175);

	text("Padding:", 10, 190);
	if(viewPadding) text("ON", 100, 190); else text("OFF", 100, 190);
	
	text("Zoom:", 10, 205);
	text(cellSize + "%", 100, 205);

	text("FPS (" + framerate + "):", 10, 230);
	text(frameRate().toFixed(3).toString(), 100, 230);
}
