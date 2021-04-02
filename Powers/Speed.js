class Speed{
    constructor(){
    this.name = this.getName()
    this.color = this.getColor()
    this.nutrition = this.getNutrition()
    }
    getName(){
        return 'Speed'
    }
    getColor(){
        return 'rgb(255,0,102)'
    }
    getPower(snake){
        return 5
    }
    
    }
    module.exports = Speed;