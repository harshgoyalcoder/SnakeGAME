let inputDir={x:0,y:0};
const foodSound=new Audio('music/food.mp3');
const gameOverSound=new Audio('music/gameover.mp3');
const moveSound=new Audio('music/move.mp3');
const musicSound=new Audio('music/music.mp3');
let score=0;
let speed=7;
let lastPaintTime=0;
let snakeArr=[
    {x:10 ,y:5}
]
let food={x:3,y:7}
musicSound.play();

//game functions
function main(ctime){
    window.requestAnimationFrame(main);

    if((ctime-lastPaintTime)/1000<1/speed){
    // console.log(ctime);
     return;    
    }
    lastPaintTime=ctime;
    gameEngine();
}
function isCollide(snake){
//if snake bump into itself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x==snake[0].x && snake[i].y==snake[0].y ){
        return true;
        }
    }
    //if you bump into wall
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
        return true;
    }

}

function gameEngine(){
    //part1: updating the snake variable and food
    if(isCollide(snakeArr)){
        
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game Over! , Press Any key to play Again !");
        
        speed=7;
        
        snakeArr=[{x:13,y:15}];
        musicSound.currentTime=0;
        musicSound.play();
        score=0;
        scoreBox.innerHTML="Your Score:" +score;

    }

//on eating the food, increment the scoe and regenerate the food
if(snakeArr[0].y==food.y && snakeArr[0].x==food.x){
    score+=1;
    speed+=0.3;
    scoreBox.innerHTML="Your Score:" +score;
    foodSound.play();
    snakeArr.unshift({x:snakeArr[0].x +inputDir.x , y:snakeArr[0].y +inputDir.y})
    let a=2;
    let b=16;
    food={x:Math.round(a+(b-a)*Math.random()) , y:Math.round(a+(b-a)*Math.random()) }
}

//moving the snake
for (let i = snakeArr.length-2; i >=0; i--) {
    snakeArr[i+1]={...snakeArr[i]};
    
}
snakeArr[0].x+=inputDir.x;
snakeArr[0].y+=inputDir.y;

    //part2: Display the snake and Food

    //let's display the snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;

        if(index===0){
            snakeElement.classList.add('head');

        }
        else{
        snakeElement.classList.add('snake');

        }

        board.appendChild(snakeElement);


    });
    //let's display the food

    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);


}


//main logic here
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1};
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0 ;
            inputDir.y=-1 ;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0 ;
            inputDir.y=1 ;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1 ;
            inputDir.y=0 ;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1 ;
            inputDir.y=0 ;
            break;
                
        default:
            break;
    }
})