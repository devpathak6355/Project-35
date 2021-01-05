var dog, dogImg, happyDog, database, foodStoc;
var foodS=0;

function preload()
{
  dogImg=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  
  database=firebase.database();
  foodStoc=database.ref('Food');
  foodStoc.on('value',readStock);

  dog=createSprite(250,330,10,10);
  dog.addImage(dogImg);
  dog.scale=0.25;

}


function draw() {
  background(46,139,87);

    if(keyWentDown(UP_ARROW)){

      writeStock(foodS);
      dog.addImage(happyDog);

      //console.log("hi");
    }

    //console.log(foodS);

    drawSprites();

    stroke("black");
    text("Food remaining : " +foodS, 150, 60);
    textSize(13);
    text("Note:press Up-Arrow key to feed the dog",150,30);
}

function writeStock(foodS){

  if(foodS<=0){
    foodS=0;
  }else{
    foodS=foodS-1;  
  }
  database.ref('/').update({
    Food:foodS
}) 
}
function readStock(data){
  foodS=data.val();
}
