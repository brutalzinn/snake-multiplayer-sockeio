const PowerMagnetic = require('./Powers/Magnetic')
const FoodBanana = require('./Foods/Banana')
class Power{
constructor(_x,_y,_size){
this.x = _x
this.y = _y
this.size = _size
this.type = this.getType()
this.powers = [new PowerMagnetic()]
this.foods =  [new FoodBanana()]
}
getType(){

var randomItemChance = Math.random() * 100;
if (randomItemChance > 55){
    var food = Math.floor(Math.random()*this.foods.length)
    return this.foods[food] 
}
else if (randomItemChance< 25){
    var power = Math.floor(Math.random()*this.powers.length)
    return this.powers[power] 
}
}
setType(type){
switch(this.type){
case 'food':
var food = Math.floor(Math.random()*this.foods.length)
this.type = this.foods[food]
break
case 'power':
var power = Math.floor(Math.random()*this.powers.length)
this.type = foods[food]
break

}
}


}
module.exports = Power;