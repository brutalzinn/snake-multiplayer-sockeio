var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var canvas_width_center = (canvas.width/2);
var canvas_height_center = (canvas.height/2);

function clearCanvas(){
     context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawcircle(x,y,s){
    //clearCanvas();
    context.beginPath();
    context.arc(x,y, s, 0, 2 * Math.PI, false);
    context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 0;
    context.strokeStyle = '#003300';
    context.stroke();
}

function drawCircles(xs,ys,ss){
  const pi2 = Math.PI * 2;
  var x = 0;
  var y = 0;
  
  context.fillStyle = 'green';
  context.beginPath();

  for( var i=0; i < xs.length; i++ ){
      x = xs[i];
      y = ys[i];

      context.moveTo( x, y );
      context.arc( x, y, ss[i], 0, pi2,false);
  }
      
  context.stroke();
  context.fill();
}

var myid = 0;
var iosocket = io.connect();

function render(state){
      clearCanvas();
      var snakes = state[0];
      var food = state[1];
      var thisSnake = snakes[myid];
      var zoom = thisSnake.size/10;
      var centerX = thisSnake.circles[thisSnake.circles.length-1][0];
      var centerY = thisSnake.circles[thisSnake.circles.length-1][1];
      var dX = 0;
      var dY = 0;
      var border_left = centerX-canvas_width_center*zoom;
      var border_right = centerX+canvas_width_center*zoom;
      var border_top = centerY-canvas_height_center*zoom;
      var border_bottom = centerY+canvas_height_center*zoom;
      var xs = []
      var ys = []
      var ss = []
      
      //render snakes
      for(var s = 0; s < snakes.length; s++){
          if(snakes[s]){
              var snake = snakes[s];
              for(var i = 0; i < snake.circles.length; i++){
                  dX = centerX - snake.circles[i][0];
                  dY = centerY - snake.circles[i][1];
                  //drawcircle(canvas_width_center + (1/zoom)*dX, canvas_height_center + (1/zoom)*dY, (1/zoom)*snake.size);
                  xs.push(canvas_width_center + (1/zoom)*dX);
                  ys.push(canvas_height_center + (1/zoom)*dY);
                  ss.push((1/zoom)*snake.size);
              }
          }
      }
      
      //render food
      for(var f = 0; f < food.length; f++){
          //only render visible food
          if(food[f][0] > border_left && food[f][0] < border_right && food[f][1] > border_top && food[f][1] < border_bottom){
              dX = centerX - food[f][0];
              dY = centerY - food[f][1];
              //drawcircle(canvas_width_center + (1/zoom)*dX, canvas_height_center + (1/zoom)*dY, (1/zoom)*food[f][2]);
              xs.push(canvas_width_center + (1/zoom)*dX);
              ys.push(canvas_height_center + (1/zoom)*dY);
              ss.push((1/zoom)*food[f][2]);
          }
      }
      
      drawCircles(xs,ys,ss);
  }

 //get input from server
iosocket.on('connect', function () {
     
  //get id
  iosocket.on('id', function(message) {
      console.log("asd" + message);
      myid = message;
  });
  
  //get new state
  iosocket.on('state', function(message) {
      var o = message;
      var snakes = o[0];
      if(snakes[myid] == null){
          window.location.reload();
      }
      render(o);
  });
      
  //disc
  iosocket.on('disconnect', function() {
      console.log("disc");
  });
});

//Send new angle to server
canvas.addEventListener('mousemove', function(e) {
  a = Math.atan2(e.clientY-(canvas.height/2),e.clientX-(canvas.width/2));
  iosocket.emit('angle', a);
console.log('angle',a)
}, false);

//send "go fast" to server
canvas.addEventListener('mousedown', function(e) {
  iosocket.emit('speed', 8);
}, false);

//send "stop go fast" to server
canvas.addEventListener('mouseup', function(e) {
  iosocket.emit('speed', 5);
}, false);
