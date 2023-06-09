//1. COMPLETE VARIABLE AND FUNCTION DEFINITIONS

const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

//2. RAW TEXT STRINGS

let raw_text="It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day."
let insertx=["Willy the Goblin","Big Daddy","Father Christmas"];
let inserty=["the soup kitchen","Disneyland","the White House"];
let insertz=["spontaneously combusted","melted into a puddle on the sidewalk","turned into a slug and crawled away"];

//3. EVENT LISTENER AND PARTIAL FUNCTION DEFINITION

randomize.addEventListener('click', result);

function result() {

  if(customName.value !== '') {
    const name = customName.value;

  }

  if(document.getElementById("uk").checked) {
    const weight = Math.round(300);
    const temperature =  Math.round(94);

  }
  var sub=raw_text.split(":");
  story.textContent ='';
  for(var i=0;i<sub.length;i++){
	  if(sub[i]==="insertx"){
		  story.textContent+=randomValueFromArray(insertx);
	  }
	  else if(sub[i]==="inserty"){
		  story.textContent+=randomValueFromArray(inserty);
	  }
	  else if(sub[i]==="insertz"){
		  story.textContent+=randomValueFromArray(insertz);
	  }
	  else story.textContent+=sub[i];
  }
    story.style.visibility = 'visible';
}