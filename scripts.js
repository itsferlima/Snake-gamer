let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); // trata arquivo como 2d
let box = 32; // quadrado
let snake =[];
snake[0]={
    x: 8*box,
    y: 8*box
}

let direction = "right";
let food={
    x: Math.floor(Math.random() * 15 +1) * box, // retira a parte flutuante
    y: Math.floor(Math.random() * 15 +1) * box
}

function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0,0,16 * box, 16 * box);
}

function criarCobra(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);// pega o evento do cliente do teclado e chama a function update

function update(event){ // faz com que a cobra anda nas direções
    if(event.keyCode == 37 && direction != "right") direction="left";
    if(event.keyCode == 38 && direction!= "up") direction = "down";
    if(event.keyCode == 39 && direction!="left") direction="right";
    if(event.keyCode == 40 && direction!= "down") direction="up";
}

function startGame(){
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction =="up")snake[0].y = 16 * box;

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game over :( ');
        }
    }

    criarBG();
    criarCobra();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box; //Coordenadas
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY += box;
    if(direction =="down") snakeY -= box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); // Retira o ultimo elemento da cobra
    }
    else{
        food.x = Math.floor(Math.random()* 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1)* box;
    }

    let newHead={
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}
let game = setInterval(startGame, 100);