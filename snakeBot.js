class SnakeBot {
    constructor(_id,_size, _x, _y,_length) {
     
    this.id = _id
      this.size = _size;
      this.length = _length;
      this.headX = _x;
      this.headY = _y;
      this.circles = [];
      this.angle = 0;
     
      this.speed = 5;
      this.color = 'white'
      this.name = _id
      this.kills = 0
      this.deaths = 0
    
    }
  
    update = function(speed) {
      
 //     this.headX += 5//speed * Math.cos(this.angle);
   //   this.headY += 0//speed * Math.sin(this.angle);
    if (this.circles.length >= this.length) {
    //      this.circles.shift();
    this.size = 10
    this.length = 25
    this.speed = 0
    return
       }
    for(var i =0; i <= this.length;i++){
        this.circles.push([i, 0]);
    }
   

   
  };
    
  }
  
  module.exports = SnakeBot;