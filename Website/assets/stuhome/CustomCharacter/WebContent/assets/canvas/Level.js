//global variables
var character = character|| {};




/**
 * Level.
 */
function Level()
{
	Phaser.State.call(this);
}

/** @type Phaser.State */
var Level_proto = Object.create(Phaser.State.prototype);
Level.prototype = Level_proto;
Level.prototype.constructor = Level;

Level.prototype.init = function ()
{
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
	this.stage.backgroundColor = '#ffffff';

};

// Loaded
var loaded = false;

//Groups
var _buy;
var _feet;
var _body;
var _neck;
var _eye;
var _nose;
var _head;
var _animals;
var _locks;

var itemCost = 25;
var moneyText;
var usernameText;

// SpriteSheets
var spriteSheets = new Array();



Level.prototype.preload = function ()
{
	this.load.pack('main', '/stuhome/CustomCharacter/WebContent/assets/pack.json');
};

Level.prototype.create = function ()
{
	// Background
	this.add.sprite(0, 0, 'background');

	// Arrows
	var up = this.add.sprite(681, 7, 'upDown');
	var down = this.add.sprite(898, 555, 'upDown');
	down.angle = 180.0;

	// Arrow controls
	up.inputEnabled = true;
	up.events.onInputDown.add(moveItemsUp);
	down.inputEnabled = true;
	down.events.onInputDown.add(moveItemsDown);

	// Money
	moneyText = this.add.text(85,540,totalMoney,style);
	moneyText.anchor.set(0.5,0.5);

	// Username
	usernameText = this.add.text(260,45,username,style);
	usernameText.anchor.set(0.5,0.5);

	// Main animal
	_animals = this.add.sprite(0, 0, 'animals', 0);
	_animals.scale.setTo(1.2, 1.2);



	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~ Feet assets ~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	_feet = this.add.group();

	var _blackBoots = this.add.sprite(0, 0, 'blackBoots', 0, _feet);
	_blackBoots.scale.setTo(1.2, 1.2);
	_blackBoots.alpha = 0.0;
	spriteSheets[18] = _blackBoots;

	var _blackShoes = this.add.sprite(0, 0, 'blackShoes', 0, _feet);
	_blackShoes.scale.setTo(1.2, 1.2);
	_blackShoes.alpha = 0.0;
	spriteSheets[22] = _blackShoes;

	var _blueShoes = this.add.sprite(0, 0, 'blueShoes', 0, _feet);
	_blueShoes.scale.setTo(1.2, 1.2);
	_blueShoes.alpha = 0.0;
	spriteSheets[25] = _blueShoes;

	var _brownBoots = this.add.sprite(0, 0, 'brownBoots', 0, _feet);
	_brownBoots.scale.setTo(1.2, 1.2);
	_brownBoots.alpha = 0.0;
	spriteSheets[15] = _brownBoots;

	var _greenShoes = this.add.sprite(0, 0, 'greenShoes', 0, _feet);
	_greenShoes.scale.setTo(1.2, 1.2);
	_greenShoes.alpha = 0.0;
	spriteSheets[20] = _greenShoes;

	var _highHeels = this.add.sprite(0, 0, 'highHeels', 0, _feet);
	_highHeels.scale.setTo(1.2, 1.2);
	_highHeels.alpha = 0.0;
	spriteSheets[11] = _highHeels;

	var _pinkBoots = this.add.sprite(0, 0, 'pinkBoots', 0, _feet);
	_pinkBoots.scale.setTo(1.2, 1.2);
	_pinkBoots.alpha = 0.0;
	spriteSheets[8] = _pinkBoots;

	var _pinkShoes = this.add.sprite(0, 0, 'pinkShoes', 0, _feet);
	_pinkShoes.scale.setTo(1.2, 1.2);
	_pinkShoes.alpha = 0.0;
	spriteSheets[27] = _pinkShoes;

	var _yellowBoots = this.add.sprite(0, 0, 'yellowBoots', 0, _feet);
	_yellowBoots.scale.setTo(1.2, 1.2);
	_yellowBoots.alpha = 0.0;
	spriteSheets[35] = _yellowBoots;



	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~ Body assets ~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	_body = this.add.group();

	var _blueShirt = this.add.sprite(0, 0, 'blueShirt', 0, _body);
	_blueShirt.scale.setTo(1.2, 1.2);
	_blueShirt.alpha = 0.0;
	spriteSheets[24] = _blueShirt;

	var _greenShirt = this.add.sprite(0, 0, 'greenShirt', 0, _body);
	_greenShirt.scale.setTo(1.2, 1.2);
	_greenShirt.alpha = 0.0;
	spriteSheets[17] = _greenShirt;

	var _orangeShirt = this.add.sprite(0, 0, 'orangeShirt', 0, _body);
	_orangeShirt.scale.setTo(1.2, 1.2);
	_orangeShirt.alpha = 0.0;
	spriteSheets[3] = _orangeShirt;

	var _pinkShirt = this.add.sprite(0, 0, 'pinkShirt', 0, _body);
	_pinkShirt.scale.setTo(1.2, 1.2);
	_pinkShirt.alpha = 0.0;
	spriteSheets[7] = _pinkShirt;

	var _purpleShirt = this.add.sprite(0, 0, 'purpleShirt', 0, _body);
	_purpleShirt.scale.setTo(1.2, 1.2);
	_purpleShirt.alpha = 0.0;
	spriteSheets[28] = _purpleShirt;

	var _redShirt = this.add.sprite(0, 0, 'redShirt', 0, _body);
	_redShirt.scale.setTo(1.2, 1.2);
	_redShirt.alpha = 0.0;
	spriteSheets[33] = _redShirt;

	var _whiteShirt = this.add.sprite(0, 0, 'whiteShirt', 0, _body);
	_whiteShirt.scale.setTo(1.2, 1.2);
	_whiteShirt.alpha = 0.0;
	spriteSheets[32] = _whiteShirt;

	var _yellowShirt = this.add.sprite(0, 0, 'yellowShirt', 0, _body);
	_yellowShirt.scale.setTo(1.2, 1.2);
	_yellowShirt.alpha = 0.0;
	spriteSheets[34] = _yellowShirt;



	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~ Neck assets ~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	_neck = this.add.group();

	var _blackTie = this.add.sprite(0, 0, 'blackTie', 0, _neck);
	_blackTie.scale.setTo(1.2, 1.2);
	_blackTie.alpha = 0.0;

	var _bowTie = this.add.sprite(0, 0, 'bowTie', 0, _neck);
	_bowTie.scale.setTo(1.2, 1.2);
	_bowTie.alpha = 0.0;
	spriteSheets[9] = _bowTie;

	var _gryTie = this.add.sprite(0, 0, 'gryTie', 0, _neck);
	_gryTie.scale.setTo(1.2, 1.2);
	_gryTie.alpha = 0.0;
	spriteSheets[21] = _gryTie;

	var _hufTie = this.add.sprite(0, 0, 'hufTie', 0, _neck);
	_hufTie.scale.setTo(1.2, 1.2);
	_hufTie.alpha = 0.0;
	spriteSheets[1] = _hufTie;

	var _necklace = this.add.sprite(0, 0, 'necklace', 0, _neck);
	_necklace.scale.setTo(1.2, 1.2);
	_necklace.alpha = 0.0;
	spriteSheets[6] = _necklace;

	var _ravTie = this.add.sprite(0, 0, 'ravTie', 0, _neck);
	_ravTie.scale.setTo(1.2, 1.2);
	_ravTie.alpha = 0.0;
	spriteSheets[29] = _ravTie;

	var _slyTie = this.add.sprite(0, 0, 'slyTie', 0, _neck);
	_slyTie.scale.setTo(1.2, 1.2);
	_slyTie.alpha = 0.0;
	spriteSheets[13] = _slyTie;



	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~ Eye assets ~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	_eye = this.add.group();

	var _blueSunglasses = this.add.sprite(0, 0, 'blueSunglasses', 0, _eye);
	_blueSunglasses.scale.setTo(1.2, 1.2);
	_blueSunglasses.alpha = 0.0;
	spriteSheets[23] = _blueSunglasses;

	var _monocole = this.add.sprite(0, 0, 'monocole', 0, _eye);
	_monocole.scale.setTo(1.2, 1.2);
	_monocole.alpha = 0.0;
	spriteSheets[4] = _monocole;

	var _redGlasses = this.add.sprite(0, 0, 'redGlasses', 0, _eye);
	_redGlasses.scale.setTo(1.2, 1.2);
	_redGlasses.alpha = 0.0;
	spriteSheets[30] = _redGlasses;

	var _blackSunglasses = this.add.sprite(0, 0, 'blackSunglasses', 0, _eye);
	_blackSunglasses.scale.setTo(1.2, 1.2);
	_blackSunglasses.alpha = 0.0;
	spriteSheets[19] = _blackSunglasses;

	var _pinkGlasses = this.add.sprite(0, 0, 'pinkGlasses', 0, _eye);
	_pinkGlasses.scale.setTo(1.2, 1.2);
	_pinkGlasses.alpha = 0.0;
	spriteSheets[5] = _pinkGlasses;

	var _hpGlasses = this.add.sprite(0, 0, 'hpGlasses', 0, _eye);
	_hpGlasses.scale.setTo(1.2, 1.2);
	_hpGlasses.alpha = 0.0;
	spriteSheets[14] = _hpGlasses;



	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~ Nose assets ~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	_nose = this.add.group();

	var _clownNose = this.add.sprite(0, 0, 'clownNose', 0, _nose);
	_clownNose.scale.setTo(1.2, 1.2);
	_clownNose.alpha = 0.0;
	spriteSheets[12] = _clownNose;

	var _moustache = this.add.sprite(0, 0, 'moustache', 0, _nose);
	_moustache.scale.setTo(1.2, 1.2);
	_moustache.alpha = 0.0;
	spriteSheets[2] = _moustache;



	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~ Head assets ~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	_head = this.add.group();

	var _bowlerHat = this.add.sprite(0, 0, 'bowlerHat', 0, _head);
	_bowlerHat.scale.setTo(1.2, 1.2);
	_bowlerHat.alpha = 0.0;
	spriteSheets[26] = _bowlerHat;

	var _cowboyHat = this.add.sprite(0, 0, 'cowboyHat', 0, _head);
	_cowboyHat.scale.setTo(1.2, 1.2);
	_cowboyHat.alpha = 0.0;
	spriteSheets[10] = _cowboyHat;

	var _hardHat = this.add.sprite(0, 0, 'hardHat', 0, _head);
	_hardHat.scale.setTo(1.2, 1.2);
	_hardHat.alpha = 0.0;
	spriteSheets[0] = _hardHat;

	var _topHat = this.add.sprite(0, 0, 'topHat', 0, _head);
	_topHat.scale.setTo(1.2, 1.2);
	_topHat.alpha = 0.0;
	spriteSheets[31] = _topHat;

	var _crown = this.add.sprite(0, 0, 'crown', 0, _head);
	_crown.scale.setTo(1.2, 1.2);
	_crown.alpha = 0.0;
	spriteSheets[36] = _crown;

	var _clownWig = this.add.sprite(0,0,'clownWig',0,_head);
	_clownWig.scale.setTo(1.2,1.2);
	_clownWig.alpha = 0.0;
	spriteSheets[16] = _clownWig;



	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~ Menu assets ~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	 _buy = this.add.group();

		var item1 = this.add.sprite(560, 1085, 'blackBoot', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addFeet,{item: _blackBoots});

		item1 = this.add.sprite(722, 1085, 'blackGlasses', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addEye,{item: _blackSunglasses});

		item1 = this.add.sprite(722, 1232, 'blackShoe', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addFeet,{item: _blackShoes});

		item1 = this.add.sprite(886, 1232, 'blueGlasses', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addEye,{item: _blueSunglasses});

		item1 = this.add.sprite(560, 1385, 'blueShirt1', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addBody,{item: _blueShirt});

		item1 = this.add.sprite(722, 1385, 'blueShoe', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addFeet,{item: _blueShoes});

		item1 = this.add.sprite(560, 571, 'bowTie1', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addNeck,{item: _bowTie});

		item1 = this.add.sprite(886, 1385, 'bowlerHat1', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addHead,{item: _bowlerHat});

		item1 = this.add.sprite(560, 871, 'brownBoot', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addFeet,{item: _brownBoots});

		item1 = this.add.sprite(560, 718, 'clownNose1', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addNose,{item: _clownNose});

		item1 = this.add.sprite(722, 871, 'clownWIg', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addHead,{item: _clownWig});

		item1 = this.add.sprite(722, 571, 'cowboyHat1', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addHead,{item: _cowboyHat});

		item1 = this.add.sprite(722, 2260, 'crown1', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addHead,{item: _crown});

		item1 = this.add.sprite(560, 2113, 'elephant', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(changeAnimal,{item: 6});

		item1 = this.add.sprite(560, 2413, 'giraffe', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(changeAnimal,{item: 0});

		item1 = this.add.sprite(886, 871, 'greenShirt1', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addBody,{item: _greenShirt});

		item1 = this.add.sprite(886, 1085, 'greenShoe', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addFeet,{item: _greenShoes});

		item1 = this.add.sprite(560, 1232, 'gryTie1', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addNeck,{item: _gryTie});

		item1 = this.add.sprite(560, 57, 'hardHat1', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addHead,{item: _hardHat});

		item1 = this.add.sprite(886, 571, 'highHeel', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addFeet,{item: _highHeels});

		item1 = this.add.sprite(886, 718, 'hpGlasses1', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addEye,{item: _hpGlasses});

		item1 = this.add.sprite(722, 57, 'hufTie1', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addNeck,{item: _hufTie});

		item1 = this.add.sprite(722, 2113, 'lion', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(changeAnimal,{item: 7});

		item1 = this.add.sprite(722, 204, 'monocle', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addEye,{item: _monocole});

		item1 = this.add.sprite(886, 57, 'moustache1', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addNose,{item: _moustache});

		item1 = this.add.sprite(560, 357, 'necklace1', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addNeck,{item: _necklace});

		item1 = this.add.sprite(886, 2113, 'octopus', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(changeAnimal,{item: 2});

		item1 = this.add.sprite(560, 204, 'orangeShirt1', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addBody,{item: _orangeShirt});

		item1 = this.add.sprite(560, 2260, 'owl', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(changeAnimal,{item: 1});

		item1 = this.add.sprite(886, 2260, 'panda', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(changeAnimal,{item: 4});

		item1 = this.add.sprite(886, 357, 'pinkBoot', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addFeet,{item: _pinkBoots});

		item1 = this.add.sprite(886, 204, 'pinkGlasses1', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addEye,{item: _pinkGlasses});

		item1 = this.add.sprite(722, 357, 'pinkShirt1', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addBody,{item: _pinkShirt});

		item1 = this.add.sprite(560, 1599, 'pinkShoe', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addFeet,{item: _pinkShoes});

		item1 = this.add.sprite(722, 1599, 'purpleShirt1', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addBody,{item: _purpleShirt});

		item1 = this.add.sprite(886, 1599, 'ravTie1', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addNeck,{item: _ravTie});

		item1 = this.add.sprite(560, 1746, 'redGlasses1', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addEye,{item: _redGlasses});

		item1 = this.add.sprite(560, 1899, 'redShirt1', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addBody,{item: _redShirt});

		item1 = this.add.sprite(886, 2413, 'sheep', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(changeAnimal,{item: 5});

		item1 = this.add.sprite(722, 718, 'slyTie1', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addNeck,{item: _slyTie});

		item1 = this.add.sprite(722, 1746, 'topHat1', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addHead,{item: _topHat});

		item1 = this.add.sprite(886, 1746, 'whiteShirt1', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addBody,{item: _whiteShirt});

		item1 = this.add.sprite(886, 1899, 'yellowBoot', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addFeet,{item: _yellowBoots});

		item1 = this.add.sprite(722, 1899, 'yellowShirt1', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(addBody,{item: _yellowShirt});

		item1 = this.add.sprite(722, 2413, 'zebra', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(changeAnimal,{item: 3});

		item1 = this.add.sprite(560,2627,'removeHat', null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(removeHat);

		item1 = this.add.sprite(722,2627,'removeGlasses',null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(removeGlasses);

		item1 = this.add.sprite(886,2627,'removeNeck',null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(removeNeck);

		item1 = this.add.sprite(560,2627+147,'removeNose',null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(removeNose);

		item1 = this.add.sprite(722,2627+147,'removeShirt',null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(removeShirt);

		item1 = this.add.sprite(886,2627+147,'removeShoes',null, _buy);
		item1.inputEnabled = true;
		item1.events.onInputDown.add(removeShoes);



		// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		// ~~~~~~~~~~~~~~~~~~~~~~~~ Menu locks ~~~~~~~~~~~~~~~~~~~~~~~~~
		// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

		_locks = this.add.group();

		for(var block = 0; block < 5; block++)
		{
			item1 = this.add.sprite(560, 57 + (block * 514), 'lock', null, _locks);
			item1.inputEnabled = true;
			item1.events.onInputDown.add(buyItem,{lock: item1});

			item1 = this.add.sprite(722, 57 + (block *514), 'lock', null, _locks);
			item1.inputEnabled = true;
			item1.events.onInputDown.add(buyItem,{lock: item1});

			item1 = this.add.sprite(886, 57 + (block *514), 'lock', null, _locks);
			item1.inputEnabled = true;
			item1.events.onInputDown.add(buyItem,{lock: item1});

			item1 = this.add.sprite(560, 204 + (block * 514), 'lock', null, _locks);
			item1.inputEnabled = true;
			item1.events.onInputDown.add(buyItem,{lock: item1});

			item1 = this.add.sprite(722, 204 + (block *514), 'lock', null, _locks);
			item1.inputEnabled = true;
			item1.events.onInputDown.add(buyItem,{lock: item1});

			item1 = this.add.sprite(886, 204 + (block *514), 'lock', null, _locks);
			item1.inputEnabled = true;
			item1.events.onInputDown.add(buyItem,{lock: item1});

			item1 = this.add.sprite(560, 357 + (block * 514), 'lock', null, _locks);
			item1.inputEnabled = true;
			item1.events.onInputDown.add(buyItem,{lock: item1});

			item1 = this.add.sprite(722, 357 + (block *514), 'lock', null, _locks);
			item1.inputEnabled = true;
			item1.events.onInputDown.add(buyItem,{lock: item1});

			item1 = this.add.sprite(886, 357 + (block *514), 'lock', null, _locks);
			item1.inputEnabled = true;
			item1.events.onInputDown.add(buyItem,{lock: item1});
		}

		// Unlock and Equip Tests
		renderCharacter(data);


		// Show loaded (Main.js will redirect from LoadingScreen)
		levelLoaded = true;
};

//Purchases the Item
function buyItem()
{
	//Check Price
	if(totalMoney >= itemCost)
	{
		totalMoney -= itemCost;
		moneyText.setText(totalMoney);

		// If allowed
		this.lock.visible = false;
		data[getLockID(this.lock)] = 1;

		// UpdateDB
		updateDB();
	}
}

function getLockID(lock)
{
	for(var i = 0; i < _locks.children.length; i++)
	{
		if(_locks.children[i] === lock)
		{
			return i;
		}
	}
	return -1;
}



/**
 * From the Data from the Server, Update the Unlocked
 */
function renderCharacter(data)
{
	// Loop through data
	for(var i = 0; i < 36; i++)
	{
		// Unlocked and Equiped
		if(data[i] == 2)
		{
			spriteSheets[i].alpha = 1.0;
			_locks.children[i].visible = false;
		}
		// Unlocked
		if(data[i] == 1){
			_locks.children[i].visible = false;
		}
	}

	// Unlock the items
	for(var i = 36; i < 45; i++)
	{
		if(data[i] == 1 || data[i] == 2)
		{
			_locks.children[i].visible = false;
		}
	}

	//The Crown
	if(data[40] == 1){
		_locks.children[40].visible = false;
	}

	if(data[40] == 2)
	{
		spriteSheets[36].alpha = 1.0;
		_locks.children[40].visible = false;
	}

	// Cases of Which Animal
	if(data[36] == 2)
	{
		changeAnimal2(6);
	}
	else if(data[37] == 2)
	{
		changeAnimal2(7);
	}
	else if(data[38] == 2)
	{
		changeAnimal2(2);
	}
	else if(data[39] == 2)
	{
		changeAnimal2(1);
	}
	else if(data[41] == 2)
	{
		changeAnimal2(4);
	}
	else if(data[42] == 2)
	{
		changeAnimal2(0);
	}
	else if(data[43] == 2)
	{
		changeAnimal2(3);
	}
	else if(data[44] == 2)
	{
		changeAnimal2(5);
	}
}



var page = 0;
var upperLimit = 5;

function moveItemsUp()
{
	if(page == 0)
	{
		return;
	}

	_buy.forEach(function(item)
	{
		item.y+= 514;
	});
	_locks.forEach(function(item)
	{
		item.y+=514;
	});

	page--;
}

function moveItemsDown()
{
	if(page == upperLimit)
	{
		return;
	}
	_buy.forEach(function(item)
	{
		item.y-= 514;
	});
	_locks.forEach(function(item)
	{
		item.y-=514;
	});

	page++;
}


var animalIndex = 0;

// Updates the Data
function updateData(item)
{
	for(var j = 0; j < spriteSheets.length; j++)
	{
		if(item === spriteSheets[j])
		{
			if(data[j] == 2)
			{
				data[j] = 1;
				break;
			}
		}
	}
	console.log("Sup");
	updateDB();
}

function updateEquipedItem(item)
{
	// Go through and add the item to data
	for(var i = 0; i < spriteSheets.length; i++)
	{
		if(item === spriteSheets[i])
		{
			data[i] = 2;
			break;
		}
	}
	updateDB();
}

function addHead()
{
	_head.forEach(function(item)
	{
		item.alpha = 0.0;
		updateData(item);
	});

	updateEquipedItem(this.item);

	this.item.frame = animalIndex;
	this.item.alpha = 1.0;

}

function addNose()
{
	_nose.forEach(function(item)
	{
		item.alpha = 0.0;
		updateData(item);
	});

	updateEquipedItem(this.item);

	this.item.frame = animalIndex;
	this.item.alpha = 1.0;
}

function addEye()
{
	_eye.forEach(function(item)
	{
		item.alpha = 0.0;
		updateData(item);
	});
	updateEquipedItem(this.item);

	this.item.frame = animalIndex;
	this.item.alpha = 1.0;
}

function addNeck()
{
	_neck.forEach(function(item)
	{
		item.alpha = 0.0;
		updateData(item);
	});
	updateEquipedItem(this.item);

	this.item.frame = animalIndex;
	this.item.alpha = 1.0;
}

function addBody()
{
	_body.forEach(function(item)
	{
		item.alpha = 0.0;
		updateData(item);
	});
	updateEquipedItem(this.item);

	this.item.frame = animalIndex;
	this.item.alpha = 1.0;
}

function addFeet()
{
	_feet.forEach(function(item)
	{
		item.alpha = 0.0;
		updateData(item);
	});
	updateEquipedItem(this.item);

	this.item.frame = animalIndex;
	this.item.alpha = 1.0;
}

function changeAnimal()
{
	animalIndex = this.item;
	_animals.frame = animalIndex;

	// For Each Object, update the frames
	_feet.forEach(function(item)
	{
		item.frame = animalIndex;
	});

	_body.forEach(function(item)
	{
		item.frame = animalIndex;
	});

	_neck.forEach(function(item)
	{
		item.frame = animalIndex;
	});

	_eye.forEach(function(item)
	{
		item.frame = animalIndex;
	});

	_nose.forEach(function(item)
	{
		item.frame = animalIndex;
	});

	_head.forEach(function(item)
	{
		item.frame = animalIndex;
	});

	// Convert itemNumber to Sprite Sheet Number
	convertedValue = convertItemNumberToSpriteNumber(this.item);

	// If any current ones are set as 2, set to 1
	for(var i = 36; i < 45; i++)
	{
		if(i == 40)
		{
			continue;
		}
		if(data[i] == 2)
		{
			data[i] = 1;
			break;
		}
	}
	// Set itemNumberConverted to 2
	data[convertedValue] = 2;

	// UpdateDB
	updateDB();
}

function convertItemNumberToSpriteNumber(itemNumber)
{
	switch(itemNumber)
	{
		case 0:
			return 42;
		case 1:
			return 39;
		case 2:
			return 38;
		case 3:
			return 43;
		case 4:
			return 41;
		case 5:
			return 44;
		case 6:
			return 36;
		case 7:
			return 37;
	}
}

function changeAnimal2(item)
{
	animalIndex = item;
	_animals.frame = animalIndex;

	// For Each Object, update the frames
	_feet.forEach(function(item)
	{
		item.frame = animalIndex;
	});

	_body.forEach(function(item)
	{
		item.frame = animalIndex;
	});

	_neck.forEach(function(item)
	{
		item.frame = animalIndex;
	});

	_eye.forEach(function(item)
	{
		item.frame = animalIndex;
	});

	_nose.forEach(function(item)
	{
		item.frame = animalIndex;
	});

	_head.forEach(function(item)
	{
		item.frame = animalIndex;
	});

	updateDB();
}


function removeHat()
{
	_head.forEach(function(item)
	{
		item.alpha = 0.0;
		updateData(item);
	});
}

function removeGlasses()
{
	_eye.forEach(function(item)
	{
		item.alpha = 0.0;
		updateData(item);
	});
}

function removeNeck()
{
	_neck.forEach(function(item)
	{
		item.alpha = 0.0;
		updateData(item);
	});
}

function removeNose()
{
	_nose.forEach(function(item)
	{
		item.alpha = 0.0;
		updateData(item);
	});
}

function removeShirt()
{
	_body.forEach(function(item)
	{
		item.alpha = 0.0;
		updateData(item);
	});
}

function removeShoes()
{
	_feet.forEach(function(item)
	{
		item.alpha = 0.0;
		updateData(item);
	});
}


// Update DB records for this user
function updateDB()
{
	console.log('updateDB '+data[38]+" vs "+data[40]);

	// Username
	// Array
	// Coins

	// POST
	$.post('/student/buy',{newPoints:totalMoney,newCharacter:data},function(data) {

	}).fail(function() {
	});
}
