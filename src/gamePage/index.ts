import { TicTacToe } from "../class/game.js";
import { Player } from "../class/game.js";
import { accessActions } from "../main.js";
import { html } from "../getHtml.js";

const main = html.get(".main") as HTMLDivElement;
const scoreboard = html.getAll('[data-js="scoreboard"]');

const firstPlayer = localStorage.getItem("firstPlayer") as Player;
const newGame = new TicTacToe(firstPlayer, scoreboard);

const actions = {
	squareClick: (target: Element) => {
		const value = target.getAttribute("data-value") as string;
		newGame.updateMoves(+value);
	},
};

main.addEventListener("click", (e) => accessActions(e, actions));
