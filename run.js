
var
canvas,
ctx,
width,
height,

groundPos = 0,
frames = 0,
score = 0,
best = 0,

currentstate,
states = {
	Splash: 0, Game: 1, Score: 2, Filed: 3
},

userName,
splashCounter = 0,
dbTurnCounter = 0, // securing one db request per turn.
highScore = [],

/*************************************** PLAYER **************************************************/

player = {
 	
 	x: 60, //60
 	y: 0,
	speed: 0,
	jumping: 5.0,
	gravity: 0.25,
	radius: 20,

	jump: function(){
		this.speed = -this.jumping;
		//console.log("hopp");
	},

	update: function(){
		this.speed += this.gravity;
		this.y += this.speed;


		if(currentstate === states.Splash){
			this.y = 200 + 10*Math.cos(frames/10);
		}

		// collision bottom
		/*if(this.y >= height - (height - s_ground.height + s_player.height)){
			this.y = height - (height - s_ground.height + s_player.height);


			this.speed = this.jumping;
		}*/

		if(this.y >= height - (height - s_ground.height)){
			this.y = height - (height - s_ground.height);
			
			if(currentstate === states.Game){
				currentstate = states.Score;
			}
		}

	},

	draw: function(ctx){
		ctx.save();
		ctx.translate(this.x, this.y);

		//console.log("x: " + this.x + ", y: " + this.y);
		
		//s_player.draw(ctx, s_player.width, height - (s_ground.height + s_player.height)); //s_player.draw(ctx, s_player.width, ((s_player.height*2)));
		//s_player.draw(ctx, -s_player.width/2, -s_player.height/2); // RIKTIG *********************************************

		//s_playern.draw(ctx, -s_playern.width/2, -s_playern.height/2); RETT****!**!*!*!*!*!*!*!*!*!*!**!*!*!*!*!**!*!*!*!*!*!**!*!*!*!!**!*!!*!*!
		//s_playern.draw(ctx, 100, 100);

		s_playerShip.draw(ctx, -s_playerShip.width/2, -s_playerShip.height/2);
		
		/*
		ctx.fillStyle = "red";
		ctx.beginPath();
		*/

		//ctx.arc(s_player.width, height - (s_ground.height + s_player.height), this.radius, 0, 2*Math.PI); //(0,100) x og y.
		//ctx.arc(s_player.width + this.x, (height - (s_ground.height + s_player.height)) + this.y, this.radius, 0, 2*Math.PI);
		
		/*
		ctx.arc(0, 0, this.radius, 0, 2*Math.PI);
		ctx.fill();
		*/
		

		//ctx.stroke();

		//console.log("player sprite width: " + s_player.width);

		//console.log("x: " + Number(this.x) + " y: " + Number(this.y));
		ctx.restore();
	}
},

/*************************************** OBSTACLE **************************************************/

