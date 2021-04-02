const Speed = require('./Powers/Speed')
class Power{
constructor(x,y){
this.x = x
this.y = y
this.type = this.getType()
}
getType(){
var types = [new Speed()]
var mytype = [Math.floor(Math.random()*types.length)]
return types[mytype]
}
setType(type){
this.type = type
}


}
module.exports = Power;