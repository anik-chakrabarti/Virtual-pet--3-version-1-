var dog,happyDog,database,foodS,foodStock,database,nameTag ;
var feedMilkButton, restartButton ;
var bottle1,bottle2,bottle3,bottle4,bottle5,bottle6,bottle7,bottle8,bottle9,bottle10 ;
var bottle11,bottle12,bottle13,bottle14,bottle15,bottle16,bottle17,bottle18,bottle19,bottle20 ;
var bottleImg ;
var FedTime ;
var run = false ;
var hour1 ;
var foodS,lastFed;
var gameStateRef,gameState ;
var game ;
var currentTime ;

function preload()
{
  happyDogImg = loadAnimation("Images/dogImg1.png","Images/dogImg2.png");
  dogImg = loadImage("Images/dogImg.png");
  nameTag = loadImage("Images/nameTag.png");
  bottleImg = loadImage("Images/Milk.png");
  bedRoomImg = loadImage("Images/Bed Room.png");
  washRoomImg = loadImage("Images/Wash Room.png");
  gardenImg = loadImage("Images/Garden.png");

}

function setup() {
  createCanvas(500, 700);
  database= firebase.database();

  game = new GameState();
  game.readState();

  foodStock = database.ref('Food');
  foodStock.on('value',readStock);

  Bg = createSprite(250,320,800,700);
  Bg.addImage("nametag" , nameTag);
  Bg.scale = 0.35 ;
 
  dog = createSprite(400,370,50,50);
  dog.addImage("dog" ,dogImg);
  dog.addAnimation("happy dog",happyDogImg);
  dog.scale = 0.3;
  
  bottle1 = new Bottle(50,150+50,50,50,"bottle1", bottleImg,0.15,1);
  bottle2 = new Bottle(90,150+50,50,50,"bottle2", bottleImg,0.15,2);
  bottle3 = new Bottle(130,150+50,50,50,"bottle3", bottleImg,0.15,3);
  bottle4 = new Bottle(170,150+50,50,50,"bottle4", bottleImg,0.15,4);
  bottle5 = new Bottle(210,150+50,50,50,"bottle5", bottleImg,0.15,5);
  bottle6 = new Bottle(50,250+50,50,50,"bottle6", bottleImg,0.15,6);
  bottle7 = new Bottle(90,250+50,50,50,"bottle7", bottleImg,0.15,7);
  bottle8 = new Bottle(130,250+50,50,50,"bottle8", bottleImg,0.15,8);
  bottle9 = new Bottle(170,250+50,50,50,"bottle9", bottleImg,0.15,9);
  bottle10 = new Bottle(210,250+50,50,50,"bottle10", bottleImg,0.15,10);
  bottle11 = new Bottle(50,350+50,50,50,"bottle11", bottleImg,0.15,11);
  bottle12 = new Bottle(90,350+50,50,50,"bottle12", bottleImg,0.15,12);
  bottle13 = new Bottle(130,350+50,50,50,"bottle13", bottleImg,0.15,13);
  bottle14 = new Bottle(170,350+50,50,50,"bottle14", bottleImg,0.15,14);
  bottle15 = new Bottle(210,350+50,50,50,"bottle15", bottleImg,0.15,15);
  bottle16 = new Bottle(50,450+50,50,50,"bottle16", bottleImg,0.15,16);
  bottle17 = new Bottle(90,450+50,50,50,"bottle17", bottleImg,0.15,17);
  bottle18 = new Bottle(130,450+50,50,50,"bottle18", bottleImg,0.15,18);
  bottle19 = new Bottle(170,450+50,50,50,"bottle19", bottleImg,0.15,19);
  bottle20 = new Bottle(210,450+50,50,50,"bottle20", bottleImg,0.15,20);

   
  feedMilkButton = createButton('Feed Milk');
  feedMilkButton.position(550,640);
  feedMilkButton.mousePressed(feedMilk);
  feedMilkButton.size(200);

  AddMilkButton = createButton('Add Food');
  AddMilkButton.position(500,640);
  AddMilkButton.mousePressed(AddFood);
  AddMilkButton.size(100);

  restartButton = createButton('Restart');
  restartButton.position(400,640);
  restartButton.mousePressed(restart);
  restartButton.size(100); 


}