obstacle = {

	//x: 20,
	//y: 20,

	obstacles: [],

	update: function(){
		//this.x+=2;
		//console.log("obstacle: " + this.x);

		if(frames % 150 === 0){
			var ySpot = 300 - 100*Math.random();//height - (s_obstacle.height + s_ground.height); //+120+200*Math.random()
			this.obstacles.push({
				x: 500,
				y: ySpot,
				width: s_building.width, //s_obstacle.width
				height: s_building.height //s_obstacle.height
			});
			//console.log("y: " + ySpot);
		}

		for(var i = 0, length = this.obstacles.length; i < length; i++){
			var o = this.obstacles[i];
			var hit = false;

			//Collision detection start
			
			if(i === 0){
				var closestX = Math.min(Math.max(player.x, o.x), o.x + o.width);
				var closestY = Math.min(Math.max(player.y, o.y), o.y + o.height); //bottom  262=o.height
				var closestYtop = Math.min(Math.max(player.y, o.y+80-o.height),o.y-80); //top //o.height burde vært 262....... men er 105... rart.. sjekket med sprites...
								//Math.min(Math.max(player.y, o.y-80-o.height),o.y-80);
				var differenceX = player.x - closestX;
				var differenceY = player.y - closestY;
				var differenceY2 = player.y - closestYtop;

				var distance = differenceX*differenceX + differenceY*differenceY;
				var distance2 = differenceX*differenceX + differenceY2*differenceY2;

				//console.log("distance2: " + distance2);
				//console.log("closestYTop: " + closestYtop);

				var r = player.radius+player.radius+10;
				//var r = player.radius;

				if(r > distance || r > distance2){
					//hit = true;
					currentstate = states.Score;
					//console.log("distance2: " + distance2);
				}
			}
			//Collision detection end

			o.x -= 2;

			if(o.x < -50){
				this.obstacles.splice(i,1);
				i--;
				length--;
				//console.log("remove");
			}

			if(hit){
				//this.obstacles.splice(i,1);
				//i--;
				//length--;
				//console.log("destroyed");
				//console.log("treff");
				currentstate = states.Score;
			}
		}

	},

	reset: function(){
		this.obstacles = [];
	},

	draw: function(ctx){
		//s_obstacle.draw(ctx, width - this.x, height - (height - s_ground.height + s_obstacle.height));
		//console.log("obstacle");

		for(var i = 0, length = this.obstacles.length; i < length; i++){
			var o = this.obstacles[i];
			//s_obstacle.draw(ctx, o.x, o.y); RIKTIG*******************
			s_building.draw(ctx, o.x, o.y);
			s_building.draw(ctx, o.x, o.y-o.height-80); //o.y-130-o.height*2 //bulding.height = 262

			/*ctx.save();
			ctx.fillStyle = "#FF0000";
			ctx.fillRect(o.x, o.y, o.width, o.height);
			ctx.restore();*/
			//console.log("x: " + o.x + " y: " + o.y);
			//console.log("o.height: " + o.height);
			//console.log("o.width: " + o.width);
			//console.log("o.y: " + o.y);
		}
	}
},

/*************************************** COIN **************************************************/

coin = {

	coinCounter: 0,
	coins: [],
	frame: 0,
	animation: [0 , 1],

	update: function(){

		var n = 15;
		this.frame += frames % n === 0 ? 1: 0;
		this.frame %= this.animation.length; 

		//Placing a coin randomly.
		if(frames % 179 === 0){
			var ySpot = 300 - 100*Math.random();
			this.coins.push({
				x: 500,
				y: ySpot,
				width: s_obstacle.width,
				height: s_obstacle.height
			});
		}

		for(var i=0; i<this.coins.length; i++){
			var c = this.coins[i];
			var hit = false;

			//

			if(i === 0){
				var closestX = Math.min(Math.max(player.x, c.x), c.x + c.width);
				var closestY = Math.min(Math.max(player.y, c.y), c.y + c.height);

				var differenceX = player.x - closestX;
				var differenceY = player.y - closestY;

				var distance = differenceX*differenceX + differenceY*differenceY;

				var r = player.radius+player.radius;

				if(r > distance){
					hit = true;
				}
			}

			//



			c.x -=2;

			if(c.x < -50){
				this.coins.splice(i,1);
				//console.log("coin removed");
			}

			if(hit){
				this.coinCounter++;
				this.coins.splice(i,1);
				//console.log("coins: " + this.coinCounter);
			}
		}

	},

	reset: function(){
		this.coins = [];
		this.coinCounter = 0;
	},

	draw: function(ctx){
		/*
		var n  = 0;
		if(frames % 2 == 0){
			n = 0;
			console.log(n);
		}else{
			n = 1;
			console.log(n);
		} */

		var n = this.animation[this.frame];
		
		for(var i = 0, length = this.coins.length; i < length; i++){
			var c = this.coins[i];
			s_coin[n].draw(ctx, c.x, c.y);
		}
	}
},


/*************************** SKY *******************************************/

sky = {

	skies: [],

	update: function(){
		//Placing a sky randomly.
		if(frames % 130 === 0){
			var ySpot = 150 - 100*Math.random();
			this.skies.push({
				x: 500,
				y: ySpot,
				width: s_sky.width,
				height: s_sky.height
			});
		}

		for(var i = 0, length = this.skies.length; i < length; i++){
			var s = this.skies[i];

			s.x -= 1.5;

			if(s.x < -50){
				this.skies.splice(i,1);
				i--;
				length--;
				//console.log("sky removed");
			}
		}


	},

	draw: function(ctx){
		
		for(var i = 0, length = this.skies.length; i < length; i++){
			var s = this.skies[i];
			s_sky.draw(ctx, s.x, s.y);
			//console.log(s.x + " og: " + s.y);
		}
	},

	reset: function(){
		this.skies = [];
	}

};
/*************************** ON PRESS **************************************/

