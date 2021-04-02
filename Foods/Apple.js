class Apple{
    constructor(){
        this.name = this.getName()
        this.color = this.getColor()
        this.nutrition = this.getNutrition()
    }
    getName(){
        return 'Apple'
    }
    getColor(){
        return 'rgb(255,0,0)'
    }
    getNutrition(){
        return 3
    }
    
    }
    module.exports = Apple;