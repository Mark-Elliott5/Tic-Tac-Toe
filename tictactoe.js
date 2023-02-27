const gameboard = (() => {
    const array = ['1','2','3','4','5','6','7','8','9'];
    return { array }
})();

const player = (string) => {
    const grid = document.getElementById('tic-tac-toe');
    grid.addEventListener('click', (e) => {
        const square = e.target;
        square.innerText = string;
    })
    return { string };
};