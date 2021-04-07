var Snake = require('./snake');
var SnakeBot = require('./snakeBot');
var Power = require('./power')
var snakes = [];
var clients = []
var maxFood = 1
var maxPower = 2
var autoClient = 0;
module.exports = function(io) {
  
/////////////
// Globals //
/////////////

// ID of next client

// Mapping between socket id and nextID


//////////
// Food //
//////////

var food = [];
var power = []
function create_food(minx, miny, maxx, maxy, size) {
    var x = Math.floor(Math.random() * (maxx - minx + 1) + minx);
    var y = Math.floor(Math.random() * (maxy - miny + 1) + miny);
    if(food.length < maxFood){
        food.push([x, y, size])
    }
  
}
function create_power(minx, miny, maxx, maxy, size) {
    var x = Math.floor(Math.random() * (maxx - minx + 1) + minx);
    var y = Math.floor(Math.random() * (maxy - miny + 1) + miny);
var powers = new Power(x,y,size)

    if(power.length < maxPower){
        power.push(powers)
    }
  
}

///////////
// Snake //
///////////




//////////
// Game //
//////////

function game() {
    var counter = 0;

    function loop() {
        counter++;
        //console.log("loop: " + counter);
        update_snakes();
        check_all_intersect();

      create_food(0, 0, 100, 100, 4);
        create_power(0, 0,100, 100, 8);

//console.log(snakes)
        //send new state
        io.sockets.emit('state', [snakes, food, power]);
    }
    var fps = 30;
    setInterval(loop, 1000 / fps);
    
    function update_snakes() {
        for (var i = 0; i < snakes.length; i++) {
            if (snakes[i]) {
                snakes[i].update(snakes[i].speed);
            }
        }
    }
}

// helper function to game that handles all intersects
function respawnSnake(i){
var snake = snakes[i]
var maxx = 10
var minx = 1
snake.length = 10
snake.size = 10
snake.headX = Math.random() * (maxx - minx + 1) + minx
snake.headY =  Math.random() * (maxx - minx + 1) + minx
snake.deaths += 1
}
function check_all_intersect() {
    for (var i = 0; i < snakes.length; i++) {
        if (snakes[i]) {

            //eat food & remove food
            var food_intersects = check_intersect_food(i);
            for (var f = 0; f < food_intersects.length; f++) {
                snakes[i].length += 1;
                snakes[i].size += 1 / snakes[i].length;
                food.splice(food_intersects[f], 1);
            }
            var power_intersects = check_intersect_power(i);
            for (var f = 0; f < power_intersects.length; f++) {
             //   snakes[i].length += 1;
           //     snakes[i].size += 1 / snakes[i].length;
           snakes[i].powers.push(power[f])
                power.splice(power_intersects[f], 1);
                console.log(snakes[i])
            }

            //die if collide with snake
            if (intersect_snakes(i)) {
                spawnFoodOnDeadSnake(i);
               respawnSnake(i)
           
               // snakes.splice(i,1)
            }
        }
    }
    
    function intersect(ax, ay, as, bx, by, bs) {
        return (as + bs > Math.sqrt(Math.pow(ax - bx, 2) + Math.pow(ay - by, 2)));
    }
    
    function check_intersect_food(s) {
        var thisSnake = snakes[s];
        var X = thisSnake.circles[thisSnake.circles.length - 1][0];
        var Y = thisSnake.circles[thisSnake.circles.length - 1][1];

        var intersects = [];
        for (var f = 0; f < food.length; f++) {
            if (intersect(X, Y, thisSnake.size, food[f][0], food[f][1], food[f][2])) {
                intersects.push(f);
            }
        }
        return intersects;
    }

    function check_intersect_power(s) {
        var thisSnake = snakes[s];
        var X = thisSnake.circles[thisSnake.circles.length - 1][0];
        var Y = thisSnake.circles[thisSnake.circles.length - 1][1];

        var intersects = [];
        for (var f = 0; f < power.length; f++) {
            if (intersect(X, Y, thisSnake.size, power[f].x, power[f].y, power[f].size)) {
                intersects.push(f);
            }
        }
        return intersects;
    }

    function intersect_snakes(s) {
        var thisSnake = snakes[s];
        var X = thisSnake.circles[thisSnake.circles.length - 1][0];
        var Y = thisSnake.circles[thisSnake.circles.length - 1][1];

        for (var i = 0; i < snakes.length; i++) {
            if (snakes[i] && i != s) {
                for (var c = 0; c < snakes[i].circles.length; c++) {
                    if (intersect(X, Y, thisSnake.size, snakes[i].circles[c][0], snakes[i].circles[c][1], snakes[i].size)) {
                     snakes[i].kills += 1
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function spawnFoodOnDeadSnake(dead_snake_i) {
        var dead_snake = snakes[dead_snake_i]
        var cur_circle = dead_snake.circles[0]

        for (var c = 0; c < dead_snake.circles.length; c++) {
            cur_circle = dead_snake.circles[c];
            for (var f = 0; f < dead_snake.size / 4; f++) {
                create_food(cur_circle[0] - dead_snake.size, cur_circle[1] - dead_snake.size, cur_circle[0] + dead_snake.size, cur_circle[1] + dead_snake.size, dead_snake.size / 3);
            }
        }
    }

}

////////////////////
// Network events //
////////////////////

var g = false;
var botid = 3432

function createBot(){
  
    var test = new SnakeBot(botid,10, 100* 2, 30, 10);
  test.speed = 5
    test.color = 'white'
 test.name = 'bot-sinistro'
snakes.push(test)

  
}
function removeBot(){
   
    for(var i =0; i < snakes.length ;i++){
        if(snakes[i] && snakes[i].id == botid){
        snakes.splice(i,1)
        }
     }
}

io.on('connection',function(socket) {
        var clientId, interval, clientSnake
       
        clientId = autoClient
       
            clientSnake = new Snake(clientId,10, clientId* 100, 30, 50);
            clientSnake.name = 'robertocpaes'
            snakes.push(clientSnake)
          //  console.log(snakes.length,autoClient)
            socket.emit('id', clientId)
   
            autoClient++;
        if (!g) {
            g = true;
          //  createBot()
            game();
        }
      
        socket.on('angle', function(msg) {
            //lag
            setTimeout(function() {
                if (clientSnake) {
                   // console.log('Message Received from ', socket.id, ': ', msg);
                   clientSnake.angle = msg;
             //       console.log(msg)
                }
            }, 50);
        });
   function doSnakeSpeed(){
       if(clientSnake.length > 2){
        clientSnake.length -= 1
        clientSnake.circles.shift();
       }
   }
        var ismouseDown = 0; 
        socket.on('mouse', function(msg) {
            if(msg == 'down'){
               if(ismouseDown == 0 ){
                clientSnake.speed = 8;
                ismouseDown = setInterval(doSnakeSpeed, 250)
               }
            }else{
                if(ismouseDown!=0) {  
                    clearInterval(ismouseDown);
                    ismouseDown=0;
                  }
               clientSnake.speed = 5;
            }
         
        });
        socket.on('disconnect', function() {
          //  console.log('disconnect', clientSnake)
    //snakes.remove(clientSnake); 

             console.log('someone disconnected (' + clientId + ')');
             for(var i =0; i < snakes.length ;i++){
                if(snakes[i] && snakes[i].id == clientId){
                snakes.splice(i,1)
                autoClient--
                }
             
             }
          
           //  removeBot()
   
        });
       
       
    }
    
);


  }
  Array.prototype.remove = function(e) {
    var t, _ref;
    if ((t = this.indexOf(e)) > -1) {
      return ([].splice.apply(this, [t, t - t + 1].concat(_ref = [])), _ref);
    }
}