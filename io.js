var Snake = require('./snake');
var Food = require('./food');
var autoClient = 1;
var snakes = [];
var foods = []

module.exports = function(io) {
  io.on('connection', function(client) {
    var clientId, clientSnake;
    
    clientId = autoClient;
    clientSnake = new Snake(clientId);
    autoClient += 1;
    snakes.push(clientSnake);
    
    console.log('someone connected (' + clientId + ')');
    
    client.emit('id', clientId);
   
    client.on('move', function(direction) {
      clientSnake.direction = direction;
    });

    
  
    client.on('disconnect', function() {
      snakes.remove(clientSnake);
      console.log('someone disconnected (' + clientId + ')');
    });
  });
 
  function updateState() {
    var snake, _i, _len,n=-1;
    for (_i = 0, _len = snakes.length; _i < _len; _i++) {
      snake = snakes[_i];
    
        setTimeout(function(){
          
snake.doStep()
console.log('timeout',100 - (snake.speed * 10))
        }, 100 - (snake.speed * 10));
      }
     
      // while(n < snake.speed){
      //   checkFood()
      //     n++ 
      //   }
    
    checkFood()
    checkCollisions();
    
   return io.emit('snakes', snakes);
  //   setTimeout(updateState, 100 - (snake.speed * 10));
  };
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
    
  function generateFood() {
  
    //console.log('generate food')
    var x = Math.floor((Math.random() * 48) + 1);
    var y = Math.floor((Math.random() * 48) + 1);
    
    return {x,y};
  }
  function getFood(){
 
  
    var clientfood = new Food(generateFood().x,generateFood().y)
    if(foods.length < 20){
      foods.push(clientfood)
    }

      io.emit('food', foods);
  }
  
  Array.prototype.remove = function(e) {
    var t, _ref;
    if ((t = this.indexOf(e)) > -1) {
      return ([].splice.apply(this, [t, t - t + 1].concat(_ref = [])), _ref);
    }
  };
var tickFood = setInterval(getFood, 100);

var tick = setInterval(function () {updateState()}, 30);
}