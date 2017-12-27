let simBtn = document.getElementById('simbody');
let huPattern = [];
let aiPattern = [];
const audioRed = document.getElementById('auRed');
const audioBlue = document.getElementById('auBlue');
const audioYellow = document.getElementById('auYellow');
const audioGreen = document.getElementById('auGreen');


simBtn.addEventListener('click', function(event){prsEvent(event.target);});

function prsEvent(element) {
  if (element.id === 'red') {
    audioRed.play();
    //console.log(audioRed.duration);
  } 
  else if (element.id === 'blue') {
    audioBlue.play();
  }
  else if (element.id === 'yellow') {
    audioYellow.play();
  }
  else if (element.id === 'green') {
    audioGreen.play();
  }
  
}