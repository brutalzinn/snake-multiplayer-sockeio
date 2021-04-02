class Speed{
    constructor(){
    this.name = this.getName()
    this.color = this.getColor()
    }
    getName(){
        return 'Speed'
    }
    getColor(){
        return 'rgb(255,0,102)'
    }
    setPower(snake){
       
        snake.speed += 2 
        console.log('change speed of snake' + snake.speed)
    }
    getPower(snake){
        return snake.speed
    }
    
    }
    module.exports = Speed;