/**
 * Level.
 */
function Level() {
	
	Phaser.State.call(this);
	
}

/** @type Phaser.State */
var Level_proto = Object.create(Phaser.State.prototype);
Level.prototype = Level_proto;
Level.prototype.constructor = Level;

var _sheepWobble;
var _mainSheep;
var dragging = false;

var pens;

Level.prototype.init = function () {
	
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
	this.stage.backgroundColor = '#ffffff';
	
};

Level.prototype.preload = function () {
	
	this.load.pack('main', 'assets/pack.json');
	pens = new Array();
	//Full of Blank Objects
	for(var i = 0; i < 4; i++){
		pens[i] = new Object();
	}
	
};


Level.prototype.create = function () {
	this.add.sprite(0, 0, 'background');
	
	pens[0].back =  this.add.sprite(374, 387, 'penBack');
	pens[0].back.anchor.setTo(0.5, 0.5);
	
	pens[1].back = this.add.sprite(1581, 381, 'penBack');
	pens[1].back.anchor.setTo(0.5, 0.5);
	
	pens[2].back = this.add.sprite(383, 871, 'penBack');
	pens[2].back.anchor.setTo(0.5, 0.5);
	
	pens[3].back = this.add.sprite(1592, 868, 'penBack');
	pens[3].back.anchor.setTo(0.5, 0.5);
	
	pens[0].sheep = this.add.sprite(68, 210, 'sheepPen', 12);
	
	pens[0].front = this.add.sprite(374, 387, 'penFront');
	pens[0].front.anchor.setTo(0.5, 0.5);
	
	pens[1].sheep = this.add.sprite(1273, 198, 'sheepPen', 12);
	
	pens[1].front = this.add.sprite(1581, 381, 'penFront');
	pens[1].front.anchor.setTo(0.5, 0.5);
	
	pens[2].sheep = this.add.sprite(75, 697, 'sheepPen', 12);
	
	pens[2].front = this.add.sprite(383, 871, 'penFront');
	pens[2].front.anchor.setTo(0.5, 0.5);
	
	pens[3].sheep = this.add.sprite(1266, 709, 'sheepPen', 12);
	
	pens[3].front = this.add.sprite(1592, 868, 'penFront');
	pens[3].front.anchor.setTo(0.5, 0.5);
	
	_sheepWobble = this.add.sprite(948, 560, 'sheepWobble', 0);
	_sheepWobble.alpha = 0.0;
	_sheepWobble.anchor.setTo(0.5, 0.5);
	_sheepWobble.animations.add('wobble');
	_sheepWobble.scale.setTo(0.4,0.4);
	_sheepWobble.animations.play('wobble',30,true);
	
	_mainSheep = this.add.sprite(943, 527, 'mainSheep');
	_mainSheep.anchor.setTo(0.5, 0.5);
	_mainSheep.inputEnabled = true;
	_mainSheep.events.onInputDown.add(dragSheep);
	
	this.add.sprite(0, 0, 'gui');
	
	
	
};

function dragSheep(){
	dragging = true;
	_sheepWobble.alpha = 1.0;
	_mainSheep.alpha = 0.0;
	
}

function dropSheep(){
	dragging = false;
	_sheepWobble.alpha = 0.0;
	//Reset SheepWobble Position - Stop glitchy thing of pens expanding randomly
	_sheepWobble.position.setTo(948,560);
	_mainSheep.alpha = 1.0;
	
	var correct = true;
	//TODO Check if it's the correct answer
	
	//Check where we dropped it, if it's correct, add a sheep

	if(checkOverlap(_sheepWobble,pens[0].sheep)){
		if(correct){
			addSheepToPen(0);
		} else {
			//Do nothing for now...
		}
		return;
	} 
	
	if(checkOverlap(_sheepWobble,pens[1].sheep)){
		if(correct){
			addSheepToPen(1);
		} else {
			//Do nothing for now...
		}
		return;
	}
	
	if(checkOverlap(_sheepWobble,pens[2].sheep)){
		if(correct){
			addSheepToPen(2);
		} else {
			//Do nothing for now...
		}
		return;
	}
	
	if(checkOverlap(_sheepWobble,pens[3].sheep)){
		if(correct){
			addSheepToPen(3);
		} else {
			//Do nothing for now...
		}
		return;
	} 
}

/**
 * Add's a sheep to a pen
 * @param pen number (0-3)
 */
function addSheepToPen(pen){
	var temp = pens[pen].sheep.frame;
	
	temp--;
	//Stop us going past the first frame
	if(temp < 0){
		temp = 0;
	}
	
	pens[pen].sheep.frame = temp;
}


Level.prototype.update = function(){
	
	//Reset All Pens
	resetPens();

	if(dragging){
		_sheepWobble.position = this.input.position;
		//Check if we are over any of the pens
		
		if(checkOverlap(_sheepWobble,pens[0].sheep)){
			expandPen(0);
		}
		
		if(checkOverlap(_sheepWobble,pens[1].sheep)){
			expandPen(1);
		}
		
		if(checkOverlap(_sheepWobble,pens[2].sheep)){
			expandPen(2);
		}
		
		if(checkOverlap(_sheepWobble,pens[3].sheep)){
			expandPen(3);
		} 
		
	}
	
	if(this.input.activePointer.isUp){
		if(dragging){
			dropSheep();
		}
	}
	
	
};

/**
 * 
 * @param pen The pen to expand
 */
function expandPen(pen){
	pens[pen].back.scale.setTo(1.5,1.5);
	pens[pen].front.scale.setTo(1.5,1.5);
}

function resetPens(){
	for(var i = 0; i < 4; i++){
		pens[i].back.scale.setTo(1,1);
		pens[i].front.scale.setTo(1,1);
	}
}

/**
 * 
 * @param spriteA
 * @param spriteB
 * @returns true or false
 * 
 * Checks if the items are hitting each other
 */
function checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    return Phaser.Rectangle.intersects(boundsA, boundsB);
}


/* --- end generated code --- */
// -- user code here --
