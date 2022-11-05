/**
 * Принимает игровое поле в формате строки — как в файле sudoku-puzzles.txt.
 * Возвращает игровое поле после попытки его решить.
 * Договорись со своей командой, в каком формате возвращать этот результат.
 */
function solve(boardString) {
    let puzzle = [];  // массив, в который мы передадим таблицу судоку
    let str = boardString.split(""); // строка, разделенная на символы
    for (let i = 0; i < str.length; i += 9) { // формируем таблицу
        puzzle.push(str.slice(i, i + 9));
    }

    // функция поиска первой пустой ячейки
    const findEmpty = (puzzle) => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (puzzle[i][j] === "-") {
                    return [i, j];
                }
            }
        }
        return null; // возвращаем null если все ячейки заполнены
    };

    // функция проверки повторных номеров
    const check = (number, position, puzzle) => {
        const [i, j] = position;

        // в столбце
        for (let x = 0; x < 9; x++) {
            if (puzzle[x][j] === number) { // && x !== i
                return false; // если есть такая же цифра в столбце
            }
        }

        // в строке
        for (let x = 0; x < 9; x++) {
            if (puzzle[i][x] === number) { // && x !== j
                return false; // если есть такая же цифра в строке
            }
        }

        // в квадрате 3x3
        const boxX = Math.floor(i / 3) * 3;
        const boxY = Math.floor(j / 3) * 3;

        for (let x = boxX; x < boxX + 3; x++) {
            for (let y = boxY; y < boxY + 3; y++) {
                if (puzzle[x][y] === number) { // && x !== i && y !== j
                    return false; // если есть такая же цифра в квадрате
                }
            }
        }

        return true; // если повторов нет
    };

    // функция, которая вставляет цифры
    const decision = () => {
        const position = findEmpty(puzzle);
        if (position === null) {
            return true; // если все поле заполнено
        }
        for (let i = 1; i <= 9; i++) {
            const number = i.toString();
            const validator = check(number, position, puzzle);

            if (validator) {
                const [x, y] = position;
                puzzle[x][y] = number;

                if (decision()) { // если с данной цифрой можно решить все остальное поле
                    return true;
                }

                puzzle[x][y] = "-"; // в случае ошибки присваиваем ячейке "-" и смотри следующее число
            }
        }
        return false; // если решено неправильно
    };

    decision(); // решение
    return puzzle;
}

/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает булевое значение — решено это игровое поле или нет.
 */

function isSolved(board) {
    let result = 0;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            result += Number(board[i][j]);
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
    let xx = [];
    for (let j = 0; j < board.length; j++) {
        if (j % 3 === 0) {
            xx.push('\n');
        }
        for (let i = 0; i < board[j].length; i++) {
            if (i % 3 === 2) {
                if (i % 9 === 8) {
                    let res = board[j][i] + '\n';
                    xx.push(res);
                } else {
                    let res = board[j][i] + '    ';
                    xx.push(res);
                }
            } else {
                let res = board[j][i] + '  ';
                xx.push(res);
            }
        }
    }
console.log(xx.join(''))
}

// Экспортировать функции для использования в другом файле (например, readAndSolve.js).
module.exports = {
    solve,
    isSolved,
    prettyBoard,
};
