var 
s_ground,
s_player,
s_obstacle,
s_coin,
s_start,
s_restart,
s_number,
s_building,
s_playern,
s_nameFiled,
s_ok,
s_sky,
s_playerShip;

function sprite(img, x, y, width, height){
	this.img = img;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};

sprite.prototype.draw = function(ctx, x, y){
	ctx.drawImage(this.img, this.x, this.y, this.width, this.height, x, y, this.width, this.height);
}

function initSprites(img){
	s_ground = new sprite(img, 0, 320, 400, 400); //done riktig
	s_player = new sprite(img, 0, 0, 75, 129); //done feil
	s_obstacle = new sprite(img, 522, 0, 600, 105); //done feil
	s_start = new sprite(img, 0, 129, 300, 33);//done riktig
	s_restart = new sprite(img, 400, 350, 201, 50); // riktig
	s_number = new sprite(img, 145, 0, 157, 15); //brukes ikke
	s_building = new sprite(img, 500, 0, 90, 217); //600
	s_playern = new sprite(img, 335, 0, 87, 87);
	s_nameFiled = new sprite(img, 0, 162, 150, 75);
	s_ok = new sprite(img, 0, 237, 60, 55);
	s_sky = new sprite(img, 113, 0, 82, 59);
	s_playerShip = new sprite(img, 0, 0, 40, 37);

	/**** COIN TABEL ****/

	s_coin = [
		new sprite(img, 75, 0, 20, 18),
		new sprite(img, 95, 0, 18, 20)
	];
}