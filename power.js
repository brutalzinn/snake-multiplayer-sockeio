class Power{
constructor(x,y){
this.x = x
this.y = y
this.type = this.getType()
}
getType(){
var types = [new Banana(),new Apple()]
var mytype = [Math.floor(Math.random()*types.length)]
return types[mytype]
}
setType(type){
this.type = type
}


}
module.exports = Power;