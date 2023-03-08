const gameboard = (() => {
    const array = new Array(9);
    const updateArray = (target, playerString, e) => {
        array[target] = playerString;
        displayController.update(playerString, e);
    };
    const checkAvailable = (target) => {
        if (array[target] === undefined) {
            return true;
        } else {
            return false;
        }
    };
    const checkVictory = () => {
        const oneTwoThreeString = array.slice(0,2).join('');
        const fourFiveSixString = array.slice(3,5).join('');
        const sevenEightNineString = array.slice(6,8).join('');
        const oneFourSevenString = array[0] + array[3] + array[6];
        const twoFiveEightString = array[1] + array[4] + array[7];
        const threeSixNineString = array[2] + array[5] + array[8];
        const oneFiveNineString = array[0] + array[4] + array[8];
        const threeFiveSevenString = array[2] + array[4] + array[6];
        const victoryPaths = [];
        victoryPaths.push(oneTwoThreeString, fourFiveSixString,
            sevenEightNineString, oneFourSevenString, twoFiveEightString, 
            threeSixNineString, oneFiveNineString, threeFiveSevenString);
        for (let i = 0; i < victoryPaths.length; i++) {
            if ((victoryPaths[i] === 'XXX') || (victoryPaths[i] === 'OOO')) {
                console.log(victoryPaths[i]);
                return { win: true, player: victoryPaths[i][0]};
            }
        }
    }
    const clearArray = () => {
        array = new Array(9);
    }
    return { updateArray, checkAvailable, checkVictory, clearArray }
})();

const player = (string) => {
    const winCount = 0
    const updateWinCount = () => {};
    return { string, winCount };
};

const xPlayer = player('X');

const oPlayer = player('O');

const displayController = (player) => {
    const update = (playerString, e) => {
        const square = e.target;
        square.innerText = playerString;
    }
    const displayVictory = () => {
        const ticTacToeGrid = document.getElementById('tic-tac-toe');
        ticTacToeGrid.classList.add('no-pointer-events');
        const victoryScreen = document.getElementById('victory-screen');
        victoryScreen.classList.remove('hidden');
    };
    const hideVictory = () => {
        const ticTacToeGrid = document.getElementById('tic-tac-toe');
        ticTacToeGrid.classList.remove('no-pointer-events');
        const victoryScreen = document.getElementById('victory-screen');
        victoryScreen.classList.add('hidden');
    }
}

const gameFlow = (() => {
    const turn = 0;
    const ticTacToeGrid = document.getElementById('tic-tac-toe');
    ticTacToeGrid.addEventListener('click', (e) => {
        ticTacToeGrid.classList.add('no-pointer-events');
        const target = e.target.id;
        if (gameboard.checkAvailable(target)) {
            if (turn % 2 === 0) {
                gameboard.updateArray(target, xPlayer.string, e);    
            } else {
                gameboard.updateArray(target, oPlayer.string, e);
            }
            incrementTurn();   
        } else {
            return;
        }

        const victoryCheck = gameboard.checkVictory();
        if (victoryCheck.win) {
            gameFlow.endGame(victoryCheck.player);
        } else {
            ticTacToeGrid.classList.remove('no-pointer-events');
        }
    })

    const incrementTurn = () => { gameFlow.turn++ };
    const endGame = () => {
        displayController.displayVictory();
        if (turn % 2 === 0) {
            xPlayer.addWin();
        } else {
            oPlayer.addWin();
        }
    }
    const newGame = () => {
        turn = 0;
        displayController.hideVictory();
        gameboard.clearArray();
    }
    return { checkVictory, incrementTurn, newGame };
})();