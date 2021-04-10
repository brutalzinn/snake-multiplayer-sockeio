class Magnetic{
    constructor(){
    this.name = this.getName()
    this.color = this.getColor()
   this.image = this.getImage()
   this.time = this.getTime()
   this.items = []
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
   getItems(item,snake){
if(item[0] != snake[0] && snake[1] != item[1]){
   return this.quadrant([item[0],item[1]],snake)
}

}


server(snake,item) {

 
    var raio = snake.size + 100;
 for(var i =0; i< item.length;i++){
    var X = snake.circles[snake.circles.length - 1][0];
    var Y = snake.circles[snake.circles.length - 1][1];
    var dist =  Math.hypot(X-item[i].x , Y-item[i].y)
    
    if (dist < raio) {
      
            item[i].x =  this.getItems([item[i].x,item[i].y],[X,Y])[0]
            item[i].y =  this.getItems([item[i].x,item[i].y],[X,Y])[1]
    }
 }

    }

    client(snake,item) {

 
    var raio = snake.size + 100;
 for(var i =0; i< item.length;i++){
    var X = snake.circles[snake.circles.length - 1][0];
    var Y = snake.circles[snake.circles.length - 1][1];
    var dist =  Math.hypot(X-item[i].x , Y-item[i].y)
    
    if (dist < raio) {
      
            item[i].x =  this.getItems([item[i].x,item[i].y],[X,Y])[0]
            item[i].y =  this.getItems([item[i].x,item[i].y],[X,Y])[1]
    }
 }
 console.log('snake executando pelo backend')
    }
    setSnake(snake){
    // if(!snake.powers.includes(this)){
        var none = false
for(var i =0 ; i < snake.powers.length; i++){
if(snake.powers[i].name == this.getName()){
    snake.powers[i].time += this.getTime()
none = true
}
}
    if(!none){
        snake.powers.push(this)
    }
 console.log(snake)

}
    }
    module.exports = Magnetic;