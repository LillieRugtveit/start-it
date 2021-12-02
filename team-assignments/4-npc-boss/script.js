// Model

let app = document.getElementById('app');

let npcObj = {
  hp: 700,
  hr: 0.66,
  imageURL: 'https://cdn.discordapp.com/avatars/268754579988938752/c26b86a3c1f3bf4cd6f48d7948450aa4.webp?size=128',
  name: 'Terje'
}
let playerObj = {
  hp: 500,
  hr: 1,
  crit: [5, 15],
  imageURL: 'https://cdn.discordapp.com/avatars/248765040008757249/8fe1da3a6f74b3824345f46494a191e7.webp?size=128',
  name: 'Eskil',
}

let attacksObj = {
  hitAtk: {
    dmg: 50,
    hr: 0.80,
    dr: 0,
    def: 0,
    name: 'Hit',
  },
  heavyAtk: {
    dmg: 100,
    hr: 0.50,
    dr: 0,
    def: 0,
    name: 'Heavy',
  },
  guardDef: {
    dmg: 0,
    hr: 0,
    dr: 1,
    def: 0.50,
    name: 'Guard',
  },
}
// View
View();

function View() {
  app.innerHTML = `
    <div class="players">
      ${CreatePlayer(playerObj)}
      ${CreatePlayer(npcObj)}
    </div>
    ${CreateSkillButtons(attacksObj)}

  `;
}

// Controller
function CreatePlayer(playerObjInput) {
  return `
    <div id="${playerObjInput.name}" class="player">
      <h3 class="player-name">${playerObjInput.name}</h3>
      <img src=${playerObjInput.imageURL} class="player-image"></img>
      <data value="${playerObjInput.hp}">${playerObjInput.hp}</data>
    </div>
  `
}


function CreateSkillButtons(attackObjInput) {
  let attackObjEntries = Object.entries(attackObjInput);
  let buttonsHTML = '';
  for (let i = 0; i < attackObjEntries.length; i++) {
    const element = attackObjEntries[i][1];
    buttonsHTML += `
        <button onclick="ExecuteSkill(${element.dmg}, ${element.hr}, ${element.dr}, ${element.def})">${attackObjEntries[i][1].name}</button>
      `;
  }
  return buttonsHTML;
}

function getRandomNumber() {
  return 0.70;
}

function ExecuteSkill(attackDMG, attackHR, attackDR, attackDEF) {
  let didAttackHit = attackHR > getRandomNumber();
  console.log(attackHR);
  console.log(didAttackHit);
}