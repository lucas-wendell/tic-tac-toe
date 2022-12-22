import { TicTacToe } from "../class/game.js";
const main = document.querySelector(".main");
const firstPlayer = localStorage.getItem("firstPlayer");
const newGame = new TicTacToe(firstPlayer);
const actions = {
    squareClick(target) {
        const value = target.getAttribute("data-value");
        newGame.updateMoves(+value);
    },
};
main.addEventListener("click", (e) => {
    const target = e.target;
    const funcName = target.getAttribute("data-fn");
    const fun = actions[funcName];
    fun === null || fun === void 0 ? void 0 : fun(target);
});
