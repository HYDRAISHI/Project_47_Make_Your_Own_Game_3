
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var world, engine;
var player, player_running, player_dead;
var bg1, bg2, bg3, bg4, bg5;
var zombie1, zombie2, zombie3;
var enemy1, enemy2;
var invisibleGround;
var bullet_image, bullet_sound_shot;
var bullet;
var enemyGroup, zombieGroup, bulletGroup;
var zombie, enemy;
var zombieHealth, enemyHealth;
var level, zombieKilled, enemyKilled, xp;
var health;
var gameState = 0;
var introBg;
var button;
var boss, bossImg;
var bossGroup;
var damage = 25;
var bossHealth = 150;
var test = true;
var zombie_1, zombie_2, zombie_3;
var enemy_1, enemy_2;
var enemy_Group, zombie_Group;
var zombie_, enemy_;
var zombieHealth_, enemyHealth_;
var player_running_2;
var a = false;
var congo;
function preload(){
	player_running = loadAnimation("images/walk.png", "images/idle.png");
	player_dead = loadImage("images/hurt.png");

	player_running_2 = loadAnimation("images/walk_2.png" ,"images/idle_2.png");

	congo = loadSound("sounds/congrats.mp3");

	bg1 = loadImage("images/bg1.jpg");
	bg2 = loadImage("images/bg2.jpg");
	bg3 = loadImage("images/bg3.jpg");
	bg4 = loadImage("images/bg4.jpg");
	bg5 = loadImage("images/bg5.jpg");

	zombie1 = loadImage("images/zombie1.png");
	zombie2 = loadImage("images/zombie2.png");
	zombie3 = loadImage("images/zombie3.png");

	enemy1 = loadImage("images/enemy1.png");
	enemy2 = loadImage("images/enemy2.png");

	zombie_1 = loadImage("images/zombie_1.png");
	zombie_2 = loadImage("images/zombie_2.png");

	enemy_1 = loadImage("images/enemy_1.png");
	enemy_2 = loadImage("images/enemy_2.png");

	bullet_image = loadImage("images/bullet.png");

	bullet_sound_shot = loadSound("sounds/gun_shot.mp3");

	introBg = loadImage("images/intro_bg.jpg");

	bossImg = loadImage("images/boss.png");

}

function setup(){
	createCanvas(displayWidth, displayHeight);


	engine = Engine.create();
	world = engine.world;

	player = createSprite(displayWidth/20 ,displayHeight/1.1,20,50);
  
 	player.addAnimation("running", player_running);
  	player.scale = 0.5;

	invisibleGround = createSprite(displayWidth/2,displayHeight - 10,displayWidth,10);
	invisibleGround.visible = false;

	enemyGroup = createGroup();
	zombieGroup = createGroup();
	bulletGroup = createGroup();
	bossGroup = createGroup();

	enemy_Group = createGroup();
	zombie_Group = createGroup();

	Engine.run(engine);

	zombieHealth = 100;
	enemyHealth = 100;
	health = 200;


	zombieHealth_ = 100;
	enemyHealth_ = 100;

	button = createButton('LETS START');
	button.position(displayWidth/2,displayHeight/2)
	button.size(100,40);

	xp = 1;
	level = 1;


	

}


