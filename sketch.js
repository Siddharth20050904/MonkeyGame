var PLAY = 0
var END = 1
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var ground;
var gameState = 0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  monkey = createSprite(70,330,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(200,365,800,10);
  ground.velocityX = -5;

  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  score =0;
  //monkey.debug=true;
  monkey.setCollider("rectangle",0,0,300,600); 
  console.log(monkey.y); 
}


function draw() {
  background("white");
  if(gameState===0){
    if(ground.x<0){
    ground.x=ground.width/2;
  }
    monkey.velocityY = monkey.velocityY + 2;
  if(keyDown("space")&&monkey.y>200){
    monkey.velocityY = -18;
  }
    score = Math.round(frameCount/frameRate());
    spawnBanana();
  spawnObstacle();
  }
  else if(gameState===1){
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    ground.velocityX=0;
    monkey.velocityY = monkey.velocityY + 2;
  }
  if(monkey.isTouching(obstacleGroup)){
    gameState=1;
  }
  
  monkey.collide(ground);
  drawSprites();
  fill("black");
  text("Survival Time = "+ score,300,20); 
  
}
function spawnBanana(){
  if(frameCount%80===0){
  banana = createSprite(400,400,10,10);
  FoodGroup.add(banana);
  banana.lifetime = 110;
  banana.addAnimation("bananaMoving",bananaImage);
  banana.scale = 0.1;
  banana.y = Math.round(random(20,300));
  banana.velocityX = -10;
  }
}
function spawnObstacle(){
  if(frameCount%120===0){
    obstacle = createSprite(400,330,10,10);
    obstacleGroup.add(obstacle);
    obstacle.addAnimation("obsacleMoving",obstacleImage);
    obstacle.lifetime = 110;
    obstacle.scale = 0.15;
    obstacle.velocityX = -10;
  }
}





