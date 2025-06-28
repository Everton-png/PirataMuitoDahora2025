class CANHAO {


constructor (x,y,w,h,a){


    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.angle = a

    this.imagemcanhao = loadImage("/assets/canon.png")
    this.imagembase = loadImage("/assets/cannonBase.png")


}



show (){

console.log(this.angle)



if (keyIsDown(83)&&this.angle < 70){
    
this.angle += 1

}


if (keyIsDown(87)&&this.angle > -30) {

    this.angle -= 1

}





push();
translate(this.x,this.y)
rotate(this.angle);
imageMode(CENTER)

image(this.imagemcanhao,0,0,this.w,this.h)

pop();


push();
imageMode(CENTER)
image(this.imagembase,161.8,163,100,100)
pop();


}


}