function onPress(evt){

	switch (currentstate){

		case states.Splash:
			//canvas.style.opacity = "0.5";
			//console.log("splash1");
			if(splashCounter >= 1){
				currentstate = states.Game;
			}
			player.jump();
			splashCounter++;
			//fade();
			//scren();
			//console.log("splash2");
			break;
		case states.Game:
			//fade();
			//console.log("Game");
			player.jump();
			break;
		case states.Score:
			//canvas.style.borderColor = "red";
			//console.log("state = score");

			var mouseX = evt.offsetX;
			var mouseY = evt.offsetY;
			if( restartBtn.x < mouseX && mouseX < (261/*restartBtn.x + restartBtn.width*/) && restartBtn.y < mouseY && mouseY < (320/*restartBtn.y + restartBtn.height*/)){ //rart... sjekk det her...
				currentstate = states.Splash;
				obstacle.reset();
				//console.log("ok");
				coin.reset();
				sky.reset();
				//fade();
			}
			//console.log("mosueX: " + mouseX + ", mouseY: " + mouseY);
			break;
		case states.Filed:
			filed();
			currentstate = states.Splash;
			break;
			//currentState = states.Game;

			//mouseX > restartBtn.x && mouseX < restartBtn.x + restartBtn.width &&
			//mouseY > restartBtn.y && mouseY < restartBtn.y + restartBtn.height
	}
}

// variabels are ending.

/*************************** MAIN **************************************/

function main(){

	canvas = document.createElement("canvas");

	width = window.innerWidth;
	height = window.innerHeight;

	console.log("width: " + width);
	console.log("height: " + height);

	var evt = "touchstart";

	if(width >= 500){
		width = 320;
		height = 480;
		canvas.style.border = "1px solid #000";
		evt = "mousedown";
	}

	document.addEventListener(evt, onPress); //was ---- "click", onpress ---- before.

	canvas.width = width;
	canvas.height = height;
	ctx = canvas.getContext("2d");


	//currentstate = states.Splash; //Splash RIKTIG ************************************************************************************************* SE HER!!!!
	currentstate = states.Filed;

	document.body.appendChild(canvas);

	var img = new Image();
	img.onload = function(){
		ctx.fillStyle = "#eff";
		initSprites(this);

		restartBtn = {
			x: 60, //(width - s_restart.width)/2
			y: height - 200,
			width: s_restart.width,
			height: s_restart.height
		}

		run();
	}
	img.src = "spriteSheet10.png";
	//dbHighScore();
	//scren();
}

/*************************** RUN **************************************/

function run(){

	var loop = function(){
		update();
		render();
		window.requestAnimationFrame(loop, canvas);
	}
	window.requestAnimationFrame(loop, canvas);

}

/*************************** UPDATE **************************************/

function update(){
	frames++;

	if(currentstate !== states.Score){
		groundPos = (groundPos - 2) % 20; //%10 //(groundPos - 2) % 20;
		sky.update();
	}
	if(currentstate === states.Game){
		dbTurnCounter = 0;
		obstacle.update();
		coin.update();
	}
	if(currentstate === states.Score){
		if(dbTurnCounter == 0){
			dB(coin.coinCounter, userName); //, userName
			dbHighScore(userName);
			//console.log("dbCounter");
		}
		dbTurnCounter = 1;
	}

	player.update();
}

/*************************** RENDER **************************************/

