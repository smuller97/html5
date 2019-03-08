//Hjælp til opgave fra https://youtu.be/21eSpMtJwrc

// #region Canvas og startop/tegning 
/*Henter canvas i HTML dokumentet*/
const canvas = document.querySelector(".canvas"); 
const ctx = canvas.getContext("2d");

/*Størrelse på pixels på canvas*/
const scale = 20; 
const rows = canvas.height / scale;
const columns = canvas.width / scale;

/* Slange - global variabel*/
var snake;

(function setup() {
  snake = new Snake(); //En ny slange sættes på canvas ved at sige global variabel lig med ny slange
  fruit = new Fruit(); //Der oprettes en ny frugt 
  fruit.pickLocation(); //Fugten sættes ind et bestemt sted på pladen

  window.setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fruit.draw(); //Metodekald til tegn frugt
    snake.update(); //Metodekald til opdatere slanes placering
    snake.draw(); //Metodekald til tegning af slange

    if (snake.eat(fruit)) { //If-statement der tjekker om en frugt er spist
      fruit.pickLocation(); //Metode kaldes hvis frugten er spist. Så insættes der en ny frugt
    } 

    snake.checkCollision(); //Metodekald til at se om slangen kører ind i sig selv
    document.querySelector('.score').innerText = snake.total;
  }, 250);
}());

/*Vinduet lytter til om der er nogle knapper der holdes nede*/
window.addEventListener('keydown', ((evt) => {
  const direction = evt.key.replace('Arrow', '');
  snake.changeDirection(direction);
}));
// #endregion

// #region Snake
function Snake() { //Metode for en slange
  this.x = 0;
  this.y = 0;
  this.xSpeed = scale * 1; //hurtigheden på slangen
  this.ySpeed = 0; //hurtigheden på slangen
  this.total = 0;
  this.tail = []; //Array for slangens hale

  this.draw = function() { //tegning af slange
    ctx.fillStyle = "#e696ff"; //Lyd lilla fyldefarve 
    for (let i=0; i<this.tail.length; i++) {
      ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale); //Hvis der er spist frugter tilføjes de til slangens hale
    }

    ctx.fillRect(this.x, this.y, scale, scale);
  }

  this.update = function() { //Opdatering af slangens placering
    for (let i=0; i<this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i+1];
    }

    this.tail[this.total - 1] = { x: this.x, y: this.y };

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x > canvas.width) { this.x = 0; }

    if (this.y > canvas.height) { this.y = 0;}

    if (this.x < 0) { this.x = canvas.width; }

    if (this.y < 0) { this.y = canvas.height;}
  }

  this.changeDirection = function(direction) { //Skift af retning med switch-case
    switch(direction) {
      case 'Up':
        this.xSpeed = 0;
        this.ySpeed = -scale * 1;
        break;
      case 'Down':
        this.xSpeed = 0;
        this.ySpeed = scale * 1;
        break;
      case 'Left':
        this.xSpeed = -scale * 1;
        this.ySpeed = 0;
        break;
      case 'Right':
        this.xSpeed = scale * 1;
        this.ySpeed = 0;
        break;
    }
  }

  this.eat = function(fruit) { //spisning af frugter
    if (this.x === fruit.x &&
      this.y === fruit.y) {
      this.total++; //tilføjelse af points
      return true;
    }

    return false;
  }

  this.checkCollision = function() { //Hvis man kører ind i sig selv, så startes spillet forfra med 0 hale og 0 points
    for (var i=0; i<this.tail.length; i++) {
      if (this.x === this.tail[i].x &&
        this.y === this.tail[i].y) {
        this.total = 0;
        this.tail = [];
      }
    }
  }
}
// #endregion

// #region Frugt pixel
function Fruit() {
  this.x;
  this.y;

  /*Metode til at sætte frugten ind et bestemt sted*/
  this.pickLocation = function() {
    this.x = (Math.floor(Math.random() * columns - 1) + 1) * scale; //x-kordinat findes
    this.y = (Math.floor(Math.random() * rows - 1) + 1) * scale; //y-kordinat findes
  }

  /*Metode til frugten tegnes på pladen*/
  this.draw = function() {
    ctx.fillStyle = "#ff96d6"; //Pink pastel
    ctx.fillRect(this.x, this.y, scale, scale)
  }
}
// #endregion