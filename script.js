const playBoard = document.querySelector(".play-board")
const scoreElement = document.querySelector(".score")
const highScoreElement = document.querySelector(".high-score")
let gameOver = false
let foodX,foodY
let snakeX = 5,snakeY = 10
let snakeBody=[]
let velocityX =0 , velocityY =0
let setIntervalId
let score = 0;

//Getting high Score from the local storage
let highScore = localStorage.getItem("high-score") || 0
highScoreElement.innerText = `High  Score: ${highScore}`


const changeFoodPosition = () => {
    foodX = Math.floor(Math.random()*30)+1
    foodY = Math.floor(Math.random()*30)+1
}
const handleGameOver = () => {
    clearInterval(setIntervalId)
    alert("Game Over! Press OK to Replay...")
    location.reload()

} 
const changeDirection = (e) => {
    if(e.key === "ArrowUp" && velocityY != 1){
        velocityX=0
        velocityY=-1
    }
    else if(e.key === "ArrowDown" && velocityY != -1){
        velocityX=0
        velocityY=1
    }
    else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1
        velocityY = 0
    }
    else if(e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1
        velocityY = 0
    }
    initGame()
}
const initGame = () => {
    if(gameOver) return handleGameOver()
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`
    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition()
        snakeBody.push([foodX, foodY])
        score++; //increment of score
        highScore = score>=highScore? score : highScore
        localStorage.setItem("high-score",highScore)
        scoreElement.innerText = `Score: ${score}`
        highScoreElement.innerText = `High  Score: ${highScore}`
    }
    for (let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[ i - 1 ]
    }
    snakeBody[0] = [snakeX, snakeY] // Setting first element of snake body to current Position
    //Updating the snake's head Position Based on the current velocity
    snakeX +=velocityX
    snakeY +=velocityY
    //game Over Condition
    if(snakeX <=0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        gameOver  = true
    }
    for(let i=0;i< snakeBody.length; i++){
        //adding a div for each part of the snake body
     htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`
     if(i !=0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0])
      //checking if snake Body hit the by head of snake
        gameOver = true
    }
    playBoard.innerHTML = htmlMarkup;
}
changeFoodPosition()
setIntervalId = setInterval(initGame,125)
document.addEventListener("keydown",changeDirection)