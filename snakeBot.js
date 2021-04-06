class SnakeBot {
    constructor(_id,_size, _x, _y) {
     
    this.id = _id
      this.size = _size;
      this.length = 25;
      this.headX = _x;
      this.headY = _y;
      this.circles = [];
      this.angle = 0;
     
      this.speed = 5;
      this.color = 'pink'
      this.name = _id
    }
  
    update = function(speed) {
       
 //     this.headX += 5//speed * Math.cos(this.angle);
   //   this.headY += 0//speed * Math.sin(this.angle);
    if (this.circles.length >= this.length) {
    //      this.circles.shift();
    return
       }
    for(var i =0; i <= this.length;i++){
        this.circles.push([i, 0]);
    }
   

   
  };
    
  }
  
  module.exports = SnakeBot;