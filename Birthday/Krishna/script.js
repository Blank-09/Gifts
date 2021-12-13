const start = document.querySelector(".start");
const game = document.querySelector("#game");
const sco = document.getElementById("score");
const audio = document.getElementById("audio");
const ply = document.getElementById("play");
const outs = document.getElementById("out");
const results = document.getElementById("result");
const result_box = document.querySelector(".result_box");
const result_txt = [
  document.getElementById("result_txt"),
  document.getElementById("result_txt2"),
];
const restart = result_box.querySelector(".restart");
const noOfPic = 4; // Number of pictures
const personName = "Krishna Raichura";

let index = 0;
let a;
let tos = 2400;
let bool1, bool2, bool3, bool4;
let count = 1;
let score = 0;
let mar = randomMargin();
let mar2;

audio.onpause = (e) => {
  e.preventDefault();
  audio.play();
};

audio.onended = () => {
  audio.currentTime = 0;
  audio.play();
};

function viewResult() {
  game.style.display = "none";
  results.play();
  result_box.classList.add("activeResult");
}

restart.onclick = () => {
  start.style.display = "block";
  result_box.classList.remove("activeResult");
  sco.innerText = 0;
  audio.currentTime = 0;
  result_txt[0] = "Try Again! Score 75 pts";
  result_txt[1] = "To get the reward";
};

function startAudio() {
  audio.play();
}
audio.addEventListener("ended", () => {
  audio.currentTime = 0;
  audio.play();
});

function speed(e) {
  a = setInterval(appendDiv, e);
}
function reset() {
  bool1 = bool2 = bool3 = bool4 = true;
}
function out() {
  outs.play();
  setTimeout(viewResult, 1500);
  if (score >= 75) {
    result_txt[0].innerText = "Happy Birthday!";
    result_txt[1].innerText = personName;
  }
}

function appendDiv() {
  var ob = document.createElement("div");

  do mar2 = randomMargin();
  while (mar == mar2);

  mar = mar2;
  ob.style.marginLeft = mar2 + "%";
  setTimeout(moveDown, 100, ob);

  ob.onpointerdown = () => {
    ob.style.opacity = 0.3;
    score++;
    sco.innerText = score;
  };
  document.getElementById("tiles").prepend(ob);
}

function randomMargin() {
  return 25 * Math.floor(Math.random() * 4);
}

function moveDown(e) {
  e.classList.add("move");
  if (bool1 == true) {
    clearInterval(a);
    speed(300);
    reset();
    bool1 = false;
  }
  setTimeout(removeDiv, 1600, e);
}

function removeDiv(e) {
  var op = e.style.opacity;
  if (op != 0.3) {
    console.log("Not touched!");
    clearInterval(a);
    out();
  }
  e.remove();
}

start.querySelector("button").onclick = () => {
  ply.play(); reset();
  game.style.display = "block";
  start.style.display = "none";
  score = 0;
  speed(300);
  setTimeout(startAudio, 1000);
};
