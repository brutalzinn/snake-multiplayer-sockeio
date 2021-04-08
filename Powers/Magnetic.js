class Magnetic{
    constructor(){
    this.name = this.getName()
    this.color = this.getColor()
   this.image = this.getImage()
   this.time = this.getTime()
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
    update(snake,item) {
//console.log(snake)



 var raio = snake.size + 100;
 //var raio = ((1/zoom)*snake.size ) + 100
var inCircle = []
 for(var i =0; i< item.length;i++){
    var X = snake.circles[snake.circles.length - 1][0];
    var Y = snake.circles[snake.circles.length - 1][1];
    var dist =  Math.hypot(X-item[i].x , Y-item[i].y) ///Math.sqrt(Math.pow(X - Y, 2) + Math.pow(item[i].x - item[i].y, 2))
    //console.log('raio',raio,'dist',dist)
    if (dist < raio) {
inCircle.push(item[i])
    }else{

    }
 }
 for(var t = 0;t < inCircle.length;t++){
            inCircle[t].x = X
            inCircle[t].y = Y
 }

  

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