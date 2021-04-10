class Snake {
  constructor(_id,_size, _x, _y, _length) {
   
  this.id = _id
    this.size = _size;
    this.length = _length;
    this.headX = _x;
    this.headY = _y;
    this.circles = [];
    this.powers = []
    this.angle = 0;
    this.speed = 5;
    this.color = 'pink'
    this.name = _id
    this.kills = 0
    this.deaths = 0
  }

  update = function(speed) {
    this.headX -= speed * Math.cos(this.angle);
    this.headY -= speed * Math.sin(this.angle);
    if (this.circles.length >= this.length) {
        this.circles.shift();
    }
    this.circles.push([this.headX, this.headY]);
};
powerServer = function(item) {
for(var i =0;i < this.powers.length;i++){
  this.powers[i].server(this,item)
  console.log('time',this.powers[i].time)
  if(this.powers[i].time == 0){
    this.powers.splice(i,1)
    console.log('time out')
  }
}
}
Snake.client = function() {
  console.log(this.myMeow);
}
powerClient = function(item) {
  for(var i =0;i < this.powers.length;i++){
    this.powers[i].client(this,item)
  }
  }

  
}

module.exports = Snake;