function render(){
	ctx.fillRect(0,0,width, height);

	obstacle.draw(ctx);
	sky.draw(ctx);
	player.draw(ctx);
	coin.draw(ctx);

	s_ground.draw(ctx, groundPos, s_ground.height);

	//s_sky.draw(ctx, 100, 100);

	var score = parseInt(coin.coinCounter);

	if(currentstate === states.Splash){
		s_start.draw(ctx, 10, 100);

		/*
		ctx.font = "40px Arial";
		ctx.strokeText("" + width, 100, 120);
		*/

		//s_nameFiled.draw(ctx, 100, 200);
		//s_ok.draw(ctx, 125, 300);

		//ctx.font = 'italic 40pt Calibri';
		//ctx.strokeText("Halla", 100, 200);

		/*
		var name = document.createElement("INPUT");
		name.height = 60;
		name.width = 120;
		name.placeholder="TEKST";*/
		//s_building.draw(ctx, 100, 200);
	}
	if(currentstate === states.Score){

		s_restart.draw(ctx, restartBtn.x, restartBtn.y);
		
		ctx.font = "40px Arial";
		ctx.lineWidth = 3;
		//ctx.fillText("Score: " + score, 60, 100);
		//ctx.fillText("LOL", 20,100);
		ctx.strokeText("Score: " + score,60,100);

		ctx.strokeText("HighScore: " + highScore,20,150);
	}
	if(currentstate === states.Game){
		//s_number.draw(ctx, 60, 20);

		//var score = parseInt(coin.coinCounter);
		ctx.font = "10px Arial";
		ctx.lineWidth = 1;
		ctx.strokeText(score,10,10);
	}

}

/******************************** DB CONNECT FUNCTION ********************************/

function dB(coins, userName){ //, userName
	//var text = "<form action="+"database.php"+"> <input type="+"submit"+"value"+"my button"+"/></form>";
	/*var text = '<form action=database.php> <input type=submit value my button/></form>';
	document.write(text);*/
	/*
	location.href = "database.php?score="+ score;

	console.log("database");
	*/

	/*
	var demo = document.getElementById("testen");

	demo.innerHTML = '<form action="database.php" method="post">
	<input type="hidden" name="score" id="testen">
	</form>';*/

	$.post("database.php", { scoreNumber: coins, name: userName }); //, name: userName
	//$.post("database.php", { name: 'yo' }); //, name: userName

	//console.log("username: " + userName + ", coins: " + coins);
	//$.post("database.php", {name: userName });
}

function dbHighScore(userName){

	//return highScore;
	//console.log("utafor")

	//$(document).ready(function() {      

		//$.post("highscore.php", { user: userName });        

    	$.ajax({    //create an ajax request to load_page.php
      		type: "POST",
	        url: "highscore.php",
	        data: {user: userName},             
	        dataType: "html",   //expect html to be returned                
	        success: function(response){                    
	            //$("#responsecontainer").html(response); 
	            //alert(response);
	            console.log(response);
	            highScore = response;
	        }
	  	});

	  	//console.log("innafor");
	//});
}

/******************************* ANIMATIONS *********************************/



function fade(){
	var fadeIn = 0;
	var fadeOut = 10;

	var fading = fadeOut / 10;
	
	if(frames % 20 === 0 && fadeOut != 0){
		fading = fadeOut / 10;
		canvas.style.opacity = fading;
		fadeOut--;
	}



	/*
	if(fadeOut == 0){
		canvas.style.opacity = 0;
		clearTimout(loopTimer);
		fadeOut = 10;
	} 

	var loopTimer = setTimeout(fade(),50);*/

}

/****************************** SPLASH SCREEN WITH JQUERY AND INPUT FIELD ******************************/

//if name == null....
//splash screen pop up
// ok
// return value to databse
// else start game

function filed(){
	$("#splashScreen a").click(function(){
		$("canvas").show();
		console.log("lol");
		$("#splashScreen").hide();
		userName = $('input').val();
		console.log(userName);
		/*if(currentstate ===  states.Filed){
			currentstate = states.Splash;
		}*/
	});
}

//function scren(){
	$(document).ready(function(){
		//$("canvas").hide();
		/*ctx.font = "40px Arial";
		ctx.rect(100, 200, 150, 75);
		$(ctx.rect(100, 200, 150, 75)).click(function(){
			ctx.strokeText("YO YOYOYOYOYOYOYOYOYOYOYOYOYOY", 100,200);
		});
		console.log("testeing");*/
		//$('splashScreen').click(function() { 
        	//$(this).parent().fadeIn(500);
 		//});
		//$('splashScreen').fadeIn(500);
		//$("splashScreen").hide();
		/*$('#test').animate(
                   {
                   width: 100,
                   height: 100,
                   top: 20,
                   left: 20,
                   marginTop: -(100 / 2),
                   marginLeft: -(200 / 2),
                   lineHeight: 200
                   
                   
                   
                   }, 'slow');*/
		
		
		$("canvas").hide();
	});

//}

main();