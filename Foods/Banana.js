class Banana{
constructor(){
this.name = this.getName()
this.color = this.getColor()
this.nutrition = this.getNutrition()
}
getName(){
    return 'Banana'
}
getColor(){
    return 'rgb(255,255,0)'
}
getNutrition(){
    return 5
}

}
module.exports = Banana;