function draw() {
  rectMode(CENTER);
  if(gameState ===0){
	background(introBg); 
	textSize(40);
	fill("white");
	textAlign(CENTER);
	textFont("Minecraft Ten")
	text("Welcome to THE APOCALYPSE",displayWidth/2, displayHeight/10);
	button.mousePressed(()=>{
		gameState = 1
	})
	player.visible = false;
  }

  
  
if(gameState == 1){
	play();
	button.hide();
}

if(health == 0){
	gameState = 2;
}

if(gameState == 2){
	end();
	player.hide();
	zombieGroup.setVelocityEach(0,0);

	enemyGroup.setVelocityEach(0,0);
}

if(gameState == 4){
		congo.play();
		background("cyan")
		fill("white");
		textAlign(CENTER);
		textFont("Minecraft Ten")
		textSize(25);
		text("CONGRATULATIONS YOU HAVE COMPLETED THE GAME", displayWidth/2, displayHeight/2);
		player.visible = false;
		zombie_Group.setVisibleEach(false);
		enemy_Group.setVisibleEach(false);
}

  
  drawSprites();
 
}
function spawnZom(){
	if(frameCount % 77 === 0) {
		zombie_ = createSprite(displayWidth + 100,displayHeight/1.05,10,40);
		zombie_.velocityX = -6;
		var rand = Math.round(random(1,2));
		switch(rand) {
		  case 1: zombie_.addImage(zombie_1);
				  break;
		  case 2: zombie_.addImage(zombie_2);
				  break;
		  default: break;
		}

		if(rand == 1){
			zombie_.x = displayWidth + 100;
			zombie_.scale = 0.7;
		}
		else{
			zombie_.x = -100;
			zombie_.velocityX = 6;
			zombie_.scale = 0.4;
		}
		
		zombie_Group.add(zombie_);
	  }
}

function spawnEnem(){
	if(frameCount % 180 === 0) {
		enemy_ = createSprite(displayWidth + 100,displayHeight/1.05,10,40);
		enemy_.velocityX = -6;
		var rand = Math.round(random(1,2));
		switch(rand) {
		  case 1: enemy_.addImage(enemy_1);
				  break;
		  case 2: enemy_.addImage(enemy_2);
				  break;
		  default: break;
		}

		if(rand == 1){
			enemy_.x = displayWidth + 100;
			enemy_.scale = 0.5;
		}
		else{
			enemy_.x = -100;
			enemy_.velocityX = 6;
			enemy_.scale = 0.5;
		}
		
		enemy_Group.add(enemy_);
	  }	
}


function spawnZombies() {
	if(frameCount % 77 === 0) {
	  zombie = createSprite(displayWidth + 100,displayHeight/1.05,10,40);
	  zombie.velocityX = -6;
	  
	  var rand = Math.round(random(1,3));
	  switch(rand) {
		case 1: zombie.addImage(zombie1);
				break;
		case 2: zombie.addImage(zombie2);
				break;
		case 3: zombie.addImage(zombie3);
                break;
		default: break;
	  }
	  zombie.scale = 0.2;
	  zombieGroup.add(zombie);
	}
	
}


function spawnEnemies() {
	if(frameCount % 180 === 0) {
		enemy = createSprite(displayWidth + 200,displayHeight/1.05,10,40);
	  enemy.velocityX = -6;
	  
	  var rand = Math.round(random(1,2));
	  switch(rand) {
		case 1: enemy.addImage("first",enemy1);
				break;
		case 2: enemy.addImage("second",enemy2);
				break;
		default: break;
	  }
	  enemy.scale = 0.2;
	  enemyGroup.add(enemy);
	}

}

function spawnBoss(){
	
	boss = createSprite(displayWidth,displayHeight/1.05,10,40);
	boss.velocityX = -3;  
	boss.addImage("boss",bossImg);
	boss.scale = 0.5;
	bossGroup.add(boss);
}

function shootBullets(){
	bullet = createSprite(50,180);
	bullet.y = player.y;
	bullet.x = player.x;
	bullet.addImage("bullet", bullet_image);
	bullet.scale = 0.1;
	bullet_sound_shot.play();

	bulletGroup.add(bullet);
}

