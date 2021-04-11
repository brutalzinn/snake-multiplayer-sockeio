var Snake = require('./snake');
var SnakeBot = require('./snakeBot');
var itemClass = require('./item')
var events = require('events');
var eventEmitter = new events.EventEmitter();
var snakes = [];
var item = []
var maxItem = 100
var autoClient = 0;
module.exports = function(io) {



function create_item(minx, miny, maxx, maxy, size, type) {
    var x = Math.floor(Math.random() * (maxx - minx + 1) + minx);
    var y = Math.floor(Math.random() * (maxy - miny + 1) + miny);
    var item_s = new itemClass(x,y,size)
if(type){
    item_s.setType(type)
    //console.log('true')
}
        item.push(item_s)

}
// function create_power(minx, miny, maxx, maxy, size) {
//     var x = Math.floor(Math.random() * (maxx - minx + 1) + minx);
//     var y = Math.floor(Math.random() * (maxy - miny + 1) + miny);
// var powers = new Power(x,y,size)

//     if(power.length < maxPower){
//         power.push(powers)
//     }
  
// }

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
       if(item.length < maxItem){
            create_item(0, 0, 1000, 1000, 4);
      }
       
      //create_food(0, 0, 100, 100, 4);
    //    create_power(0, 0,100, 100, 8);

//console.log(snakes)
        //send new state
        io.sockets.emit('state', [snakes, item]);
    }
    var fps = 30;
    setInterval(loop, 1000 / fps);
    
    function update_snakes() {
        for (var i = 0; i < snakes.length; i++) {
            if (snakes[i]) {
                snakes[i].update(snakes[i].speed);
              snakes[i].powerServer(item,eventEmitter);
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
            var item_intersection = check_intersect_item(i);
            for (var f = 0; f < item_intersection.length; f++) {
if( item[item_intersection[f]]){
                item[item_intersection[f]].type.setSnake(snakes[i],eventEmitter)
           
                item.splice(item_intersection[f], 1);
}
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
    function check_snake_power(s){
      
        var thisSnake = snakes[s];
      

    }
    function check_intersect_item(s) {
        var thisSnake = snakes[s];
        var X = thisSnake.circles[thisSnake.circles.length - 1][0];
        var Y = thisSnake.circles[thisSnake.circles.length - 1][1];

        var intersects = [];
        for (var f = 0; f < item.length; f++) {
            if (intersect(X, Y, thisSnake.size, item[f].x, item[f].y, item[f].size)) {
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
                create_item(cur_circle[0] - dead_snake.size, cur_circle[1] - dead_snake.size, cur_circle[0] + dead_snake.size, cur_circle[1] + dead_snake.size, dead_snake.size / 3,'food');
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
       
            clientSnake = new Snake(clientId,10, 100 * clientId, 100, 50);
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
        socket.on('PowerServer', function(power) {
            for(var i =0 ; i < clientSnake.powers.length; i++){
                clientSnake.powers[i].clientHandler(power,clientSnake)
            }
        });
        socket.on('angle', function(msg) {
            //lag
            setTimeout(function() {
                if (clientSnake) {
                   clientSnake.angle = msg;
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
        //power tasks

        eventEmitter.on('scream', ((clientArgs,functions) => {
 io.sockets.emit('powerClient', {"function": {"arguments": clientArgs,"body":functions}}); //{"function": {"arguments":"snake,item","body":"console.log('test',snake,item)"}});
        }));

        setInterval(()=>{
            for(var i =0 ; i < clientSnake.powers.length; i++){
                clientSnake.powers[i].time -= 1
              //  clientSnake.powers[i].funciontest= {function(){console.log('teste')}}
            }
        },1000)
        socket.on('disconnect', function() {
          //  console.log('disconnect', clientSnake)
    //snakes.remove(clientSnake); 

            // console.log('someone disconnected (' + clientId + ')');
             //console.log(clientSnake)
             for(var i =0; i < snakes.length ;i++){
                if(snakes[i] && snakes[i].id == clientId){
                snakes.splice(i,1)
                autoClient--
             
                }
             
             }
           //  console.log(item)
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