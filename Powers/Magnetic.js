class Magnetic{
    constructor(){
    this.name = this.getName()
    this.color = this.getColor()
   this.image = this.getImage()
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
        return 2
    }
    update(snake,item) {
console.log(snake)
      var X = snake.circles[snake.circles.length - 1][0];
      var Y = snake.circles[snake.circles.length - 1][1];
var r = snake.size + 100
 const raio = Math.PI * 2 * r
 for(var i =0; i< item.length;i++){

    var dist =  Math.sqrt(Math.pow(X - Y, 2) + Math.pow(item[i].x - item[i].y, 2))
    console.log(item[i].type.name,dist,raio)
    var newX 
    var newY

    if (dist < raio) {
      
    
                
//console.log('item próximo')
    }else{
  // console.log('item longe')
    }


 }
  

    }
    setSnake(snake){
    // if(!snake.powers.includes(this)){
        var none = false
var meuarray = snake.powers
for(var i =0 ; i < meuarray.length; i++){
if(meuarray[i].name == this.getName()){
    //console.log('already have this item')
none = true
}
}
  var time =  this.getTime() 

    if(!none){
      //  console.log('add magnetic to snake!')
        snake.powers.push(this)
        
    }else{
        time +=2
    }
    
  //   }
   
     
//       var X = snake.circles[snake.circles.length - 1][0];
//       var Y = snake.circles[snake.circles.length - 1][1];
// var r = snake.size + 10
// const raio = Math.PI * 2 * r

//      var dist =  Math.sqrt(Math.pow(X - Y, 2) + Math.pow(ay - by, 2))

    
//       if (dist_points < r) {
//        //   return true;
//       }
//       //return false;

   // console.log(snake)

}
    }
    module.exports = Magnetic;