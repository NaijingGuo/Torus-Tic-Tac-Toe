let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];
let player = ['O', 'X'];
let first_player;
let current_player;
let empty = 9;

function setup() {
  first_player=player[floor(random(2))];
  current_player = first_player;
  canvas = createCanvas(400, 400);
  canvas.position(20, 130);
  let T = createP('Torus Tic-Tac-Toe!');
  T.style('font-size', '32pt');
  let X = createP('Computer: X');
  let O = createP('You: O');
  T.position(20, -10);
  X.position(20, 70);
  O.position(20, 90);

}

// call this after each move
function takeTurn() {
  if (current_player == player[0]) {
    current_player = player[1];
  } else {
    current_player = player[0];
  }
}

// human player move
function mousePressed() {
  let w = width / 3;
  let h = height / 3;
  if (current_player == player[0]) {
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    if (board[j][i] == '') {
      board[j][i] = player[0];
      let did_I_win=pattern_check('me');
      if(did_I_win==2){
        win(2)
      } else{
        takeTurn()
        empty--
        computer()
      }
    }
  }
}

function computer() {
  let place = pattern_check('X');
  if (place == 1) {
    win(1)
    return
  } else {
    place = pattern_check('O');
    if(place==1){
      takeTurn()
    }
  }
  while (place == 0) {
    i = floor(random(3));
    j = floor(random(3));
    if (board[i][j] == '') {
      board[i][j] = player[1];
      place = 1;
      takeTurn()
    }
  }
  empty--
}

function pattern_check(xo) {
  // TODO: change the text color 
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let check;
      if(xo=='X'){
        check='X';
      } else{
        check='O';
      }
      if (board[j][i] == check) {
        // check horizontal
        let m = (i + 1) % 3;
        let n = (i - 1) % 3;
        if (m < 0) {
          m = m + 3;
        }
        if (n < 0) {
          n = n + 3;
        }
        if (xo=='O' || xo=='X'){
          if (board[j][m] == check || board[j][n] == check) {
            for (let k = 0; k < 3; k++) {
              if (board[j][k] == '') {
                board[j][k] = player[1];
                return 1
              }
            }
          }
        } else {
          if(board[j][m] == 'O' && board[j][n] == 'O'){
            return 2
          }
        }
        // check vertical
        let o = (j + 1) % 3;
        let p = (j - 1) % 3;
        if (o < 0) {
          o = o + 3;
        }
        if (p < 0) {
          p = p + 3;
        }
        if (xo=='O' || xo=='X'){
          if (board[o][i] == check || board[p][i] == check) {
            for (let k = 0; k < 3; k++) {
              if (board[k][i] == '') {
                board[k][i] = player[1];
                return 1
              }
            }
          }
        } else{
          if(board[o][i] == 'O' && board[p][i] == 'O'){
            return 2
          }
        }
        // check diagonal
        if (xo=='O' || xo=='X'){
          if (board[o][m] == xo && board[p][n] == '') {
            board[p][n] = player[1];
            return 1
          } else if (board[p][n] == xo && board[o][m] == '') {
            board[o][m] = player[1];
            return 1
          } else if (board[p][m] == xo && board[o][n] == '') {
            board[o][n] = player[1];
            return 1
          } else if (board[o][n] == xo && board[p][m] == '') {
            board[p][m] = player[1];
            return 1
          }
        } else{
          if (board[o][m] == 'O' && board[p][n] == 'O') {
            return 2
          } else if (board[p][n] == 'O' && board[o][m] == 'O') {
            return 2
          } else if (board[p][m] == 'O' && board[o][n] == 'O') {
            return 2
          } else if (board[o][n] == 'O' && board[p][m] == 'O') {
            return 2
          }
        }
      }
    }
  }
  return 0
}

function win(who){
  let resultP
  if(who==1){
    resultP = createP('Haha I won!!');
  } else{
    resultP = createP('OH NO! you won... sad :(');
  }
  resultP.style('font-size', '40pt');
  resultP.position(18, 490)
  fill(0, 102, 153, 71);
}

function draw() {
  background(220);
  let w = width / 3;
  let h = height / 3;
  strokeWeight(5);
  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);
  textSize(45);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let move = board[j][i];
      let x = w * i + w / 2 - 15;
      let y = h * j + h / 2 + 20;
      text(move, x, y); // display move at (x,y)
    }
  }
  // first move for computer
  if (first_player == player[1] && empty==9) {
    i = floor(random(3));
    j = floor(random(3));
    board[i][j] = player[1];
    takeTurn()
    empty--
  }
}