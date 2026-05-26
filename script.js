const choices = {

  rock:"Rock.png",
  paper:"Paper.png",
  scissors:"Scissors.png"
};

/* scores */

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

/* popups */

const rewardPopup =
document.getElementById("rewardPopup");

const losePopup =
document.getElementById("losePopup");

const closeReward =
document.getElementById("closeReward");

const closeLose =
document.getElementById("closeLose");

/* AUDIO */
/* fix autoplay mobile */

const battleSound =
new Audio("battle.mp3");

battleSound.preload = "auto";

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

function unlockAudio(){

  battleSound.play()
  .then(() => {

    battleSound.pause();

    battleSound.currentTime = 0;

  })
  .catch(() => {});
}

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

/* GAME */

async function playGame(playerChoice){

  if(isPlaying) return;

  if(gameEnded) return;

  if(totalRounds >= MAX_ROUNDS) return;

  isPlaying = true;

  battleArea.style.display = "block";

  resultText.innerHTML =
  "⏳ Đang ra kéo búa bao...";

  playAgainBtn.style.display =
  "none";

  /* sound */

  battleSound.pause();

  battleSound.currentTime = 0;

  try{
    await battleSound.play();
  }
  catch(e){}

  /* animation 3 seconds */

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

  /* real result */

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

  /* DRAW */

  if(playerChoice === computerChoice){

    result = "🤝 Hòa rồi!";

    draw++;
  }

  /* WIN */

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

  /* LOSE */

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

  /* WIN POPUP */

  if(win >= TARGET_WIN){

    gameEnded = true;

    setTimeout(() => {

      rewardPopup.classList.add(
        "show"
      );

      launchConfetti();

    },700);
  }

  /* LOSE POPUP */

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

/* close popup */

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