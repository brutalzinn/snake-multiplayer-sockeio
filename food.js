class Food{
constructor(x,y){
this.x = x
this.y = y
this.type = this.getType()
}
getType(){
var types = [{name:'Banana',color:'rgb(255,255,0)',nutrition:5},{name:'Apple',color:'rgb(255,0,0)',nutrition:3}]
var mytype = [Math.floor(Math.random()*types.length)]
return types[mytype]
}
setType(type){
this.type = type
}


}
module.exports = Food;