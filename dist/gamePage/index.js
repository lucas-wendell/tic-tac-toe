import { TicTacToe } from "../class/game.js";
import { accessActions } from "../main.js";
import { html } from "../getHtml.js";
import { UpdateDom } from "../class/updateDOM.js";
const modal = html.get('[data-js="modal"]');
const main = html.get(".main");
const scoreboard = html.getAll('[data-js="scoreboard"]');
const firstPlayer = localStorage.getItem("firstPlayer");
const updateDOM = new UpdateDom(scoreboard);
const newGame = new TicTacToe(firstPlayer, updateDOM);
const actions = {
    squareClick(target) {
        const value = target.getAttribute("data-value");
        newGame.updateMoves(+value);
    },
    restartBoard(target) {
        console.log(target);
        newGame.restartGame();
    },
    modaQuitButton() {
        modal.style.display = "none";
    },
    modaRestartButton() {
        modal.style.display = "none";
        newGame.restartGame();
    },
};
main.addEventListener("click", (e) => accessActions(e, actions));
modal.addEventListener("click", (e) => accessActions(e, actions));
