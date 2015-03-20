function gamerun() {
  init();
}

function step(){
  update();
  draw();
}

function update() {
  if (!movesnake()) {
    alert("you are dead. size: " + size);
    die();
  }
}

function draw() {
  screenclear();
  drawsnake();
  drawfood();
}