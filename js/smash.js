const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var score=0;

var scor = new Audio();
scor.src = "sounds/smash.wav";

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  function distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
  
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  }
 
  
  function drawAnt(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.move = {
      x: Math.random()*3-1.5,
      y: Math.random()*3-1.5
    };
  
    this.draw = () =>{
      let ant = new Image();
      ant.src = 'images/cute-ant.png';
      ctx.drawImage(ant, this.x, this.y, this.w, this.h);
    };
  
    this.checkCollision = (ants) =>{
      for(let i = 0; i < ants.length; i++){
        if(this === ants[i]) continue;
        if(this.x < ants[i].x + ants[i].w &&
          this.x + this.w > ants[i].x &&
          this.y < ants[i].y + ants[i].h &&
          this.y + this.h > ants[i].y){
          this.move.x = -this.move.x;
          this.move.y = -this.move.y;
        }
      }
      if(this.x - this.w <= 0 || this.x + this.w >= canvas.width) this.move.x = -this.move.x;
      if(this.y - this.h <= 0 || this.y + this.h >= canvas.height) this.move.y = -this.move.y;
    
      this.x += this.move.x;
      this.y += this.move.y;
    };
  }
  
  //on click ant disappear
  canvas.addEventListener('click', function (event) {
    let x = event.clientX;
    let y = event.clientY;
  
    for (let i = 0; i < ants.length; i++) {
      let ant = ants[i];
      if (x >= ant.x 
        && x <= ant.x + ant.w
        && y >= ant.y 
        && y <= ant.y + ant.h){
        ants.splice(i, 1);
        score ++;
        scor.play();
        
      }
    }
  });
  
  //Array
  let ants;
  function init() {
    ants = [];
  
    for (let i = 0; i < 15; i++) {
      let h = randomIntFromRange(60, 120);
      let x = randomIntFromRange(h, canvas.width-h);
      let y = randomIntFromRange(h, canvas.height-h);
      let w = h - 18;
      if(i!=0){
        for(let j = 0; j < ants.length; j++){
          if(x < ants[j].x + ants[j].w &&
            (x + w) > ants[j].x &&
            y < ants[j].y + ants[j].h &&
            (y + h) > ants[j].y){
            x = randomIntFromRange(h, canvas.width-h);
            y = randomIntFromRange(h, canvas.height-h);
            j = -1; // to restart 
          }
        }
      }
      ants.push(new drawAnt(x, y, w, h));
    }
  }
  
  
  
  // Animation
  function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  
    ants.forEach(ant => {
     ant.draw(ants);
     ant.checkCollision(ants)
    });
    ctx.fillStyle = "#000";
    ctx.font = "30px Verdana";
    ctx.fillText("Score : "+score,360,30);
    ctx.fillText("Ant Smasher" , 120,30)
  }
  
  init();
  animate();

