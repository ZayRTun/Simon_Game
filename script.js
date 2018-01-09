let simBtn = document.getElementById('simbody');
let simCel = document.querySelectorAll('.simBtn');
let btnTgl = document.getElementById('tglOnOf');
let huPattern = [];
let aiPattern = [];
let aiPatColor = [];
let timer1;
let timer2;
let onOff = false;
let onOff1 = false;
const btnFreqs =[220, 293.66, 329.63, 392.00, 110];

//Web audio api
var context = new AudioContext;
var osc = context.createOscillator();
osc.type = 'triangle';
osc.start(0);
var gainNode = context.createGain();
osc.connect(gainNode);
gainNode.gain.linearRampToValueAtTime(0.0, context.currentTime);
gainNode.connect(context.destination);


btnTgl.addEventListener('click', tglFunc);

function tglFunc() {
  if (onOff1 === false) {
    btnTgl.style.left = '25px';
    aiPlays();
    onOff1 = true;
  }
  else if(onOff1 === true) {
    btnTgl.style.left = '3px';
    stopGame();
    onOff1 = false;
  }
  
}


simBtn.addEventListener('mousedown', function(event){
  if (onOff === false) {
    //console.log("Start the game play!");
  } else {
    huPattern.push(event.target.id);
    checkHuPlay(huPattern);
  }
});

function checkHuPlay(plays) {
  //console.log(plays);
  for(var i = 0; i < plays.length; i++) {
    if (plays[i] === aiPatColor[i]) {
      prsEvent(event.target);
    } else {
      osc.frequency.setValueAtTime(btnFreqs[4], context.currentTime);
      gainNode.gain.setValueAtTime(0.1, context.currentTime);
      huPattern = [];
      aiPlaySteps(aiPattern);
      console.log('err1:' + aiPattern);
    }
  }
  if (huPattern.length === aiPatColor.length) {
    huPattern = [];
    onOff = false;
    aiPlays();
  }
}

simBtn.addEventListener('mouseup', function(event){
  releaseEvent(event.target);
});

function prsEvent(element) {
  if (element.id === 'red') {
    element.style.backgroundColor = "rgb(220, 14, 14)";
    osc.frequency.setValueAtTime(btnFreqs[0], context.currentTime);
    gainNode.gain.setValueAtTime(0.1, context.currentTime);
  } 
  else if (element.id === 'blue') {
    element.style.backgroundColor = "rgb(1, 74, 255)";
    osc.frequency.setValueAtTime(btnFreqs[1], context.currentTime);
    gainNode.gain.setValueAtTime(0.1, context.currentTime);
  }
  else if (element.id === 'yellow') {
    element.style.backgroundColor = "rgb(255, 225, 4)";
    osc.frequency.setValueAtTime(btnFreqs[2], context.currentTime);
    gainNode.gain.setValueAtTime(0.1, context.currentTime);
  }
  else if (element.id === 'green') {
    element.style.backgroundColor = 'rgb(4, 200, 4)';
    osc.frequency.setValueAtTime(btnFreqs[3], context.currentTime);
    gainNode.gain.setValueAtTime(0.1, context.currentTime);
  }
}

function releaseEvent(element) {
  gainNode.gain.linearRampToValueAtTime(0.0, context.currentTime + 0.01);
  if (element.id === 'red') {
    element.style.backgroundColor = 'rgb(148, 14, 14)';
  }
  else if (element.id === 'blue') {
    element.style.backgroundColor = 'rgb(1, 54, 150)';
  }
  else if (element.id === 'yellow') {
    element.style.backgroundColor = 'rgb(151, 136, 2)';
  }
  else if (element.id === 'green') {
    element.style.backgroundColor = 'rgb(4, 124, 4)';
  }
}


function startGame() {
  aiPlays();
}

function aiPlays() {
  let randomCell = generateRandomCell();
  let genAiPetColor = generateAiPetColor(randomCell);
  aiPatColor.push(genAiPetColor);
  aiPattern.push(randomCell);
  aiPlaySteps(aiPattern);
}

function aiPlaySteps(steps) {
  console.log('error: '+ steps);
  var i = 0;
  timer1 = setInterval(topTimer, 1250);
    function topTimer() {
      if (i < steps.length) {
        if (steps[i] === 0) {
          simCel[steps[i]].style.backgroundColor = 'rgb(220, 14, 14)';
          osc.frequency.setValueAtTime(btnFreqs[0], context.currentTime);
          gainNode.gain.setValueAtTime(0.1, context.currentTime);
          stepRevert(steps[i]);
        }
        else if (steps[i] === 1) {
          simCel[steps[i]].style.backgroundColor = 'rgb(1, 74, 255)';
          osc.frequency.setValueAtTime(btnFreqs[1], context.currentTime);
          gainNode.gain.setValueAtTime(0.1, context.currentTime);
          stepRevert(steps[i]);
        }
        else if (steps[i] === 2) {
          simCel[steps[i]].style.backgroundColor = 'rgb(4, 200, 4)';
          osc.frequency.setValueAtTime(btnFreqs[3], context.currentTime);
          gainNode.gain.setValueAtTime(0.1, context.currentTime);
          stepRevert(steps[i]);
        }
        else if (steps[i] === 3) {
          simCel[steps[i]].style.backgroundColor = 'rgb(255, 225, 4)';
          osc.frequency.setValueAtTime(btnFreqs[2], context.currentTime);
          gainNode.gain.setValueAtTime(0.1, context.currentTime);
          stepRevert(steps[i]);
        }
        i++;
      }
      else if (i === steps.length) {
        clearInterval(timer1);
        onOff = true;
      }
    }
}

function stepRevert(step) {
  timer2 = setInterval(function(){
    gainNode.gain.linearRampToValueAtTime(0.0, context.currentTime + 0.01);
    if (step === 0) {
      simCel[step].style.backgroundColor = 'rgb(148, 14, 14)';
      clearInterval(timer2)
    }
    else if (step === 1) {
      simCel[step].style.backgroundColor = 'rgb(1, 54, 150)';
      clearInterval(timer2)
    }
    else if (step === 2) {
      simCel[step].style.backgroundColor = 'rgb(4, 124, 4)';
      clearInterval(timer2)
    }
    else if (step === 3) {
      simCel[step].style.backgroundColor = 'rgb(151, 136, 2)';
      clearInterval(timer2)
    }
  },500)
}

function generateAiPetColor(randin) {
  let randomCellColor;

  if (randin === 0) {
    randomCellColor = 'red';
  }
  else if (randin === 1) {
    randomCellColor = 'blue';
  }
  else if (randin === 2) {
    randomCellColor = 'green';
  }
  else if (randin === 3) {
    randomCellColor = 'yellow';
  }
  return randomCellColor;
}

function generateRandomCell() {
  let randNum = Math.random();
  let randImproved = (randNum * 4) + 1;
  let randomCell = Math.floor(randImproved - 1);
  return randomCell;
}

function stopGame() {
  onOff = false;
  clearInterval(timer1);
  aiPattern = [];
  aiPatColor = [];
  huPattern = [];
}
