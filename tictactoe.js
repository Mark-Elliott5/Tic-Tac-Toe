const gameboard = (() => {
    const array = new Array(9);
    // const updateArray = () => {};
    const checkAvailable = (target) => {
        if (array[target] === undefined) {
            return true;
        } else { return false; }
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
                gameFlow.victory();
                break;
            }
        }
        
        if ((array[0]) && (array[1]) && (array[2]) == ('X' || 'O')) {

        }
    }
    return { array }
})();

const player = (string) => {
    const winCount = 0
    const updateWinCount = () => {};
    return { string, winCount };
};

const xPlayer = player('X');

const oPlayer = player('O');

const displayController = (player) => {
    const grid = document.getElementById('tic-tac-toe');
    grid.addEventListener('click', (e) => {
        const square = e.target;
        square.innerText = player.string;
    })
    const displayVictory = () => {};
    const updateArray = (array) => {};
    return { string };
}

const gameFlow = (() => {
    const turn = 0;
    const ticTacToeGrid = document.getElementById('tic-tac-toe');
    ticTacToeGrid.addEventListener('click', (e) => {
        const target = e.target.id;
        if (gameboard.checkAvailable(target)) {
            if (turn % 2 === 0) {
                gameboard.updateArray(target, xPlayer.string)    
            } else {
            gameboard.updateArray(target, )
            }   
        }
    })

    const incrementTurn = () => { gameFlow.turn++ };
    return { checkVictory, incrementTurn };
})();