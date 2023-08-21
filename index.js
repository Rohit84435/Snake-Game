let setBtn = document.querySelector(".setting-btn");
let container = document.querySelector(".container")
let setBox = document.querySelector(".setting-box");
let gameBoard = document.querySelector(".game-board");
let score = document.querySelector(".score");
let highScore = document.querySelector(".high-score");
let controls = document.querySelectorAll(".controls i");
let set_btn = document.querySelector("#set-btn");
let defaule_ele = document.querySelector("#default");
let detail_col = document.querySelector("#detail-color");
let board_col = document.querySelector("#board-color");
let snake_col = document.querySelector("#snake-color");
let food_col = document.querySelector("#food-color");
let speed_ele = document.querySelector("#speed");

// Toggling setting button
setBtn.addEventListener("click" , ()=>{
    setBox.classList.toggle("active");
});


// Creating food and snake

let i;
var gameOver = false;
let snakeBody = [];
let foodX = 10 , foodY = 14;
let snakeX = 5 , snakeY = 15;
let velocityX = 0 , velocityY = 0;
let setIntervalId;
let scoreE = 0;
let speed = 125;

if(localStorage.getItem("details") != null){
   const all_details = JSON.parse(localStorage.getItem("details"));
   board_col.value = all_details.bord_color;
   detail_col.value = all_details.detail_color;
   snake_col.value = all_details.snake_color;
   food_col.value = all_details.food_color;
   speed_ele.val = all_details.speed;

   if(all_details.active == false){
      defaule_ele.checked = true;
   }
   else{
      defaule_ele.checked = false;
   }

   container.style.backgroundColor = detail_col.value;
   gameBoard.style.backgroundColor = board_col.value;
   speed = all_details.speed;
   
}


let highScr = localStorage.getItem("high-score") || 0;
// alert(highScr)
highScore.innerHTML = `High Score Is : ${highScr}`;


const updateFoodPosition = () =>{
    foodX = Math.floor(Math.random()*30+1);
    foodY = Math.floor(Math.random()*30+1);
}

const handelGameover = () =>{

    clearInterval(setIntervalId);
    alert("Game over ! Press on to restart");
    location.reload();
}

const direction = (e) =>{
   if(e.key == "ArrowUp" && velocityY != 1)
   {
      velocityX = 0;
      velocityY = -1;
   }

   else if(e.key == "ArrowDown" && velocityY != -1)
   {
      velocityX = 0;
      velocityY = 1;
   }

   else if(e.key == "ArrowLeft" && velocityX != 1)
   {
      velocityX = -1;
      velocityY = 0;
   }

   else if(e.key == "ArrowRight" && velocityX != -1)
   {
       velocityX = 1;
       velocityY = 0;   
   }
}

controls.forEach((key)=>{
   key.addEventListener("click" ,()=>direction({key : key.dataset.key}));
});

const snakegame = () =>{
    if(gameOver == true) return handelGameover();
   let html = `<div class = "food" style="grid-area: ${foodY}/${foodX}"></div>`;
   
   if(snakeX == foodX && snakeY == foodY)
   {
    updateFoodPosition();
    snakeBody.push([foodX , foodY]);
   //  console.log(snakeBody);
    scoreE++;

    highScr = scoreE >= highScr ? scoreE : highScr;
    localStorage.setItem("high-score",highScr);
    score.innerHTML = `Score Is: ${scoreE}`;
    highScore.innerHTML = `High Score Is : ${highScr}`;

   }

   for(i = snakeBody.length-1 ; i > 0 ; i--){
      snakeBody[i] = snakeBody[i-1];
   }

   snakeBody[0] = [snakeX , snakeY];
   snakeX += velocityX;
   snakeY += velocityY;

   if(snakeX < 0 || snakeX > 31 || snakeY < 0 || snakeY > 31){
     gameOver = true;
   }

   for(i = 0 ; i < snakeBody.length ; i++){
       html += `<div class = "head" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0] }"></div>`;

       if( i !== 0 && snakeBody[0][1] === snakeBody[i][1] 
        && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;
        }

   }
//    html += `<div class = "head" style="grid-area: ${snakeY}/${snakeX }"></div>`;

   gameBoard.innerHTML = html;

   if(localStorage.getItem("details") != null){
      document.querySelector(".food").style.backgroundColor = food_col.value;
      document.querySelector(".head").style.backgroundColor = snake_col.value;
   }
}
updateFoodPosition();
setIntervalId = setInterval(snakegame,speed); // speed

document.addEventListener("keydown",direction);


// setting Button

set_btn.onclick = function(){
   if(defaule_ele.checked == true){
      const set_data = {
         detail_color : "#293447",
         bord_color : "#212837",
         snake_color : "#2948ff",
         food_color : "#b8c6dc",
         speed : 120,
         active : false
      }
      localStorage.setItem("details" , JSON.stringify(set_data));
   }
   else{
      const set_data = {
         detail_color : detail_col.value,
         bord_color : board_col.value,
         snake_color : snake_col.value,
         food_color : food_col.value,
         speed : speed_ele.value,
         active : true
      }
      localStorage.setItem("details" , JSON.stringify(set_data));
   }
   setBtn.click();
   location.reload();
}