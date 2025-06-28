class BARCO {

    constructor (x,y,width,height,boatAnimation){


        this.x = x
        this.y = y
        this.width = width
        this.height = height
    this.speed =0.05
        this.animation= boatAnimation
        this.body = Matter.Bodies.rectangle(this.x,this.y,this.width,this.height)

        this.imagembarco = loadImage("/assets/boat.png")
        
        this.quebrado = false


        World.add(world,this.body)





    }



    show (){

 var index = floor(this.speed % this.animation.length);


        push();
        translate(this.body.position.x,this.body.position.y)
        imageMode(CENTER)
        image(this.animation[index], 0, -30, this.width, this.height);
        pop();


    }


    remover (barcovalor){



        this.quebrado = true
        
        this.animation = matrizquebrarbarco

        this.speed = 0.05

        this.width = 500
        this.height = 500

        setTimeout(()=>{

            // removendo os barcos do mundo
            Matter.World.remove(world,matrizbarco[barcovalor].body)

            //removendo os barcos da matriz
            delete matrizbarco[barcovalor]


        },1500)

    }

    speedUp(){
        this.speed +=0.05
    }





}