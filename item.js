const PowerMagnetic = require('./Powers/Magnetic')
const FoodBanana = require('./Foods/Banana')
class Item{
constructor(_x,_y,_size){
this.x = _x
this.y = _y
this.size = _size
this.type = this.getType()

}

getType(){
    var powers = [new PowerMagnetic()]
var foods =  [new FoodBanana()]
var randomItemChance = Math.random() * 100;
if (randomItemChance < 95){
    var food = Math.floor(Math.random()*foods.length)
    return foods[food] 
}
else if (randomItemChance > 95){
    var power = Math.floor(Math.random()*powers.length)
    return powers[power] 
}
}
setType(_type){
    var powers = [new PowerMagnetic()]
    var foods =  [new FoodBanana()]
switch(_type){
case 'food':
var food = Math.floor(Math.random()*foods.length)
this.type = foods[food]
break
case 'power':
var power = Math.floor(Math.random()*powers.length)
this.type = powers[power]
break

}
}


}
module.exports = Item;