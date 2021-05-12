const canvas = document.querySelector('canvas');
const can = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;



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
      x: Math.random()*3.5-1.5,
      y: Math.random()*3.5-1.5
    };
  
    this.draw = () =>{
      let ant = new Image();
      ant.src = 'images/cute-ant.png';
      can.drawImage(ant, this.x, this.y, this.w, this.h);
    };
  
    this.checkCollision = (manyants) =>{
      for(let i = 0; i < manyants.length; i++){
        if(this === manyants[i]) continue;
        if(this.x < manyants[i].x + manyants[i].w &&
          this.x + this.w > manyants[i].x &&
          this.y < manyants[i].y + manyants[i].h &&
          this.y + this.h > manyants[i].y){
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
  
  
    
  
  //Array
  let manyants;
  function init() {
    manyants = [];
  
    for (let i = 0; i < 15; i++) {
      let h = randomIntFromRange(60, 120);
      let x = randomIntFromRange(h, canvas.width-h);
      let y = randomIntFromRange(h, canvas.height-h);
      let w = h - 18;
      if(i!=0){
        for(let j = 0; j < manyants.length; j++){
          if(x < manyants[j].x + manyants[j].w &&
            (x + w) > manyants[j].x &&
            y < manyants[j].y + manyants[j].h &&
            (y + h) > manyants[j].y){
            x = randomIntFromRange(h, canvas.width-h);
            y = randomIntFromRange(h, canvas.height-h);
            j = -1; // to restart 
          }
        }
      }
      manyants.push(new drawAnt(x, y, w, h));
    }
  }
  
  // Animation
  function animate() {
    requestAnimationFrame(animate)
    can.clearRect(0, 0, canvas.width, canvas.height)
  
    manyants.forEach(ant => {
     ant.draw(manyants);
     ant.checkCollision(manyants)
    })
  }
  
  init()
  animate()