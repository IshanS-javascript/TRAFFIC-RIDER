var car, car_image, carSound;
var road, road_image;
var obstacle, obstacle1_image, obstacle2_image,   obstacle3_image;
var obstacleGroup;
var gameState = "PLAY"
var gameover, gameover_image, icon, icon_image;
var score = 0;
var coins, coinGroup;

function preload(){
  road_image = loadImage("Road.png");
  coin_image = loadImage("coin.png");
  car_image = loadImage("Main Car.png");
  obstacle1_image = loadImage("obstacle1.png");
  obstacle2_image = loadImage("obstacle2.png");
  obstacle3_image = loadImage("obstacle3.png");
  gameover_image = loadImage("gameover.png");
  icon_image = loadImage("restart.png");
  carSound = loadSound("car.mp3");
}

function setup(){
  createCanvas(1366,660);
 
  road = createSprite(700, 700, 10, 10);
  road.addImage(road_image);
  road.scale = 3.5;
  road.velocityY =13;
  
  car = createSprite(700, 380, 10, 10);
  car.addImage(car_image)
  car.setCollider("rectangle", 0, 0, 80, 180);
  
    icon = createSprite(700, 250, 10, 10);
    icon.addImage(icon_image);
    icon.scale = 0.1;
    gameover = createSprite(700, 170, 10, 10);
    gameover.addImage(gameover_image);
    gameover.scale = 0.5;
  
  icon.visible = false;
  gameover.visible = false;
  
  obstacleGroup = new Group();
  coinGroup= new Group();
  carSound.loop();
  
}

function draw(){
  background("black");
  //screen.width=Window.width;
  //screen.height=Window.height;
  fill("white");
  textSize(30);
  text("₱łӾɆⱠ Ɽ₳₵ł₦₲",660,30);
    
  
  if (gameState === "PLAY"){
    
  
  if(coinGroup.isTouching(car)){
    coinGroup.destroyEach();
    score=score+1
  }

  
  if (road.y > 350){
    road.y = road.height/2  }
  
  if (keyDown("right_arrow")){
      car.x += 5
  }
  if (keyDown("left_arrow")){
      car.x += -5
  }
  if (keyDown("up_arrow")){
      car.y += -5
  }
  if (keyDown("down_arrow")){
      car.y += 5
  }  
  if (car.x > 1000){
    car.x = 1000;
  }
  if (car.x < 450){
   car.x = 450;
  }
    
  traffic();
  if(car.isTouching(obstacleGroup)){
    gameState = "END";
  }
    
}   
  if (gameState === "END"){
    road.setVelocity(0, 0);
    obstacleGroup.setVelocityEach(0, 0);
    obstacleGroup.setLifetimeEach(-1);
    coinGroup.setVelocityEach(0,0);
    coinGroup.setLifetimeEach(0);
    gameover.visible = true;
    icon.visible = true;
    carSound.play=false;
    if(score<5){
      

    }
}
if (mousePressedOver(icon)){
      restart();
}
   
  fill("yellow");
  textSize(30);
  text("₵Øł₦₴ ₵ØⱠⱠɆ₵₮ɆĐ :" + score, 50,40);

 
  
  
  
  spawnCoins();
  drawSprites();

}

function traffic(){
  if (frameCount % 40 === 0){
    var positionX = Math.round(random(450, 1000));
    obstacle = createSprite(positionX, 0, 10, 10);
    var car_type = Math.round(random(1, 3));

    if (car_type === 1){
      obstacle.addImage(obstacle1_image);
      obstacle.scale = 0.3;
    }
    if (car_type === 2){
      obstacle.addImage(obstacle2_image);
      obstacle.scale = 0.3;
      obstacle.setCollider("rectangle", 0, 0, 230, 600);
    }
    if(car_type === 3){
      obstacle.addImage(obstacle3_image);
      obstacle.scale = 0.2
      obstacle.setCollider("rectangle", 0, 0, 450, 900);
    }
    obstacle.velocityY = 5;
    obstacle.depth = road.depth + 1;
    obstacle.lifetime = 140;
    obstacleGroup.add(obstacle);
  }
}

function spawnCoins(){
if(frameCount % 70=== 0){
  var positionX = Math.round(random(450, 1000));
  var coins = createSprite(positionX, 0, 10, 10);
  coins.addImage(coin_image);
  coins.scale=0.3;
  coins.velocityY = 5;
 //coins.velocityX = 0;
  coins.lifetime = 140;
  coinGroup.add(coins);
 }
}

function restart(){

  gameState = "PLAY";
  car.x = 700;
  car.y = 380;
  obstacleGroup.destroyEach();
  coinGroup.destroyEach();
  road.velocityY = 13;
  gameover.visible = false;
  icon.visible = false;
  score = 0;
}