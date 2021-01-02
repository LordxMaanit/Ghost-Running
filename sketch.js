var towerImage, tower ;
var doorImage , door , doorsGroup ;
var climberImage , climber , climberGroup;
var ghost, ghostImage ;
var invisibleBlockGroup, invisibleBlock;
var gameState ="play";


function preload(){
  towerImage = loadImage ("tower.png");
  doorImage = loadImage ("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  doorsGroup = new Group();
  climberGroup = new Group();  
  invisibleBlockGroup = new Group();
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  //spookySound.loop() ;
  tower = createSprite (300,300);
  tower.addImage("tower",towerImage);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost",ghostImage);
  
}

function draw(){
  background("black");
  if (gameState === "play"){
    
  
  
  if (tower.y>400){
    tower.y = 300 ;
  }
  
  if (keyDown("left_arrow")){
    ghost.x = ghost.x-3 ;   
  }
  if (keyDown("right_arrow")){
    ghost.x = ghost.x+3 ;   
  }
  if (keyDown("space")){
    ghost.velocityY = -5 ;   
  }
  
  if (climberGroup.isTouching(ghost)){
    ghost.velocityY = 0 ;
  }

if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){ ghost.destroy();
}
  
  ghost.velocityY = ghost.velocityY +0.8;
  
  drawSprites();
  spawnDoors();
}
if (gameState === "end"){ 
  stroke("yellow"); 
  fill("yellow");
  textSize(30); 
  text("Game Over", 230,250) ;
}
}

function spawnDoors(){
  if(frameCount% 240 === 0){
      door = createSprite(200, -50);
     door.addImage("door",doorImage);
    
    climber = createSprite(200,10);
    climber.addImage("climber", climberImage);
    door.x = Math.round(random(120,400));
    door.velocityY = 1 ;
    door.lifetime = 800 ;
    doorsGroup.add(door);
    
    ghost.depth = door.depth ; 
    ghost.depth +=1 ;
    
    climber.x = door.x ;
    climber.velocityY = 1 ;
    climber.lifetime = 800;
    climberGroup.add(climber);
    
  var invisibleBlock = createSprite(200,15);                
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x; 
    invisibleBlock.velocityY = 1;
    invisibleBlock.debug = true;                      
    invisibleBlockGroup.add(invisibleBlock);
    
   }
}