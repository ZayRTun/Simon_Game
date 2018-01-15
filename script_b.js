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
  if (powerSwitch === true && aiTurn === false) {
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
      // huPlay(elm);
    } else {
      check = false;
      break;
      // console.log('err');
      // stepErr(elm);
    }
  }
  if (check) {
    huPlay(elm);
  } else {

    stepErr(elm);
  }
}
function stepErr(elm) {
  osc.frequency.setValueAtTime(110, context.currentTime);
  gainNode.gain.setValueAtTime(0.1, context.currentTime);
  huPattern = [];
  counter = 0;
  primaryTimer(1250, aiPlaySteps);

}

function huPlay(elm) {
    simCel[elm].style.backgroundColor = simArray[elm];
    osc.frequency.setValueAtTime(btnFreqs[elm], context.currentTime);
    gainNode.gain.setValueAtTime(0.1, context.currentTime);

    if (huPattern.length === aiPattern.length) {
      changeTurn();
    }
}
function changeTurn() {
  huPattern = [];
  // onOff = false;
  let timer3 = setInterval(function() {
      clearInterval(timer3);
      aiPlays();
  }, 500)    
}

simBtn.addEventListener('mouseup', function(event) {
  let element = simObj[event.target.id];
  releaseEvent(element);
});
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
    //stopGame();
    powerButton.style.left = '3px';
    statOp.innerText = '';
    powerOff();
  }
}

function startGame() {
  if (powerSwitch === true) {
    if (gameRunning === false) {
      gameRunning = true;
      prepGameStart();
    } else {
      gameRunning = false;
      prepGameStart()
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

function aiPlays() {
  counter = 0;
  aiTurn = true;
  aiPattern.push(generateRandomCell()) ;
  primaryTimer(1250, aiPlaySteps);
}

//neeed to think that i will do tomorrow
function aiPlaySteps() {
  if (counter < aiPattern.length) {
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
  gameRunning = false;
  counter = 0;
}








