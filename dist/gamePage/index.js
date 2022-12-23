import { TicTacToe } from "../class/game.js";
import { accessActions } from "../main.js";
const main = document.querySelector(".main");
const firstPlayer = localStorage.getItem("firstPlayer");
const newGame = new TicTacToe(firstPlayer);
const actions = {
    squareClick: (target) => {
        const value = target.getAttribute("data-value");
        newGame.updateMoves(+value);
    },
};
main.addEventListener("click", (e) => accessActions(e, actions));
