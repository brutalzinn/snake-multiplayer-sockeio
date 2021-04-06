class Snake {
  constructor(_id,_size, _x, _y, _length) {
   
  this.id = _id
    this.size = _size;
    this.length = _length;
    this.headX = _x;
    this.headY = _y;
    this.circles = [];
    this.angle = 0;
    this.speed = 5;
    this.color = 'pink'
  }

  update = function(speed) {
    this.headX -= speed * Math.cos(this.angle);
    this.headY -= speed * Math.sin(this.angle);
    if (this.circles.length >= this.length) {
        this.circles.shift();
    }
    this.circles.push([this.headX, this.headY]);
};
  
}

module.exports = Snake;