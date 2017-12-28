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
    osc.frequency.setValueAtTime(btnFreqs[0], context.currentTime);
    gainNode.gain.value = 0.1;
    console.log('start: '+osc);
  } 
  else if (element.id === 'blue') {
    osc.frequency.setValueAtTime(btnFreqs[1], context.currentTime);
    gainNode.gain.value = 0.1;
  }
  else if (element.id === 'yellow') {
    osc.frequency.setValueAtTime(btnFreqs[2], context.currentTime);
    gainNode.gain.value = 0.1;
  }
  else if (element.id === 'green') {
    osc.frequency.setValueAtTime(btnFreqs[3], context.currentTime);
    gainNode.gain.value = 0.1;
  }
}

function releaseEvent() {
  gainNode.gain.value = 0.0;
  //console.log('stop: '+osc);
}
