class Magnetic{
    constructor(){
    this.name = this.getName()
    this.color = this.getColor()
   this.image = this.getImage()
   this.time = this.getTime()
   this.items = []
   this.clientArgs = 'snake,item'
   this.function = this.client
    }
    getName(){
        return 'Magnetic'
    }
    getColor(){
        return 'white'
    }
    getImage(){
        return '/assets/images/magnetic.png'
    }
    getTime(){
        return 5
    }


    quadrant(item,snake){
//verifica em qual quadrante o item está
        if (item[0] < snake[0] && item[1] > snake[1]){
            item[0] += 1
            item[1] -=1 
        }
    
    else if (item[0] > snake[0] && item[1] > snake[1]){
        item[0] -= 1
        item[1] -=1 

    }
    else if (item[0] < snake[0] && item[1] < snake[1]){
        item[0] += 1
        item[1] +=1 
    }
        else if (item[0] > snake[0] && item[1] < snake[1]){
            item[0] -= 1
            item[1] +=1 
        }
   
return [item[0],item[1]]
   
    }
   clientHandler(item,snake){
       var snakeCoord = snake.circles[snake.circles.length - 1]
if(item[1] != snakeCoord[0] && snakeCoord[1] != item[2]){
    item[1] = this.quadrant([item[1],item[2]],snakeCoord)[0]
    item[2] = this.quadrant([item[1],item[2]],snakeCoord)[1]
    this.items.push(item)
}
}
 update(item){
     if(this.items){
    for(var i =0; i<  this.items.length;i++){
     var changed = this.items[i]
 if(item[changed[0]]){
item[changed[0]].x = changed[1]
item[changed[0]].y = changed[2]
 }
this.items.splice(i,1)
}
 }
}
    client = "var raio = snake.size + 100 \n" +
    "for(var i =0; i< item.length;i++){ \n" +
    "var X = snake.circles[snake.circles.length - 1][0]; \n" +
    "var Y = snake.circles[snake.circles.length - 1][1]; \n" +
       "var dist =  Math.hypot(X-item[i].x , Y-item[i].y) \n" +
       "if (dist < raio) { \n" +
       "iosocket.emit('PowerServer', [i,item[i].x,item[i].y]);  \n" + 
       "} \n" + 
       "} "

    setSnake(snake,event){
        var none = false
for(var i =0 ; i < snake.powers.length; i++){
if(snake.powers[i].name == this.getName()){
    snake.powers[i].time += this.getTime()
none = true
}
}
    if(!none){
        snake.powers.push(this)
        event.emit('scream', this.clientArgs,this.function);
    }

}
    }
    module.exports = Magnetic;