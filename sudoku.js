/**
 * Принимает игровое поле в формате строки — как в файле sudoku-puzzles.txt.
 * Возвращает игровое поле после попытки его решить.
 * Договорись со своей командой, в каком формате возвращать этот результат.
 */
function solve(boardString) {
  let puzzle = [];
  let arr = boardString.split("");
  for (let i = 0; i < arr.length; i += 9) {
    puzzle.push(arr.slice(i, i + 9));
  }

  const coord = (puzzle) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (puzzle[i][j] === "-") {
          return [i, j];
        }
      }
    }
    return null;
  };

  const check = (number, position, puzzle) => {
    const [i, j] = position;

    //stolbec
    for (let x = 0; x < 9; x++) {
      if (puzzle[x][j] === number && x !== i) {
        return false;
      }
    }

    //stroka
    for (let x = 0; x < 9; x++) {
      if (puzzle[i][x] === number && x !== j) {
        return false;
      }
    }

    //kvadrat
    const boxX = Math.floor(i / 3) * 3;
    const boxY = Math.floor(j / 3) * 3;

    for (let x = boxX; x < boxX + 3; x++) {
      for (let y = boxY; y < boxY + 3; y++) {
        if (puzzle[x][y] === number && x !== i && y !== j) {
          return false;
        }
      }
    }

    return true;
  };

  const decision = () => {
    const position = coord(puzzle);
    if (position === null) {
      return true;
    }
    for (let i = 1; i <= 9; i++) {
      const number = i.toString();
      const validator = check(number, position, puzzle);

      if (validator) {
        const [x, y] = position;
        puzzle[x][y] = number;

        if (decision()) {
          return true;
        }

        puzzle[x][y] = "-";
      }
    }
    return false;
  };

  decision();
  return puzzle;
}

/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает булевое значение — решено это игровое поле или нет.
 */

function isSolved(board) {
  let result = 0;
  for (let i = 0; i < 9; i += 1) {
    for (let j = 0; j < 9; j += 1) {
      res += Number(board[i][j]);
    }
  }

  return result === 405;
}

/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает строку с игровым полем для последующего вывода в консоль.
 * Подумай, как симпатичнее сформировать эту строку.
 */
function prettyBoard(board) {
  console.table(board);
}

// Экспортировать функции для использования в другом файле (например, readAndSolve.js).
module.exports = {
  solve,
  isSolved,
  prettyBoard,
};
