class SnakeKey {
constructor(snake,key){
this.snake = snake
this.key = key
}

Effect(){
//console.log('afetando cobra', this.snake)
if(this.key[0] == 32 && this.key[1] == 'down'){
   console.log('space rpessionado')

}

}



}
module.exports = SnakeKey;