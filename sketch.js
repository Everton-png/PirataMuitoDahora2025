const Engine = Matter.Engine
const World = Matter.World
const Bodies = Matter.Bodies
const Body = Matter.Body



let engine
let world


let chao
let torre
let teto


let chaooption
let torreoption
let tetooption



let torreimage
let fundoimage
let barcoimage


let canhao
let bala
let boat


let matrizbalas = []
let matrizbarco = []
let matrizimage1 = []
let matrizanimation2 = []
let matrizquebrarbarco = []

let jsonwater
let waterimage
let waterframe = []

let jsonbreak
let breakimage
let breakframe = []


let angle

let colisao
let colisaoteto
let colisaochao
let colisaobala
let colisaotorre

let boatAnimation = [];
let boatSpritedata, boatSpritesheet, boatFrames


let gamestate =  "start"


let pontos = 0

let explosaosom
let aguacanhaosom
let piratarindosom
let musicafundosom



function preload (){

torreimage = loadImage("/assets/tower.png")
fundoimage = loadImage("/assets/background.gif")
  boatSpritedata = loadJSON("/assets/boat.json");
  jsonwater = loadJSON("/assets/waterSplash.json")
  boatSpritesheet = loadImage("/assets/boat1234.png");
  waterimage = loadImage("/assets/waterSplash.png")
  jsonbreak = loadJSON("/assets/brokenBoat.json")
  breakimage = loadImage("/assets/brokenBoat.png")
  explosaosom = loadSound("/assets/cannon_explosion.mp3")
  aguacanhaosom = loadSound("/assets/cannon_water.mp3")
  piratarindosom = loadSound("/assets/pirate_laugh.mp3")
  musicafundosom = loadSound("/assets/background_music.mp3")

}



function setup (){
    createCanvas(1200,600)

    engine = Engine.create();
    world = engine.world

    angleMode(DEGREES)


    chaooption = {

        isStatic: true
    }


    torreoption = {

        isStatic: true
    }

    tetooption = {

        isStatic: true
    }


    angle = 15

    chao = Bodies.rectangle(200,600,2100,1,chaooption)

    World.add(world,chao)



    torre = Bodies.rectangle(115,350,160,310,torreoption)

    World.add(world,torre)


    teto = Bodies.rectangle(200,0.2100,0.01,tetooption)


    rectMode(CENTER)


    canhao = new CANHAO(180,160,130,100,angle)

 boatFrames = boatSpritedata.frames;
  for (var i = 0; i < boatFrames.length; i++) {
    var pos = boatFrames[i].position;
    var img = boatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    boatAnimation.push(img);
  }                  

  waterframe = jsonwater.frames

  for (let x = 0;x<waterframe.length;x = x+1){
    let pos2 = waterframe[x].position
    let img2 = waterimage.get(pos2.x,pos2.y,pos2.w,pos2.h)
    matrizanimation2.push(img2)
    
  }






  breakframe = jsonwater.frames

  for (let z = 0;z<breakframe.length;z = z+1){
    let pos3 = breakframe[z].position
    let img3 = breakimage.get(pos3.x,pos3.y,pos3.w,pos3.h)
    matrizquebrarbarco.push(img3)
    
  }



}



function draw (){
    image(fundoimage,0,0,width,height)

    if (!musicafundosom.isPlaying()) {  
        musicafundosom.play();
        musicafundosom.setVolume(0.1);
  }





Engine.update(engine)



push();

stroke(0)
rect(chao.position.x,chao.position.y,2100,1)
rect(teto.position.x,teto.position.y,2100,0.01)
pop();


canhao.show();


push();
imageMode(CENTER)
image(torreimage,torre.position.x,torre.position.y,160,310)
pop();

if (gamestate == "play"){
    play();
}


if (gamestate == "gameOver"){

    GameOver();

}


if (gamestate == "start"){

    start();

}










 fill("green")
    textSize(20)
    textAlign("center")
    text("Pontos:" + pontos,100,100)




}


function keyReleased (){
    if (keyCode == 81 && gamestate =="play"){

        explosaosom.play()
        explosaosom.setVolume(0.3)
        matrizbalas[matrizbalas.length -1].boom();
        
      
    }
}


