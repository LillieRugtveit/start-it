// model
var points = 0;
var level = 0;
var pointsPerClick = 1;
var smileyIndex = 0;
var animalIndex = 0;

// controller
function doClick() {
    points += pointsPerClick;
    smileyIndex = getNextSmileyIndex(smileyIndex);
    setLevel(points);
    updateView();
}

function buyUpgrade(upgradeCost) {
    if (points < upgradeCost) return;
    points -= upgradeCost;
    pointsPerClick++;
    updateView();
}

function gambleAll() {
    let luck = Math.floor(Math.random() * 100);
    if(luck > 50) points = 0;
    else points *= 2;
    updateView(); 
}

function tryLuck() {
    let luck = Math.floor(Math.random() * 100);
    console.log(luck);
    if (luck > 50) points += 20;
    else points -= 30;
    updateView();
}

function levelUp() {
    if(level == 4) {
        level = 0;
        points = 0;
        pointsPerClick = 1;
    }
    updateView();
}

// view
updateView();
function updateView() {
    var smiley = getSmiley(smileyIndex);
    var animal = getAnimal(animalIndex);
    var levelEmoji = getLevel(level);
    document.getElementById('app').innerHTML = `
        <main class="container">
            <div class="buttons">
                <button onclick="buyUpgrade(10)">Kjøp oppgradering (10 poeng)</button>
                <button onclick="tryLuck()"> Prøv lykke (30-/20+ poeng) </button>
                <button onclick="gambleAll()"> Gamble alt (alle poeng) </button>
            </div>
            
            <div class="emotes">
                <p class="emoji" onclick="doClick()">${smiley}</>
                <p class="emoji" onclick="levelUp()">${animal}</p>
                <p class="emoji" >${levelEmoji}</p>
            </div>
            <p>points: ${points}</p>
       </main>
    `;
}

// hjelpefunksjoner
function getSmiley(aSmileyIndex) {
    if (aSmileyIndex == 0) return '😀';
    if (aSmileyIndex == 1) return '😁';
    return '';
}

function getAnimal(paramIndex) {
    if (paramIndex == 0) return '🦊';
    if (paramIndex == 1) return '🐎';
    if (paramIndex == 2) return '🐍';
    if (paramIndex == 3) return '🦎';
    if (paramIndex == 4) return '🐉';
    return '';
}

function getLevel(level) {
    if (level == 0) return '0️⃣';
    if (level == 1) return '1️⃣';
    if (level == 2) return '2️⃣';
    if (level == 3) return '3️⃣';
    if (level == 4) return '4️⃣';
    return '';
}
    
function setLevel(points) {
    if(points > 100 && points < 200) level = 1;
    if(points > 200 && points < 300) level = 2;
    if(points > 300 && points < 400) level = 3;
    if(points > 400 && level != 4){
        level = 4;
        if(animalIndex < 4) {
            animalIndex++; 
        }

    } 
}

function getNextSmileyIndex(aSmileyIndex) {
    const maxSmileyIndex = 1;
    aSmileyIndex++;
    if (aSmileyIndex > maxSmileyIndex) {
        aSmileyIndex = 0;
    }
    return aSmileyIndex;
}
