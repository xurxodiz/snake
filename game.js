var dead;
var id;

function gamerun() {
  if (id) {
    clearInterval(id);
  }
  id = init();
  dead = false;
}

function step(){
  update();
  draw();
}

function update() {
  dead = !movesnake();
  if (dead) {
    alert("you are dead. size: " + size);
    clearInterval(id);
  }
}

function draw() {
  screenclear();
  drawsnake();
  drawfood();
}