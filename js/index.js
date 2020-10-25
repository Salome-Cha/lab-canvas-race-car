// We declare currentGame from the upper scope, to access it from everywhere.
let currentGame;
let currentCar;


document.getElementById('game-board').style.display = "none"; // This allows to have a clear page at the beginning.

const myCanvas = document.getElementById('canvas');
const ctx = myCanvas.getContext('2d');

document.getElementById('start-button').onclick = () => {
    startGame();
}

document.onkeydown = (e) => {
    let whereToGo = e.keyCode;
    currentGame.car.moveCar(whereToGo)
}

function startGame() {
    document.getElementById('game-board').style.display = 'block'; // To make this appearing when the game starts.
    
    // instantiate a new game of the game class
    currentGame = new Game();

    // instantiate a new car
    currentCar = new Car();
    currentGame.car = currentCar;

    currentGame.car.drawCar();
    updateCanvas();

}

function detectCollision (obstacle) {
    return !((currentCar.y > obstacle.y + obstacle.height) || 
    (currentCar.x + currentCar.width < obstacle.x) || 
    (currentCar.x - currentCar.width > obstacle.x + obstacle.width))
}

let frames = 0;

function updateCanvas () {
    
    // We need to clear the canva at 
    ctx.clearRect(0, 0, 500, 600);

    currentCar.drawCar();
    frames ++;

    if (frames % 100 === 1) {   // When we get to 100, we continue to have obstacle. It could be names differently (like frequency par ex.).
        // Draw an obstacle. We ranfom their dimensions. So they can appear randomly.
        let randomObstacleX = Math.floor(Math.random() * 450);
        let randomObstacleY = 0;   // The 0 is the y position of the obstacle.
        
        let randomObstacleWidth = Math.floor(Math.random() * 50) + 20;
        let randomObstacleHeight = Math.floor(Math.random() * 50) + 20;

        let newObstacle = new Obstacle(randomObstacleX, randomObstacleY, randomObstacleWidth, randomObstacleHeight)

        // We need to push those to an array of obstacle:
        
        currentGame.obstacles.push(newObstacle)

        //  console.log(currentGame.obstacles);

    }
        // Copy this part from the one Miguel did. It could fix the appearance problem.
        for(let i=0; i<currentGame.obstacles.length; i++) {
            currentGame.obstacles[i].y += 1;
            currentGame.obstacles[i].drawObstacles();

          if (detectCollision (currentGame.obstacles[i])) {
              alert ("BOOOM!")
              frames = 0;
              currentGame.score = 0;
              document.getElementById('score').innerHTML = 0;
              currentGame.obstacles = [];
              document.getElementById('game-board').style.display = 'none';
          }

          if (currentGame.obstacles.length > 0  && currentGame.obstacles[i].y >= 600) {  // We checking if the obstacle made it through the whole canva: we are amrking points.
              currentGame.obstacles.splice(i, 1);
              currentGame.score++;
              document.getElementById("score").innerHTML = currentGame.score;
          }


        }

    requestAnimationFrame(updateCanvas) // 60 frames per second, it refreshes.If we remove, it never get redraws.       
    }
    
    

    // Same thing than doing: 
       /* setInterval(() => {
        updateCanvas();
    }, 60);*/
  


