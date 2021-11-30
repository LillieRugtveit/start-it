// Model
let appElement = document.getElementById('app');
let squareValues = Array(9).fill('')
let winnerValue = '';
let lastPlayerValue = '';


// View

// Utility functions 

function createBoardSquares() {
  let tempHTML = ''
  for (let i = 0; i < squareValues.length; i++) {
    tempHTML += createSquare(squareValues[i], i);
  }
  return tempHTML;
}

function createSquare(squareValue, squarePos) {
  return `<button onclick="handleOnClick(${squarePos})" class="square color-${squareValue}"">${squareValue}</button>`
}

show();

function show() {
  appElement.innerHTML = `
  <main>
    <h1>Tic Tac Toe</h1>
    <h2>${winnerValue === 'x' ? 'You won' :
      (winnerValue === 'o' ? 'You lost' :
        (winnerValue === 'tie' ? "It's a tie!" : ''))}</h2>
    <div class="board">
        ${createBoardSquares()}
    </div>
  </main>
  `;
}

// Controller

function handleOnClick(clickedSquare) {
  let squareValue = squareValues[clickedSquare];
  if (squareValue != '' || winnerValue != '') return;
  setSquareX(clickedSquare);
  showWinning();
  setSquareO();
  showWinning();
  show();
}

function setSquareX(position) {
  lastPlayerValue = 'x'
  squareValues[position] = lastPlayerValue;
}

function setSquareO() {
  if (winnerValue != '') return;
  let blankRandomIndex = getBlankRandomIndex();
  if (blankRandomIndex === null) {
    winnerValue = 'tie'
    return;
  }
  lastPlayerValue = 'o'
  squareValues[blankRandomIndex] = lastPlayerValue;
}

function getBlankRandomIndex() {
  let blankSquareValues = Array.from(squareValues.keys()).filter(i => squareValues[i] === '');
  if (blankSquareValues.length === 0) return null;
  return blankSquareValues[Math.floor(Math.random() * blankSquareValues.length)];
}

function showWinning() {
  if (winnerValue != '') return;
  if (hasLastPlayerWon()) {
    winnerValue = lastPlayerValue;
  }
}

function hasLastPlayerWon() {
  if (hasSquareValue(4)) {
    if (hasSquareValues(0, 8)) return true;
    if (hasSquareValues(1, 7)) return true;
    if (hasSquareValues(3, 5)) return true;
    if (hasSquareValues(6, 2)) return true;
  }
  if (hasSquareValue(0)) {
    if (hasSquareValues(0, 2))
      return true;
  }
  if (hasSquareValue(3)) {
    if (hasSquareValues(0, 6))
      return true;
  }
  if (hasSquareValue(5)) {
    if (hasSquareValues(2, 8))
      return true;
  }
  if (hasSquareValue(7)) {
    if (hasSquareValues(6, 8))
      return true;
  }
  return false;
}

function hasSquareValue(squareIndex) {
  return squareValues[squareIndex] === lastPlayerValue;
}

function hasSquareValues(squareIndex1, squareIndex2) {
  return hasSquareValue(squareIndex1) && hasSquareValue(squareIndex2);
}

