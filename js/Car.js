class Car {
    constructor () {

        // We can hard code this part, because we need only one car at the moment. So we do that to simplify.
        this.x = 220;
        this.y = 520;
        this.width = 50;
        this.height = 80;
        this.img = './images/car.png'
    }

    drawCar () {
        const carImg = new Image(); // We doing  this to create an image (c'est pour forcer le type : image).
        carImg.src = this.img;
        ctx.drawImage(carImg, this.x, this.y, this.width, this.height)
    
        // We always create a contaxt in the first script that appears on HTML. Otherwise it does no work. Otherwise ctx wouldn't be accessible.
    }

    moveCar (keyCode) {
       // console.log('x', this.x);
    //console.log('y', this.y);

        ctx.clearRect(this.x, this.y, this.width, this.height); // We clear from here to avoid clearing everything. We want to clear only the car.
        switch(keyCode) {
            case 37 : // making sure car doesn't go off the road.
            if (this.x > 20) {  // To get the number, we can log the x in the console; and make the car moving, to see when we cross the boundaries.
                this.x -= 10;
            }          
            break;
            case 39 : 
            if ( this.x < 430) {
                this.x += 10;
            }
            break;
        }
    }
}


