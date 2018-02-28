/**
 * GameController
 *
 * @description :: Server-side logic for managing games
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var zmq = require('zmq');
function word2pos(word) {
	 switch (word) {
		 case "smoke":
		 return 0;
		case "cat":
		 return 1;
		case "club":
		 return 2;
		case "gnome":
		 return 3;
		case "cold":
		 return 4;
		case "hog":
		 return 5;
		case "lip":
		 return 6;
		case "goat":
		 return 7;
		case "plane":
		 return 8;
		case "dot":
		 return 9;
		case "box":
		 return 10;
		case "pin":
		 return 11;
		case "mash":
		 return 12;
		case "mane":
		 return 13;
		case "hug":
		 return 14;
		case "lid":
		 return 15;
		case "lamb":
		 return 16;
		case "toast":
		 return 17;
		case "zip":
		 return 18;
		case "sack":
		 return 19;
		case "rug":
		 return 20;
		case "top":
		 return 21;
		case "sweet":
		 return 22;
		case "jet":
		 return 23;
		case "tomatoes":
		 return 24;
		case "third":
		 return 25;
		case "hose":
		 return 26;
		case "tip":
		 return 27;
		case "mouth":
		 return 28;
		case "sock":
		 return 29;
		case "pink":
		 return 30;
		case "cog":
		 return 31;
		case "feet":
		 return 32;
		case "cross":
		 return 33;
		case "feather":
		 return 34;
		case "brown":
		 return 35;
		case "cloak":
		 return 36;
		case "bench":
		 return 37;
		case "back":
		 return 38;
		case "bug":
		 return 39;
		case "cage":
		 return 40;
		case "fox":
		 return 41;
		case "nun":
		 return 42;
		case "chest":
		 return 43;
		case "nine":
		 return 44;
		case "hot":
		 return 45;
		case "hill":
		 return 46;
		case "duck":
		 return 47;
		case "hen":
		 return 48;
		case "nut":
		 return 49;
		case "boat":
		 return 50;
		case "park":
		 return 51;
		case "page":
		 return 52;
		case "black":
		 return 53;
		case "nest":
		 return 54;
		case "cash":
		 return 55;
		case "cube":
		 return 56;
		case "sink":
		 return 57;
		case "sick":
		 return 58;
		case "queen":
		 return 59;
		case "plate":
		 return 60;
		case "clean":
		 return 61;
		case "moon":
		 return 62;
		case "poodle":
		 return 63;
		case "pearl":
		 return 64;
		case "leg":
		 return 65;
		case "bread":
		 return 66;
		case "soil":
		 return 67;
		case "britain":
		 return 68;
		case "brushes":
		 return 69;
		case "clothes":
		 return 70;
		case "bake":
		 return 71;
		case "shed":
		 return 72;
		case "hat":
		 return 73;
		case "ship":
		 return 74;
		case "bow":
		 return 75;
		case "thumb":
		 return 76;
		case "seed":
		 return 77;
		case "lock":
		 return 78;
		case "cream":
		 return 79;
		case "plug":
		 return 80;
		case "jump":
		 return 81;
		case "south":
		 return 82;
		case "snowflake":
		 return 83;
		case "tap":
		 return 84;
		case "pop":
		 return 85;
		case "tube":
		 return 86;
		case "dump":
		 return 87;
		case "door":
		 return 88;
		case "tape":
		 return 89;
		case "head":
		 return 90;
		case "puzzle":
		 return 91;
		case "rust":
		 return 92;
		case "hell":
		 return 93;
		case "pan":
		 return 94;
		case "clock":
		 return 95;
		case "ten":
		 return 96;
		case "tyre":
		 return 97;
		case "shop":
		 return 98;
		case "shark":
		 return 99;
		case "farm":
		 return 100;
		case "dish":
		 return 101;
		case "frog":
		 return 102;
		case "grave":
		 return 103;
		case "oil":
		 return 104;
		case "peach":
		 return 105;
		case "spell":
		 return 106;
		case "drum":
		 return 107;
		case "roast":
		 return 108;
		case "spear":
		 return 109;
		case "yolk":
		 return 110;
		case "owl":
		 return 111;
		case "shape":
		 return 112;
		case "mad":
		 return 113;
		case "land":
		 return 114;
		case "coat":
		 return 115;
		case "day":
		 return 116;
		case "dog":
		 return 117;
		case "square":
		 return 118;
		case "potato":
		 return 119;
		case "knight":
		 return 120;
		case "red":
		 return 121;
		case "balloon":
		 return 122;
		case "sheep":
		 return 123;
		case "bed":
		 return 124;
		case "cake":
		 return 125;
		case "bun":
		 return 126;
		case "pancake":
		 return 127;
		case "peaches":
		 return 128;
		case "ice":
		 return 129;
		case "vest":
		 return 130;
		case "fax":
		 return 131;
		case "mouse":
		 return 132;
		case "train":
		 return 133;
		case "spring":
		 return 134;
		case "mine":
		 return 135;
		case "gift":
		 return 136;
		case "green":
		 return 137;
		case "click":
		 return 138;
		case "bowl":
		 return 139;
		case "beaches":
		 return 140;
		case "hair":
		 return 141;
		case "gold":
		 return 142;
		case "rap":
		 return 143;
		case "net":
		 return 145;
		case "cook":
		 return 146;
		case "sun":
		 return 147;
		case "sleep":
		 return 148;
		case "bath":
		 return 149;
		case "deer":
		 return 150;
		case "ben":
		 return 151;
		case "road":
		 return 152;
		case "king":
		 return 153;
		case "rain":
		 return 154;
		case "glass":
		 return 155;
		case "mat":
		 return 156;
		case "brick":
		 return 157;
		case "smell":
		 return 158;
		case "throne":
		 return 159;
		case "gun":
		 return 160;
		case "drain":
		 return 161;
		case "mug":
		 return 162;
		case "hop":
		 return 163;
		case "chop":
		 return 164;
		case "rat":
		 return 165;
		case "pope":
		 return 166;
		case "wax":
		 return 167;
		case "swing":
		 return 168;
		case "pram":
		 return 169;
		case "can":
		 return 170;
		case "vet":
		 return 171;
		case "west":
		 return 172;
		case "tank":
		 return 173;
		case "lake":
		 return 174;
		case "bat":
		 return 175;
		case "foot":
		 return 176;
		case "ball":
		 return 177;
		case "potatoes":
		 return 178;
		case "tower":
		 return 179;
		case "hut":
		 return 180;
		case "wall":
		 return 181;
		case "wrench":
		 return 182;
		case "monkey":
		 return 183;
		case "plum":
		 return 184;
		case "cone":
		 return 185;
		case "toad":
		 return 186;
		case "fire":
		 return 187;
		case "pub":
		 return 188;
		case "wine":
		 return 189;
		case "nose":
		 return 190;
		case "snow":
		 return 191;
		case "pot":
		 return 192;
		case "wink":
		 return 193;
		case "bin":
		 return 194;
		case "tomato":
		 return 195;
		case "truck":
		 return 196;
		case "girl":
		 return 197;
		case "lead":
		 return 198;
		case "eight":
		 return 199;
		case "towel":
		 return 200;
		case "four":
		 return 201;
		case "town":
		 return 202;
		case "bird":
		 return 203;
		case "price":
		 return 204;
		case "meat":
		 return 205;
		case "calf":
		 return 206;
		case "house":
		 return 207;
		case "scalf":
		 return 208;
		case "rag":
		 return 209;
		case "turkey":
		 return 210;
		case "rock":
		 return 211;
		case "three":
		 return 212;
		case "bear":
		 return 213;
		case "stone":
		 return 214;
		case "wood":
		 return 215;
		case "fin":
		 return 216;
		case "jug":
		 return 217;
		case "squid":
		 return 218;
		case "steam":
		 return 219;
		case "dress":
		 return 220;
		case "pages":
		 return 221;
		case "pill":
		 return 222;
		case "weed":
		 return 223;
		case "flag":
		 return 224;
		case "cub":
		 return 225;
		case "mud":
		 return 226;
		case "kid":
		 return 227;
		case "sand":
		 return 228;
		case "kiss":
		 return 229;
		case "hand":
		 return 230;
		case "flour":
		 return 231;
		case "bushes":
		 return 232;
		case "car":
		 return 233;
		case "goal":
		 return 234;
		case "clown":
		 return 235;
		case "bank":
		 return 236;
		case "tag":
		 return 237;
		case "home":
		 return 238;
		case "tall":
		 return 239;
		case "class":
		 return 240;
		case "fish":
		 return 241;
		case "tin":
		 return 242;
		case "ring":
		 return 243;
		case "dice":
		 return 244;
		case "crack":
		 return 245;
		case "mill":
		 return 246;
		case "pine":
		 return 247;
		case "flower":
		 return 248;
		case "donkey":
		 return 249;
		case "men":
		 return 250;
		case "hip":
		 return 251;
		case "brake":
		 return 252;
		case "log":
		 return 253;
		case "ant":
		 return 254;
		case "brain":
		 return 255;
		case "wing":
		 return 256;
		case "crown":
		 return 257;
		case "look":
		 return 258;
		case "ink":
		 return 259;
		case "spoon":
		 return 260;
		case "mountain":
		 return 261;
		case "wet":
		 return 262;
		case "foil":
		 return 263;
		case "sweep":
		 return 264;
		case "stop":
		 return 265;
		case "bald":
		 return 266;
		case "tray":
		 return 267;
		case "mop":
		 return 268;
		case "kick":
		 return 269;
		case "tub":
		 return 270;
		case "peg":
		 return 271;
		case "tree":
		 return 272;
		case "fan":
		 return 273;
		case "bubble":
		 return 274;
		case "rope":
		 return 275;
		case "fall":
		 return 276;
		case "fountain":
		 return 277;
		case "soap":
		 return 278;
		case "bill":
		 return 279;
		case "book":
		 return 280;
		case "dome":
		 return 281;
		case "half":
		 return 282;
		case "stair":
		 return 283;
		case "nap":
		 return 284;
		case "curtain":
		 return 285;
		case "wheat":
		 return 286;
		case "well":
		 return 287;
		case "path":
		 return 288;
		case "grill":
		 return 289;
		case "ram":
		 return 290;
		case "noodle":
		 return 291;
		case "rake":
		 return 292;
		case "beach":
		 return 293;
		case "elf":
		 return 294;
		case "cages":
		 return 295;
		case "weather":
		 return 296;
		case "tick":
		 return 297;
		case "hall":
		 return 298;
		case "kite":
		 return 299;
		case "dust":
		 return 300;
		case "shelf":
		 return 301;
		case "shower":
		 return 302;
		case "plant":
		 return 303;
		case "chair":
		 return 304;
		case "chess":
		 return 305;
		case "bell":
		 return 306;
		case "lift":
		 return 307;
		case "grape":
		 return 308;
		case "read":
		 return 309;
		case "wave":
		 return 310;
		case "moss":
		 return 311;
		case "oak":
		 return 312;
		case "band":
		 return 313;
		case "pig":
		 return 314;
		case "sad":
		 return 315;
		case "play":
		 return 316;
		case "star":
		 return 317;
		case "fog":
		 return 318;
		case "big":
		 return 319;
		case "arm":
		 return 320;
		case "liquid":
		 return 321;
		case "six":
		 return 322;
		case "man":
		 return 323;

	 	default:
	 		return null;
	 }
 }

function generateState() {
	len = 300;
	value = 0.5;
  if (len == 0) return [];
  var a = [value];
  while (a.length * 2 <= len) a = a.concat(a);
  if (a.length < len) a = a.concat(a.slice(0, len - a.length));
  return a;
}

function getData() {
  sails.log('Calling python');
  var port = 3000;
  var socket = zmq.socket('req');
  socket.identity = 'client' + process.pid;
  socket.connect("tcp://127.0.0.1:"+port);
  var data = {};
	var lock = true;
  // Ask Question
  socket.send(JSON.stringify(data));

  reply = function(data,lock) {
    var answer = data.toString();
    //console.log(answer);
    sails.log(answer);
    obj = JSON.parse(answer);
		data = obj;
		lock = false;
    sails.log(obj);
  }
  // Receizve Answer
   socket.on('message', reply);
	 while(lock);
	 return data;
/*
	 socket.on('connection',function(socket) {
		 sails.log('connected');
		 //Send a message after a timeout of 4seconds
	   setTimeout(function() {
	      return 'error';
	   }, 4000);

		 socket.on('message', function(data) {
			 var answer = data.toString();
			 //console.log(answer);
			 sails.log(answer);
			 obj = JSON.parse(answer);
			 return obj;
		 });

	   socket.on('disconnect', function () {
	      console.log('A user disconnected');
	   });
	 });*/
}
module.exports = {
	home: function (req, res) {

			/*if(!req.pupil.completedWelcome) {
				return res.redirect('/student/welcome');
			}*/

			games = Game.find().exec(function(err,games) {
				if (err) {
					return res.serverError(err);
				}

					//return res.view('student/home.ejs', {'title':'Start Screen',games:games,  layout: 'layout_student'});
          return res.view('student/inner_home.ejs', {'title': 'Start Screen',games:games,  layout: 'student/home2'});
			});



  },

	play: function(req,res) {

		game = Game.findOne({slug:req.params.gameslug}).exec(function(err,game) {
			if (err ) {
				return res.serverError(err);
			}

      if(game == null) {
        return res.notFound();
      }

				return res.view('student/play.ejs', {'title':'Play '+game.name,game:game,  layout: 'student/game_layout'});

		});
	},
	testdata: function (req,res) {
		/*data = [
			['word1','word2'],
			['word1','word2'],
			['word1','word2'],
			['word1','word2'],
			['word1','word2'],
			['word1','word2'],
			['word1','word2'],
			['word1','word2'],
			['word1','word2'],
			['word1','word2'],
		];*/
		var data = [["Z1","Z2","Z3","Z4","Z5","Z6","Z7","Z8"],
							["X1","X2","X3","X4","X5","X6","X7","X8"],
							["C1","C2","C3","C4","C5","C6","C7","C8"],
							["Cat","Hat","Mat","Vat","Pat","Bat","Fat"]];


		return res.send(data);
	},

	savetestdata: function (req,res) {
		data = req.param('gamename');
		return res.send(data);
	},

	startGame: function(req,res) {
		var data = ["smoke","cat","club","gnome","cold","hog","lip","goat"];
		req.session.game.words = data;
		req.session.game.startTime = new Date.now();
		return res.send(data);
	},

	endGame: function(req,res) {
		var wordPercents = req.param('words');
		var game = Game.findOne({slug:req.params.gameslug}).exec(function(err,game) {
			session = Play.new({
				game: req.param('game'),
				pupil:req.session.pupilId
			},function(err,session) {
				// session created

				// update words

				// update states
				// get old state
				var state = State.find({
          where:{"pupil":req.session.pupilId},
           sort: 'createdAt DESC',
            limit: 1
          }).exec(function(err,stateRecord) {
            //sails.log(err);
          //  sails.log("Q");
            //sails.log(state);

            // if no state generate
    				if(stateRecord.state == null) {
    					var state = generateState();
    				}
            //        sails.log("G");
    				sails.log(state);
    				//unpack


    				//apply new values
    				//var words = req.session.game.words;
    				// apply decay value to state
    				//var decayValue = 0.9;


    				var words = req.session.game.words;
    				var i = 0;

						// TODO save game state 10 times for each word

    				_.each(wordPercents,function(percent) {
    					pos = word2pos(words[i]);
    					state[pos] = percent ;
						i++;
						
						var stateRecord = {state:JSON.stringify(state),pupil:req.session.pupilId};
						sails.log("saving");
						sails.log(stateRecord);
						State.create(stateRecord,function(err,state) {
							
						});
    				});
    				sails.log(state);

    				// change to make a new state for each word

    				// save back
            

						// generate session
						
    				// null out session data for games
    				req.session.game = null;
          });

			});
		});

		//wordHistory = req.param('wordHistory');
		// save data from game to student record

		/*_each(wordHistroy,function(wordRecord) {
			//["K1", false, 3277]
			var params = {
				word = wordRecord[0],
				response = wordRecord[1],
				timeToResponse = wordRecord[2]
			}
		});*/
		return res.ok();
    return res.json({'status':'saved'});
	},

	sheepgame: function( req,res) {
		return res.view('sheepgame.ejs', {'title':'Sheep Game'});
	},

	list: function(req,res) {
		games = Game.find().exec(function(err,games) {
			if (err) {
				return res.serverError(err);
			}

				return res.view('admin/games.ejs', {'title':'Manage Games',games:games,  layout: 'layout_admin'});

		});
	},

	create: function(req,res) {
		Game.make({
      name: req.param('name'),
			source: req.param('source'),
			live: req.param('live'),
			slug: req.param('slug')
    }, function (err, game) {
			if (err) {
				return res.serverError(err);
			}

			  return res.redirect('/admin/games/'+game.id);
		});
	},

	editGame: function(req,res) {
		games = Game.findOne({id: req.params.gameid}).exec(function(err,game) {
			if (err) {
				return res.serverError(err);
			}

				return res.view('admin/gameDetails.ejs', {'title':'Edit Game',game:game,  layout: 'layout_admin'});

		});
	},

	updateGame: function(req,res) {
		params = {
      name: req.param('name'),
			source: req.param('source'),
      live: (req.param('live')=="true"),
			  slug: req.param('slug'),
    };
		Game.update({id:req.params.gameid},params).exec(function(err,game) {
			if (err) {
				return res.serverError(err);
			}
			return res.redirect('/admin/games/'+game[0].id+'/');
		})
	},

  pythonTest: function(httpreq,res) {

    return res.json(getData());
  },

	getWords: function(req,res) {
		var words = ["back",
		    "bake",
		    "meat",
		    "beaches",
		    "ben",
		    "big",
		    "pope",
		    "brown",
		    "mine",
		    "bun",
		    "sack",
		    "black",
		    "crack",
		    "brake",
		    "cake",
		    "lake",
		    "rake",
		    "feet",
		    "sweet",
		    "wheat",
		    "peaches",
		    "men",
		    "hen",
		    "ten",
		    "pig",
		    "rope",
		    "soap",
		    "town",
		    "clown",
		    "crown",
		    "wine",
		    "pine",
		    "nine",
		    "gun",
		    "nun",
		    "sun",
		    "bushes",
		    "cages",
		    "cloak",
		    "cold",
		    "cream",
		    "cub",
		    "day",
		    "dish",
		    "dome",
		    "donkey",
		    "brushes",
		    "pages",
		    "oak",
		    "yolk",
		    "smoke",
		    "gold",
		    "bald",
		    "steam",
		    "pub",
		    "tub",
		    "club",
		    "tray",
		    "play",
		    "fish",
		    "home",
		    "gnome",
		    "monkey",
		    "turkey",
		    "dot",
		    "dump",
		    "dust",
		    "hose",
		    "farm",
		    "fin",
		    "flour",
		    "foil",
		    "liquid",
		    "green",
		    "hot",
		    "pot",
		    "jump",
		    "rust",
		    "nose",
		    "clothes",
		    "arm",
		    "bin",
		    "pin",
		    "tin",
		    "tower",
		    "flower",
		    "shower",
		    "soil",
		    "oil",
		    "squid",
		    "queen",
		    "clean",
		    "hair",
		    "hall",
		    "head",
		    "hell",
		    "hip",
		    "hop",
		    "house",
		    "lead",
		    "kick",
		    "kid",
		    "stair",
		    "square",
		    "chair",
		    "bear",
		    "tall",
		    "fall",
		    "ball",
		    "wall",
		    "red",
		    "bed",
		    "shed",
		    "bread",
		    "smell",
		    "spell",
		    "well",
		    "bell",
		    "lip",
		    "tip",
		    "zip",
		    "ship",
		    "mop",
		    "pop",
		    "top",
		    "stop",
		    "chop",
		    "shop",
		    "mouse",
		    "read",
		    "seed",
		    "weed",
		    "sick",
		    "tick",
		    "click",
		    "brick",
		    "lid",
		    "land",
		    "moss",
		    "mouth",
		    "log",
		    "look",
		    "mane",
		    "mash",
		    "nap",
		    "noodle",
		    "owl",
		    "band",
		    "hand",
		    "sand",
		    "cross",
		    "south",
		    "cog",
		    "dog",
		    "fog",
		    "hog",
		    "frog",
		    "book",
		    "cook",
		    "brain",
		    "drain",
		    "rain",
		    "train",
		    "plane",
		    "cash",
		    "rap",
		    "tap",
		    "poodle",
		    "towel",
		    "pink",
		    "potato",
		    "potatoes",
		    "price",
		    "rag",
		    "ram",
		    "roast",
		    "page",
		    "path",
		    "throne",
		    "ink",
		    "sink",
		    "wink",
		    "tomato",
		    "tomatoes",
		    "dice",
		    "ice",
		    "tag",
		    "flag",
		    "pram",
		    "lamb",
		    "toast",
		    "cage",
		    "bath",
		    "stone",
		    "cone",
		    "rug",
		    "shape",
		    "shark",
		    "sheep",
		    "toad",
		    "king",
		    "vest",
		    "wax",
		    "weather",
		    "wet",
		    "bug",
		    "hug",
		    "jug",
		    "mug",
		    "plug",
		    "grape",
		    "tape",
		    "park",
		    "sleep",
		    "sweep",
		    "road",
		    "ring",
		    "swing",
		    "wing",
		    "spring",
		    "west",
		    "nest",
		    "chest",
		    "fax",
		    "feather",
		    "jet",
		    "vet",
		    "net",
		    "mad",
		    "can",
		    "bat",
		    "hut",
		    "car",
		    "leg",
		    "six",
		    "box",
		    "ant",
		    "wrench",
		    "sad",
		    "third",
		    "fan",
		    "man",
		    "pan",
		    "cat",
		    "hat",
		    "mat",
		    "rat",
		    "nut",
		    "foot",
		    "star",
		    "peg",
		    "kiss",
		    "fox",
		    "plant",
		    "bench",
		    "dress",
		    "lock",
		    "duck",
		    "bill",
		    "gift",
		    "plum",
		    "glass",
		    "bank",
		    "shelf",
		    "three",
		    "chess",
		    "rock",
		    "sock",
		    "clock",
		    "truck",
		    "hill",
		    "mill",
		    "pill",
		    "grill",
		    "lift",
		    "thumb",
		    "drum",
		    "class",
		    "tank",
		    "elf",
		    "tree",
		    "wave",
		    "plate",
		    "wood",
		    "kite",
		    "fire",
		    "cube",
		    "beach",
		    "bow",
		    "girl",
		    "deer",
		    "grave",
		    "eight",
		    "mud",
		    "knight",
		    "tyre",
		    "tube",
		    "peach",
		    "snow",
		    "pearl",
		    "spear",
		    "balloon",
		    "bird",
		    "puzzle",
		    "calf",
		    "fountain",
		    "britain",
		    "boat",
		    "goal",
		    "door",
		    "pancake",
		    "moon",
		    "spoon",
		    "bubble",
		    "half",
		    "scarf",
		    "mountain",
		    "curtain",
		    "coat",
		    "goat",
		    "bowl",
		    "four",
		    "snowflake"];

		function randomWords(){
		    var generatedList = new Array();
		    var numberOfWords = 0;

		    //Loop until we have 10 unique words
		    while(numberOfWords != 10){
		      var randomWord = Math.floor(Math.random() * (words.length - 1));
		      //If the word is not already in our list
		      if(doesNotContainWord(generatedList, words[randomWord]))
		        generatedList.push(words[randomWord]);
		        numberOfWords++;
		    }

		    return generatedList;
		}


		function doesNotContainWord(generatedList, word){
		  for(var i = 0; i < generatedList.length; i++){
		      if(generatedList[i] == word){
		        return false;
		      }
		  }

		  return true;
		}
    var words = randomWords();
    req.session.game = {};
    req.session.game.words = words;
		req.session.game.startTime = new Date();
		//console.log(randomWords());
		return res.json(words);

	},

	getMatchingPair: function(req,res)
	{
		wordIn = req.param('wordIn');
		function wordToStateID(word)
		{
			switch(word)
		  	{
			    case "soap":
			     return 0;
			    case "vest":
			     return 1;
			    case "men":
			     return 2;
			    case "bank":
			     return 3;
			    case "mad":
			     return 4;
			    case "potato":
			     return 5;
			    case "rock":
			     return 6;
			    case "roast":
			     return 7;
			    case "knight":
			     return 8;
			    case "ten":
			     return 9;
			    case "brick":
			     return 10;
			    case "brake":
			     return 11;
			    case "mouth":
			     return 12;
			    case "pub":
			     return 13;
			    case "rap":
			     return 14;
			    case "top":
			     return 15;
			    case "weather":
			     return 16;
			    case "bear":
			     return 17;
			    case "lift":
			     return 18;
			    case "flag":
			     return 19;
			    case "jug":
			     return 20;
			    case "beaches":
			     return 21;
			    case "spoon":
			     return 22;
			    case "tray":
			     return 23;
			    case "coat":
			     return 24;
			    case "mouse":
			     return 25;
			    case "bubble":
			     return 26;
			    case "balloon":
			     return 27;
			    case "rust":
			     return 28;
			    case "elf":
			     return 29;
			    case "dot":
			     return 30;
			    case "clean":
			     return 31;
			    case "fish":
			     return 32;
			    case "ant":
			     return 33;
			    case "pot":
			     return 34;
			    case "wine":
			     return 35;
			    case "goat":
			     return 36;
			    case "curtain":
			     return 37;
			    case "grill":
			     return 38;
			    case "mat":
			     return 39;
			    case "scarf":
			     return 40;
			    case "wax":
			     return 41;
			    case "moon":
			     return 42;
			    case "mane":
			     return 43;
			    case "fire":
			     return 44;
			    case "club":
			     return 45;
			    case "drum":
			     return 46;
			    case "house":
			     return 47;
			    case "gift":
			     return 48;
			    case "owl":
			     return 49;
			    case "hand":
			     return 50;
			    case "man":
			     return 51;
			    case "cube":
			     return 52;
			    case "chair":
			     return 53;
			    case "donkey":
			     return 54;
			    case "tag":
			     return 55;
			    case "peaches":
			     return 56;
			    case "grape":
			     return 57;
			    case "pink":
			     return 58;
			    case "potatoes":
			     return 59;
			    case "pine":
			     return 60;
			    case "duck":
			     return 61;
			    case "cold":
			     return 62;
			    case "tall":
			     return 63;
			    case "foot":
			     return 64;
			    case "moss":
			     return 65;
			    case "hog":
			     return 66;
			    case "land":
			     return 67;
			    case "stair":
			     return 68;
			    case "shape":
			     return 69;
			    case "wing":
			     return 70;
			    case "cage":
			     return 71;
			    case "soil":
			     return 72;
			    case "chest":
			     return 73;
			    case "fax":
			     return 74;
			    case "tank":
			     return 75;
			    case "flour":
			     return 76;
			    case "look":
			     return 77;
			    case "oil":
			     return 78;
			    case "click":
			     return 79;
			    case "tick":
			     return 80;
			    case "meat":
			     return 81;
			    case "goal":
			     return 82;
			    case "jet":
			     return 83;
			    case "train":
			     return 84;
			    case "mine":
			     return 85;
			    case "yolk":
			     return 86;
			    case "green":
			     return 87;
			    case "cake":
			     return 88;
			    case "sun":
			     return 89;
			    case "dish":
			     return 90;
			    case "read":
			     return 91;
			    case "clothes":
			     return 92;
			    case "bat":
			     return 93;
			    case "calf":
			     return 94;
			    case "plant":
			     return 95;
			    case "shower":
			     return 96;
			    case "sweet":
			     return 97;
			    case "wall":
			     return 98;
			    case "brushes":
			     return 99;
			    case "pages":
			     return 100;
			    case "bread":
			     return 101;
			    case "path":
			     return 102;
			    case "peg":
			     return 103;
			    case "mug":
			     return 104;
			    case "farm":
			     return 105;
			    case "gun":
			     return 106;
			    case "rake":
			     return 107;
			    case "sweep":
			     return 108;
			    case "plum":
			     return 109;
			    case "vet":
			     return 110;
			    case "cross":
			     return 111;
			    case "ink":
			     return 112;
			    case "hall":
			     return 113;
			    case "brown":
			     return 114;
			    case "monkey":
			     return 115;
			    case "boat":
			     return 116;
			    case "mud":
			     return 117;
			    case "ice":
			     return 118;
			    case "net":
			     return 119;
			    case "shark":
			     return 120;
			    case "nun":
			     return 121;
			    case "road":
			     return 122;
			    case "fountain":
			     return 123;
			    case "shelf":
			     return 124;
			    case "puzzle":
			     return 125;
			    case "dice":
			     return 126;
			    case "foil":
			     return 127;
			    case "smell":
			     return 128;
			    case "six":
			     return 129;
			    case "pan":
			     return 130;
			    case "page":
			     return 131;
			    case "tube":
			     return 132;
			    case "smoke":
			     return 133;
			    case "turkey":
			     return 134;
			    case "ship":
			     return 135;
			    case "glass":
			     return 136;
			    case "fan":
			     return 137;
			    case "bug":
			     return 138;
			    case "bake":
			     return 139;
			    case "spring":
			     return 140;
			    case "stone":
			     return 141;
			    case "hill":
			     return 142;
			    case "cog":
			     return 143;
			    case "liquid":
			     return 145;
			    case "chop":
			     return 146;
			    case "towel":
			     return 147;
			    case "nut":
			     return 148;
			    case "jump":
			     return 149;
			    case "bell":
			     return 150;
			    case "play":
			     return 151;
			    case "third":
			     return 152;
			    case "sack":
			     return 153;
			    case "seed":
			     return 154;
			    case "sand":
			     return 155;
			    case "mountain":
			     return 156;
			    case "rat":
			     return 157;
			    case "cream":
			     return 158;
			    case "fall":
			     return 159;
			    case "tip":
			     return 160;
			    case "price":
			     return 161;
			    case "nose":
			     return 162;
			    case "sleep":
			     return 163;
			    case "big":
			     return 164;
			    case "hell":
			     return 165;
			    case "rug":
			     return 166;
			    case "brain":
			     return 167;
			    case "bill":
			     return 168;
			    case "park":
			     return 169;
			    case "tub":
			     return 170;
			    case "rain":
			     return 171;
			    case "plate":
			     return 172;
			    case "cages":
			     return 173;
			    case "lamb":
			     return 174;
			    case "spell":
			     return 175;
			    case "flower":
			     return 176;
			    case "pram":
			     return 177;
			    case "hose":
			     return 178;
			    case "cash":
			     return 179;
			    case "bird":
			     return 180;
			    case "log":
			     return 181;
			    case "pin":
			     return 182;
			    case "pancake":
			     return 183;
			    case "box":
			     return 184;
			    case "tower":
			     return 185;
			    case "pope":
			     return 186;
			    case "plane":
			     return 187;
			    case "eight":
			     return 188;
			    case "bald":
			     return 189;
			    case "tomatoes":
			     return 190;
			    case "lip":
			     return 191;
			    case "grave":
			     return 192;
			    case "mill":
			     return 193;
			    case "book":
			     return 194;
			    case "feet":
			     return 195;
			    case "leg":
			     return 196;
			    case "beach":
			     return 197;
			    case "drain":
			     return 198;
			    case "lid":
			     return 199;
			    case "gnome":
			     return 200;
			    case "toast":
			     return 201;
			    case "rag":
			     return 202;
			    case "square":
			     return 203;
			    case "sheep":
			     return 204;
			    case "frog":
			     return 205;
			    case "feather":
			     return 206;
			    case "tape":
			     return 207;
			    case "bench":
			     return 208;
			    case "hat":
			     return 209;
			    case "spear":
			     return 210;
			    case "fox":
			     return 211;
			    case "tree":
			     return 212;
			    case "back":
			     return 213;
			    case "star":
			     return 214;
			    case "west":
			     return 215;
			    case "kite":
			     return 216;
			    case "dog":
			     return 217;
			    case "zip":
			     return 218;
			    case "hug":
			     return 219;
			    case "clown":
			     return 220;
			    case "king":
			     return 221;
			    case "truck":
			     return 222;
			    case "dome":
			     return 223;
			    case "black":
			     return 224;
			    case "queen":
			     return 225;
			    case "hop":
			     return 226;
			    case "cat":
			     return 227;
			    case "mash":
			     return 228;
			    case "tap":
			     return 229;
			    case "ram":
			     return 230;
			    case "swing":
			     return 231;
			    case "toad":
			     return 232;
			    case "nine":
			     return 233;
			    case "thumb":
			     return 234;
			    case "bow":
			     return 235;
			    case "wrench":
			     return 236;
			    case "bun":
			     return 237;
			    case "head":
			     return 238;
			    case "poodle":
			     return 239;
			    case "pop":
			     return 240;
			    case "crown":
			     return 241;
			    case "arm":
			     return 242;
			    case "bin":
			     return 243;
			    case "lock":
			     return 244;
			    case "can":
			     return 245;
			    case "four":
			     return 246;
			    case "plug":
			     return 247;
			    case "bath":
			     return 248;
			    case "hen":
			     return 249;
			    case "bed":
			     return 250;
			    case "snow":
			     return 251;
			    case "tomato":
			     return 252;
			    case "sink":
			     return 253;
			    case "weed":
			     return 254;
			    case "britain":
			     return 255;
			    case "wink":
			     return 256;
			    case "cloak":
			     return 257;
			    case "chess":
			     return 258;
			    case "girl":
			     return 259;
			    case "squid":
			     return 260;
			    case "wood":
			     return 261;
			    case "well":
			     return 262;
			    case "car":
			     return 263;
			    case "fog":
			     return 264;
			    case "sad":
			     return 265;
			    case "mop":
			     return 266;
			    case "door":
			     return 267;
			    case "cub":
			     return 268;
			    case "shed":
			     return 269;
			    case "noodle":
			     return 270;
			    case "fin":
			     return 271;
			    case "half":
			     return 272;
			    case "town":
			     return 273;
			    case "hut":
			     return 274;
			    case "wet":
			     return 275;
			    case "dump":
			     return 276;
			    case "lead":
			     return 277;
			    case "class":
			     return 278;
			    case "crack":
			     return 279;
			    case "hair":
			     return 280;
			    case "pill":
			     return 281;
			    case "lake":
			     return 282;
			    case "kid":
			     return 283;
			    case "snowflake":
			     return 284;
			    case "ball":
			     return 285;
			    case "dress":
			     return 286;
			    case "pearl":
			     return 287;
			    case "red":
			     return 288;
			    case "cook":
			     return 289;
			    case "ben":
			     return 290;
			    case "steam":
			     return 291;
			    case "nest":
			     return 292;
			    case "three":
			     return 293;
			    case "pig":
			     return 294;
			    case "kick":
			     return 295;
			    case "south":
			     return 296;
			    case "clock":
			     return 297;
			    case "stop":
			     return 298;
			    case "kiss":
			     return 299;
			    case "hot":
			     return 300;
			    case "cone":
			     return 301;
			    case "hip":
			     return 302;
			    case "bushes":
			     return 303;
			    case "home":
			     return 304;
			    case "nap":
			     return 305;
			    case "oak":
			     return 306;
			    case "wheat":
			     return 307;
			    case "tin":
			     return 308;
			    case "bowl":
			     return 309;
			    case "throne":
			     return 310;
			    case "wave":
			     return 311;
			    case "rope":
			     return 312;
			    case "gold":
			     return 313;
			    case "day":
			     return 314;
			    case "tyre":
			     return 315;
			    case "band":
			     return 316;
			    case "shop":
			     return 317;
			    case "peach":
			     return 318;
			    case "ring":
			     return 319;
			    case "dust":
			     return 320;
			    case "sick":
			     return 321;
			    case "deer":
			     return 322;
			    case "sock":
			     return 323;
			    default:
			      return -1;
		  	}


			var groups = [0,1,2,3,4,5,6,7,8,9,0,0,0,1,1,1,1,2,2,2,3,4,4,4,5,6,6,7,7,7,8,8,8,9,9,9,10,11,12,13,14,15,16,17,18,19,10,11,12,
			12,12,13,13,14,15,15,15,16,16,17,18,18,19,19,20,108,21,22,23,24,25,26,27,28,20,20,108,21,22,22,23,24,24,24,25,25,25,26,26,27,
			28,28,29,30,31,32,33,34,35,36,37,38,29,29,29,29,30,30,30,30,31,31,31,31,32,32,32,32,33,33,33,33,34,34,34,34,34,34,35,36,36,36,
			37,37,37,37,38,39,40,41,42,43,44,45,46,47,48,39,39,39,40,41,42,42,42,42,43,43,43,44,44,44,44,44,45,46,46,47,48,49,50,51,52,53,
			54,109,55,56,57,49,49,49,50,51,52,52,53,53,54,54,109,55,56,57,57,58,59,60,61,62,63,64,65,66,67,58,58,58,58,58,59,59,60,61,61,
			62,63,63,63,63,64,64,64,65,66,67,67,67,68,69,70,71,72,73,74,75,76,77,68,99,69,69,69,70,70,70,70,71,71,72,73,74,75,76,77,78,79,
			80,81,82,83,84,85,86,87,78,79,79,79,80,81,81,81,81,82,83,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,88,89,90,91,92,93,94,95,
			96,97,98,99,100,101,102,103,104,105,106,107,98,98,100,101,101,102,103,104,104,105,106,107,];

			var words =
			["back", "bake", "meat", "beaches", "ben", "big", "pope", "brown", "mine", "bun", "sack", "black", "crack", "brake", "cake",
			"lake", "rake", "feet", "sweet", "wheat", "peaches", "men", "hen", "ten", "pig", "rope", "soap", "town", "clown", "crown",
			"wine", "pine", "nine", "gun", "nun", "sun", "bushes", "cages", "cloak", "cold", "cream", "cub", "day", "dish", "dome",
			"donkey", "brushes", "pages", "oak", "yolk", "smoke", "gold", "bald", "steam", "pub", "tub", "club", "tray", "play", "fish",
			"home", "gnome", "monkey", "turkey", "dot", "dump", "dust", "hose", "farm", "fin", "flour", "foil", "liquid", "green", "hot",
			"pot", "jump", "rust", "nose", "clothes", "arm", "bin", "pin", "tin", "tower", "flower", "shower", "soil", "oil", "squid",
			"queen", "clean", "hair", "hall", "head", "hell", "hip", "hop", "house", "lead", "kick", "kid", "stair", "square", "chair",
			"bear", "tall", "fall", "ball", "wall", "red", "bed", "shed", "bread", "smell", "spell", "well", "bell", "lip", "tip", "zip",
			"ship", "mop", "pop", "top", "stop", "chop", "shop", "mouse", "read", "seed", "weed", "sick", "tick", "click", "brick", "lid",
			"land", "moss", "mouth", "log", "look", "mane", "mash", "nap", "noodle", "owl", "band", "hand", "sand", "cross", "south",
			"cog", "dog", "fog", "hog", "frog", "book", "cook", "brain", "drain", "rain", "train", "plane", "cash", "rap", "tap",
			"poodle", "towel", "pink", "potato", "potatoes", "price", "rag", "ram", "roast", "page", "path", "throne", "ink", "sink",
			"wink", "tomato", "tomatoes", "dice", "ice", "tag", "flag", "pram", "lamb", "toast", "cage", "bath", "stone", "cone", "rug",
			"shape", "shark", "sheep", "toad", "king", "vest", "wax", "weather", "wet", "bug", "hug", "jug", "mug", "plug", "grape", "tape",
			"park", "sleep", "sweep", "road", "ring", "swing", "wing", "spring", "west", "nest", "chest", "fax", "feather", "jet", "vet",
			"net", "mad", "can", "bat", "hut", "car", "leg", "six", "box", "ant", "wrench", "sad", "third", "fan", "man", "pan", "cat",
			"hat", "mat", "rat", "nut", "foot", "star", "peg", "kiss", "fox", "plant", "bench", "dress", "lock", "duck", "bill", "gift",
			"plum", "glass", "bank", "shelf", "three", "chess", "rock", "sock", "clock", "truck", "hill", "mill", "pill", "grill", "lift",
			"thumb", "drum", "class", "tank", "elf", "tree", "wave", "plate", "wood", "kite", "fire", "cube", "beach", "bow", "girl",
			"deer", "grave", "eight", "mud", "knight", "tyre", "tube", "peach", "snow", "pearl", "spear", "balloon", "bird", "puzzle",
			"calf", "fountain", "britain", "boat", "goal", "door", "pancake", "moon", "spoon", "bubble", "half", "scarf", "mountain",
			"curtain", "coat", "goat", "bowl", "four", "snowflake"];



		  	// Suffle both arrays
			function shuffleBoth()
			{
			    var j, x, i;
			    for (i = groups.length - 1; i > 0; i--)
			    {
			        j = Math.floor(Math.random() * (i + 1));

			        //First array
			        x = groups[i];
			        groups[i] = groups[j];
			        groups[j] = x;

			        //Second Array
			        x = words[i];
			        words[i] = words[j];
			        words[j] = x;
			    }
			}

			// Check to see if a list contains a given word
			function doesNotContainWord(generatedList, word)
			{
			  	for(var i = 0; i < generatedList.length; i++)
			  	{
			      	if(generatedList[i] == word)
			      	{
			        	return false;
			      	}
			  	}

			  	return true;
			}



			// MAIN
			shuffleBoth();

			// Get the rhyming group of a given word
			var rhymingGroup = -1;
			for(var i = 0; i < words.length; i++)
			{
				if(wordIn == words[i])
		    	{
		      		rhymingGroup = i;
		      		break;
		    	}
		  	}

		  	// Loop through rhyming groups list until we have a word with the same rhyming group
		  	for(var i = 0; i < groups.length; i++)
		  	{
		    	if(groups[i] == rhymingGroup)
		    	{
		      		if(words[i] != wordIn)
		      		{
		        		return res.json(words[i]);
		      		}
		    	}
		  	}

		  return res.json("Error");
		}
	}
};
