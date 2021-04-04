if (window["WebSocket"]) {
  $(document).ready(function() {
    
    var animate, canvas, connect, context, id, sendDirection;
    canvas = $("#stage");
    context = canvas.get(0).getContext("2d");
    id = null;
    var items = []
    var socket = io.connect(document.location.href);
  
    if(socket != null) {
      console.log('connected to server');
    }
    function sendKey(key) {
      if (socket) {
        socket.emit('key', key);
      }
    }
    function sendDirection(direction) {
      if (socket) {
        socket.emit('direction', direction);
      }
    }
   
    function animate(snakes) {
  
      var element, snake, x, y,f, _i, _len, _results;
 
      context.fillStyle = 'rgb(230,230,230)';
   
    
      for (x = 0; x <= 49; x++) {
        for (y = 0; y <= 49; y++) {
          
          context.fillRect(x * 10, y * 10, 9, 9);
      
        }
      }
     
      _results = [];
     

      for (_i = 0, _len = snakes.length; _i < _len; _i++) {
     
        snake = snakes[_i];
        for (f = 0; f < items.length; f++) {
        console.log('#####food',items[f])
        context.fillStyle = items[f].type.color
         context.fillRect(items[f].x * 10, items[f].y * 10, 9, 9);
        }
        context.fillStyle = snake.id === id ? 'rgb(170,0,0)' : 'rgb(0,0,0)';
     
        if (snake.id === id) {
          $("#kills").text("Kills: " + snake.kills);
          $("#deaths").text("Deaths: " + snake.deaths);
          $("#points").text("Points: " + snake.length);
        }
     
        _results.push((function() {
          var _j, _len2, _ref, _results2;
          _ref = snake.elements;
          _results2 = [];
          for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
            element = _ref[_j];
            x = element[0] * 10
            y = element[1] *  10
       
            _results2.push(context.fillRect(x, y , 9 , 9 ));
          }
          return _results2;
        })());
      }
      return _results;
    };

    function connect() {
   
      socket.on('id', function(socket_id) {
        id = socket_id;
        $("#id").text("Id: " + id);
   

      });
      
      socket.on('snakes', function(snakes) {
  
       animate(snakes);
      
           
      });
      socket.on('item', function(clientItem) {
        items = clientItem
           
     });
     

    };
    
    connect();
    
     $(document).keydown(function(event) {
      var key;
      key = event.keyCode ? event.keyCode : event.which;
      switch (key) {
        case 37:
          console.log('left');
           sendDirection("left");
           break
        case 38:
          console.log('up');
           sendDirection("up");
           break
        case 39:
          console.log('right');
           sendDirection("right");
           break
        case 40:
          console.log('down');
           sendDirection("down");
           break
      }
    });
  function keyDontNeed(){
    keys = [40,39,38,37]
    return keys
  }
   $(document).keyup(function(event) {
    var key;
    key = event.keyCode ? event.keyCode : event.which;

    if(!keyDontNeed().includes(key)){
      sendKey([key,"up"]);
    }
          
    })
     $(document).keydown(function(event) {
      var key;
      key = event.keyCode ? event.keyCode : event.which;
  
      if(!keyDontNeed().includes(key)){
            sendKey([key,"down"]);
      }
      })

    });


} else {
  alert('Your browser does not support websockets, seriously, get with the times.');
}