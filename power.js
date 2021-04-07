const Magnetic = require('./Powers/Magnetic')
class Power{
constructor(_x,_y,_size){
this.x = _x
this.y = _y
this.size = _size
this.type = this.getType()
}
getType(){
var types = [new Magnetic()]
var mytype = [Math.floor(Math.random()*types.length)]
return types[mytype]
}
setType(type){
this.type = type
}


}
module.exports = Power;