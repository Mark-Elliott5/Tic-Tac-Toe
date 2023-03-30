"use strict"

const gameboard = (() => {
    let array = ['','','','','','','','',''];

    const updateArray = (target, playerString) => {
        array[target] = playerString;
        displayController.update(array);
    };

    const checkAvailable = (target) => {
        if (array[target] === '') {
            return true;
        } else {
            return false;
        }
    };

    const checkVictory = () => {
        const victoryPaths = returnPaths();
        let win = false;
        let player = '';
        for (let i = 0; i < victoryPaths.length; i++) {
            console.log(`Path ${i+1}:${victoryPaths[i]}`);
            if ((victoryPaths[i] === 'XXX') || (victoryPaths[i] === 'OOO')) {
                console.log(victoryPaths[i]);
                win = true;
                player = victoryPaths[i][0];
                break;
            }
        } console.log(`______________`);
        return { win, player };
    };

    const returnPaths = () => {
        const oneTwoThreeString = array.slice(0,3).join('');
        const fourFiveSixString = array.slice(3,6).join('');
        const sevenEightNineString = array.slice(6,9).join('');
        const oneFourSevenString = array[0] + array[3] + array[6];
        const twoFiveEightString = array[1] + array[4] + array[7];
        const threeSixNineString = array[2] + array[5] + array[8];
        const oneFiveNineString = array[0] + array[4] + array[8];
        const threeFiveSevenString = array[2] + array[4] + array[6];
        const victoryPaths = [];
        victoryPaths.push(oneTwoThreeString, fourFiveSixString,
            sevenEightNineString, oneFourSevenString, twoFiveEightString, 
            threeSixNineString, oneFiveNineString, threeFiveSevenString);
        return victoryPaths;
    }

    const returnOpenPathSlot = (input) => {
        let choices;
        if (input === 0) {
            choices = [0, 1, 2];
        } if (input === 1) {
            choices = [3, 4, 5];
        } if (input === 2) {
            choices = [6, 7, 8];
        } if (input === 3) {
            choices = [0, 3, 6];
        } if (input === 4) {
            choices = [1, 4, 7];
        } if (input === 5) {
            choices = [2, 5, 8];
        } if (input === 6) {
            choices = [0, 4, 8];
        } if (input === 7) {
            choices = [2, 4, 6];
        }
        let possibleChoices = [];
        for (let i = 0; i < choices.length; i++) {
            if (checkAvailable(choices[i])) {
                possibleChoices.push(choices[i]);
            }
        }
        return possibleChoices[Math.floor(Math.random() * possibleChoices.length)];
    }

    const clearArray = () => {
        for (let i = 0; i < array.length; i++) {
            array[i] = '';
        }
        displayController.update(array);
    };

    return { array, updateArray, checkAvailable, checkVictory, clearArray, returnPaths, returnOpenPathSlot };
})();

const player = (string, winCount) => {
    const addWin = () => {
        obj.winCount++;
    };
    const obj = { string, winCount, addWin };
    return obj;
};

const xPlayer = player('X', 0);

const oPlayer = player('O', 0);

const displayController = (() => {
    const update = (array) => {
        const ticTacToeBoxes = document.getElementsByClassName('square');
        for (let i = 0; i < array.length; i++) {
            ticTacToeBoxes[i].innerText = array[i];
        }
    };

    const displayVictory = (winner) => {
        const victoryScreen = document.getElementById('victory-screen');
        const victoryText = document.getElementById('victory-text')
        if (winner) {
            victoryText.innerText = `Congratulations ${winner}! You have won 
            the match!`;
        } else {
            victoryText.innerText = 'The match is a draw!';
        }
        victoryScreen.classList.remove('hidden');
    };

    const hideVictory = () => {
        const ticTacToeGrid = document.getElementById('tic-tac-toe');
        ticTacToeGrid.classList.remove('no-pointer-events');
        const victoryScreen = document.getElementById('victory-screen');
        victoryScreen.classList.add('hidden');
    };

    const updateScore = () => {
        const xScore = document.getElementById('x-player-score');
        xScore.textContent = xPlayer.winCount;
        const oScore = document.getElementById('o-player-score');
        oScore.textContent = oPlayer.winCount;
    }

    return { update, displayVictory, hideVictory, updateScore };
})()

const gameFlow = (() => {
    let turn = 0;

    const incrementTurn = () => {
        turn++;
    };

    const endGame = (winner) => {
        if (winner) {
            if (winner === 'X') {
                xPlayer.addWin();
            } else {
                oPlayer.addWin();
            }
            displayController.displayVictory(winner);
            displayController.updateScore();
        } if (!(winner)) {
            displayController.displayVictory();
        }
    };

    const newGame = () => {
        turn = 0;
        displayController.hideVictory();
        gameboard.clearArray();
    };

    const aiMove = () => {
        const easyDifficulty = document.getElementById('easy');
        const hardDifficulty = document.getElementById('hard');
        if (easyDifficulty.checked) {
            let possibleChoices = [];
            for (let i = 0; i < gameboard.array.length; i++) {
                if (gameboard.checkAvailable(i)) {
                    possibleChoices.push(i);
                }
            }
            return possibleChoices[Math.floor(Math.random() * possibleChoices.length)];
        } if (hardDifficulty.checked) {
            const currentPathStates = gameboard.returnPaths();
            for (let i = 0; i < currentPathStates.length; i++) {
                if (currentPathStates[i] === 'OO') {
                    return gameboard.returnOpenPathSlot(i);
                } 
            }
            for (let i = 0; i < currentPathStates.length; i++) {
                if (currentPathStates[i] === 'XX') {
                    return gameboard.returnOpenPathSlot(i);
                }
            }
            for (let i = 0; i < currentPathStates.length; i++) {
                if ((currentPathStates[i] === 'O') || (currentPathStates[i] === 'X')) {
                    return gameboard.returnOpenPathSlot(i);
                }
            }
        }
    }

    const checkWinStatus = () => {
        const victoryCheck = gameboard.checkVictory();
        if (victoryCheck.win) {
            console.log(`${victoryCheck.player} has won the match!`);
            endGame(victoryCheck.player);
            ticTacToeGrid.classList.add('no-pointer-events');
            return true;
        } if (!(victoryCheck.win)) {
            if (turn === 9) {
            console.log('The match is a draw!');
            displayController.displayVictory();
            }
            return false;
        }
    }

    const ticTacToeGrid = document.getElementById('tic-tac-toe');
    ticTacToeGrid.addEventListener('click', (e) => {
        ticTacToeGrid.classList.add('no-pointer-events');
        const target = e.target.id;
        if (gameboard.checkAvailable(target)) {
            gameboard.updateArray(target, xPlayer.string);
            incrementTurn();   
        } else {
            ticTacToeGrid.classList.remove('no-pointer-events');
            return;
        }

        const xWin = checkWinStatus();
        if (xWin === true) {
            return;
        }

        setTimeout(() => {
            gameboard.updateArray(aiMove(), oPlayer.string);
            incrementTurn();
            const oWin = checkWinStatus();
            if (oWin === false) {
                ticTacToeGrid.classList.remove('no-pointer-events');
            }
        }, 400);
    })
    
    const newGameButton = document.getElementById('new-game');
    newGameButton.addEventListener('click', newGame);

    return { turn, incrementTurn, newGame, aiMove};
})();