function showboom (bala,balavalor) {

    if (bala){
        bala.show();
        bala.vel();
        
        if (bala.body.position.x>=width||bala.body.position.y>=height){

            bala.remover(balavalor);
           

        }

        
       

    }



}

function keyPressed (){

    if (keyCode == 81){

    
    bala = new BALA(canhao.x,canhao.y,55,matrizanimation2)
     
    

    bala.path = []
    Matter.Body.setAngle(bala.body,canhao.angle)
    //adicionando balas dentro da matriz
    matrizbalas.push(bala)

    }

}




function barco (){

if (matrizbarco.length > 0 ){


    if (matrizbarco[matrizbarco.length - 1] == undefined||matrizbarco[matrizbarco.length - 1].body.position.x <width - 500){


        boat = new BARCO(width-79,height-60,250,250,boatAnimation)

        matrizbarco.push(boat)


    }


    for (let x = 0;x <matrizbarco.length;x = x +1){

       if (matrizbarco[x]){

        Matter.Body.setVelocity(matrizbarco[x].body,{x:-2,y:0})

        matrizbarco[x].show();
        matrizbarco[x].speedUp();

       }

    }




    
}
else {

    boat = new BARCO(width-79,height-60,250,250,boatAnimation)

    matrizbarco.push(boat)

}





}




function colisaocomobarco (balaindice){

    for (let y = 0;y<matrizbarco.length;y = y+1){
        if (matrizbalas[balaindice] != undefined && matrizbarco[y] != undefined){
            colisao = Matter.SAT.collides(matrizbalas[balaindice].body,matrizbarco[y].body)
            
            if (colisao.collided == true){
                matrizbarco[y].remover(y);
                matrizbalas[balaindice].remover(balaindice);
                pontos = pontos +1
                
   

            }

        }
 
    }

}


function colisaocomoteto (balaindice){

if (matrizbalas[balaindice] != undefined && teto.body != undefined){
    colisaoteto = Matter.SAT.collides (matrizbalas[balaindice].body,teto.body)

    if (colisaoteto.collided == true){
        matrizbalas[balaindice].remover(balaindice);

    }


}

}

function colisaocomochao (balaindice){

if (matrizbalas[balaindice] != undefined && chao != undefined){
    colisaochao = Matter.SAT.collides (matrizbalas[balaindice].body,chao)

    if (colisaochao.collided == true){
        matrizbalas[balaindice].animation = matrizanimation2
        matrizbalas[balaindice].remover(balaindice);
        aguacanhaosom.play();
        aguacanhaosom.setVolume(0.1)
        
    }


}

}

function start (){

    swal({

        title:"Iniciar",
        text:"Boa Sorte",
        imageUrl:"/assets/guerreirodaora.jpg",
        imageSize:"150x150",

        confirmButtonText:"Começar"

    },

    function (isConfirm){
        if (isConfirm == true){
        gamestate = "play"
    }

    }

)

}

function play (){
barco();


for (let x = 0;x < matrizbalas.length;x = x +1){
    showboom(matrizbalas[x],x);

    colisaocomobarco(x);
    colisaocomoteto(x);
    colisaocomochao(x);


   

   

}



colisaotorre1();

}



function colisaotorre1 (){
        for (let k = 0;k<matrizbarco.length;k = k +1){
            if (matrizbarco[k] != undefined && torre != undefined){
                colisaotorre = Matter.SAT.collides (matrizbarco[k].body,torre)
                    
                 if (colisaotorre.collided == true && matrizbarco[k].quebrado == false){

                    gamestate = "gameOver"
                    piratarindosom.play()
                    piratarindosom.setVolume(0.1)
        
    }

            }


        }
    
    

   


}









function GameOver (){






    swal({
        title:"Fim De Jogo",

        text:"Pontos:"+pontos,

        imageUrl:"/assets/piratadaoraso.jpg",
        imageSize:"150x150",
        confirmButtonText:"Jogar Novamente"
    },

 function (isConfirm){


    if (isConfirm == true){
        location.reload()
    }

 }

)

}

