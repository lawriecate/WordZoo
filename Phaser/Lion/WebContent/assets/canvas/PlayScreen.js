
// -- user code here --

/* --- start generated code --- */

// Generated by Phaser Editor v1.4.2 (Phaser v2.6.2)


/**
 * PlayScreen.
 */
function PlayScreen() {
	
	Phaser.State.call(this);
	
}

/** @type Phaser.State */
var PlayScreen_proto = Object.create(Phaser.State.prototype);
PlayScreen.prototype = PlayScreen_proto;
PlayScreen.prototype.constructor = PlayScreen;

PlayScreen.prototype.init = function () {
	
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
	this.stage.backgroundColor = '#ffffff';
	
};

PlayScreen.prototype.preload = function () {
	
	this.load.pack('PlayScreen', 'assets/pack.json');
	
};

PlayScreen.prototype.create = function () {
	
	var score = 0;
	var time = 0;
	
	var alphabet = ["a","b","c","d","e","f",
					"g","h","i","j","k","l",
					"m","n","o","p","q","r",
					"s","t","u","v","w","x",
					"y","z"];
	
	var words = 	["apple","bear","car","day","eye","fox",
					"golf","hotel","igloo","jam","kite","lolly",
					"moose","nose","o","pot","quest","rice",
					"seat","table","unicorn","violin","wax","x",
					"yellow","zebra"];
	
	var _Background = this.add.sprite(0, 0, 'Background');
	_Background.scale.setTo(1.51, 1.51);
	
	var _goalkeeper_center = this.add.sprite(768, 320, 'goalkeeper_center');
	_goalkeeper_center.scale.setTo(1.5, 1.5);
	
	var _Score = this.add.sprite(32, 32, 'ScoreBackground');
	_Score.scale.setTo(1.5, 1.5);
	
	var _Time = this.add.sprite(1664, 32, 'ScoreBackground');
	_Time.scale.setTo(1.5, 1.5);
	
	var _TopLeft = this.add.button(544, 128, 'ScoreBackground', null, this, null, null, null, null);
	_TopLeft.scale.setTo(1.5, 1.5);
	
	var _TopRight = this.add.button(1184, 128, 'ScoreBackground', null, this, null, null, null, null);
	_TopRight.scale.setTo(1.5, 1.5);
	
	var _BottomLeft = this.add.button(544, 576, 'ScoreBackground', null, this, null, null, null, null);
	_BottomLeft.scale.setTo(1.5, 1.5);
	
	var _BottomRight = this.add.button(1184, 576, 'ScoreBackground', null, this, null, null, null, null);
	_BottomRight.scale.setTo(1.5, 1.5);
	
	var _bottom_left_dive = this.add.sprite(416, 288, 'bottom_left_dive', 2);
	_bottom_left_dive.scale.setTo(1.5, 1.5);
	var _bottom_left_dive_bottomLeftDive = _bottom_left_dive.animations.add('bottomLeftDive', [2, 1, 0], 8, false);
	_bottom_left_dive_bottomLeftDive.killOnComplete = true;
	
	var _bottom_right_dive = this.add.sprite(800, 288, 'bottom_right_dive', 0);
	_bottom_right_dive.scale.setTo(1.5, 1.5);
	var _bottom_right_dive_bottomRightDive = _bottom_right_dive.animations.add('bottomRightDive', [0, 1, 2], 8, false);
	_bottom_right_dive_bottomRightDive.killOnComplete = true;
	
	var _top_left_dive = this.add.sprite(480, 256, 'top_left_dive', 0);
	_top_left_dive.scale.setTo(1.5, 1.5);
	var _top_left_dive_topLeftDive = _top_left_dive.animations.add('topLeftDive', [0, 1, 2], 8, false);
	_top_left_dive_topLeftDive.killOnComplete = true;
	
	var _top_right_dive = this.add.sprite(736, 256, 'top_right_dive', 0);
	_top_right_dive.scale.setTo(1.5, 1.5);
	var _top_right_dive_topRightDive = _top_right_dive.animations.add('topRightDive', [0, 1, 2], 8, false);
	_top_right_dive_topRightDive.killOnComplete = true;
	
	_bottom_right_dive_bottomRightDive.play();
	_top_right_dive_topRightDive.play();
	_bottom_left_dive_bottomLeftDive.play();
	_top_left_dive_topLeftDive.play();
	
};

/* --- end generated code --- */


// HelloWorld for *Testing*
PlayScreen.prototype.addHelloWorldText = function() 
{
	this.add.text(100, 100, "hello world!");
};