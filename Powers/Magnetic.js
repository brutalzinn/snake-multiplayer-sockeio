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
    quadrant(x,y){

        if (x > 0 && y > 0)
        console.log("lies in First quadrant");

    else if (x < 0 && y > 0)
        console.log("lies in Second quadrant");

    else if (x < 0 && y < 0)
        console.log("lies in Third quadrant");

    else if (x > 0 && y < 0)
        console.log("lies in Fourth quadrant");

    else if (x == 0 && y > 0)
        console.log("lies at positive y axis");

    else if (x == 0 && y < 0)
        console.log("lies at negative y axis");

    else if (y == 0 && x < 0)
        console.log("lies at negative x axis");

    else if (y == 0 && x > 0)
        console.log("lies at positive x axis");

    else
        console.log("lies at origin");
    }
   getItems(item,snake){
console.log('poistion items..')
if(item[0] != snake[0] && snake[1] != item[1]){
    this.quadrant(item[0],item[1])
}
return [item[0],item[1]]
}
    update(snake,item) {

 setTimeout(()=>{
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
},2000)
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