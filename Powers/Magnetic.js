class Magnetic{
    constructor(){
    this.name = this.getName()
    this.color = this.getColor()
   this.image = this.getImage()
    }
    getName(){
        return 'Magnetic'
    }
    getColor(){
        return 'rgb(255,0,102)'
    }
    getImage(){
        return '/assets/images/magnetic.png'
    }
    getTime(){
        return 10
    }
    getPower(){

    }
    setPower(snake){
      snake.powers.push(this)
    }
    
    }
    module.exports = Magnetic;