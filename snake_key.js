class SnakeKey {
constructor(snake){
this.snake = snake
this.normalSpeed = this.snake.speed
}

Effect(key){
//console.log('afetando cobra', this.snake)
if(key[0] == 32 && key[1] == 'down'){
   console.log('space rpessionado')
   if(this.snake.speed != 3){
    this.snake.speed = 3
   }

}
if(key[0] == 32 && key[1] == 'up'){
    console.log('space rpessionado')
 this.snake.speed =  this.normalSpeed
 }
}



}
module.exports = SnakeKey;