const choices = {

  rock:"Rock.png",
  paper:"Paper.png",
  scissors:"Scissors.png"
};

/* score */

let win = 0;
let lose = 0;
let draw = 0;

let totalRounds = 0;

const MAX_ROUNDS = 10;

const TARGET_WIN = 3;

let isPlaying = false;

let gameEnded = false;

/* elements */

const resultText =
document.getElementById("result");

const battleArea =
document.getElementById("battleArea");

const playerImg =
document.getElementById("playerChoiceImg");

const computerImg =
document.getElementById("computerChoiceImg");

const winScore =
document.getElementById("winScore");

const loseScore =
document.getElementById("loseScore");

const drawScore =
document.getElementById("drawScore");

const playAgainBtn =
document.getElementById("playAgainBtn");

const roundText =
document.getElementById("roundText");

/* popup */

const rewardPopup =
document.getElementById("rewardPopup");

const losePopup =
document.getElementById("losePopup");

const closeReward =
document.getElementById("closeReward");

const closeLose =
document.getElementById("closeLose");

/* audio */

const battleSound =
document.getElementById(
  "battleSound"
);

let audioUnlocked = false;

/* unlock mobile audio */

async function unlockAudio(){

  if(audioUnlocked) return;

  try{

    battleSound.muted = true;

    await battleSound.play();

    battleSound.pause();

    battleSound.currentTime = 0;

    battleSound.muted = false;

    audioUnlocked = true;
  }

  catch(err){

    console.log(
      "Audio unlock failed"
    );
  }
}

document.addEventListener(
  "touchstart",
  unlockAudio,
  { once:true }
);

document.addEventListener(
  "click",
  unlockAudio,
  { once:true }
);

/* random */

function randomChoice(){

  const arr = [
    "rock",
    "paper",
    "scissors"
  ];

  return arr[
    Math.floor(Math.random()*3)
  ];
}

/* game */

async function playGame(playerChoice){

  if(isPlaying) return;

  if(gameEnded) return;

  if(totalRounds >= MAX_ROUNDS) return;

  isPlaying = true;

  battleArea.style.display =
  "block";

  resultText.innerHTML =
  "⏳ Đang ra kéo búa bao...";

  playAgainBtn.style.display =
  "none";

  /* play sound */

  try{

    battleSound.pause();

    battleSound.currentTime = 0;

    const promise =
    battleSound.play();

    if(promise !== undefined){

      await promise;
    }
  }

  catch(err){

    console.log(err);
  }

  /* 3 second animation */

  for(let i = 0; i < 3; i++){

    const fakePlayer =
    randomChoice();

    const fakeComputer =
    randomChoice();

    playerImg.src =
    choices[fakePlayer];

    computerImg.src =
    choices[fakeComputer];

    playerImg.classList.remove(
      "battle-animation"
    );

    computerImg.classList.remove(
      "battle-animation"
    );

    void playerImg.offsetWidth;
    void computerImg.offsetWidth;

    playerImg.classList.add(
      "battle-animation"
    );

    computerImg.classList.add(
      "battle-animation"
    );

    await new Promise(resolve =>
      setTimeout(resolve,1000)
    );
  }

  /* result */

  const computerChoices = [
    "rock",
    "paper",
    "scissors"
  ];

  const computerChoice =
  computerChoices[
    Math.floor(Math.random()*3)
  ];

  playerImg.src =
  choices[playerChoice];

  computerImg.src =
  choices[computerChoice];

  totalRounds++;

  roundText.innerHTML =
  `${totalRounds} / ${MAX_ROUNDS}`;

  let result = "";

  /* draw */

  if(playerChoice === computerChoice){

    result = "🤝 Hòa rồi!";

    draw++;
  }

  /* win */

  else if(

    (playerChoice === "rock" &&
    computerChoice === "scissors")

    ||

    (playerChoice === "paper" &&
    computerChoice === "rock")

    ||

    (playerChoice === "scissors" &&
    computerChoice === "paper")
  ){

    result = "🎉 Bạn thắng!";

    win++;

    launchConfetti();
  }

  /* lose */

  else{

    result = "😵 Bạn thua!";

    lose++;
  }

  resultText.innerHTML = result;

  winScore.innerHTML = win;

  loseScore.innerHTML = lose;

  drawScore.innerHTML = draw;

  playAgainBtn.style.display =
  "inline-block";

  /* win popup */

  if(win >= TARGET_WIN){

    gameEnded = true;

    setTimeout(() => {

      rewardPopup.classList.add(
        "show"
      );

      launchConfetti();

    },700);
  }

  /* lose popup */

  else if(

    totalRounds >= MAX_ROUNDS
    &&
    win < TARGET_WIN
  ){

    gameEnded = true;

    setTimeout(() => {

      losePopup.classList.add(
        "show"
      );

    },700);
  }

  isPlaying = false;
}

/* continue */

playAgainBtn.addEventListener(
  "click",
  () => {

    if(gameEnded) return;

    resultText.innerHTML =
    "Chọn vũ khí của bạn 👇";

    battleArea.style.display =
    "none";

    playAgainBtn.style.display =
    "none";
  }
);

/* popup close */

closeReward.addEventListener(
  "click",
  () => {

    rewardPopup.classList.remove(
      "show"
    );
  }
);

closeLose.addEventListener(
  "click",
  () => {

    losePopup.classList.remove(
      "show"
    );
  }
);

/* confetti */

function launchConfetti(){

  for(let i = 0; i < 40; i++){

    const confetti =
    document.createElement("div");

    confetti.classList.add(
      "confetti"
    );

    confetti.style.left =
    Math.random()*100 + "vw";

    confetti.style.animationDuration =
    (Math.random()*2 + 2) + "s";

    confetti.style.opacity =
    Math.random();

    confetti.style.transform =
    `rotate(${Math.random()*360}deg)`;

    document.body.appendChild(
      confetti
    );

    setTimeout(() => {

      confetti.remove();

    },4000);
  }
}