function draw() {  

  background(46,139,87);

  currentTime = hour() ;

  imageMode(CENTER);

  if(frameCount > 150 ){
    Bg.visible = false ;
  }

  Bg.depth = dog.depth + 10000 ;

  bottle1.display();
  bottle2.display();
  bottle3.display();
  bottle4.display();
  bottle5.display();
  bottle6.display();
  bottle7.display();
  bottle8.display();
  bottle9.display();
  bottle10.display();
  bottle11.display();
  bottle12.display();
  bottle13.display();
  bottle14.display();
  bottle15.display();
  bottle16.display();
  bottle17.display();
  bottle18.display();
  bottle19.display();
  bottle20.display();

drawSprites();
fill(rgb(100,20,20));

fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  if(frameCount> 150 && gameState === "Start" ){
  textSize(20);
  fill("black");
  if(lastFed>12){
    text("Last Feed : "+ lastFed%12 + " PM", 10,120);
   }
   else if(lastFed==0){
     text("Last Feed : 12 AM",10,120);
   }
   else if(lastFed==12){
    text("Last Feed : 12 PM",10,120);
  }
   else{
     text("Last Feed : "+ lastFed + " AM", 10,120);
   }

  textSize(25);
  text("Food Remaining:  " + foodS ,10,80);
  
  feedMilkButton.show();
  restartButton.show();
  AddMilkButton.show();

  }
else{
    feedMilkButton.hide();
    restartButton.hide();
    AddMilkButton.hide();
  }
  
  if(gameState != "Start"){

  if(currentTime == lastFed + 1){
    game.update("play");
    Garden();
  }
  if(currentTime == lastFed + 2){
    game.update("sleep");
    bedRoom();

  }
  if(currentTime == lastFed + 3 ||currentTime == lastFed + 4  ){
    game.update("bath");
    washRoom();
    
  }
  }
  
}


function readStock(data){
  foodS = data.val();
  console.log("FoodS"+foodS)
}

function writeStock(x){
 
  if(x<=0){
     x=0 ;
  }
  else{
   x-=1 ;
  }
 
  database.ref('/').update({
    Food:x  
   })
 console.log("Stock updated");
}

function AddStock(x){

  if(x>=20){
    x=20 ;
  }
  else{
    x+=1 ;
  }

  database.ref('/').update({
    Food:x  
  })
}


function feedMilk(){
   
    writeStock(foodS);

    run = true ;

    FedTime = database.ref('/').update({
      FeedTime : hour(),
      Food: foodS
    });

    if(foodS>= 0){
    dog.changeAnimation("happy dog",happyDogImg);
    }
    window.setTimeout(dogImage,1500);

}

function dogImage(){

  dog.changeImage("dog" ,dogImg);
}

function AddFood(){
  AddStock(foodS) ;
}

function restart(){
  foodS = 20 ;
  writeStock(foodS+1);
}

function bedRoom(){
  imageMode(CENTER);
  image(bedRoomImg,250,350);
  feedMilkButton.hide();
  restartButton.hide();
  AddMilkButton.hide();
  dog.visible = false ;
  HideBottle();
}
function washRoom(){
  imageMode(CENTER);
  image(washRoomImg,250,350);
  feedMilkButton.hide();
  restartButton.hide();
  AddMilkButton.hide();
  dog.visible = false ;
  HideBottle();
}
function Garden(){
  imageMode(CENTER);
  image(gardenImg,250,350);
  feedMilkButton.hide();
  restartButton.hide();
  AddMilkButton.hide(); 
  dog.visible = false ;  
  HideBottle();
}

function HideBottle(){

  bottle1.stopDisplay();
  bottle2.stopDisplay();
  bottle3.stopDisplay();
  bottle4.stopDisplay();
  bottle5.stopDisplay();
  bottle6.stopDisplay();
  bottle7.stopDisplay();
  bottle8.stopDisplay();
  bottle9.stopDisplay();
  bottle10.stopDisplay();
  bottle11.stopDisplay();
  bottle12.stopDisplay();
  bottle13.stopDisplay();
  bottle14.stopDisplay();
  bottle15.stopDisplay();
  bottle16.stopDisplay();
  bottle17.stopDisplay();
  bottle18.stopDisplay();
  bottle19.stopDisplay();
  bottle20.stopDisplay();
}