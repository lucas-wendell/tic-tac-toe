import { TicTacToe } from "../class/game.js";
import { accessActions } from "../main.js";
import { html } from "../getHtml.js";
import { UpdateDom } from "../class/updateDOM.js";
const main = html.get(".main");
const scoreboard = html.getAll('[data-js="scoreboard"]');
const firstPlayer = localStorage.getItem("firstPlayer");
const updateDOM = new UpdateDom(scoreboard);
const newGame = new TicTacToe(firstPlayer, updateDOM);
const actions = {
    squareClick: (target) => {
        const value = target.getAttribute("data-value");
        newGame.updateMoves(+value);
    },
};
main.addEventListener("click", (e) => accessActions(e, actions));
