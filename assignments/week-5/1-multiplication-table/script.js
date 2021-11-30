// Model
const appElement = document.getElementById('app');
let defaultColumnCount = 10;
let columnCount;
let matrixArray = [];
let index = 0;
// View
// First render of page
InitialRender()
function InitialRender() {
    matrixArray = [];
    createMultiplicationMatrix(columnCount);
    let html = '';
    document.getElementById('range').innerText = columnCount;
    for (let i = 0; i < matrixArray.length; i++) {
        html += `${matrixArray[i]}`;
    }
    appElement.innerHTML = html;
    appElement.style.gridTemplateColumns = `repeat(${columnCount}, 40px)`;
}
// Controller
function handleInputChange(inputElement) {
    columnCount = inputElement.value;
    InitialRender();
}

function createMultiplicationMatrix(multiplicationNumber) {
    for (let i = 1; i <= multiplicationNumber; i++) {

        for (let j = 1; j <= multiplicationNumber; j++) {
            let color1 = i % 2 * 255;
            let color2 = 255 - i % 2 * 255;
            matrixArray.push(`<div style="background-color: rgb(${color1}, ${color1}, ${color1}); color: rgb(${color2}, ${color2}, ${color2})" class="grid-item">${j * i}</div>`);
        }
    }
}
