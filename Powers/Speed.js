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
       
        if(snake.speed > 0){
            snake.speed -= 10
        }
     
        console.log('change speed of snake' + snake.speed)
    }
    getPower(snake){
        return snake.speed
    }
    
    }
    module.exports = Speed;