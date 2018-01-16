var AudioContext = window.AudioContext || window.webkitAudioContext || false;

if (!AudioContext) {
  alert('Sorry! your browser doesnt support web audio api, kindly consider upgrading your browser to latest version.')
} else {
  var context = new AudioContext;
  var osc = context.createOscillator();
  osc.type = 'triangle';
  osc.start(0);
  var gainNode = context.createGain();
  osc.connect(gainNode);
  gainNode.gain.linearRampToValueAtTime(0.0, context.currentTime);
  gainNode.connect(context.destination);
}

const btnFreqs =[220, 293.66, 329.63, 392.00];
let power = document.getElementById('power');
let powerButton =document.getElementById('tglOnOf');
let powerSwitch = false;
let statOp = document.getElementById('statOp');
let gameRunning = false;
let led = document.getElementById('led');
let strict = false;
let pTimer;
let sTimer;
let aiPattern = [];
let huPattern = [];
let simObj = {red:0,blue:1,green:2,yellow:3}
let aiTurn = false;
let counter = 0;
let counter1 = 0; 
let simArray = ['rgb(220, 14, 14)','rgb(1, 74, 255)','rgb(4, 200, 4)','rgb(255, 225, 4)'];
let simRevAr = ['rgb(148, 14, 14)','rgb(1, 54, 150)','rgb(4, 124, 4)','rgb(151, 136, 2)'];
let simCel = document.querySelectorAll('.simBtn');
let simBtn = document.getElementById('simbody');

simBtn.addEventListener('mousedown', function(event){
  if (powerSwitch === true && gameRunning === true && aiTurn === false) {
    let element = simObj[event.target.id];
    huPattern.push(element);
    checkPlay(huPattern, element);
  }  
});

function checkPlay(pat, elm) {
  let check;
  for (var i = 0; i < pat.length; i++) {
    if (pat[i] === aiPattern[i]) {
      check = true;
    } else {
      check = false;
      break;
    }
  }
  if (check) {
    console.log(pat.length);
    huPlay(elm);
  } else {
    stepErr(elm);
  }
}
function stepErr(elm) {
  simBtn.removeEventListener('mouseup', mouseRelease);
  simCel[elm].style.backgroundColor = simArray[elm];
  statOp.innerText = '!!';
  osc.frequency.setValueAtTime(110, context.currentTime);
  gainNode.gain.setValueAtTime(0.1, context.currentTime);
  erRor(elm)
}
function erRor(elm) {
  let i = 0;
    let timer1 = setInterval(function() {
      statOp.innerText = '';
      let timer2 = setInterval(function() {
        statOp.innerText = '!!';
        clearInterval(timer2);
      }, 200)
      if (i === 1) {
        clearInterval(timer1);
        gainNode.gain.linearRampToValueAtTime(0.0, context.currentTime + 0.01);
        simCel[elm].style.backgroundColor = simRevAr[elm];
        simBtn.addEventListener('mouseup', mouseRelease);
        huPattern = [];
        counter = 0;
        if (strict) {
          aiPattern = [];
          aiPlays();
        } else {
          aiTurn = true;
          primaryTimer(1250, aiPlaySteps);
        }
      }
      i++;
    }, 500)
}

function huPlay(elm) {
    simCel[elm].style.backgroundColor = simArray[elm];
    osc.frequency.setValueAtTime(btnFreqs[elm], context.currentTime);
    gainNode.gain.setValueAtTime(0.1, context.currentTime);

    if (huPattern.length === aiPattern.length) {
      if (huPattern.length === 3) {
        console.log('uWin');
        youWin()
      } else if (huPattern.length < 3) {
        changeTurn();
      }
    }
}
function changeTurn() {
  huPattern = [];
  let timer3 = setInterval(function() {
      clearInterval(timer3);
      aiPlays();
  }, 500)    
}

  simBtn.addEventListener('mouseup', mouseRelease);
  function mouseRelease() {
    let element = simObj[event.target.id];
    releaseEvent(element);
  }

  function releaseEvent(elm) {
  simCel[elm].style.backgroundColor = simRevAr[elm];
  gainNode.gain.linearRampToValueAtTime(0.0, context.currentTime + 0.01);
}




