import { TicTacToe } from "../class/game.js";
import { accessActions } from "../main.js";
import { html } from "../getHtml.js";
const main = html.get(".main");
const scoreboard = html.getAll('[data-js="scoreboard"]');
const firstPlayer = localStorage.getItem("firstPlayer");
const newGame = new TicTacToe(firstPlayer, scoreboard);
const actions = {
    squareClick: (target) => {
        const value = target.getAttribute("data-value");
        newGame.updateMoves(+value);
    },
};
main.addEventListener("click", (e) => accessActions(e, actions));
