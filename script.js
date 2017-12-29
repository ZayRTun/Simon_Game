let simBtn = document.getElementById('simbody');
let huPattern = [];
let aiPattern = [];

const btnFreqs =[440, 600, 700, 880]

var context = new AudioContext;
var osc = context.createOscillator();
osc.type = 'square';
var gainNode = context.createGain();
osc.connect(gainNode);
gainNode.gain.value = 0.0;
gainNode.connect(context.destination);
osc.start(0);
// osc.stop()


console.log(context)


simBtn.addEventListener('mousedown', function(event){
  prsEvent(event.target);
});

simBtn.addEventListener('mouseup', function(event){
  releaseEvent(event.target);
});



function prsEvent(element) {
  if (element.id === 'red') {
    element.style.backgroundColor = "rgb(220, 14, 14)";
    osc.frequency.setValueAtTime(btnFreqs[0], context.currentTime);
    gainNode.gain.value = 0.1;
    console.log(element.id);
  } 
  else if (element.id === 'blue') {
    element.style.backgroundColor = "rgb(1, 54, 235)";
    osc.frequency.setValueAtTime(btnFreqs[1], context.currentTime);
    gainNode.gain.value = 0.1;
  }
  else if (element.id === 'yellow') {
    element.style.backgroundColor = "rgb(255, 225, 4)";
    osc.frequency.setValueAtTime(btnFreqs[2], context.currentTime);
    gainNode.gain.value = 0.1;
  }
  else if (element.id === 'green') {
    element.style.backgroundColor = 'rgb(4, 200, 4)';
    osc.frequency.setValueAtTime(btnFreqs[3], context.currentTime);
    gainNode.gain.value = 0.1;
  }
}

function releaseEvent(element) {
  gainNode.gain.value = 0.0;
  if (element.id === 'red') {
    element.style.backgroundColor = 'rgb(148, 14, 14)';
  }
  else if (element.id === 'blue') {
    element.style.backgroundColor = 'rgb(1, 54, 150)';
  }
  else if (element.id === 'yellow') {
    element.style.backgroundColor = 'rgb(199, 179, 4)';
  }
  else if (element.id === 'green') {
    element.style.backgroundColor = 'rgb(4, 124, 4)';
  }
  

  console.log(element.id);
}
