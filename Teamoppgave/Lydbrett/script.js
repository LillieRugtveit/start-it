// Model
let app = document.getElementById('app');

const gameSFXPaths = [
  'Mario_1_Up.wav',
  'Mario_Jump_Super.wav', 
  'Minecraft_Cow.ogg', 
  'Minecraft_Nether_Travel.ogg',
];

const videoGames = ['Mario', 'Minecraft', 'Gta', 'Zelda', 'lol']

let volume = [0.5, 0.75, 0.3, 0.1];

// View

show()
function show() {
  app.innerHTML = ` 
    <div class="buttons">
      ${createAudioButtonsFromArray(gameSFXPaths, volume)}
    </div>
  `;
}




// Controller

// createAnswerList()
// input rightAudioPath: 'Mario_1_Up.wav' videoGameArray: ['Mario', 'Minecraft', 'Gta', 'Zelda', 'lol']
// output ['Mario', 'Gta', 'lol']
// ['Mario', 'Minecraft', 'Gta', 'Zelda', 'lol']
// Array[index] 

createAnswerList('Mario_1_Up.wav', videoGames)
function createAnswerList(rightAudioPath = "", videoGameArray = []) {
  let rightAnswer = getVideoGameNameFromPath(rightAudioPath);
  let randomNumber = Math.floor(Math.random() * videoGameArray.length)
  let wrongAnswer1 = videoGameArray[randomNumber];
  console.log(wrongAnswer1)
  //let wrongAnswer2 = randomNumber 
}

// input Mario_1_Up.wav
// output Mario
function getVideoGameNameFromPath(path) {
  let pathSplitArray = path.split('_');
  return pathSplitArray[0];
}

function createAudioButtonsFromArray(audioPaths, volumeArray) {
  let audioButtons = '';
  for (let i = 0; i < audioPaths.length; i++) {
    audioButtons += createAudioButton(audioPaths[i], `button${i}`, volumeArray[i]);
  }
  return audioButtons;
}

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
function createAudioButton(audioPath, audioElement, defaultVolume) {
  return `
    <audio id="${audioElement}" src="lyder/${audioPath}"></audio>
    <button onclick="handleAudioButtonClick(${audioElement}, ${defaultVolume})">&#9658;</button>
  `;
}

function handleAudioButtonClick(audioElement, volume) {
  setAudioVolume(audioElement, volume);
  audioElement.play();
};

function setAudioVolume(audioElement, volumeLevel) {
  audioElement.volume = volumeLevel;
}