function play(){
	background(bg1);
	if(keyDown("space") && player.y >= player.y - 100) {
		player.velocityY = -12;
	  }
	
	  player.velocityY = player.velocityY + 0.8;
	
	  player.collide(invisibleGround);
	  player.visible = true;
	  if(keyDown(RIGHT_ARROW)){
		shootBullets();
		bullet.velocityX = 19;
		player.addAnimation("running", player_running);
	  }
	  spawnZombies();
	  spawnEnemies();

	  if(level == 2 && test == true ){
		spawnBoss();
		zombieGroup.setVelocityEach(0,0);
		enemyGroup.setVelocityEach(0,0);

		test = false;
		
	}

	console.log(level);
	if(level == 2  ){
		
		zombieGroup.setVelocityEach(0,0);
		enemyGroup.setVelocityEach(0,0);
	

		background(bg3);
		textSize(40);
		fill("white");
		textAlign(CENTER);
		textFont("Minecraft Ten")
		text("Boss Fight Stage 1",400, 100);
		
	}

	  if(bulletGroup.isTouching(enemyGroup)){
		enemyHealth -= damage;
		bulletGroup.destroyEach();
	  }
	
	  if(bulletGroup.isTouching(bossGroup)){
		bossHealth -= damage;
		bulletGroup.destroyEach();
	  }
	
	  
	  if(bulletGroup.isTouching(zombieGroup)){
		bulletGroup.destroyEach();
		zombieHealth -= damage;
	}

		if(zombieGroup.isTouching(player) && frameCount && 40 == 0){
			health -= 10;
		}

		if(bossGroup.isTouching(player) && frameCount && 40 == 0){
			health -= 20;
		}
		
		if(enemyGroup.isTouching(player) && frameCount && 40 == 0){
			health -= 15;
		}

	  if(zombieHealth == 0){
		zombieGroup.destroyEach();
		xp += 50;
		zombieHealth = 200;
	}
	
	  if(enemyHealth == 0){
		enemyGroup.destroyEach();
		xp += 10;
		enemyHealth = 200;
	}

	if(bossHealth == 0){
		bossGroup.destroyEach();
		xp += 100;

		bossHealth = 1;
		level = 3;
		health = 200;

	}
	
	fill("white");
	textAlign(CENTER);
	textFont("Minecraft Ten")
	textSize(25);
  	text("Experience : "  + xp, 650, 50);
	text("Health " + health, 100, 50);



	if(xp % 51 == 0){
		level = 2;
	}

	if(level == 3){
		background(bg5)
		fill("white");
	textAlign(CENTER);
	textFont("Minecraft Ten")
	textSize(25);
  	text("Experience : "  + xp, 650, 50);
	text("Health " + health, 100, 50);
		player.x = displayWidth/2;
		damage = 50;
		spawnZom();
		spawnEnem();
		zombieGroup.setVisibleEach(false);
		enemyGroup.setVisibleEach(false);
		zombieGroup.setVelocityEach(0,0);
		enemyGroup.setVelocityEach(0,0);
		fill("white");
		textAlign(CENTER);
		textFont("Minecraft Ten")
		textSize(25);
		fill("Black");
		text("Congratulations You have passed the Boss level", displayWidth/2, displayHeight/3);
		text(" Now reach EXP 350 to win the game", displayWidth/2, displayHeight/2);
		
		if(bulletGroup.isTouching(zombie_Group)){
			bulletGroup.destroyEach();
			zombieHealth_ -= damage;
		}
		
		if(bulletGroup.isTouching(enemy_Group)){
			bulletGroup.destroyEach();
			enemyHealth_ -= damage;
		}
		
		
		if(zombie_Group.isTouching(player) && frameCount % 5 == 0){
			health -= 10;
		}
		
		if(player.isTouching(enemy_Group) && frameCount % 5 == 0){
			health -= 15;
		}
		
		if(zombieHealth_ == 0){
			zombie_Group.destroyEach();
			xp += 50;
			zombieHealth_ = 100;
		}
		  if(enemyHealth_ == 0){
			enemy_Group.destroyEach();
			xp += 10;
			enemyHealth_ = 100;
		}
		console.log(enemyHealth_);

		

		if(keyIsDown(LEFT_ARROW)){
			player.addAnimation("running",player_running_2);
			shootBullets();
			bullet.velocityX = -19;
		}
			
		
	}

	if(xp >= 351){
		gameState = 4;
		
	}


	console.log(xp)
}



function end(){
	background("cyan");
	textSize(40);
	fill("black");
	textAlign(CENTER);
	textFont("Minecraft Ten")
	text("The End",displayWidth/2, displayHeight/2);
	textSize(25);
	text("You Died", displayWidth/2, displayHeight - 100)
}

