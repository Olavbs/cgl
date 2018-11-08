class World {
	constructor() {
		this.init();
	}
	init() {
		this.width = 50;
		this.height = 50;

		this.cellSize;

		this.offset = { x: 200, y: 20 }

		this.cells = [];
		for(var x = 0; x < this.width; x++){
			this.cells[x] = [];
			for(var y = 0; y < this.height; y++){
				this.cells[x][y] = false; 
			}
		}
//		this.cells[10][10] = true;
//		this.cells[11][10] = true;
//		this.cells[12][10] = true;
//		this.cells[12][9] = true;
//		this.cells[11][8] = true;
	}

	draw(cellSize, padding, grid) {
		this.cellSize = cellSize;
		this.strokeWeight = 1;
		if(cellSize > 15) this.strokeWeight = 2;
		if(cellSize > 30) this.strokeWeight = 3;
		if(cellSize > 45) this.strokeWeight = 4;
		strokeWeight(this.strokeWeight);
		stroke(38,34,27);
		for(var x = 0; x < this.cells.length; x++){
			for(var y = 0; y < this.cells[x].length; y++){
				if(this.cells[x][y]) fill(229,224,220); else fill(38,34,27);
				if(grid) stroke(48,43,34);
				if(this.cells[x][y] && !padding/* and no grid? */) stroke(229,224,220);

				rect(this.offset.x + x*cellSize, this.offset.y + y*cellSize, cellSize, cellSize);

				stroke(38,34,27);
			}
		}
		strokeWeight(0);
	}

	toggleCell(x, y){
		this.cellx = -1;
		this.celly = -1;

		for(var i = 0; i < this.cells.length; i++){
			if(x > this.offset.x + this.cellSize * i && x <= this.offset.x + this.cellSize * i + this.cellSize) {
				this.cellx = i;
				break;
			}
		}
		if(this.cellx != -1) {
			console.log(this.cellx);
			for(var i = 0; i < this.cells[this.cellx].length; i++){
				if(y > this.offset.y + this.cellSize * i && y <= this.offset.y + this.cellSize * i + this.cellSize) {
					this.celly = i;
					break;
				}
			}
		}
		if(this.cellx >= 0 && this.cellx < this.cells.length && this.celly >= 0 && this.celly < this.cells.length) {
			if(this.cells[this.cellx][this.celly]) this.cells[this.cellx][this.celly] = false; else this.cells[this.cellx][this.celly] = true;
		}
	}

	nextGen() {
		this.nextArr = [];
		for(var x = 0; x < this.cells.length; x++){
			this.nextArr[x] = [];
			for(var y = 0; y < this.cells[x].length; y++){
				if(!this.cells[x][y]){
					if(this.countNeighbors(x, y) === 3) this.nextArr[x][y] = true; else this.nextArr[x][y] = false;
				} else {
					if(this.countNeighbors(x, y) < 2 || this.countNeighbors(x, y) > 3) this.nextArr[x][y] = false; else this.nextArr[x][y] = true;
				}
			}
		}
		this.cells = this.nextArr;
	}

	cn(x, y) {
		let amt = 0;
		for(var i = -1; i <= 1; i++){
			for(var j = -1; j <= 1; j++){
				if(this.cells[(x + i + this.cells.length) % this.cells.length][(y + j + this.cells[x].length) % this.cells[x].length]) amt++;	
				console.log(i + "*" + j + " :: " + amt);
			}
		}
		if(this.cells[x][y]) amt--;
		return amt;
	}
	countNeighbors(x, y) {
		let amt = 0;
		for(var i = -1; i <= 1; i++){
			for(var j = -1; j <= 1; j++){
				if(this.cells[(x + i + this.cells.length) % this.cells.length][(y + j + this.cells[x].length) % this.cells[x].length]) amt++;	
			}
		}
		if(this.cells[x][y]) amt--;
		return amt;
	}

	move(oldX, oldY, x, y) {
		this.newX = x - oldX;
		this.newY = y - oldY;
		this.offset.x += this.newX;
		this.offset.y += this.newY;
	}
	calculateOffset(cellSize, width, height, posx, posy) {
	}

}
