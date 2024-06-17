let colorArray = ["green", "red", "yellow", "blue"];
let computerColor = [];
let userColor = [];
let level = 0;
let isStart = false;
let isWinLevel = true;
let currentLevel = 0;
// play sounf
const playSound = (name) => {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};
//update tittle
const updateTitle = () => {
  if (!isWinLevel) {
    $("#level-title").text("Game Over, Press Any Key to Restart");
  } else {
    $("#level-title").text("Level " + (level + 1));
  }
};

const check = () => {
  if (computerColor[currentLevel] == userColor[currentLevel]) {
    currentLevel++;
    if (computerColor.length == userColor.length) {
      userColor = [];
      currentLevel = 0;
      setTimeout(() => {
        nextLevel();
      }, 800);
    }
    return true;
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 100);
    return false;
  }
};

// next level
const nextLevel = () => {
  updateTitle();
  level++;
  let colorIndex = Math.floor(Math.random() * 3);
  console.log(colorIndex);
  let name = colorArray[colorIndex];
  computerColor.push(name);
  playSound(name);
  $("#" + name)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
};

//reset all
const reset = () => {
  isWinLevel = false;
  level = 0;
  computerColor = [];
  userColor = [];
  currentLevel = 0;
};

// add click listenner
$(".btn").click(function () {
  if (isStart && isWinLevel) {
    let name = $(this).attr("id");
    $(this).addClass("pressed");
    setTimeout(() => {
      $(this).removeClass("pressed");
    }, 100);
    userColor.push(name);
    if (check()) {
      playSound(name);
    } else {
      reset();
      updateTitle();
    }
  }
});

// start game
$(document).keydown(function (e) {
  if (!isStart) {
    if ((e.key = "a")) {
      isStart = true;
      updateTitle();
      nextLevel();
    }
  } else if (!isWinLevel) {
    isWinLevel = true;
    updateTitle();
    nextLevel();
  }
});
