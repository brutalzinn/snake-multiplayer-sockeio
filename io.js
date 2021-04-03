var Snake = require('./snake');
var Food = require('./food');
var Power = require('./power');

var autoClient = 1;
var snakes = [];
var foods = []
var powers = []
var asyncThingsToDo = []
module.exports = function(io) {
  io.on('connection', function(client) {
    var clientId, clientSnake;
    
    clientId = autoClient;
    
    clientSnake = new Snake(clientId);
   
    autoClient += 1;
    snakes.push(clientSnake);
    if(snakes.length == 1){
      SnakeTestLL()
      console.log('executado uma vez')
    }
 
    console.log('someone connected (' + clientId + ')');
    
    client.emit('id', clientId);
  
    client.on('move', function(direction) {
      clientSnake.direction = direction;
      
    });

    
  
    client.on('disconnect', function() {
      snakes.remove(clientSnake);
      asyncThingsToDo = []
      console.log('someone disconnected (' + clientId + ')');
    });
  });
  async function delay(ms) {
    // return await for better async stack trace support in case of errors.
    return await new Promise(resolve => setTimeout(resolve, ms));
  }
 const snakeTest =  function(snake,index){
  console.time(`RESPONSE TIME request ${index}`)
setTimeout(()=>{
  
//console.log(index)
 //   console.log('speed',snake.id,index,snake.speed)
     snake.doStep()
      checkFood()
      checkPower()
      checkCollisions()
    //  console.log('delete',index)

    
    console.timeEnd(`RESPONSE TIME request ${index}`)
  },2000)


 }
 async function promiseToChangeSnake(snake){
  
 return await new Promise(resolve => { setTimeout(snakeTest, 100 - (snake.speed * 10),snake)
   resolve()})
}

const SnakeTestLL = async ()=>{
 
  var snake, _i, _len;
  for (_i = 0, _len = snakes.length; _i < _len; _i++) {
    snake = snakes[_i];
    asyncThingsToDo.push([snakeTest,snake])
}
asyncThingsToDo.map(async (item, index) =>  {
  asyncThingsToDo.splice(index,1)  
    await item[0](item[1],index)
 
})
SnakeTestLL()
}

  function checkPower(){
    var snake, _i, _len;
    for (_i = 0, _len = snakes.length; _i < _len; _i++) {

      snake = snakes[_i];
      for (f = 0; f < powers.length; f++) {
        if(snake.head()[0] == powers[f].x && snake.head()[1] == powers[f].y){
         // console.log(foods[f].type.nutrition)
         console.log('geting',foods[f].type.name + ' POWER')
         powers[f].type.setPower(snake)
    powers.splice(f,1)
        }
      }
 
    }
  }
  function checkFood(){
    var snake, _i, _len;
    for (_i = 0, _len = snakes.length; _i < _len; _i++) {

      snake = snakes[_i];
      for (f = 0; f < foods.length; f++) {
        if(snake.head()[0] == foods[f].x && snake.head()[1] == foods[f].y){
         // console.log(foods[f].type.nutrition)
         console.log('geting',foods[f].type.name)
       snake.addLength(foods[f].type.nutrition)
    snake.resetBody()
foods.splice(f,1)
        }
      }
 
    }
  }
  function checkCollisions() {
    var other, resetSnakes, snake, _i, _j, _k, _len, _len2, _len3, _results;
    resetSnakes = [];
    for (_i = 0, _len = snakes.length; _i < _len; _i++) {
      snake = snakes[_i];
      // if (snake.blocksSelf()) {
      //   resetSnakes.push(snake);
      // }
   //   snake.addLength(2)
      for (_j = 0, _len2 = snakes.length; _j < _len2; _j++) {
        other = snakes[_j];
        if (other !== snake) {
          if (other.blocks(snake)) {
            resetSnakes.push(snake);
            other.addKill();
          }
        }
      }
    }
    _results = [];
    for (_k = 0, _len3 = resetSnakes.length; _k < _len3; _k++) {
      snake = resetSnakes[_k];
      _results.push(snake.reset());
    }
    return _results;
  }
    
  function generateItem() {
  
    //console.log('generate food')
    var x = Math.floor((Math.random() * 48) + 1);
    var y = Math.floor((Math.random() * 48) + 1);
    
    return {x,y};
  }
  function getItem(){
 
  
    var clientfood = new Food(generateItem().x,generateItem().y)
    var clientPower = new Power(generateItem().x,generateItem().y)
    var PowerTest = new Power(25,25)
   
    if(powers.length < 1){
      powers.push(PowerTest)
     // powers.push(clientPower)
    }
    if(foods.length < 20){
      foods.push(clientfood)
    }
var item = [...powers,...foods]

  io.emit('item', item);
  }
  
  Array.prototype.remove = function(e) {
    var t, _ref;
    if ((t = this.indexOf(e)) > -1) {
      return ([].splice.apply(this, [t, t - t + 1].concat(_ref = [])), _ref);
    }
  };
var tickFood = setInterval(getItem, 100);

//var ticksnakeModel= setInterval(SnakeTestLL, 100);






var tick = setInterval(function () { io.emit('snakes', snakes)}, 100);
}