import { TicTacToe } from "../class/game.js";
import { Player } from "../class/protocols/protocols.js";
import { accessActions } from "../main.js";

import { html } from "../getHtml.js";
import { UpdateDom } from "../class/updateDOM.js";

const main = html.get(".main") as HTMLDivElement;
const scoreboard = html.getAll('[data-js="scoreboard"]');
const firstPlayer = localStorage.getItem("firstPlayer") as Player;

const updateDOM = new UpdateDom(scoreboard);
const newGame = new TicTacToe(firstPlayer, updateDOM);

const actions = {
	squareClick: (target: Element) => {
		const value = target.getAttribute("data-value") as string;
		newGame.updateMoves(+value);
	},
};

main.addEventListener("click", (e) => accessActions(e, actions));
