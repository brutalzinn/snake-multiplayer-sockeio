class Banana{
constructor(){
this.name = this.getName()
this.color = this.getColor()
this.image = this.getImage()
}
getName(){
    return 'Banana'
}
getColor(){
    return 'rgb(255,255,0)'
}
getImage(){
    return '/assets/images/banana.png'
}
setSnake(snake){
    snake.length += 1;
    snake.size += 1 / snake.length;
  }
}
module.exports = Banana;