power.addEventListener('click', gameOnOff);

function gameOnOff() {
  if (powerSwitch === false) {
    powerSwitch = true;
    powerButton.style.left = '25px';
    statOp.innerText = '--';
  } else {
    powerSwitch = false;
    stopAll();
    powerOff();
  }
}

function startGame() {
  if (powerSwitch === true) {
    if (gameRunning === false) {
      gameRunning = true;
      prepGameStart();
    } else {
      prepGameReStart()
    }
  }
}

function strictMode() {
  if (powerSwitch === true) {
    if (strict === false) {
      strict = true;
      led.style.backgroundColor = 'red';
    } else {
      strict = false;
      led.style.backgroundColor = 'rgb(46, 2, 2)';
    }
  }
}

function prepGameStart() {
  counter = 0;
  let i = 0;
    let timer1 = setInterval(function() {
      statOp.innerText = '';
      let timer2 = setInterval(function() {
        statOp.innerText = '--';
        clearInterval(timer2);
      }, 200)
      
      if (i === 1) {
        clearInterval(timer1);
        aiPlays();
      }
      i++;
    }, 500)
    gameRunning = true;
}
function prepGameReStart() {
  stopAll();
  prepGameStart();
}

function aiPlays() {
  counter = 0;
  aiTurn = true;
  aiPattern.push(generateRandomCell()) ;
  primaryTimer(1250, aiPlaySteps);
}

//neeed to think that i will do tomorrow
function aiPlaySteps() {
  if (counter < aiPattern.length) {
    statOp.innerText = aiPattern.length;
    simCel[aiPattern[counter]].style.backgroundColor = simArray[aiPattern[counter]];
    osc.frequency.setValueAtTime(btnFreqs[aiPattern[counter]], context.currentTime);
    gainNode.gain.setValueAtTime(0.1, context.currentTime);
    secondaryTimer(500, aiPlayStepsRevert)
  }
}

function aiPlayStepsRevert() {
  simCel[aiPattern[counter]].style.backgroundColor = simRevAr[aiPattern[counter]];
  gainNode.gain.linearRampToValueAtTime(0.0, context.currentTime + 0.01);
  clearTimer(sTimer);
  counter++;
  if (counter === aiPattern.length) {
    clearTimer(pTimer);
    aiTurn = false;
  }
}

function generateRandomCell() {
  let randNum = Math.random();
  let randImproved = (randNum * 4) + 1;
  let randomCell = Math.floor(randImproved - 1);
  return randomCell;
}
function primaryTimer(timing, inputFunc) {
  pTimer = setInterval(function() {
    inputFunc();
  }, timing)
}
function secondaryTimer(timing, inputFunc) {
  sTimer = setInterval(function() {
    inputFunc();
  }, timing)
}
function clearTimer(timer) {
  clearInterval(timer);
}
function powerOff() {
  aiPattern = [];
  huPattern = [];
  gameRunning = false;
  aiTurn = false;
  strict = false;
  counter = 0;
  powerButton.style.left = '3px';
  statOp.innerText = '';
  led.style.backgroundColor = '';
}
function stopAll() {
  if (aiTurn === true) {
    simCel[aiPattern[counter]].style.backgroundColor = simRevAr[aiPattern[counter]];
    gainNode.gain.linearRampToValueAtTime(0.0, context.currentTime + 0.01);
    clearTimer(sTimer);
    clearTimer(pTimer);
    aiPattern = [];
    huPattern = [];
    gameRunning = false;
    aiTurn = false;
    counter = 0;
  } else {
    gainNode.gain.linearRampToValueAtTime(0.0, context.currentTime + 0.01);
    clearTimer(sTimer);
    clearTimer(pTimer);
    aiPattern = [];
    huPattern = [];
    gameRunning = false;
    aiTurn = false;
    counter = 0;
  }
}








