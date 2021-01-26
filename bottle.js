class Bottle{
    constructor(x,y,w,h,image,label,scale,bottle_num){

        this.body = createSprite(x,y,w,h);
        this.body.addImage(label,image);
        this.body.scale = scale ;
        this.bottle_num = bottle_num ;
        this.x = x;
        this.y = y;
        this.body.visible = false ;
    }
    stopDisplay(){
        this.x = 8000;
        this.y = 8000;
    }
    display(){

        if(foodS< this.bottle_num){
            this.body.velocityX = (dog.x-this.body.x )/30 ;
            this.body.velocityY = (dog.y-this.body.y )/30 ;
          
            if(this.body.x > dog.x - 40){
            this.body.visible = false ;
            }
          }
          else{
            this.body.visible = true  ;
            this.body.x = this.x ;
            this.body.y = this.y ;
          }


    }
}