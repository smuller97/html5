/*Henter canvas i HTML dokumentet*/
const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20); //Skallere context op, så det kan ses

function arenaSweep() {
    let rowCount = 1;
    outer: for (let y = arena.length -1; y > 0; --y) {
        for (let x = 0; x < arena[y].length; ++x) {
            if (arena[y][x] === 0) {
                continue outer;
            }
        }

        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;

        player.score += rowCount * 10;
        rowCount *= 2;
    }
}

function collide(arena, player) { //
    const m = player.matrix;
    const o = player.pos;
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
               (arena[y + o.y] &&
                arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function createMatrix(w, h) { //Gemmer alle nuvæernde brikker
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

function createPiece(type) //Udseeende for brikker i Tetris
{
    if (type === 'I') {
        return [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ];
    } else if (type === 'L') {
        return [
            [0, 2, 0],
            [0, 2, 0],
            [0, 2, 2],
        ];
    } else if (type === 'J') {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [3, 3, 0],
        ];
    } else if (type === 'O') {
        return [
            [4, 4],
            [4, 4],
        ];
    } else if (type === 'Z') {
        return [
            [5, 5, 0],
            [0, 5, 5],
            [0, 0, 0],
        ];
    } else if (type === 'S') {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    } else if (type === 'T') {
        return [
            [0, 7, 0],
            [7, 7, 7],
            [0, 0, 0],
        ];
    }
}

// #region Tegning af matrix 
function drawMatrix(matrix, offset) { //Tegning af brik funktion
    matrix.forEach((row, y) => { //Går gennem hele matrix rækker og tegner brikkerne
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = colors[value];
                context.fillRect(x + offset.x,
                                 y + offset.y,
                                 1, 1); //Offset gør det muligt at rykke på brikken
            }
        });
    });
}

function draw() {
    context.fillStyle = '#000'; //Hexadecimal til sort
    context.fillRect(0, 0, canvas.width, canvas.height); //Baggrund på canvas

    drawMatrix(arena, {x: 0, y: 0});
    drawMatrix(player.matrix, player.pos);
}
// #endregion 

// #region
function merge(arena, player) { //kopoere information fra player til arena
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                matrix[y][x],
                matrix[x][y],
            ];
        }
    }

    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}
// #endregion

// #region funktion til hændelse
function playerDrop() { // brikken rykkes ned af 
    player.pos.y++;
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        playerReset();
        arenaSweep();
        updateScore();
    }
    dropCounter = 0;
}

function playerMove(offset) { //brugeren lan rykke til siden med brikkerne
    player.pos.x += offset;
    if (collide(arena, player)) {
        player.pos.x -= offset;
    }
}

function playerReset() {
    const pieces = 'TJLOSZI';
    player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) -
                   (player.matrix[0].length / 2 | 0);
    if (collide(arena, player)) {
        arena.forEach(row => row.fill(0));
        player.score = 0;
        updateScore();
    }
}

function playerRotate(dir) { //rotere brikken
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while (collide(arena, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return;
        }
    }
}
// #endregion

// #region opdatering af brikposition og score
let dropCounter = 0;
let dropInterval = 1000; //milisekunder = 1 sek.
let lastTime = 0; 

function update(time = 0) { //opdaterer positionen på brikkerne
    const deltaTime = time - lastTime;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop(); //Drop af brik hvert sekundt
    }

    lastTime = time; 

    draw();
    requestAnimationFrame(update);
}

function updateScore() { //opdaterer score 
    document.getElementById('score').innerText = player.score;
}
// #endregion

// #region lytter til knaptryk og udføre ønsket bevægelse af brik
//Javascript knap kode https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
document.addEventListener('keydown', event => {
    if (event.keyCode === 37) { //venstre pil/left arrow
        playerMove(-1);
    } else if (event.keyCode === 39) { //højre pil/right arrow
        playerMove(1);
    } else if (event.keyCode === 40) { //pil ned
        playerDrop();
    } else if (event.keyCode === 38) { //pil op
        playerRotate(-1);
    } else if (event.keyCode === 87) { //w
        playerRotate(1);
    }
});
// #endregion

// #region farvar på brikker 
const colors = [ 
    null,
    '#FF0D72', //mørk pink
    '#0DC2FF', //lys blå
    '#0DFF72', //lys grøn
    '#F538FF',//lys lilla
    '#FF8E0D', //orange
    '#FFE138', //gul
    '#3877FF', //mørkere blå
];
// #endregion

const arena = createMatrix(12, 20); //Opretter 12 numre bed og 20 brikker

const player = { //Skillerinformation
    pos: {x: 0, y: 0},
    matrix: null,
    score: 0,
};


//Kalder funktionerne, så spillet kører
playerReset();
updateScore();
update();
