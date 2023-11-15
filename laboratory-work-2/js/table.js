function createBox() {
  const box = document.createElement('div');
  box.style.width = '50px';
  box.style.height = '50px';
  box.style.border = '1px solid black';
  box.style.lineHeight = '50px';
  box.style.textAlign = 'center';
  return box;
}

function createRow() {
  const row = document.createElement('div');
  row.style.display = 'flex';
  row.style['flex-direction'] = 'row';
  return row;
}

function createTableInDiv(tableSection) {
  for (let i = 0; i < 6; i++) {
    const row = createRow();

    for (let j = 1; j <= 6; j++) {
      const cellNumber = i * 6 + j;
      const text = document.createTextNode(`${cellNumber}`);
      const box = createBox();
      
      box.id = `cell${cellNumber}`;
      box.appendChild(text);
      row.appendChild(box);
    }

    tableSection.appendChild(row);
  }
}

function createTableSection() {
  const body = document.querySelector('body');
  const tableSection = document.createElement('div');
  
  tableSection.style.display = 'flex';
  tableSection.style['flex-direction'] = 'column';
  tableSection.style['align-items'] = 'center';
  
  const colorInput = document.createElement('input');
  colorInput.type = 'color';
  colorInput.id = 'color-input';
  tableSection.appendChild(colorInput);
  body.appendChild(tableSection);
  
  return tableSection;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColor() {
  return `rgb(${getRandomNumber(0, 256)}, ${getRandomNumber(0, 256)}, ${getRandomNumber(0, 256)})`;
}

function changeCeilColorEvent(cellId) {
  const cell = document.getElementById(cellId);
  
  cell.onmouseover = () => {
    cell.style.backgroundColor = getRandomColor();
  };

  cell.onclick = () => {
    cell.style.backgroundColor =
      document.getElementById('color-input').value;
  };
  
  cell.ondblclick = () => {
    for (let i = 6; i < 36; i += 5) {
      const cell = document.getElementById(`cell${i}`);
      cell.style.backgroundColor =
        document.getElementById('color-input').value;
    }
  };
}

window.onload = () => {
  const VARIANT = 8;
  const tableSection = createTableSection();
  createTableInDiv(tableSection);
  changeCeilColorEvent(`cell${VARIANT}`);
};