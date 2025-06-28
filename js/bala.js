class BALA {

    constructor(x,y,r) {

        this.x = x
        this.y = y
        this.r = 30
        this.path = []
        this.speed = 0.1
        

        let option = {

            isStatic: true
        }

        this.body = Bodies.circle(this.x,this.y,this.r,option)

        this.imagembala = loadImage("/assets/cannonball.png")
        this.animation = [this.imagembala]
        this.afundar = false

        World.add(world,this.body)



        

    }


 boom (){

    let novoangulo = canhao.angle - 37
    let angleinradius = novoangulo * (3.14/180)
    let velocidade = p5.Vector.fromAngle(angleinradius)
    velocidade.mult(0.5)
    Matter.Body.setStatic(this.body,false)
    Matter.Body.setVelocity(this.body,{x:velocidade.x*(180/3.14),y:velocidade.y*(180/3.14)})
   

    }


    show (){

        let index = floor(this.speed % this.animation.length);

        push();
        imageMode(CENTER)
        translate(this.body.position.x,this.body.position.y)

        image(this.animation[index],0,0,this.r,this.r)

        pop();
     

        if (this.body.velocity.x>0 && this.body.position.x> 300){

            this.path.push([this.body.position.x,this.body.position.y])



        }

        for (let y = 0;y <this.path.length;y = y +1){
            image(this.imagembala,this.path[y][0],this.path[y][1],5,5)


        }



    }



   
    remover (balavalor){

        Matter.Body.setVelocity(this.body,{x:0,y:0})

        Matter.Body.setStatic(this.body, true)

        this.afundar = true

        this.r = 100

        this.speed = 0.1

        this.animation = matrizanimation2

      

        setTimeout(()=>{
            Matter.World.remove(world,matrizbalas[balavalor].body)
            delete matrizbalas[balavalor]
        },50)


    }
    

     vel(){
        this.speed +=0.1
    }



}