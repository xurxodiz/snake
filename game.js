var dead;

function gamerun() {
  init();
  dead = false;
}

function step(){
  if (!dead) {
    update();
    draw();
  }
}

function update() {
  dead = !movesnake();
  if (dead) {
    alert("you are dead. size: " + size);
  }
}

function draw() {
  screenclear();
  drawsnake();
  drawfood();
}