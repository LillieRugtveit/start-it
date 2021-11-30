// Model

let appElement = document.getElementById('app');
let body = document.querySelector('body');
let boxElement;


// View
View();

function View() {
  appElement.innerHTML = `
    <div class="stack">
      <div id="box" class="box"></div>
      <div class="select">
        <select class="select__body" onchange="handleChangeSelect(this)">
          <option value="black">Svart</option>
          <option value="darkblue">Mørkeblå</option>
          <option value="lightgrey">Lysgrå</option>
          <option value="lightgreen">Lysgrønn</option>
          <option value="lightcoral">Lysrød</option>
        </select>
      </div>
    </div>
  `
  boxElement = document.getElementById('box');
}

function setBoxColor(color) {
  boxElement.style.backgroundColor = color;
}

function setBackgroundColor(color) {
  body.style.backgroundColor = color;
}


// Controller

function handleChangeSelect(element) {
  setBoxColor(element.value);

  if(element.value == 'black' || element.value == "darkblue") {
    setBackgroundColor('#dddaed');
  } else {
    setBackgroundColor('#1f1e24');
  }
}
